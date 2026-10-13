# ============================================================
# IMPORTER — Découpe un fichier .txt et met à jour les données
# ------------------------------------------------------------
# 1. Lit les .txt dans "imports/"
# 2. Sépare le synopsis et chaque acte
# 3. Écrit les .txt dans data/synopsis/ et data/actes/
# 4. Ajoute automatiquement le bloc dans arcs.js
# 5. Ajoute automatiquement les lignes dans actes.js
# ============================================================

import os
import re

DOSSIER_IMPORTS = "imports"
DOSSIER_ACTES = os.path.join("data", "actes")
DOSSIER_SYNOPSIS = os.path.join("data", "synopsis")
FICHIER_ARCS = os.path.join("data", "arcs.js")
FICHIER_ACTES = os.path.join("data", "actes.js")

MARQUEUR_ARCS = "// >>> AUTO-IMPORT ARCS <<<"
MARQUEUR_ACTES = "// >>> AUTO-IMPORT ACTES <<<"

MOTIF_ACTE = re.compile(r"^\s*[Aa][Cc][Tt][Ee]\b")


def lire_fichier(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        return f.read()


def ecrire_fichier(chemin, contenu):
    os.makedirs(os.path.dirname(chemin), exist_ok=True)
    with open(chemin, "w", encoding="utf-8") as f:
        f.write(contenu)


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


def inserer_dans_tableau(chemin, marqueur, nouvelle_entree):
    """Insère un nouveau bloc avant la ligne marqueur."""
    contenu = lire_fichier(chemin)
    if marqueur not in contenu:
        raise ValueError(
            f"Marqueur '{marqueur}' introuvable dans {chemin}. "
            "Vérifie que la ligne existe bien avant '];'."
        )

    index = contenu.index(marqueur)
    avant = contenu[:index].rstrip()

    # S'assurer qu'on a bien une virgule avant d'ajouter
    if avant and not avant.endswith(",") and not avant.endswith("["):
        avant += ","

    nouveau_contenu = avant + "\n\n" + nouvelle_entree + "\n\n    " + contenu[index:]
    ecrire_fichier(chemin, nouveau_contenu)


def creer_bloc_arc(arc_id, titre, statut, synopsis_id, description):
    return f"""    {{
        id: "{arc_id}",
        titre: "{titre}",
        statut: "{statut}",
        synopsisId: "{synopsis_id}",
        description: "{description}"
    }},"""


def creer_ligne_acte(acte_id, arc_id, numero, titre, statut):
    return (
        f'    {{ id: "{acte_id}", arcId: "{arc_id}", numero: {numero}, '
        f'titre: "{titre}", statut: "{statut}" }},'
    )


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
    prefixe = input("Préfixe d'ID (ex: a1, a2, ak) : ").strip()
    if not prefixe:
        print("Aucun préfixe. Annulé.")
        return

    arc_id = prefixe
    arc_titre = input("Titre de l'arc : ").strip()
    arc_desc = input("Description courte : ").strip()
    arc_statut = input("Statut (publie / redaction / brouillon) [redaction] : ").strip()
    if not arc_statut:
        arc_statut = "redaction"

    # Vérifier si l'arc existe déjà
    arcs_contenu = lire_fichier(FICHIER_ARCS)
    if f'id: "{arc_id}"' in arcs_contenu:
        print(f"\n  ATTENTION : un arc avec l'id '{arc_id}' existe déjà.")
        rep = input("  Continuer quand même ? (o/n) : ").strip().lower()
        if rep != "o":
            print("  Annulé.")
            return

    # Préparer tous les fichiers
    fichiers_texte = []
    fichiers_texte.append((os.path.join(DOSSIER_SYNOPSIS, prefixe + ".txt"), synopsis))
    for i, acte in enumerate(actes, start=1):
        chemin_acte = os.path.join(DOSSIER_ACTES, f"{prefixe}-{i}.txt")
        fichiers_texte.append((chemin_acte, acte["corps"]))

    bloc_arc = creer_bloc_arc(arc_id, arc_titre, arc_statut, prefixe, arc_desc)
    lignes_actes = []
    for i, acte in enumerate(actes, start=1):
        acte_id = f"{prefixe}-{i}"
        lignes_actes.append(
            creer_ligne_acte(acte_id, arc_id, i, acte["titre"], arc_statut)
        )

    print("\n--- Résumé ---")
    print(f"  Arc     : {arc_titre}  (id: {arc_id})")
    print(f"  Statut  : {arc_statut}")
    print(f"  Synopsis: data/synopsis/{prefixe}.txt")
    print(f"  Actes   : {len(actes)} fichiers dans data/actes/")
    print(f"  Ajout dans : data/arcs.js  et  data/actes.js")

    rep = input("\nÉcrire tout ? (o/n) : ").strip().lower()
    if rep != "o":
        print("Annulé.")
        return

    # Écrire les fichiers texte
    for chemin_cible, contenu in fichiers_texte:
        ecrire_fichier(chemin_cible, contenu)

    # Insérer dans arcs.js
    inserer_dans_tableau(FICHIER_ARCS, MARQUEUR_ARCS, bloc_arc)

    # Insérer dans actes.js (une ligne par acte)
    bloc_actes = "\n".join(lignes_actes)
    inserer_dans_tableau(FICHIER_ACTES, MARQUEUR_ACTES, bloc_actes)

    print(f"\n  {len(fichiers_texte)} fichier(s) texte écrit(s).")
    print(f"  arcs.js et actes.js mis à jour.")
    print("  Rafraîchis le navigateur pour voir le nouvel arc.")


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