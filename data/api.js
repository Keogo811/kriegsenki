// ============================================================
// API — Accès aux données Supabase
// ------------------------------------------------------------
// Fournit des fonctions simples pour lire les arcs et les actes.
// ============================================================

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function chargerArcs() {
    // Public : on exclut les brouillons
    const { data, error } = await sb
        .from('arcs')
        .select('*')
        .neq('statut', 'brouillon')
        .order('ordre', { ascending: true })
        .order('created_at', { ascending: true });
    if (error) {
        console.error("Erreur chargerArcs :", error);
        throw error;
    }
    return data;
}

async function chargerArc(id) {
    const { data, error } = await sb
        .from('arcs')
        .select('*')
        .eq('id', id)
        .maybeSingle();
    if (error) {
        console.error("Erreur chargerArc :", error);
        throw error;
    }
    return data;
}

async function chargerActesParArc(arcId) {
    // Public : on exclut les brouillons
    const { data, error } = await sb
        .from('actes')
        .select('*')
        .eq('arc_id', arcId)
        .neq('statut', 'brouillon')
        .order('numero', { ascending: true });
    if (error) {
        console.error("Erreur chargerActesParArc :", error);
        throw error;
    }
    return data;
}

// Version admin, sans filtre (utilisée par le dashboard)
async function chargerActesParArcTous(arcId) {
    const { data, error } = await sb
        .from('actes')
        .select('*')
        .eq('arc_id', arcId)
        .order('numero', { ascending: true });
    if (error) {
        console.error("Erreur chargerActesParArcTous :", error);
        throw error;
    }
    return data;
}

async function chargerActe(id) {
    const { data, error } = await sb
        .from('actes')
        .select('*')
        .eq('id', id)
        .maybeSingle();
    if (error) {
        console.error("Erreur chargerActe :", error);
        throw error;
    }
    return data;
}

async function chargerActesDuMemeArc(arcId) {
    return chargerActesParArc(arcId);
}

async function chargerArcsTous() {
    const { data, error } = await sb
        .from('arcs')
        .select('*')
        .order('ordre', { ascending: true })
        .order('created_at', { ascending: true });
    if (error) {
        console.error("Erreur chargerArcsTous :", error);
        throw error;
    }
    return data;
}


// --- Boîtes ---

async function chargerBoites() {
    const { data, error } = await sb
        .from('boites')
        .select('*')
        .order('ordre', { ascending: true })
        .order('created_at', { ascending: true });
    if (error) { console.error("Erreur chargerBoites :", error); throw error; }
    return data;
}

async function creerBoite(nom) {
    const id = "b-" + Date.now().toString(36);
    const { data, error } = await sb
        .from('boites')
        .insert({ id: id, nom: nom, ordre: 0 })
        .select()
        .single();
    if (error) { console.error("Erreur creerBoite :", error); throw error; }
    return data;
}

async function renommerBoite(id, nouveauNom) {
    const { error } = await sb
        .from('boites')
        .update({ nom: nouveauNom })
        .eq('id', id);
    if (error) { console.error("Erreur renommerBoite :", error); throw error; }
}

async function supprimerBoite(id) {
    const { error } = await sb
        .from('boites')
        .delete()
        .eq('id', id);
    if (error) { console.error("Erreur supprimerBoite :", error); throw error; }
}

async function changerBoiteArc(arcId, boiteId) {
    const { error } = await sb
        .from('arcs')
        .update({ boite_id: boiteId })
        .eq('id', arcId);
    if (error) { console.error("Erreur changerBoiteArc :", error); throw error; }
}


async function modifierActe(id, champs) {
    const { data, error } = await sb
        .from('actes')
        .update(champs)
        .eq('id', id)
        .select()
        .single();
    if (error) { console.error("Erreur modifierActe :", error); throw error; }
    return data;
}

async function modifierArc(id, champs) {
    const { data, error } = await sb
        .from('arcs')
        .update(champs)
        .eq('id', id)
        .select()
        .single();
    if (error) { console.error("Erreur modifierArc :", error); throw error; }
    return data;
}


// --- Réordonnancement ---

async function echangerOrdreArcs(arcA, arcB) {
    // Échange les "ordre" des deux arcs
    const ordreA = arcA.ordre || 0;
    const ordreB = arcB.ordre || 0;

    // Si les deux ont le même ordre (cas par défaut = 0), on force des valeurs
    let newA = ordreB;
    let newB = ordreA;
    if (newA === newB) {
        // On donne à B l'ordre de A moins un pour qu'il passe devant
        newA = ordreB - 1;
        newB = ordreA + 1;
    }

    const { error: errA } = await sb
        .from('arcs')
        .update({ ordre: newA })
        .eq('id', arcA.id);
    if (errA) throw errA;

    const { error: errB } = await sb
        .from('arcs')
        .update({ ordre: newB })
        .eq('id', arcB.id);
    if (errB) throw errB;
}

async function echangerNumeroActes(acteA, acteB) {
    const numA = acteA.numero;
    const numB = acteB.numero;

    // Éviter un conflit temporaire de clé primaire si on avait une contrainte
    // (pas le cas ici, mais on procède en deux temps par précaution)
    const { error: errA } = await sb
        .from('actes')
        .update({ numero: -1 })
        .eq('id', acteA.id);
    if (errA) throw errA;

    const { error: errB } = await sb
        .from('actes')
        .update({ numero: numA })
        .eq('id', acteB.id);
    if (errB) throw errB;

    const { error: errA2 } = await sb
        .from('actes')
        .update({ numero: numB })
        .eq('id', acteA.id);
    if (errA2) throw errA2;
}


async function creerArc(champs) {
    // Génère un id unique simple si non fourni
    if (!champs.id) {
        champs.id = "arc-" + Date.now().toString(36);
    }
    if (champs.ordre === undefined) {
        champs.ordre = 0;
    }
    const { data, error } = await sb
        .from('arcs')
        .insert(champs)
        .select()
        .single();
    if (error) { console.error("Erreur creerArc :", error); throw error; }
    return data;
}

async function supprimerArc(id) {
    const { error } = await sb
        .from('arcs')
        .delete()
        .eq('id', id);
    if (error) { console.error("Erreur supprimerArc :", error); throw error; }
}

async function creerActe(champs) {
    if (!champs.id) {
        champs.id = "acte-" + Date.now().toString(36);
    }
    if (champs.contenu === undefined) champs.contenu = "";
    const { data, error } = await sb
        .from('actes')
        .insert(champs)
        .select()
        .single();
    if (error) { console.error("Erreur creerActe :", error); throw error; }
    return data;
}

async function supprimerActe(id) {
    const { error } = await sb
        .from('actes')
        .delete()
        .eq('id', id);
    if (error) { console.error("Erreur supprimerActe :", error); throw error; }
}

async function prochainNumeroActe(arcId) {
    const { data, error } = await sb
        .from('actes')
        .select('numero')
        .eq('arc_id', arcId)
        .order('numero', { ascending: false })
        .limit(1);
    if (error) { console.error("Erreur prochainNumeroActe :", error); throw error; }
    if (!data || data.length === 0) return 1;
    return (data[0].numero || 0) + 1;
}

async function chargerArcsPourArbre() {
    const { data, error } = await sb
        .from('arcs')
        .select('id, titre, parent_id, statut, ordre, date_univers, lieu, themes, tags')
        .neq('statut', 'brouillon')
        .order('ordre', { ascending: true })
        .order('created_at', { ascending: true });
    if (error) { console.error("Erreur chargerArcsPourArbre :", error); throw error; }
    return data;
}

async function rechercherGlobalement(texte) {
    if (!texte || texte.trim().length < 2) {
        return { arcs: [], actes: [] };
    }
    
    const q = '%' + texte.trim() + '%';
    
    // On cherche dans les arcs (titre, description)
    const reqArcs = sb
        .from('arcs')
        .select('id, titre, description')
        .neq('statut', 'brouillon')
        .ilike('titre', q)
        .limit(5);

    // On cherche dans les actes (titre)
    const reqActes = sb
        .from('actes')
        .select('id, titre, arc_id')
        .neq('statut', 'brouillon')
        .ilike('titre', q)
        .limit(8);

    const [resArcs, resActes] = await Promise.all([reqArcs, reqActes]);

    return {
        arcs: resArcs.data || [],
        actes: resActes.data || []
    };
}

// --- Commentaires ---

async function chargerCommentaires(acteId) {
    const { data, error } = await sb
        .from('commentaires')
        .select('*')
        .eq('acte_id', acteId)
        .order('created_at', { ascending: true });
    if (error) { console.error("Erreur chargerCommentaires :", error); throw error; }
    return data;
}

async function ajouterCommentaire(acteId, contenu) {
    const { data, error } = await sb
        .from('commentaires')
        .insert([{
            acte_id: acteId,
            contenu: contenu,
            statut: 'en_attente'
        }])
        .select()
        .single();
    if (error) { console.error("Erreur ajouterCommentaire :", error); throw error; }
    return data;
}