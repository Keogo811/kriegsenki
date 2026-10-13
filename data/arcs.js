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
        id: "arc-1-esclave",
        titre: "Arc 1 — Σκλάβος (Esclave)",
        statut: "publie",
        synopsisId: "a1",
        description: "Dans les champs de labeur, un garçon sans nom croise son double féminin. Un nom, une raison d'exister."
    },

    {
        id: "arc-2-sparte",
        titre: "Arc 2 — Sparte",
        statut: "publie",
        description: "Forgés dans le sang et le silence, les jumeaux gravissent Sparte par la seule force de leur efficacité glaciale."
    },

    {
        id: "arc-3-roma-latina",
        titre: "Arc 3 — Roma Latina",
        statut: "publie",
        description: "Sparte n'est plus que l'ombre d'elle-même. Io et Ia tournent leurs regards vers l'Occident, vers la Grande Grèce."
    },

    {
        id: "arc-4-carthago",
        titre: "Arc 4 — Carthago",
        statut: "publie",
        description: "Après un siècle de guerres en Italie, les Démons de Sparte reviennent. Rome et Carthage se regardent."
    },

    {
        id: "arc-kofun",
        titre: "Arc Kofun — Krieg Senki",
        statut: "redaction",
        description: "La naissance de Wan, entre le sang d'un tombeau et la folie d'une déesse brisée."
    },

    {
        id: "heina-senki",
        titre: "Heina Senki",
        statut: "redaction",
        description: "Recueil sans ordre d'histoires autour d'Heïna, fille d'Io et de G11, dans un Reich alternatif."
    }

];