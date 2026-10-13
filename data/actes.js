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

    // --- Arc 2 : Sparte Partie 1---
    { id: "a2-1-1", arcId: "a2-1", numero: 1, titre: "Acte 1 - Société Guerrière", statut: "publie" },
    { id: "a2-1-2", arcId: "a2-1", numero: 2, titre: "Acte 2 - Le Miroir", statut: "publie" },
    { id: "a2-1-3", arcId: "a2-1", numero: 3, titre: "Acte 3 - Frère", statut: "publie" },
    { id: "a2-1-4", arcId: "a2-1", numero: 4, titre: "Acte 4 - Vie Citoyenne", statut: "publie" },
    { id: "a2-1-5", arcId: "a2-1", numero: 5, titre: "Acte 5 - L'Ombre du Pouvoir", statut: "publie" },
    { id: "a2-1-6", arcId: "a2-1", numero: 6, titre: "Acte 5.5 - Constante Frustration", statut: "publie" },
    { id: "a2-1-7", arcId: "a2-1", numero: 7, titre: "Acte 6 - Sans Plainte", statut: "publie" },
    { id: "a2-1-8", arcId: "a2-1", numero: 8, titre: "Acte 7 - Le Granit", statut: "publie" },
    { id: "a2-1-9", arcId: "a2-1", numero: 9, titre: "Acte 7.5 - Frondeuse Gorgo", statut: "publie" },
    { id: "a2-1-10", arcId: "a2-1", numero: 10, titre: "Acte 8 - Les Thermopyles", statut: "publie" },
    { id: "a2-1-11", arcId: "a2-1", numero: 11, titre: "Acte 9 - Pied sur la Bête", statut: "publie" },
    { id: "a2-1-12", arcId: "a2-1", numero: 12, titre: "Acte 10 - Première Déviation", statut: "publie" },
    { id: "a2-1-13", arcId: "a2-1", numero: 13, titre: "Acte 11 - Nouvelle Sparte", statut: "publie" },
    { id: "a2-1-14", arcId: "a2-1", numero: 14, titre: "Acte 12 - Victoire Antique", statut: "publie" },
    { id: "a2-1-15", arcId: "a2-1", numero: 15, titre: "Acte 13 - La Plus Douce des Révoltes", statut: "publie" },
    // --- Arc 2 : Sparte Partie 2 ---
    { id: "a2-2-1", arcId: "a2-2", numero: 1, titre: "Acte 1 - Un Nouvel Âge, Une Même Terre", statut: "publie" },
    { id: "a2-2-2", arcId: "a2-2", numero: 2, titre: "Acte 2 - L'Echo du Conflit", statut: "publie" },
    { id: "a2-2-3", arcId: "a2-2", numero: 3, titre: "Acte 3 - L'Étau et l'Attente", statut: "publie" },
    { id: "a2-2-4", arcId: "a2-2", numero: 4, titre: "Acte 4 - Le Sel et le Mur", statut: "publie" },
    { id: "a2-2-5", arcId: "a2-2", numero: 5, titre: "Acte 4.5 - L'Ombre d'une Fille Sauvage", statut: "publie" },
    { id: "a2-2-6", arcId: "a2-2", numero: 6, titre: "Acte 5 - Syracuse", statut: "publie" },
    { id: "a2-2-7", arcId: "a2-2", numero: 7, titre: "Acte 6 - Le Ver dans la Cité", statut: "publie" },   
    { id: "a2-2-8", arcId: "a2-2", numero: 8, titre: "Acte 7 - Glu de Viscères", statut: "publie" },
    { id: "a2-2-9", arcId: "a2-2", numero: 9, titre: "Acte 8 - L'Ombre Blanche", statut: "publie" },
    { id: "a2-2-10", arcId: "a2-2", numero: 10, titre: "Acte 9 - L'Usure", statut: "publie" },
    { id: "a2-2-11", arcId: "a2-2", numero: 11, titre: "Acte 10 - Sparte Seule", statut: "publie" },
    { id: "a2-2-12", arcId: "a2-2", numero: 12, titre: "Acte 11 - Folies de la Gloire", statut: "publie" },
    { id: "a2-2-13", arcId: "a2-2", numero: 13, titre: "Acte 11.5 - Victoire ou pas...", statut: "publie" },
    // --- Arc 3 : Roma Latina ---
    { id: "a3-1", arcId: "a3", numero: 1, titre: "Acte 1 - Après Sparte", statut: "publie" },
    { id: "a3-2", arcId: "a3", numero: 2, titre: "Acte 2 - Magna Graecia", statut: "publie" },
    { id: "a3-3", arcId: "a3", numero: 3, titre: "Acte 3 - Démons de Sparte", statut: "publie" },
    { id: "a3-4", arcId: "a3", numero: 4, titre: "Acte 4 - Vertu d'Efficacité", statut: "publie" },
    { id: "a3-5", arcId: "a3", numero: 5, titre: "Acte 5 - Tyran", statut: "publie" },
    { id: "a3-6", arcId: "a3", numero: 6, titre: "Acte 6 - Lacedaemonius conducticius", statut: "publie" },
    { id: "a3-7", arcId: "a3", numero: 7, titre: "Acte 7 - Veies", statut: "publie" },
    { id: "a3-8", arcId: "a3", numero: 8, titre: "Acte 8 - Lointain Hellas", statut: "publie" },
    { id: "a3-9", arcId: "a3", numero: 9, titre: "Acte 9 - Philosophie", statut: "publie" },
    { id: "a3-10", arcId: "a3", numero: 10, titre: "Acte 10 - Guerres Latines", statut: "publie" },
    { id: "a3-11", arcId: "a3", numero: 11, titre: "Acte 11 - Pyrrhus", statut: "publie" },
    { id: "a3-12", arcId: "a3", numero: 12, titre: "Acte 12 - Roma Italica", statut: "publie" },
    { id: "a3-13", arcId: "a3", numero: 13, titre: "Acte 13 - Bercail", statut: "publie" },
    // --- Arc 4 : Carthago ---
    { id: "a4-1", arcId: "a4", numero: 1, titre: "Acte 1 - Les Racines", statut: "publie" },
    { id: "a4-2", arcId: "a4", numero: 2, titre: "Acte 2 - Guerre Punique", statut: "publie" },
    { id: "a4-3", arcId: "a4", numero: 3, titre: "Acte 3 - Le Géant et la Mer", statut: "publie" },
    { id: "a4-4", arcId: "a4", numero: 4, titre: "Acte 4 - Tunis", statut: "publie" },
    { id: "a4-5", arcId: "a4", numero: 5, titre: "Acte 5 - Regulus", statut: "publie" },
    { id: "a4-6", arcId: "a4", numero: 6, titre: "Acte 6 - Chiens Galeux", statut: "publie" },
    { id: "a4-7", arcId: "a4", numero: 7, titre: "Acte 7 - La Guerre des Mercenaires", statut: "publie" },
    { id: "a4-8", arcId: "a4", numero: 8, titre: "Acte 8 - Seul", statut: "publie" },
    { id: "a4-9", arcId: "a4", numero: 9, titre: "Acte 9 - Le Sénat", statut: "publie" },
    { id: "a4-10", arcId: "a4", numero: 10, titre: "Acte 10 - La Légion", statut: "publie" },
    { id: "a4-11", arcId: "a4", numero: 11, titre: "Acte 11 - Illyrie", statut: "publie" },
    // --- La Colonie ---
    { id: "colonie-1", arcId: "colonie", numero: 1, titre: "Acte 1 - La Préceptrice étrangère", statut: "redaction" },
    { id: "colonie-2", arcId: "colonie", numero: 2, titre: "Acte 2 - Première leçon", statut: "redaction" },
    { id: "colonie-3", arcId: "colonie", numero: 3, titre: "Acte 3 - Adelheid Stein", statut: "redaction" },
    { id: "colonie-4", arcId: "colonie", numero: 4, titre: "Acte 5 - Des Leçons et des Comptes", statut: "redaction" },
    { id: "colonie-5", arcId: "colonie", numero: 5, titre: "Acte 6 - L'attention d'une lettre", statut: "redaction" },
    { id: "colonie-6", arcId: "colonie", numero: 6, titre: "Acte 7 - Feu sur Vermillon", statut: "redaction" },
    { id: "colonie-7", arcId: "colonie", numero: 7, titre: "Acte 8 - Le Souffle du Guet-apens", statut: "redaction" },
    { id: "colonie-8", arcId: "colonie", numero: 8, titre: "Acte 9 - Sang et Opportunités", statut: "redaction" },
    { id: "colonie-9", arcId: "colonie", numero: 9, titre: "Acte 10 - L'Épreuve du Souverain", statut: "redaction" },
    { id: "colonie-10", arcId: "colonie", numero: 10, titre: "Acte 11 - Les Fruits de l'Éducation", statut: "redaction" },
    { id: "colonie-11", arcId: "colonie", numero: 11, titre: "Acte 12 - Projection d'une Enfance Corrompu", statut: "redaction" },
    { id: "colonie-12", arcId: "colonie", numero: 12, titre: "Acte 13 - L'Examen", statut: "redaction" },
    { id: "colonie-13", arcId: "colonie", numero: 13, titre: "Acte 14 - Le Prix d'une Faveur", statut: "redaction" },
    { id: "colonie-14", arcId: "colonie", numero: 14, titre: "Acte 15 - L'automne du Duc", statut: "redaction" },
    { id: "colonie-15", arcId: "colonie", numero: 15, titre: "Acte 16 - Confidences dangereuses", statut: "redaction" },
    { id: "colonie-16", arcId: "colonie", numero: 16, titre: "Acte 17 - Karl le Sénéchal", statut: "redaction" },
    { id: "colonie-17", arcId: "colonie", numero: 17, titre: "Acte 18 - La méthode la plus efficace que je connaisse", statut: "redaction" },
    { id: "colonie-18", arcId: "colonie", numero: 18, titre: "Acte 19 - La générosité étrangère", statut: "redaction" },
    { id: "colonie-19", arcId: "colonie", numero: 19, titre: "Acte 20 - Gloire Éphémère", statut: "redaction" },
    { id: "colonie-20", arcId: "colonie", numero: 20, titre: "Acte 21 - Huile Rouge et Noir", statut: "redaction" },
    { id: "colonie-21", arcId: "colonie", numero: 21, titre: "Acte 22 - Réalité Introspective", statut: "redaction" },
    { id: "colonie-22", arcId: "colonie", numero: 22, titre: "Acte 23 - Rencontre Nocturne", statut: "redaction" },
    { id: "colonie-23", arcId: "colonie", numero: 23, titre: "Acte 24 - Autant de Morts, plus de Sang.", statut: "redaction" },
    { id: "colonie-24", arcId: "colonie", numero: 24, titre: "Acte 25 - Le Massacre du Conseil", statut: "redaction" },
    { id: "colonie-25", arcId: "colonie", numero: 25, titre: "Acte 26 - Coercition", statut: "redaction" },
    { id: "colonie-26", arcId: "colonie", numero: 26, titre: "Acte 27 - L'Assaut", statut: "redaction" },
    { id: "colonie-27", arcId: "colonie", numero: 27, titre: "Acte 28 - L'Attente", statut: "redaction" },
    { id: "colonie-28", arcId: "colonie", numero: 28, titre: "Acte 29 - Les Derniers Chevaliers de Reyon", statut: "redaction" },
    { id: "colonie-29", arcId: "colonie", numero: 29, titre: "Acte 30 - Le Trophée", statut: "redaction" },
    // --- Arc Kofun ---
    { id: "kofun-1", arcId: "kofun", numero: 1, titre: "Acte I – La Naissance", statut: "redaction" },
    { id: "kofun-2", arcId: "kofun", numero: 2, titre: "Acte II – Wan", statut: "redaction" },
    { id: "kofun-3", arcId: "kofun", numero: 3, titre: "Acte III - La régente", statut: "redaction" },
    { id: "kofun-4", arcId: "kofun", numero: 4, titre: "Acte IV – Le fardeau", statut: "redaction" },
    { id: "kofun-5", arcId: "kofun", numero: 5, titre: "Acte V – Nouvelle déesse", statut: "redaction" },
    { id: "kofun-6", arcId: "kofun", numero: 6, titre: "Acte VI – Le prix du retard", statut: "redaction" },
    { id: "kofun-7", arcId: "kofun", numero: 7, titre: "Acte VII – Une sortie couvert de blanc", statut: "redaction" },
    { id: "kofun-8", arcId: "kofun", numero: 8, titre: "Acte VIII – La cité Yamatai", statut: "redaction" },
    { id: "kofun-9", arcId: "kofun", numero: 9, titre: "Acte IX - L'hiver Yamataï", statut: "redaction" },
    { id: "kofun-10", arcId: "kofun", numero: 10, titre: "Acte X – Le Festival", statut: "redaction" },
    { id: "kofun-11", arcId: "kofun", numero: 11, titre: "Acte XI – Une Offrande Inadaptée", statut: "redaction" },
    { id: "kofun-12", arcId: "kofun", numero: 12, titre: "Acte XII – Cruel", statut: "redaction" },

    // >>> AUTO-IMPORT ACTES <<<
    // Les actes importés sont insérés automatiquement ici. Ne pas supprimer.

];