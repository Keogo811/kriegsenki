# ============================================================
# RESTAURER — Réinjecte une sauvegarde JSON dans Supabase
# ------------------------------------------------------------
# 1. Demande quel fichier de sauvegarde utiliser
# 2. Vide les tables actuelles (actes, arcs, boites)
# 3. Réinsère toutes les données de la sauvegarde
# ============================================================

import os
import json
import urllib.request
import urllib.error
from migrer_config import SUPABASE_URL, SUPABASE_SERVICE_KEY

DOSSIER_SAUVEGARDES = "sauvegardes"

# Ordre de suppression : les enfants d'abord (actes), puis les parents (arcs), puis (boites)
TABLES_SUPPRESSION = ["actes", "arcs", "boites"]
# Ordre d'insertion : les parents d'abord (boites), puis (arcs), puis les enfants (actes)
TABLES_INSERTION = ["boites", "arcs", "actes"]


def requete_supabase(url, methode, donnees=None):
    data_bytes = json.dumps(donnees).encode("utf-8") if donnees else None
    req = urllib.request.Request(url, data=data_bytes, method=methode)
    req.add_header("apikey", SUPABASE_SERVICE_KEY)
    req.add_header("Authorization", "Bearer " + SUPABASE_SERVICE_KEY)
    req.add_header("Content-Type", "application/json")
    if methode == "POST":
        req.add_header("Prefer", "return=minimal")

    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, ""
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")


def vider_table(nom):
    # Supprime toutes les lignes. On utilise un filtre qui est toujours vrai.
    url = SUPABASE_URL + "/rest/v1/" + nom + "?id=not.is.null"
    return requete_supabase(url, "DELETE")


def inserer_table(nom, lignes):
    if not lignes:
        return 200, ""
    url = SUPABASE_URL + "/rest/v1/" + nom
    return requete_supabase(url, "POST", lignes)


def main():
    print("=== Restauration Supabase ===\n")

    if not os.path.isdir(DOSSIER_SAUVEGARDES):
        print(f"Le dossier '{DOSSIER_SAUVEGARDES}' n'existe pas.")
        print("Lance d'abord 'python sauvegarde.py' pour en créer un.")
        return

    fichiers = sorted([f for f in os.listdir(DOSSIER_SAUVEGARDES) if f.endswith(".json")])
    if not fichiers:
        print(f"Aucun fichier .json dans '{DOSSIER_SAUVEGARDES}'.")
        return

    print("Sauvegardes disponibles :")
    for i, f in enumerate(fichiers, start=1):
        taille_ko = os.path.getsize(os.path.join(DOSSIER_SAUVEGARDES, f)) / 1024
        print(f"  {i}. {f} ({taille_ko:.1f} Ko)")

    choix = input("\nQuel numéro restaurer ? (défaut = dernier) : ").strip()
    if not choix:
        fichier = fichiers[-1]
    else:
        try:
            fichier = fichiers[int(choix) - 1]
        except (ValueError, IndexError):
            print("Choix invalide.")
            return

    chemin = os.path.join(DOSSIER_SAUVEGARDES, fichier)
    print(f"\nFichier choisi : {chemin}")

    with open(chemin, "r", encoding="utf-8") as f:
        donnees = json.load(f)

    for nom in TABLES_INSERTION:
        nb = len(donnees.get(nom, []))
        print(f"  {nom} : {nb} ligne(s) à restaurer")

    print("\n⚠️  ATTENTION : cela va EFFACER toutes les données actuelles de Supabase")
    print("et les remplacer par cette sauvegarde.")
    rep = input("Confirmer la restauration ? (tape 'oui' en toutes lettres) : ").strip().lower()
    if rep != "oui":
        print("Annulé.")
        return

    # 1. Vider les tables
    print("\n--- Suppression des données actuelles ---")
    for table in TABLES_SUPPRESSION:
        print(f"  Suppression de '{table}'…")
        code, corps = vider_table(table)
        if not (200 <= code < 300):
            print(f"  ERREUR ({code}) : {corps[:300]}")
            return
        print(f"  OK ({code})")

    # 2. Insérer les nouvelles données
    print("\n--- Insertion des données de la sauvegarde ---")
    for table in TABLES_INSERTION:
        lignes = donnees.get(table, [])
        if not lignes:
            print(f"  '{table}' : rien à insérer.")
            continue
        print(f"  Insertion dans '{table}' ({len(lignes)} ligne(s))…")
        code, corps = inserer_table(table, lignes)
        if not (200 <= code < 300):
            print(f"  ERREUR ({code}) : {corps[:300]}")
            print("  La restauration a échoué à cette table. Les données actuelles sont perdues.")
            return
        print(f"  OK ({code})")

    print("\n=== Restauration terminée ===")
    print("Toutes les données ont été réinjectées dans Supabase.")


if __name__ == "__main__":
    main()