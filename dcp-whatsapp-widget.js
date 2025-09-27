/**
 * Divisional Commissioner Pune - AI WhatsApp Side-Rail Widget
 * Version: 4.1.0 (SideRail Layout)
 * Date: 2025-09-27
 * Author: soft00null
 * Company: WoW-Strategies Private Limited
 * 
 * Layout:
 *  ┌─────────────── Greeting Bubble (auto show/hide)
 *  │   (Speech style)
 *  │
 *  │  [ About        ]
 *  │  [ Services     ]
 *  │  [ Schemes      ]
 *  │  [ Contact      ]
 *  │  [ Show QR ▼ ]  (toggle)
 *  │  ┌──────────── QR Card (optional)
 *  │  │  QR + caption
 *  │  └────────────
 *  │  Powered by (slim bar)
 *  ●  Floating circular AI button (with pulse + badge)
 *
 * Professional, WhatsApp-inspired green palette with subtle India accent (saffron highlight)
 */

(function() {
    'use strict';

    if (window.DCPuneSideRailWidget) {
        console.warn('DCPuneSideRailWidget already initialized');
        return;
    }

    const config = {
        phoneNumber: '919226556203',
        baseMessage: 'Hello! I need assistance from Divisional Commissioner Pune.',
        position: 'right',            // 'right' or 'left'
        autoGreetingDelay: 2200,
        autoHideGreetingAfter: 14000, // ms (set to 0 to keep)
        showQRByDefault: false,
        primaryColor: '#25D366',
        primaryDark: '#075E54',
        accentColor: '#FF8C32',       // subtle saffron accent
        pillTextColor: '#123427',
        gradient: 'linear-gradient(135deg,#25D366,#128C7E)',
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        },
        menuItems: [
            { key: 'about',   label: 'About',    emoji: 'ℹ️',  message: 'Please share information About the Divisional Commissioner Pune office.' },
            { key: 'services',label: 'Services', emoji: '🛠️',  message: 'List key citizen Services available.' },
            { key: 'schemes', label: 'Schemes',  emoji: '📑',  message: 'Provide government Schemes overview with eligibility.' },
            { key: 'contact', label: 'Contact',  emoji: '☎️',  message: 'Share Contact details and official communication channels.' }
        ],
        qr: {
            // Dynamic on-the-fly generation (no external script dependency)
            size: 200,
            api: 'https://api.qrserver.com/v1/create-qr-code/?size={size}x{size}&data={url}'
        },
        accessibility: true
    };

    const utils = {
        waUrl: (text) => `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(text)}`,
        buildQRUrl: (msg) => {
            const url = utils.waUrl(msg);
            return config.qr.api
                .replace(/\{size\}/g, String(config.qr.size))
                .replace('{url}', encodeURIComponent(url));
        },
        createEl: (tag, cls, html) => {
            const el = document.createElement(tag);
            if (cls) el.className = cls;
            if (html) el.innerHTML = html;
            return el;
        },
        prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    function injectStyles() {
        if (document.getElementById('dc-pune-side-rail-styles')) return;

        const css = `
        .dcpune-rail-wrapper {
            position: fixed;
            bottom: 16px;
            ${config.position}: 16px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: flex-${config.position === 'right' ? 'end' : 'start'};
            gap: 12px;
            font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
            color:#1d1d1d;
            pointer-events: none; /* child elements re-enable */
        }

        .dcpune-greeting {
            max-width: 320px;
            background: #ffffffcc;
            backdrop-filter: blur(6px);
            border: 1px solid #e3e8ec;
            box-shadow: 0 6px 24px -4px rgba(0,0,0,0.15);
            border-radius: 18px;
            padding: 14px 16px 14px 50px;
            position: relative;
            font-size: 13px;
            line-height: 1.4;
            pointer-events: auto;
            opacity: 0;
            transform: translateY(10px) scale(.96);
            transition: all .5s cubic-bezier(.4,0,.2,1);
        }
        .dcpune-greeting.dcpune-show {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        .dcpune-greeting:after {
            content:'';
            position:absolute;
            bottom:-6px;
            ${config.position}:34px;
            width:14px;
            height:14px;
            background:#ffffffcc;
            border:1px solid #e3e8ec;
            border-left:none;
            border-top:none;
            transform: rotate(45deg);
            border-radius: 2px;
            backdrop-filter: inherit;
        }
        .dcpune-greeting-avatar {
            position:absolute;
            top:10px;
            left:12px;
            width:32px;
            height:32px;
            background:${config.gradient};
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#fff;
            font-size:16px;
            font-weight:600;
            box-shadow:0 2px 6px rgba(0,0,0,.25);
        }
        .dcpune-greeting-close {
            position:absolute;
            top:6px;
            right:6px;
            width:22px;
            height:22px;
            border-radius:50%;
            background:#f0f2f5;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            font-size:12px;
            color:#555;
            transition: background .25s;
        }
        .dcpune-greeting-close:hover { background:#e1e4e7; }

        /* Vertical Rail (menu + qr + footer) */
        .dcpune-rail {
            display:flex;
            flex-direction:column;
            align-items:${config.position === 'right' ? 'flex-end' : 'flex-start'};
            gap:10px;
            pointer-events:auto;
            position:relative;
            width: max-content;
        }

        .dcpune-menu-group {
            display:flex;
            flex-direction:column;
            align-items:${config.position === 'right' ? 'flex-end' : 'flex-start'};
            gap:10px;
        }

        .dcpune-pill {
            font-size:13px;
            font-weight:500;
            background:#fff;
            color:${config.pillTextColor};
            padding:10px 18px;
            border:2px solid #d3dae0;
            border-radius:999px;
            cursor:pointer;
            position:relative;
            display:inline-flex;
            align-items:center;
            gap:6px;
            box-shadow:0 3px 10px -2px rgba(0,0,0,0.12);
            backdrop-filter: blur(4px);
            transition: all .25s;
            overflow:hidden;
        }
        .dcpune-pill:before {
            content:'';
            position:absolute;
            inset:0;
            background:linear-gradient(120deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.5) 45%,rgba(255,255,255,0) 90%);
            transform:translateX(-100%);
        }
        .dcpune-pill:hover {
            border-color:${config.primaryColor};
            color:#063f30;
            transform:translateY(-2px);
            box-shadow:0 6px 18px -4px rgba(0,0,0,0.18);
        }
        .dcpune-pill:hover:before {
            animation: dcpuneShine 1.4s ease;
        }
        @keyframes dcpuneShine {
            to { transform:translateX(100%); }
        }

        .dcpune-pill-accent {
            border-color:${config.accentColor};
            color:#4a2d07;
        }
        .dcpune-pill-toggle {
            font-size:12px;
            padding:8px 16px;
            background:#f5f7f9;
        }

        /* QR Card */
        .dcpune-qr-card {
            width:200px;
            background:#ffffffd9;
            backdrop-filter:blur(8px);
            border:1px solid #e2e6ea;
            border-radius:18px;
            padding:14px 16px 18px;
            box-shadow:0 10px 32px -8px rgba(0,0,0,.25);
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:10px;
            position:relative;
            transform-origin: bottom ${config.position};
            transform:scale(.9) translateY(10px);
            opacity:0;
            pointer-events:none;
            transition: all .4s cubic-bezier(.4,0,.2,1);
        }
        .dcpune-qr-card.dcpune-show {
            opacity:1;
            transform:scale(1) translateY(0);
            pointer-events:auto;
        }
        .dcpune-qr-card img {
            width:140px;
            height:140px;
            border-radius:12px;
            border:2px solid #cfd6dc;
            background:#fff;
        }
        .dcpune-qr-caption {
            font-size:11px;
            color:#4c5a61;
            text-align:center;
            line-height:1.3;
        }
        .dcpune-qr-open {
            font-size:11px;
            padding:5px 10px;
            border-radius:999px;
            background:${config.gradient};
            color:#fff;
            text-decoration:none;
            font-weight:500;
            box-shadow:0 2px 6px rgba(0,0,0,.25);
            transition: background .3s;
        }
        .dcpune-qr-open:hover {
            filter:brightness(1.1);
        }

        /* Powered By Bar */
        .dcpune-powered {
            background:#ffffffd0;
            backdrop-filter:blur(6px);
            border:1px solid #e2e6ea;
            border-radius:14px;
            padding:4px 10px 4px 12px;
            font-size:11px;
            color:#546168;
            display:flex;
            align-items:center;
            gap:6px;
            max-width:185px;
            cursor:pointer;
            text-decoration:none;
            line-height:1.2;
            box-shadow:0 4px 14px -4px rgba(0,0,0,0.18);
            transition: all .25s;
        }
        .dcpune-powered:hover {
            color:${config.primaryDark};
            border-color:${config.primaryColor};
            transform:translateY(-2px);
        }
        .dcpune-powered svg { flex-shrink:0; }

        /* Floating Button */
        .dcpune-fab {
            width:58px;
            height:58px;
            border-radius:50%;
            background:${config.gradient};
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            box-shadow:0 8px 26px -6px rgba(0,0,0,.35),0 4px 10px -2px rgba(0,0,0,.2);
            position:relative;
            pointer-events:auto;
            transition: all .4s cubic-bezier(.4,0,.2,1);
        }
        .dcpune-fab:hover { transform:scale(1.08) rotate(4deg); }

        .dcpune-fab-badge {
            position:absolute;
            top:-4px;
            right:-4px;
            width:22px;
            height:22px;
            font-size:10px;
            font-weight:700;
            background:linear-gradient(135deg,#ff4b4b,#d90000);
            color:#fff;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            border:2px solid #fff;
            box-shadow:0 2px 6px rgba(0,0,0,.3);
            animation:dcpunePulse 2s infinite;
        }
        @keyframes dcpunePulse {
            0%,100% { transform:scale(1); box-shadow:0 0 0 0 rgba(255,75,75,0.55); }
            50% { transform:scale(1.15); box-shadow:0 0 0 8px rgba(255,75,75,0); }
        }

        /* Focus ring */
        .dcpune-pill:focus-visible,
        .dcpune-fab:focus-visible,
        .dcpune-greeting-close:focus-visible,
        .dcpune-qr-open:focus-visible,
        .dcpune-powered:focus-visible {
            outline:3px solid #9adab7;
            outline-offset:2px;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce){
            .dcpune-fab,
            .dcpune-pill,
            .dcpune-greeting,
            .dcpune-qr-card { transition:none !important; animation:none !important; }
        }

        @media (max-width:640px){
            .dcpune-greeting { max-width:260px; }
            .dcpune-qr-card { width:180px; }
            .dcpune-qr-card img { width:120px;height:120px; }
        }
        @media print { .dcpune-rail-wrapper { display:none !important; } }
        `;
        const style = document.createElement('style');
        style.id = 'dc-pune-side-rail-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function buildWidget() {
        injectStyles();

        const wrap = utils.createEl('div','dcpune-rail-wrapper');
        wrap.setAttribute('role','complementary');
        wrap.setAttribute('aria-label','Divisional Commissioner Pune AI WhatsApp Assistant');

        // Greeting
        const greeting = utils.createEl('div','dcpune-greeting');
        greeting.innerHTML = `
            <div class="dcpune-greeting-avatar" aria-hidden="true">AI</div>
            <div class="dcpune-greeting-close" role="button" tabindex="0" aria-label="Close greeting">&times;</div>
            <div style="font-weight:600;margin-bottom:4px;color:${config.primaryDark}">Hello! 👋</div>
            <div>I'm the AI Assistant for <strong>Divisional Commissioner Pune</strong>. Tap a menu option or open WhatsApp to begin.</div>
        `;
        wrap.appendChild(greeting);

        // Rail
        const rail = utils.createEl('div','dcpune-rail');

        // Menu group
        const menuGroup = utils.createEl('div','dcpune-menu-group');

        config.menuItems.forEach(item => {
            const pill = utils.createEl('button','dcpune-pill');
            pill.type = 'button';
            pill.setAttribute('data-key', item.key);
            pill.innerHTML = `<span>${item.emoji}</span><span>${item.label}</span>`;
            pill.addEventListener('click', () => openWhatsApp(item.message));
            menuGroup.appendChild(pill);
        });

        // Toggle QR pill
        const togglePill = utils.createEl('button','dcpune-pill dcpune-pill-toggle');
        togglePill.type = 'button';
        togglePill.setAttribute('aria-expanded', String(config.showQRByDefault));
        togglePill.innerHTML = `Show QR ▼`;
        menuGroup.appendChild(togglePill);

        // QR Card
        const qrCard = utils.createEl('div','dcpune-qr-card');
        if (config.showQRByDefault) qrCard.classList.add('dcpune-show');
        const qrImg = new Image();
        qrImg.alt = 'WhatsApp QR Code';
        qrImg.decoding = 'async';
        qrImg.loading = 'lazy';
        qrImg.src = utils.buildQRUrl(config.baseMessage);
        const qrCaption = utils.createEl('div','dcpune-qr-caption',`
            <strong>Scan to Chat</strong><br/>Open in WhatsApp on your phone.
        `);
        const qrOpen = utils.createEl('a','dcpune-qr-open','Open Chat');
        qrOpen.href = utils.waUrl(config.baseMessage);
        qrOpen.target = '_blank';
        qrOpen.rel = 'noopener noreferrer';
        qrCard.appendChild(qrImg);
        qrCard.appendChild(qrCaption);
        qrCard.appendChild(qrOpen);

        // Powered by
        const powered = utils.createEl('a','dcpune-powered',`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${config.primaryColor}" aria-hidden="true">
                <path d="M11 2v9H2v2h9v9h2v-9h9v-2h-9V2z"/>
            </svg>
            <span>${config.poweredBy.text}</span>
        `);
        powered.href = config.poweredBy.url; powered.target='_blank'; powered.rel='noopener noreferrer';

        // FAB
        const fab = utils.createEl('button','dcpune-fab');
        fab.type = 'button';
        fab.setAttribute('aria-label','Open WhatsApp AI Assistant');
        fab.innerHTML = `
            <div class="dcpune-fab-badge">AI</div>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
        `;

        // Append hierarchy
        rail.appendChild(menuGroup);
        rail.appendChild(qrCard);
        rail.appendChild(powered);
        rail.appendChild(fab);
        wrap.appendChild(rail);
        document.body.appendChild(wrap);

        // Event wiring
        greeting.querySelector('.dcpune-greeting-close')
            .addEventListener('click', () => hideGreeting());

        greeting.querySelector('.dcpune-greeting-close')
            .addEventListener('keydown', e => { if (e.key==='Enter' || e.key===' ') { e.preventDefault(); hideGreeting(); }});

        togglePill.addEventListener('click', () => {
            const showing = qrCard.classList.toggle('dcpune-show');
            togglePill.setAttribute('aria-expanded', String(showing));
            togglePill.innerHTML = showing ? 'Hide QR ▲' : 'Show QR ▼';
        });

        fab.addEventListener('click', () => openWhatsApp(config.baseMessage));

        // Keyboard open (Enter/Space)
        fab.addEventListener('keydown', e => {
            if (e.key==='Enter' || e.key===' ') { e.preventDefault(); openWhatsApp(config.baseMessage); }
        });

        // Auto greeting
        setTimeout(() => showGreeting(), config.autoGreetingDelay);
        if (config.autoHideGreetingAfter > 0) {
            setTimeout(() => hideGreeting(), config.autoGreetingDelay + config.autoHideGreetingAfter);
        }

        console.log('✅ DCPuneSideRailWidget initialized (v4.1.0 SideRail)');
    }

    function showGreeting() {
        const g = document.querySelector('.dcpune-greeting');
        if (!g) return;
        g.classList.add('dcpune-show');
    }

    function hideGreeting() {
        const g = document.querySelector('.dcpune-greeting');
        if (!g) return;
        g.classList.remove('dcpune-show');
    }

    function openWhatsApp(message) {
        window.open(utils.waUrl(message || config.baseMessage), '_blank', 'noopener');
    }

    // Public API
    window.DCPuneSideRailWidget = {
        version: '4.1.0',
        config,
        openWhatsApp,
        showGreeting,
        hideGreeting,
        toggleQR: () => {
            const qr = document.querySelector('.dcpune-qr-card');
            const toggle = document.querySelector('.dcpune-pill-toggle');
            if (!qr || !toggle) return;
            const visible = qr.classList.toggle('dcpune-show');
            toggle.innerHTML = visible ? 'Hide QR ▲' : 'Show QR ▼';
            toggle.setAttribute('aria-expanded', String(visible));
        },
        refreshQR: () => {
            const img = document.querySelector('.dcpune-qr-card img');
            if (img) img.src = utils.buildQRUrl(config.baseMessage) + '&_=' + Date.now();
        }
    };

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildWidget);
    } else {
        buildWidget();
    }

})();
