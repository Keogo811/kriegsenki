// ============================================================
// LISTE DES ACTES
// ------------------------------------------------------------
// Chaque acte est rattaché à un arc via "arcId" (l'id de l'arc).
// Pour ajouter un acte : copie un bloc { ... }, modifie les champs.
//
// Champs :
//   id          : identifiant unique de l'acte
//   arcId       : identifiant de l'arc auquel il appartient
//   numero      : numéro d'ordre dans l'arc (1, 2, 3...)
//   titre       : titre de l'acte
//   statut      : "publie" | "redaction" | "brouillon"
// ============================================================

const ACTES = [

    // --- Arc 1 : Esclave ---
    { id: "a1-1", arcId: "arc-1-esclave", numero: 1, titre: "La Seconde Chance d'Altaïr", statut: "publie" },
    { id: "a1-2", arcId: "arc-1-esclave", numero: 2, titre: "Esclave", statut: "publie" },
    { id: "a1-3", arcId: "arc-1-esclave", numero: 3, titre: "Ia et Io", statut: "publie" },
    { id: "a1-4", arcId: "arc-1-esclave", numero: 4, titre: "Lien Trouble", statut: "publie" },
    { id: "a1-5", arcId: "arc-1-esclave", numero: 5, titre: "Ni Mieux, ni Pire", statut: "publie" },
    { id: "a1-6", arcId: "arc-1-esclave", numero: 6, titre: "Sans Affect", statut: "publie" },

    // --- Arc 2 : Sparte ---
    { id: "a2-1", arcId: "arc-2-sparte", numero: 1, titre: "Société Guerrière", statut: "publie" },
    { id: "a2-2", arcId: "arc-2-sparte", numero: 2, titre: "Le Miroir", statut: "publie" },
    { id: "a2-3", arcId: "arc-2-sparte", numero: 3, titre: "Frère", statut: "publie" },

    // --- Arc 3 : Roma Latina ---
    { id: "a3-1", arcId: "arc-3-roma-latina", numero: 1, titre: "Après Sparte", statut: "publie" },
    { id: "a3-2", arcId: "arc-3-roma-latina", numero: 2, titre: "Magna Graecia", statut: "publie" },
    { id: "a3-3", arcId: "arc-3-roma-latina", numero: 3, titre: "Démons de Sparte", statut: "publie" },

    // --- Arc 4 : Carthago ---
    { id: "a4-1", arcId: "arc-4-carthago", numero: 1, titre: "Les Racines", statut: "publie" },
    { id: "a4-2", arcId: "arc-4-carthago", numero: 2, titre: "Guerre Punique", statut: "publie" },
    { id: "a4-3", arcId: "arc-4-carthago", numero: 3, titre: "Le Géant et la Mer", statut: "publie" },

    // --- Arc Kofun ---
    { id: "ak-1", arcId: "arc-kofun", numero: 1, titre: "La Naissance", statut: "redaction" },
    { id: "ak-2", arcId: "arc-kofun", numero: 2, titre: "Wan", statut: "redaction" },
    { id: "ak-3", arcId: "arc-kofun", numero: 3, titre: "La régente", statut: "redaction" },

    // --- Heina Senki ---
    { id: "hs-1", arcId: "heina-senki", numero: 1, titre: "Le Reichstag", statut: "redaction" },
    { id: "hs-2", arcId: "heina-senki", numero: 2, titre: "Faim", statut: "redaction" }

];