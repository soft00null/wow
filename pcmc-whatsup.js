/* 
 PCMC Municipal Corporation – Minimalistic Government AI WhatsApp Widget
 Version: 1.0.0
 Author: WoW-Strategies Private Limited
 Description:
   Ultra–light, modern, glass / transparent floating AI helper with quick service buttons:
   Information, My Properties, Grievance, Schemes, CFC, Help.
   - Minimal footprint (< ~15KB unminified)
   - Accessible (ARIA / keyboard)
   - LocalStorage hint logic
   - Configurable through global init or <script data-* attributes>
   - Optional QR code show/hide (persisting preference)
   - Auto-injects styles (no global CSS pollution; namespaced)
   - Graceful WhatsApp fallback (new tab)
   - Emphasis on AI helper context (government digital governance)
   - Mobile responsive & reduced motion aware
 HOW TO USE:
   <script src="https://wow-strategies.com/pcmc-whatsup.js"
           data-phone="918888006666"
           data-title="PCMC AI Assistant"
           data-theme="#1e3a8a"
           data-position="right"
           data-lang="en"
           data-hint="true"
           defer></script>
   OR programmatic:
     window.PCMCChatbot.init({ phone: '918888006666', ... })
*/

(function() {
  'use strict';

  // Prevent multiple injections
  if (window.__PCMC_WIDGET_LOADED__) return;
  window.__PCMC_WIDGET_LOADED__ = true;

  // Default configuration
  const DEFAULTS = {
    phone: '918888006666',
    title: 'PCMC AI Assistant',
    subtitle: 'Smart Civic Services 24×7',
    welcome: 'Hi! I\'m your PCMC AI assistant. I can guide you with municipal services instantly. How can I help?',
    position: 'right', // 'right' or 'left'
    theme: '#1e3a8a',
    accent: '#3b82f6',
    lang: 'en',
    showHintOnLoad: true,
    hintDelay: 2500,
    qr: true,
    openInitially: true,
    whatsappTextPrefix: 'Hello PCMC, I need help with: ',
    services: [
      { id: 'information', label: 'Information', message: 'General Information' },
      { id: 'properties', label: 'My Properties', message: 'Property / Property Tax' },
      { id: 'grievance', label: 'Grievance', message: 'Lodge / Track Grievance' },
      { id: 'schemes', label: 'Schemes', message: 'Government Schemes' },
      { id: 'cfc', label: 'CFC', message: 'Citizen Facilitation Center' },
      { id: 'help', label: 'Help', message: 'Need Assistance' }
    ],
    poweredByName: 'WoW-Strategies Private Limited',
    poweredByUrl: 'https://wow-strategies.com/',
    storageKey: 'pcmc_ai_widget_v1'
  };

  // Utility helpers
  const u = {
    qs: (sel, ctx=document) => ctx.querySelector(sel),
    qsa: (sel, ctx=document) => [...ctx.querySelectorAll(sel)],
    ce: (tag, cls, html) => {
      const el = document.createElement(tag);
      if (cls) el.className = cls;
      if (html) el.innerHTML = html;
      return el;
    },
    encode: (s) => encodeURIComponent(s),
    merge: (a, b) => Object.assign({}, a, b),
    getScriptConfig: () => {
      const self = [...document.getElementsByTagName('script')].pop();
      if (!self) return {};
      const d = self.dataset || {};
      return {
        phone: d.phone,
        title: d.title,
        subtitle: d.subtitle,
        welcome: d.welcome,
        position: d.position,
        theme: d.theme,
        accent: d.accent,
        lang: d.lang,
        showHintOnLoad: d.hint === 'false' ? false : (d.hint ? d.hint === 'true' : undefined),
        qr: d.qr === 'false' ? false : undefined,
        openInitially: d.open === 'false' ? false : undefined
      };
    },
    lsGet(key, def) {
      try { const v = localStorage.getItem(DEFAULTS.storageKey); if (!v) return def;
        const obj = JSON.parse(v); return obj[key] !== undefined ? obj[key] : def;
      } catch(e){ return def; }
    },
    lsSet(key, value) {
      try {
        const v = localStorage.getItem(DEFAULTS.storageKey);
        const obj = v ? JSON.parse(v) : {};
        obj[key] = value;
        localStorage.setItem(DEFAULTS.storageKey, JSON.stringify(obj));
      } catch(e){}
    }
  };

  // Main factory
  function buildStyles(cfg) {
    const t = cfg.theme;
    const a = cfg.accent || cfg.theme;
    const posSide = cfg.position === 'left' ? 'left' : 'right';
    return `
      :root {
        --pcmc-theme:${t};
        --pcmc-accent:${a};
        --pcmc-bg-glass:rgba(255,255,255,0.75);
        --pcmc-border:rgba(0,0,0,0.08);
        --pcmc-radius:18px;
        --pcmc-shadow:0 4px 24px -4px rgba(0,0,0,0.15);
        --pcmc-font:'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --pcmc-bg-glass:rgba(28,35,45,0.72);
          --pcmc-border:rgba(255,255,255,0.1);
          --pcmc-shadow:0 4px 24px -4px rgba(0,0,0,0.6);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .pcmc-ai * {
          animation:none !important;
          transition:none !important;
        }
      }

      .pcmc-ai {
        position:fixed;
        bottom:16px;
        ${posSide}:16px;
        z-index:999999;
        font-family:var(--pcmc-font);
        color:#1e293b;
        -webkit-font-smoothing:antialiased;
      }
      .pcmc-ai * { box-sizing:border-box; }

      .pcmc-ai-panel {
        display:flex;
        flex-direction:column;
        gap:8px;
        align-items:flex-${posSide === 'right' ? 'end' : 'start'};
        position:relative;
        pointer-events:none;
      }

      .pcmc-ai-bubble {
        width:320px;
        max-width:90vw;
        background:var(--pcmc-bg-glass);
        backdrop-filter:blur(16px) saturate(160%);
        -webkit-backdrop-filter:blur(16px) saturate(160%);
        border:1px solid var(--pcmc-border);
        border-radius:var(--pcmc-radius);
        padding:14px 16px 14px 16px;
        box-shadow:var(--pcmc-shadow);
        font-size:13px;
        line-height:1.45;
        position:relative;
        pointer-events:auto;
        animation:pcmcFadeIn .45s cubic-bezier(.4,.0,.2,1);
      }
      .pcmc-ai-bubble:after {
        content:"";
        position:absolute;
        ${posSide}:-6px;
        top:22px;
        width:14px;
        height:14px;
        background:inherit;
        border:1px solid var(--pcmc-border);
        border-left:none;
        border-bottom:none;
        transform:rotate(45deg);
        backdrop-filter:inherit;
        -webkit-backdrop-filter:inherit;
      }
      .pcmc-ai-bubble h4 {
        margin:0 0 4px;
        font-size:13px;
        font-weight:600;
        color:var(--pcmc-theme);
        letter-spacing:.25px;
        display:flex;
        align-items:center;
        gap:6px;
      }
      .pcmc-ai-bubble h4 span.ai-chip {
        font-size:10px;
        padding:2px 6px;
        background:linear-gradient(135deg,var(--pcmc-accent),var(--pcmc-theme));
        color:#fff;
        border-radius:10px;
        font-weight:600;
        letter-spacing:.5px;
      }
      .pcmc-ai-bubble p {
        margin:0;
        font-size:12.5px;
        font-weight:400;
        color:#334155;
      }

      .pcmc-ai-buttons {
        display:flex;
        flex-direction:column;
        gap:8px;
        pointer-events:auto;
      }
      .pcmc-ai-btn {
        --pcmc-btn-bg:rgba(255,255,255,0.68);
        position:relative;
        border:1px solid var(--pcmc-border);
        background:var(--pcmc-btn-bg);
        backdrop-filter:blur(14px);
        -webkit-backdrop-filter:blur(14px);
        padding:9px 16px;
        font-size:12.5px;
        font-weight:600;
        color:var(--pcmc-theme);
        letter-spacing:.25px;
        border-radius:24px;
        cursor:pointer;
        outline:none;
        min-width:180px;
        text-align:center;
        line-height:1.2;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:6px;
        transition:background .35s, box-shadow .35s, transform .25s;
        box-shadow:0 2px 8px -2px rgba(0,0,0,0.07);
      }
      .pcmc-ai-btn:hover,
      .pcmc-ai-btn:focus-visible {
        background:linear-gradient(135deg,var(--pcmc-accent),var(--pcmc-theme));
        color:#fff;
        box-shadow:0 4px 16px -4px rgba(0,0,0,0.25);
      }
      .pcmc-ai-btn:active {
        transform:translateY(1px);
      }

      .pcmc-ai-qr-wrapper {
        pointer-events:auto;
        position:relative;
      }
      .pcmc-ai-qr-card {
        width:210px;
        background:var(--pcmc-bg-glass);
        border:1px solid var(--pcmc-border);
        backdrop-filter:blur(18px) saturate(160%);
        -webkit-backdrop-filter:blur(18px) saturate(160%);
        padding:14px 14px 10px;
        border-radius:20px;
        box-shadow:var(--pcmc-shadow);
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:6px;
        animation:pcmcScaleIn .4s cubic-bezier(.4,0,.2,1);
      }
      .pcmc-ai-qr-card h5 {
        margin:0;
        font-size:11px;
        font-weight:600;
        text-transform:uppercase;
        letter-spacing:.8px;
        color:var(--pcmc-theme);
        display:flex;
        align-items:center;
        gap:4px;
      }
      .pcmc-ai-qr-card img {
        width:170px;
        height:170px;
        object-fit:contain;
        border-radius:12px;
        background:#fff;
        border:1px solid rgba(0,0,0,0.06);
        box-shadow:0 2px 10px -2px rgba(0,0,0,0.12);
      }
      .pcmc-ai-qr-info {
        font-size:10px;
        color:#475569;
        text-align:center;
        line-height:1.3;
        max-width:170px;
      }
      .pcmc-ai-qr-toggle {
        position:absolute;
        top:-10px;
        ${posSide === 'right' ? 'right:-10px;' : 'left:-10px;'}
        width:32px;
        height:32px;
        border-radius:50%;
        background:linear-gradient(135deg,var(--pcmc-accent),var(--pcmc-theme));
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:14px;
        font-weight:600;
        cursor:pointer;
        border:1px solid rgba(255,255,255,0.4);
        box-shadow:0 4px 14px -2px rgba(0,0,0,0.25);
        transition:transform .35s;
      }
      .pcmc-ai-qr-toggle:hover { transform:rotate(20deg); }

      .pcmc-ai-footer {
        font-size:9.5px;
        text-align:center;
        color:#475569;
        font-weight:500;
        margin-top:2px;
        pointer-events:auto;
        display:flex;
        align-items:center;
        gap:4px;
        justify-content:flex-${posSide === 'right' ? 'end' : 'start'};
        opacity:.85;
      }
      .pcmc-ai-footer a {
        color:var(--pcmc-theme);
        text-decoration:none;
        font-weight:600;
      }
      .pcmc-ai-footer a:hover { text-decoration:underline; }

      .pcmc-ai-launch-fab {
        position:fixed;
        bottom:16px;
        ${posSide}:16px;
        width:56px;
        height:56px;
        border-radius:50%;
        background:linear-gradient(135deg,var(--pcmc-accent),var(--pcmc-theme));
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:24px;
        cursor:pointer;
        box-shadow:0 6px 20px -4px rgba(0,0,0,0.35);
        border:1px solid rgba(255,255,255,0.35);
        backdrop-filter:blur(12px);
        -webkit-backdrop-filter:blur(12px);
        transition:transform .35s, box-shadow .35s;
        z-index:999998;
        animation:pcmcFloat 6s ease-in-out infinite;
      }
      .pcmc-ai-launch-fab:hover {
        transform:scale(1.08);
        box-shadow:0 10px 28px -5px rgba(0,0,0,0.45);
      }
      .pcmc-ai-launch-fab:active { transform:scale(.96); }

      .pcmc-ai-hint {
        position:absolute;
        bottom:70px;
        ${posSide === 'right' ? 'right:0;' : 'left:0;'}
        background:var(--pcmc-bg-glass);
        border:1px solid var(--pcmc-border);
        padding:8px 12px;
        font-size:11.5px;
        font-weight:500;
        color:var(--pcmc-theme);
        backdrop-filter:blur(16px);
        -webkit-backdrop-filter:blur(16px);
        border-radius:14px;
        box-shadow:0 4px 16px -5px rgba(0,0,0,0.2);
        display:flex;
        align-items:center;
        gap:6px;
        opacity:0;
        pointer-events:none;
        transform:translateY(8px);
        transition:opacity .4s, transform .4s;
      }
      .pcmc-ai-hint.show {
        opacity:1;
        transform:translateY(0);
        pointer-events:auto;
      }

      .pcmc-ai-hidden { display:none !important; }

      @keyframes pcmcFadeIn {
        from { opacity:0; transform:translateY(8px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes pcmcScaleIn {
        from { opacity:0; transform:scale(.92); }
        to { opacity:1; transform:scale(1); }
      }
      @keyframes pcmcFloat {
        0%,100% { transform:translateY(0); }
        50% { transform:translateY(-6px); }
      }

      @media (max-width:640px) {
        .pcmc-ai { bottom:12px; ${posSide}:12px; }
        .pcmc-ai-bubble { width:280px; }
        .pcmc-ai-btn { min-width:150px; padding:8px 14px; font-size:12px; }
        .pcmc-ai-qr-card { width:190px; }
        .pcmc-ai-qr-card img { width:150px; height:150px; }
        .pcmc-ai-launch-fab { width:54px; height:54px; font-size:22px; }
      }
    `;
  }

  function createWidget(cfg) {
    const root = u.ce('div', 'pcmc-ai');
    root.setAttribute('role', 'complementary');
    root.setAttribute('aria-label', 'PCMC AI civic assistant widget');

    // Bubble
    const bubble = u.ce('div', 'pcmc-ai-bubble');
    bubble.innerHTML = `
      <h4 aria-live="polite">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;
          background:linear-gradient(135deg,var(--pcmc-accent),var(--pcmc-theme));color:#fff;border-radius:6px;
          font-size:11px;font-weight:600;letter-spacing:.5px;">AI</span>
        ${cfg.title} <span class="ai-chip">LIVE</span>
      </h4>
      <p>${cfg.welcome}</p>
    `;

    // Buttons
    const btnWrap = u.ce('div', 'pcmc-ai-buttons');
    cfg.services.forEach(s => {
      const btn = u.ce('button', 'pcmc-ai-btn');
      btn.type = 'button';
      btn.dataset.service = s.id;
      btn.dataset.message = s.message;
      btn.setAttribute('aria-label', `${s.label} service`);
      btn.textContent = s.label;
      btn.addEventListener('click', () => handleServiceClick(cfg, s, btn));
      btnWrap.appendChild(btn);
    });

    // QR Code
    const qrWrapper = u.ce('div', 'pcmc-ai-qr-wrapper');
    const qrState = u.lsGet('qrVisible', cfg.qr);
    const qrCard = u.ce('div', 'pcmc-ai-qr-card' + (!qrState ? ' pcmc-ai-hidden' : ''));
    const whatsappLink = `https://wa.me/${cfg.phone}?text=${u.encode(cfg.whatsappTextPrefix)}`;
    const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${u.encode(whatsappLink)}`;

    qrCard.innerHTML = `
      <h5>Scan to start</h5>
      <img src="${qrImgSrc}" alt="Scan QR to open WhatsApp PCMC support">
      <div class="pcmc-ai-qr-info">Open your camera / scanner to chat on WhatsApp instantly.</div>
    `;

    const qrToggle = u.ce('div', 'pcmc-ai-qr-toggle');
    qrToggle.setAttribute('role', 'button');
    qrToggle.setAttribute('aria-label', 'Toggle QR code visibility');
    qrToggle.tabIndex = 0;
    const setToggleIcon = (visible) => { qrToggle.textContent = visible ? '−' : '+'; };
    setToggleIcon(qrState);

    qrToggle.addEventListener('click', () => toggleQR());
    qrToggle.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleQR(); }
    });

    function toggleQR() {
      const visible = qrCard.classList.toggle('pcmc-ai-hidden');
      u.lsSet('qrVisible', !visible);
      setToggleIcon(!visible);
    }

    qrWrapper.appendChild(qrCard);
    qrWrapper.appendChild(qrToggle);

    // Footer
    const footer = u.ce('div', 'pcmc-ai-footer');
    footer.innerHTML = `
      <span>Powered by <a href="${cfg.poweredByUrl}" target="_blank" rel="noopener">${cfg.poweredByName}</a></span>
    `;

    // Panel grouping
    const panel = u.ce('div', 'pcmc-ai-panel');
    panel.appendChild(bubble);
    panel.appendChild(btnWrap);
    panel.appendChild(qrWrapper);
    panel.appendChild(footer);

    root.appendChild(panel);

    // Launch FAB (for collapse state)
    const fab = u.ce('div', 'pcmc-ai-launch-fab pcmc-ai-hidden');
    fab.setAttribute('aria-label', 'Open PCMC AI assistant');
    fab.innerHTML = '🏛️';
    fab.addEventListener('click', () => expand());
    root.appendChild(fab);

    // Hint bubble
    const hint = u.ce('div', 'pcmc-ai-hint');
    hint.innerHTML = `<span style="font-size:14px;">🤖</span> Ask PCMC AI`;
    root.appendChild(hint);

    // Collapse / expand logic
    let collapsed = false;
    function collapse() {
      if (collapsed) return;
      collapsed = true;
      panel.classList.add('pcmc-ai-hidden');
      fab.classList.remove('pcmc-ai-hidden');
      fab.focus();
      u.lsSet('collapsed', true);
    }
    function expand() {
      if (!collapsed) return;
      collapsed = false;
      panel.classList.remove('pcmc-ai-hidden');
      fab.classList.add('pcmc-ai-hidden');
      u.lsSet('collapsed', false);
    }

    // Double-click on title line to collapse
    bubble.addEventListener('dblclick', collapse);

    // Persist collapsed state
    if (u.lsGet('collapsed', !cfg.openInitially)) {
      collapse();
    }

    // Show hint delayed
    if (cfg.showHintOnLoad && !u.lsGet('hintShown', false)) {
      setTimeout(() => {
        hint.classList.add('show');
        setTimeout(() => {
          hint.classList.remove('show');
          u.lsSet('hintShown', true);
        }, 6000);
      }, cfg.hintDelay);
    }

    // Accessibility ESC to collapse
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !collapsed) collapse();
    });

    // Expose small API for runtime
    root.__api = { collapse, expand, toggleQR, sendWhatsApp: (msg) => openWhatsApp(cfg, msg) };

    return root;
  }

  function handleServiceClick(cfg, service, buttonEl) {
    // Ripple effect (minimal)
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.inset = '0';
    ripple.style.borderRadius = 'inherit';
    ripple.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)';
    ripple.style.opacity = '0';
    ripple.style.transition = 'opacity .6s';
    buttonEl.appendChild(ripple);
    requestAnimationFrame(() => { ripple.style.opacity = '1'; });
    setTimeout(() => ripple.remove(), 600);

    const message = `${cfg.whatsappTextPrefix}${service.message}`;
    // Provide a subtle ephemeral confirmation bubble or transform button
    buttonEl.blur();
    // After a short delay, open WhatsApp
    setTimeout(() => openWhatsApp(cfg, message), 260);
  }

  function openWhatsApp(cfg, message) {
    const url = `https://wa.me/${cfg.phone}?text=${u.encode(message || cfg.whatsappTextPrefix)}`;
    window.open(url, '_blank', 'noopener');
  }

  function injectFonts() {
    if (document.getElementById('pcmc-ai-font-link')) return;
    const l = document.createElement('link');
    l.id = 'pcmc-ai-font-link';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  function injectStyles(css) {
    const style = document.createElement('style');
    style.id = 'pcmc-ai-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init(userCfg = {}) {
    // Merge config precedence: defaults < script data-* < user init
    const cfg = u.merge(DEFAULTS, Object.fromEntries(Object.entries(u.getScriptConfig()).filter(([_,v]) => v !== undefined)));
    Object.assign(cfg, Object.fromEntries(Object.entries(userCfg).filter(([_,v]) => v !== undefined)));

    // Normalize theme accent fallback
    if (!cfg.accent) cfg.accent = cfg.theme;

    // Create styles & widget
    injectFonts();
    injectStyles(buildStyles(cfg));
    const widget = createWidget(cfg);
    document.body.appendChild(widget);

    // Provide global handle
    window.PCMCChatbotWidget = widget;
    return widget;
  }

  // Auto-init when DOM ready (unless user disables)
  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  // Public API
  window.PCMCChatbot = {
    init,
    version: '1.0.0'
  };

  // Autoload
  onReady(() => init());

})();
