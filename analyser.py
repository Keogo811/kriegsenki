# ============================================================
# DIAGNOSTIC — Montre toutes les lignes qui contiennent "acte"
# ------------------------------------------------------------
# Ne modifie RIEN. Sert juste à voir comment tes actes sont écrits.
# ============================================================

import os

DOSSIER_IMPORTS = "imports"


def diagnostiquer_fichier(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.readlines()

    print(f"\n=== Fichier : {os.path.basename(chemin)} ===")
    print(f"Nombre total de lignes : {len(lignes)}\n")

    print("Toutes les lignes contenant 'acte' (peu importe la casse) :")
    print("-" * 70)

    trouvees = 0
    for numero_ligne, ligne in enumerate(lignes, start=1):
        if "acte" in ligne.lower():
            trouvees += 1
            # On affiche les 60 premiers caractères bruts, avec [ ] autour
            # pour voir les espaces et les caractères invisibles
            debut = ligne.rstrip("\n")[:60]
            print(f"  Ligne {numero_ligne:>5} : [{debut}]")

    print("-" * 70)
    print(f"Total de lignes contenant 'acte' : {trouvees}\n")

    # Aussi : on montre les 20 premières lignes brutes pour voir le style général
    print("Aperçu des 20 premières lignes brutes du fichier :")
    print("-" * 70)
    for i, ligne in enumerate(lignes[:20], start=1):
        brut = ligne.rstrip("\n")[:70]
        print(f"  {i:>3} : [{brut}]")
    print("-" * 70)


def main():
    if not os.path.isdir(DOSSIER_IMPORTS):
        print(f"Le dossier '{DOSSIER_IMPORTS}' n'existe pas.")
        return

    fichiers = [f for f in os.listdir(DOSSIER_IMPORTS) if f.lower().endswith(".txt")]

    if not fichiers:
        print(f"Aucun fichier .txt trouvé dans '{DOSSIER_IMPORTS}'.")
        return

    for nom in fichiers:
        chemin = os.path.join(DOSSIER_IMPORTS, nom)
        diagnostiquer_fichier(chemin)


if __name__ == "__main__":
    main()