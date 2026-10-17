// ============================================================
// NAVIGATION PUBLIQUE + RECHERCHE
// ============================================================

(function () {
    if (document.getElementById('nav-public')) return;

    const HAUTEUR = 54;
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
            top: 0; left: 0; right: 0;
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
            font-size: 15px; letter-spacing: 4px; text-transform: uppercase;
            color: #c8bcb4; text-decoration: none;
            text-shadow: 0 0 14px rgba(200, 200, 220, 0.35);
            transition: color 0.2s ease, text-shadow 0.2s ease;
            flex-shrink: 0;
        }
        #nav-public .nav-logo:hover { color: #e0b0b8; text-shadow: 0 0 18px rgba(176, 24, 40, 0.55); }
        
        #nav-public .nav-centre {
            flex: 1;
            display: flex;
            justify-content: center;
            padding: 0 20px;
            position: relative;
        }
        #nav-search {
            width: 100%; max-width: 300px;
            padding: 6px 12px;
            background: rgba(17, 12, 22, 0.7);
            border: 1px solid rgba(168, 168, 184, 0.2);
            border-radius: 999px;
            color: #cdc2b8;
            font-family: Georgia, serif;
            font-size: 13px;
            outline: none;
            transition: border-color 0.2s ease;
        }
        #nav-search:focus { border-color: rgba(176, 24, 40, 0.6); }
        #nav-search::placeholder { color: #807f8c; font-style: italic; }

        #nav-search-results {
            position: absolute;
            top: 38px; left: 50%;
            transform: translateX(-50%);
            width: 100%; max-width: 320px;
            background: #1c1624;
            border: 1px solid rgba(168, 168, 184, 0.3);
            border-radius: 6px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            display: none;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
        }
        #nav-search-results.visible { display: block; }
        
        .search-cat {
            padding: 8px 14px 4px;
            font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
            color: #8a8088; border-bottom: 1px solid rgba(168,168,184,0.1);
        }
        .search-item {
            display: block; padding: 10px 14px;
            color: #cdc2b8; text-decoration: none;
            font-size: 14px; border-bottom: 1px solid rgba(168,168,184,0.08);
            transition: background 0.2s ease;
        }
        .search-item:last-child { border-bottom: none; }
        .search-item:hover { background: rgba(140, 26, 40, 0.15); color: #e0b0b8; }
        .search-vide { padding: 16px; text-align: center; color: #8a8088; font-size: 13px; font-style: italic; }

        #nav-public .nav-links {
            display: flex; gap: 6px; flex-shrink: 0;
        }
        #nav-public .nav-links a {
            display: inline-block; padding: 7px 14px;
            color: #a8a8b8; text-decoration: none;
            font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
            border: 1px solid transparent; border-radius: 3px;
            transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        #nav-public .nav-links a:hover { color: #b01828; border-color: rgba(176, 24, 40, 0.4); }
        #nav-public .nav-links a.actif {
            color: #e0b0b8; border-color: rgba(176, 24, 40, 0.55);
            background: rgba(140, 26, 40, 0.12);
        }

        body { padding-top: ${HAUTEUR}px !important; }
        .mirror-top { top: ${HAUTEUR}px !important; }

        @media (max-width: 800px) {
            #nav-public { padding: 0 10px; }
            #nav-public .nav-logo { font-size: 12px; letter-spacing: 2px; }
            #nav-public .nav-links a { padding: 6px 8px; font-size: 10px; letter-spacing: 1px; }
            #nav-public .nav-centre { padding: 0 10px; }
            #nav-search { padding: 5px 10px; font-size: 12px; }
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

    const centre = document.createElement('div');
    centre.className = 'nav-centre';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'nav-search';
    input.placeholder = 'Rechercher un arc, un acte...';
    input.autocomplete = 'off';
    centre.appendChild(input);

    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'nav-search-results';
    centre.appendChild(resultsDiv);
    
    nav.appendChild(centre);

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

    document.body.insertBefore(nav, document.body.firstChild);

    // ---- Logique de recherche ----
    let timer = null;

    input.addEventListener('input', function () {
        clearTimeout(timer);
        const q = this.value.trim();
        
        if (q.length < 2) {
            resultsDiv.classList.remove('visible');
            resultsDiv.innerHTML = '';
            return;
        }

        timer = setTimeout(async function () {
            try {
                const res = await rechercherGlobalement(q);
                resultsDiv.innerHTML = '';
                
                if (res.arcs.length === 0 && res.actes.length === 0) {
                    resultsDiv.innerHTML = '<div class="search-vide">Aucun résultat.</div>';
                } else {
                    if (res.arcs.length > 0) {
                        const catA = document.createElement('div'); catA.className = 'search-cat'; catA.textContent = 'Arcs'; resultsDiv.appendChild(catA);
                        res.arcs.forEach(function (a) {
                            const link = document.createElement('a');
                            link.className = 'search-item';
                            link.href = 'arc.html#' + a.id;
                            link.textContent = a.titre;
                            resultsDiv.appendChild(link);
                        });
                    }
                    if (res.actes.length > 0) {
                        const catB = document.createElement('div'); catB.className = 'search-cat'; catB.textContent = 'Actes'; resultsDiv.appendChild(catB);
                        res.actes.forEach(function (a) {
                            const link = document.createElement('a');
                            link.className = 'search-item';
                            link.href = 'acte.html#' + a.id;
                            link.textContent = a.titre;
                            resultsDiv.appendChild(link);
                        });
                    }
                }
                resultsDiv.classList.add('visible');
            } catch (err) {
                console.error(err);
            }
        }, 300); // Anti-rebond de 300ms
    });

    // Fermer si on clique ailleurs
    document.addEventListener('click', function (e) {
        if (!centre.contains(e.target)) {
            resultsDiv.classList.remove('visible');
        }
    });

    // Réouvrir si on clique dans le champ alors qu'il y a déjà du texte
    input.addEventListener('focus', function() {
        if (this.value.trim().length >= 2 && resultsDiv.innerHTML !== '') {
            resultsDiv.classList.add('visible');
        }
    });
})();