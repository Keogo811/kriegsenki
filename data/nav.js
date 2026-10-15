// ============================================================
// NAVIGATION PUBLIQUE
// ------------------------------------------------------------
// Injecte un header commun en haut des pages publiques.
// Ne s'applique PAS aux pages admin (qui n'incluent pas ce script).
// ============================================================

(function () {
    // Sécurité : ne pas injecter deux fois
    if (document.getElementById('nav-public')) return;

    const HAUTEUR = 54;

    // Détermine la page courante
    const path = window.location.pathname.split('/').pop() || 'index.html';

    const liens = [
        { href: 'index.html', label: 'Accueil' },
        { href: 'univers.html', label: 'Univers' }
    ];

    // ---- CSS ----
    const style = document.createElement('style');
    style.textContent = `
        #nav-public {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: ${HAUTEUR}px;
            z-index: 900;
            background: rgba(28, 22, 36, 0.92);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-bottom: 1px solid rgba(168, 168, 184, 0.22);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            font-family: Georgia, 'Times New Roman', serif;
        }
        #nav-public .nav-logo {
            font-size: 15px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #c8bcb4;
            text-decoration: none;
            text-shadow: 0 0 14px rgba(200, 200, 220, 0.35);
            transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        #nav-public .nav-logo:hover {
            color: #e0b0b8;
            text-shadow: 0 0 18px rgba(176, 24, 40, 0.55);
        }
        #nav-public .nav-links {
            display: flex;
            gap: 6px;
        }
        #nav-public .nav-links a {
            display: inline-block;
            padding: 7px 14px;
            color: #a8a8b8;
            text-decoration: none;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            border: 1px solid transparent;
            border-radius: 3px;
            transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        #nav-public .nav-links a:hover {
            color: #b01828;
            border-color: rgba(176, 24, 40, 0.4);
        }
        #nav-public .nav-links a.actif {
            color: #e0b0b8;
            border-color: rgba(176, 24, 40, 0.55);
            background: rgba(140, 26, 40, 0.12);
        }

        /* Décalage du body pour ne pas cacher le contenu sous le header */
        body { padding-top: ${HAUTEUR}px !important; }

        /* Décale le bandeau miroir de univers.html */
        .mirror-top { top: ${HAUTEUR}px !important; }

        @media (max-width: 800px) {
            #nav-public { padding: 0 14px; }
            #nav-public .nav-logo { font-size: 13px; letter-spacing: 3px; }
            #nav-public .nav-links a { padding: 6px 10px; font-size: 11px; letter-spacing: 1px; }
        }
    `;
    document.head.appendChild(style);

    // ---- HTML ----
    const nav = document.createElement('div');
    nav.id = 'nav-public';

    const logo = document.createElement('a');
    logo.className = 'nav-logo';
    logo.href = 'index.html';
    logo.textContent = 'Krieg Senki';
    nav.appendChild(logo);

    const linksDiv = document.createElement('div');
    linksDiv.className = 'nav-links';

    liens.forEach(function (l) {
        const a = document.createElement('a');
        a.href = l.href;
        a.textContent = l.label;
        if (path === l.href || (path === '' && l.href === 'index.html')) {
            a.classList.add('actif');
        }
        linksDiv.appendChild(a);
    });

    nav.appendChild(linksDiv);

    // Insère en premier dans le body
    document.body.insertBefore(nav, document.body.firstChild);
})();