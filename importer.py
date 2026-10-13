# ============================================================
# IMPORTER — Découpe un fichier .txt (arc entier) en actes
# ------------------------------------------------------------
# Lit les fichiers du dossier "imports/", sépare le synopsis
# et chaque acte, puis écrit tout dans data/actes/ et data/synopsis/.
# Demande confirmation avant d'écrire.
# ============================================================

import os
import re

DOSSIER_IMPORTS = "imports"
DOSSIER_ACTES = os.path.join("data", "actes")
DOSSIER_SYNOPSIS = os.path.join("data", "synopsis")

# Un titre d'acte commence la ligne par "Acte" (majuscule ou minuscule)
MOTIF_ACTE = re.compile(r"^\s*[Aa][Cc][Tt][Ee]\b")


def lire_fichier(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        return f.read()


def decouper(texte):
    """Retourne (synopsis, [ {titre, corps}, ... ])"""
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

    # Demander un préfixe pour nommer les fichiers
    print()
    prefixe = input("  Préfixe d'ID pour cet arc (ex: a1, a2, ak) : ").strip()
    if not prefixe:
        print("  Aucun préfixe fourni. On annule.")
        return

    # Préparer la liste des fichiers à écrire
    fichiers = []
    fichiers.append((os.path.join(DOSSIER_SYNOPSIS, prefixe + ".txt"), synopsis))
    for i, acte in enumerate(actes, start=1):
        nom = f"{prefixe}-{i}.txt"
        fichiers.append((os.path.join(DOSSIER_ACTES, nom), acte["corps"]))

    print("\n  Fichiers qui seront écrits :")
    for chemin_cible, _ in fichiers:
        print(f"     - {chemin_cible}")

    reponse = input("\n  Écrire ces fichiers ? (o/n) : ").strip().lower()
    if reponse != "o":
        print("  Annulé.")
        return

    # Écrire
    os.makedirs(DOSSIER_ACTES, exist_ok=True)
    os.makedirs(DOSSIER_SYNOPSIS, exist_ok=True)
    for chemin_cible, contenu in fichiers:
        with open(chemin_cible, "w", encoding="utf-8") as f:
            f.write(contenu)
    print(f"  {len(fichiers)} fichier(s) écrit(s).")


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