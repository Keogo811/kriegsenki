// ============================================================
// API — Accès aux données Supabase
// ------------------------------------------------------------
// Fournit des fonctions simples pour lire les arcs et les actes.
// ============================================================

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function chargerArcs() {
    const { data, error } = await sb
        .from('arcs')
        .select('*')
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
    const { data, error } = await sb
        .from('actes')
        .select('*')
        .eq('arc_id', arcId)
        .order('numero', { ascending: true });
    if (error) {
        console.error("Erreur chargerActesParArc :", error);
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