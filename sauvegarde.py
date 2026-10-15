# ============================================================
# SAUVEGARDE — Exporte toute la base Supabase dans un fichier JSON
# ------------------------------------------------------------
# Lit toutes les tables (arcs, actes, boites) et écrit un fichier
# daté dans le dossier "sauvegardes/".
# À lancer une fois par mois, ou avant toute modification importante.
# ============================================================

import os
import json
import urllib.request
import urllib.error
from datetime import datetime
from migrer_config import SUPABASE_URL, SUPABASE_SERVICE_KEY

DOSSIER_SAUVEGARDES = "sauvegardes"
TABLES = ["boites", "arcs", "actes"]


def lire_table(nom_table):
    url = SUPABASE_URL + "/rest/v1/" + nom_table + "?select=*"
    req = urllib.request.Request(url, method="GET")
    req.add_header("apikey", SUPABASE_SERVICE_KEY)
    req.add_header("Authorization", "Bearer " + SUPABASE_SERVICE_KEY)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"  ERREUR sur la table '{nom_table}' : {e.code}")
        print(f"  {e.read().decode('utf-8')[:200]}")
        return None


def main():
    print("=== Sauvegarde Supabase ===\n")

    os.makedirs(DOSSIER_SAUVEGARDES, exist_ok=True)

    donnees = {}
    total_lignes = 0

    for table in TABLES:
        print(f"Lecture de '{table}'…")
        lignes = lire_table(table)
        if lignes is None:
            print(f"  Abandon.")
            return
        donnees[table] = lignes
        total_lignes += len(lignes)
        print(f"  {len(lignes)} ligne(s)")

    maintenant = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    nom_fichier = f"sauvegarde_{maintenant}.json"
    chemin = os.path.join(DOSSIER_SAUVEGARDES, nom_fichier)

    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(donnees, f, ensure_ascii=False, indent=2)

    taille_ko = os.path.getsize(chemin) / 1024
    print(f"\n=== Terminé ===")
    print(f"  Fichier  : {chemin}")
    print(f"  Lignes   : {total_lignes} au total ({', '.join(t + ' : ' + str(len(donnees[t])) for t in TABLES)})")
    print(f"  Taille   : {taille_ko:.1f} Ko")


if __name__ == "__main__":
    main()