# ============================================================
# IMPORTER — Découpe un fichier .txt et envoie à Supabase
# ------------------------------------------------------------
# 1. Lit les .txt dans "imports/"
# 2. Sépare le synopsis et chaque acte
# 3. Envoie le tout dans Supabase (tables arcs et actes)
# ============================================================

import os
import re
import json
import urllib.request
import urllib.error
from migrer_config import SUPABASE_URL, SUPABASE_SERVICE_KEY

DOSSIER_IMPORTS = "imports"
ENDPOINT_ARCS = SUPABASE_URL + "/rest/v1/arcs"
ENDPOINT_ACTES = SUPABASE_URL + "/rest/v1/actes"

MOTIF_ACTE = re.compile(r"^\s*[Aa][Cc][Tt][Ee]\b")


def lire_fichier(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        return f.read()


def envoyer_supabase(url, lignes):
    """Envoie un tableau d'objets à Supabase via l'API REST."""
    data = json.dumps(lignes).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("apikey", SUPABASE_SERVICE_KEY)
    req.add_header("Authorization", "Bearer " + SUPABASE_SERVICE_KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "resolution=merge-duplicates,return=minimal")

    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, ""
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")


def decouper(texte):
    lignes = texte.split("\n")
    positions = [i for i, ligne in enumerate(lignes) if MOTIF_ACTE.match(ligne)]

    if not positions:
        return texte.strip(), []

    synopsis = "\n".join(lignes[:positions[0]]).strip()

    actes = []
    for idx, debut in enumerate(positions):
        fin = positions[idx + 1] if idx + 1 < len(positions) else len(lignes)
        bloc = lignes[debut:fin]
        titre = bloc[0].strip()
        corps = "\n".join(bloc[1:]).strip()
        actes.append({"titre": titre, "corps": corps})

    return synopsis, actes


def traiter_fichier(nom_fichier):
    chemin = os.path.join(DOSSIER_IMPORTS, nom_fichier)
    texte = lire_fichier(chemin)
    synopsis, actes = decouper(texte)

    print(f"\n=== {nom_fichier} ===")
    print(f"Synopsis : {len(synopsis)} caractères")
    print(f"Actes    : {len(actes)}")
    for i, a in enumerate(actes, start=1):
        print(f"   {i}. {a['titre']}  ({len(a['corps'])} caractères)")

    if not actes:
        print("  Aucun acte trouvé. On passe.")
        return

    print("\n--- Informations à fournir ---")
    arc_id = input("Préfixe d'ID (ex: a1, a2, ak) : ").strip()
    if not arc_id:
        print("Aucun préfixe. Annulé.")
        return

    arc_titre = input("Titre de l'arc : ").strip()
    arc_desc = input("Description courte : ").strip()
    arc_statut = input("Statut (publie / redaction / brouillon) [redaction] : ").strip()
    if not arc_statut:
        arc_statut = "redaction"

    # Préparer les objets à envoyer
    arc_obj = {
        "id": arc_id,
        "titre": arc_titre,
        "statut": arc_statut,
        "description": arc_desc,
        "synopsis": synopsis,
        "ordre": 0
    }

    actes_obj = []
    for i, acte in enumerate(actes, start=1):
        actes_obj.append({
            "id": f"{arc_id}-{i}",
            "arc_id": arc_id,
            "numero": i,
            "titre": acte["titre"],
            "statut": arc_statut,
            "contenu": acte["corps"]
        })

    print("\n--- Résumé ---")
    print(f"  Arc     : {arc_titre}  (id: {arc_id})")
    print(f"  Statut  : {arc_statut}")
    print(f"  Synopsis: {len(synopsis)} caractères")
    print(f"  Actes   : {len(actes_obj)}")
    print(f"  Destination : Supabase (tables arcs et actes)")

    rep = input("\nEnvoyer à Supabase ? (o/n) : ").strip().lower()
    if rep != "o":
        print("Annulé.")
        return

    # Envoi de l'arc
    print("\nEnvoi de l'arc…")
    code, corps = envoyer_supabase(ENDPOINT_ARCS, [arc_obj])
    if not (200 <= code < 300):
        print(f"  ERREUR ({code}) : {corps[:400]}")
        return
    print(f"  OK ({code})")

    # Envoi des actes
    print("Envoi des actes…")
    code, corps = envoyer_supabase(ENDPOINT_ACTES, actes_obj)
    if not (200 <= code < 300):
        print(f"  ERREUR ({code}) : {corps[:400]}")
        print("  L'arc a été créé mais les actes ont échoué.")
        print("  Relance après avoir corrigé, l'arc sera mis à jour (pas de doublon).")
        return
    print(f"  OK ({code})")

    print(f"\n=== Import terminé ===")
    print(f"  {len(actes_obj)} acte(s) et l'arc sont maintenant sur Supabase.")
    print(f"  Rafraîchis le navigateur pour les voir.")


def main():
    if not os.path.isdir(DOSSIER_IMPORTS):
        print(f"Le dossier '{DOSSIER_IMPORTS}' n'existe pas.")
        return

    fichiers = [f for f in os.listdir(DOSSIER_IMPORTS) if f.lower().endswith(".txt")]
    if not fichiers:
        print(f"Aucun fichier .txt dans '{DOSSIER_IMPORTS}'.")
        return

    for nom in fichiers:
        traiter_fichier(nom)

    print("\nTerminé.")


if __name__ == "__main__":
    main()