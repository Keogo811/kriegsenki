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