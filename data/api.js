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