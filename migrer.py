# ============================================================
# MIGRER — Envoie les données locales vers Supabase
# ------------------------------------------------------------
# Lit :
#   - data/arcs.js
#   - data/actes.js
#   - data/synopsis/*.txt
#   - data/actes/*.txt
# Puis envoie tout dans les tables "arcs" et "actes".
# ============================================================

import os
import re
import json
import urllib.request
import urllib.error
from migrer_config import SUPABASE_URL, SUPABASE_SERVICE_KEY

FICHIER_ARCS = os.path.join("data", "arcs.js")
FICHIER_ACTES = os.path.join("data", "actes.js")
DOSSIER_SYNOPSIS = os.path.join("data", "synopsis")
DOSSIER_ACTES = os.path.join("data", "actes")

ENDPOINT_ARCS = SUPABASE_URL + "/rest/v1/arcs"
ENDPOINT_ACTES = SUPABASE_URL + "/rest/v1/actes"


def lire(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        return f.read()


def envoyer(url, lignes, methode="POST"):
    """Envoie des lignes à Supabase via l'API REST."""
    data = json.dumps(lignes).encode("utf-8")
    req = urllib.request.Request(url, data=data, method=methode)
    req.add_header("apikey", SUPABASE_SERVICE_KEY)
    req.add_header("Authorization", "Bearer " + SUPABASE_SERVICE_KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "resolution=merge-duplicates")

    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")


def extraire_objets(contenu_js):
    """Extrait les objets { ... } entre [ ] et les parse."""
    # On isole le contenu entre [ et ]
    debut = contenu_js.index("[") + 1
    fin = contenu_js.rindex("]")
    bloc = contenu_js[debut:fin]

    # On enlève les commentaires de ligne
    bloc = re.sub(r"//.*", "", bloc)

    # On trouve chaque objet { ... } non imbriqué
    objets = []
    profondeur = 0
    courant = ""
    for c in bloc:
        if c == "{":
            if profondeur == 0:
                courant = ""
            profondeur += 1
        if profondeur > 0:
            courant += c
        if c == "}":
            profondeur -= 1
            if profondeur == 0:
                objets.append(courant)
    return objets


def parse_objet(objet_js):
    """Transforme { id: "x", titre: "y" } en dict Python."""
    # Convertit en JSON valide
    s = objet_js
    # Clés entre guillemets
    s = re.sub(r"([{,]\s*)(\w+)(\s*:)", r'\1"\2"\3', s)
    # Ajoute des guillemets autour des valeurs qui n'en ont pas
    # (pour les nombres et booléens c'est OK, on laisse)
    try:
        return json.loads(s)
    except json.JSONDecodeError as e:
        print(f"    ! Impossible de parser : {objet_js[:80]}...")
        print(f"      Raison : {e}")
        return None


def main():
    print("=== Lecture des données locales ===\n")

    # --- Arcs ---
    arcs_js = lire(FICHIER_ARCS)
    objets_arcs = extraire_objets(arcs_js)
    arcs = []
    for obj in objets_arcs:
        d = parse_objet(obj)
        if not d:
            continue
        synopsis_id = d.get("synopsisId", "")
        contenu_synopsis = ""
        if synopsis_id:
            chemin_syn = os.path.join(DOSSIER_SYNOPSIS, synopsis_id + ".txt")
            if os.path.exists(chemin_syn):
                contenu_synopsis = lire(chemin_syn)
        arcs.append({
            "id": d["id"],
            "titre": d.get("titre", ""),
            "statut": d.get("statut", "brouillon"),
            "description": d.get("description", ""),
            "synopsis": contenu_synopsis,
            "ordre": 0
        })

    print(f"Arcs trouvés : {len(arcs)}")
    for a in arcs:
        print(f"  - {a['id']}  ({a['titre']})")

    # --- Actes ---
    actes_js = lire(FICHIER_ACTES)
    objets_actes = extraire_objets(actes_js)
    actes = []
    for obj in objets_actes:
        d = parse_objet(obj)
        if not d:
            continue
        chemin_contenu = os.path.join(DOSSIER_ACTES, d["id"] + ".txt")
        contenu = ""
        if os.path.exists(chemin_contenu):
            contenu = lire(chemin_contenu)
        actes.append({
            "id": d["id"],
            "arc_id": d["arcId"],
            "numero": d.get("numero", 0),
            "titre": d.get("titre", ""),
            "statut": d.get("statut", "brouillon"),
            "contenu": contenu
        })

    print(f"\nActes trouvés : {len(actes)}")
    for a in actes:
        print(f"  - {a['id']}  ({a['titre']})  [{len(a['contenu'])} car.]")

    print("\n=== Résumé ===")
    print(f"  {len(arcs)} arcs à envoyer")
    print(f"  {len(actes)} actes à envoyer")

    rep = input("\nEnvoyer vers Supabase ? (o/n) : ").strip().lower()
    if rep != "o":
        print("Annulé.")
        return

    # --- Envoi des arcs ---
    print("\nEnvoi des arcs...")
    code, corps = envoyer(ENDPOINT_ARCS, arcs)
    if 200 <= code < 300:
        print(f"  OK ({code})")
    else:
        print(f"  ERREUR ({code}) : {corps[:300]}")
        return

    # --- Envoi des actes ---
    print("\nEnvoi des actes...")
    code, corps = envoyer(ENDPOINT_ACTES, actes)
    if 200 <= code < 300:
        print(f"  OK ({code})")
    else:
        print(f"  ERREUR ({code}) : {corps[:300]}")
        return

    print("\n=== Migration terminée ===")


if __name__ == "__main__":
    main()