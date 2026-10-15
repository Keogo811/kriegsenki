// ============================================================
// LISTE DES ARCS
// ------------------------------------------------------------
// Pour ajouter un arc : copie un bloc { ... } existant,
// colle-le, modifie les champs. Garde la virgule entre les blocs.
//
// Champs :
//   id          : identifiant unique, sans espaces (ex: "arc-5-kofun")
//   titre       : titre affiché
//   statut      : "publie" | "redaction" | "brouillon"
//   description : une ou deux phrases
// ============================================================

const ARCS = [

    {
        id: "a1",
        titre: "Arc 1 - Σκλάβος (Esclave)",
        statut: "publie",
        synopsisId: "a1",
        description: "Dans les champs de labeur, un garçon sans nom croise son double féminin. Un nom, une raison d'exister."
    },

    {
        id: "a2-1",
        titre: "Arc 2 - Sparte - Partie 1",
        statut: "publie",
        synopsisId: "a2-1",
        description: "Dans un lien trouble, fait de tendresse possessive et de froideur, les jumeaux graviront les rangs de Sparte par le sang et la gloire."
    },

    {
        id: "a2-2",
        titre: "Arc 2 - Sparte - Partie 2",
        statut: "publie",
        synopsisId: "a2-2",
        description: "Dans l'euphorie de la gloire, l'orgueil et la légende remplace la prudence dans le coeur de Sparte. Pourront-ils survivrent face aux défis du nouvel âge?"
    },

    {
        id: "a3",
        titre: "Arc 3 - Roma Latina",
        statut: "publie",
        synopsisId: "a3",
        description: "Sparte n'est plus que l'ombre d'elle-même. Io et Ia tournent leurs regards vers l'Occident, vers Magna Graecia."
    },

    {
        id: "a4",
        titre: "Arc 4 - Carthago",
        statut: "publie",
        synopsisId: "a4",
        description: "Après un siècle de guerres en Italie, les Démons de Sparte reviennent. Rome et Carthage se regardent."
    },

    {
        id: "colonie",
        titre: "La Colonie",
        statut: "redaction",
        synopsisId: "colonie",
        description: "Entre les intrigues de cour et les complots d'un autre monde, une jeune héritière devra y survivre."
    },

    {
        id: "kofun",
        titre: "Arc Kofun",
        statut: "redaction",
        synopsisId: "kofun",
        description: "La naissance de Wan, entre le sang d'un tombeau et la folie d'une déesse brisée."
    },

    {
        id: "epineaimee",
        titre: "Epine Aimée",
        statut: "redaction",
        synopsisId: "epineaimee",
        description: "Le destin d'un frère et sa soeur aveugle dans le drame d'une famille."
    },

    // >>> AUTO-IMPORT ARCS <<<
    // Les arcs importés sont insérés automatiquement ici. Ne pas supprimer.

];