(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.__PCMCWidget && window.__PCMCWidget.PCMC) return;
  window.__PCMCWidget = window.__PCMCWidget || {};
  window.__PCMCWidget.PCMC = true;

  // PCMC Configuration
  const PCMC_CONFIG = {
    orgId: 'PCMC',
    name: 'PCMC',
    fullName: 'Pimpri-Chinchwad Municipal Corporation',
    phone: '918888006666',
    welcome: '🤖💬 Welcome to PCMC WhatsApp Assistant! I\'m here 24/7 to help with municipal services. Select an option below or type your query.',
    poweredBy: 'WoW-Strategies Private Limited',
    poweredByUrl: 'https://wow-strategies.com/',
    autoOpen: true,
    openDelay: 1800,
    forceGreet: false,
    suppressGreet: false,
    forceDark: false
  };

  // Updated suggestions with PCMC services
  const suggestions = [
    '📋 Get Information',
    '🏠 Property Tax',
    '📝 Register Grievance',
    '📞 Contact Department',
    '💧 Water Services',
    '📄 Certificates'
  ];

  // Helper functions
  function escapeHtml(str) {
    return str.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  // Generate proper QR Code URL
  function generateQRUrl(phoneNumber, message = 'Hi') {
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waLink)}&bgcolor=FFFFFF&color=25D366&margin=1`;
  }

  // Build and inject widget
  async function initWidget() {
    const waBase = `https://wa.me/${PCMC_CONFIG.phone}`;
    const defaultMsg = 'Hi, I need assistance from PCMC';
    const qrImageUrl = generateQRUrl(PCMC_CONFIG.phone, defaultMsg);

    // Create host element
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    if (PCMC_CONFIG.forceDark) host.classList.add('force-dark');

    // Inject styles with WhatsApp color scheme
    const style = document.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        font-family: "Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif;
        --wa-green: #25D366;
        --wa-green-dark: #128C7E;
        --wa-teal: #075E54;
        --wa-teal-dark: #054640;
        --wa-light-green: #DCF8C6;
        --wa-blue: #34B7F1;
        --wa-bg-chat: #ECE5DD;
        --wa-bg-light: #FFFFFF;
        --wa-bg-panel: #EDEDED;
        --wa-text-primary: #303030;
        --wa-text-secondary: #667781;
        --wa-border: #D1D7DB;
        --wa-shadow: 0 2px 5px 0 rgba(11,20,26,.26), 0 2px 10px 0 rgba(11,20,26,.16);
        --wa-shadow-strong: 0 10px 30px rgba(11,20,26,.19), 0 2px 10px rgba(11,20,26,.12);
        --wa-radius: 8px;
        --wa-launcher-size: 65px;
        --wa-offset: max(20px, env(safe-area-inset-bottom, 20px));
        color: var(--wa-text-primary);
      }
      
      @media (prefers-color-scheme: dark) {
        :host:not(.force-light) {
          --wa-bg-chat: #0B141A;
          --wa-bg-light: #111B21;
          --wa-bg-panel: #202C33;
          --wa-text-primary: #E9EDEF;
          --wa-text-secondary: #8696A0;
          --wa-border: #3B4A54;
          --wa-light-green: #005C4B;
        }
      }

      .wa-launcher {
        position: fixed;
        bottom: var(--wa-offset);
        right: 20px;
        width: var(--wa-launcher-size);
        height: var(--wa-launcher-size);
        border-radius: 50%;
        cursor: pointer;
        border: none;
        background: var(--wa-green);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--wa-shadow-strong);
        transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
        z-index: 2147483646;
        outline: none;
        animation: wa-pulse 2s infinite;
      }
      
      @keyframes wa-pulse {
        0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5), var(--wa-shadow-strong); }
        70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0), var(--wa-shadow-strong); }
        100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), var(--wa-shadow-strong); }
      }
      
      .wa-launcher:hover {
        transform: scale(1.08);
        box-shadow: 0 15px 35px rgba(11,20,26,.25);
      }
      
      .wa-launcher:active {
        transform: scale(0.95);
      }
      
      .wa-launcher svg {
        width: 60%;
        height: 60%;
        fill: white;
      }
      
      .wa-badge-ai {
        position: absolute;
        top: -2px;
        right: -2px;
        background: #FF6B6B;
        color: white;
        font-size: 10px;
        line-height: 1;
        padding: 4px 6px;
        border-radius: 10px;
        font-weight: 700;
        box-shadow: 0 2px 5px rgba(0,0,0,.3);
        letter-spacing: 0.5px;
        animation: wa-badge-pop .5s cubic-bezier(.68,-.55,.265,1.55);
      }
      
      @keyframes wa-badge-pop {
        0% { transform: scale(0) rotate(-45deg); opacity: 0; }
        50% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1) rotate(0); opacity: 1; }
      }

      .wa-shelf {
        position: fixed;
        right: 20px;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 15px);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
        max-width: min(380px, calc(100vw - 40px));
        z-index: 2147483646;
        animation: wa-slide-up .4s cubic-bezier(.4,0,.2,1);
      }
      
      @keyframes wa-slide-up {
        0% { opacity: 0; transform: translateY(20px) scale(.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      .wa-bubble {
        background: var(--wa-bg-light);
        padding: 16px 18px 14px;
        border-radius: 18px;
        box-shadow: var(--wa-shadow);
        color: var(--wa-text-primary);
        line-height: 1.5;
        font-size: 14px;
        animation: wa-bubble-in .4s cubic-bezier(.68,-.55,.265,1.55);
        max-width: 100%;
        position: relative;
        border: 1px solid var(--wa-border);
      }
      
      @keyframes wa-bubble-in {
        0% { transform: translateY(10px) scale(.9); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      
      .wa-bubble:after {
        content: "";
        position: absolute;
        bottom: -8px;
        right: 25px;
        width: 15px;
        height: 15px;
        background: var(--wa-bg-light);
        border-right: 1px solid var(--wa-border);
        border-bottom: 1px solid var(--wa-border);
        transform: rotate(45deg);
        box-shadow: 2px 2px 2px rgba(0,0,0,.06);
      }
      
      .wa-bubble button.wa-dismiss {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 24px;
        height: 24px;
        border: none;
        cursor: pointer;
        background: transparent;
        color: var(--wa-text-secondary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .2s;
        font-size: 18px;
        line-height: 1;
      }
      
      .wa-bubble button.wa-dismiss:hover {
        background: rgba(0,0,0,.05);
      }

      .wa-pill {
        background: var(--wa-bg-light);
        color: var(--wa-text-primary);
        border: 1px solid var(--wa-border);
        border-radius: 25px;
        padding: 10px 16px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        text-align: left;
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        box-shadow: var(--wa-shadow);
        transition: all .3s cubic-bezier(.4,0,.2,1);
        animation: wa-pill-in .5s cubic-bezier(.68,-.55,.265,1.55) backwards;
        max-width: 100%;
        width: fit-content;
        white-space: nowrap;
      }
      
      .wa-pill:hover {
        background: var(--wa-green);
        color: white;
        border-color: var(--wa-green);
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 5px 15px rgba(37,211,102,.3);
      }
      
      .wa-pill:active {
        transform: translateY(0) scale(.98);
      }
      
      @keyframes wa-pill-in {
        0% { opacity: 0; transform: translateX(20px) scale(.9); }
        100% { opacity: 1; transform: translateX(0) scale(1); }
      }
      
      .wa-pill[data-recent="1"] {
        background: var(--wa-light-green);
        border-color: var(--wa-green);
      }

      .wa-qr-toggle {
        margin-top: 4px;
        background: transparent;
        border: none;
        color: var(--wa-green-dark);
        font-size: 13px;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 20px;
        font-weight: 600;
        transition: background .2s;
        align-self: flex-end;
      }
      
      .wa-qr-toggle:hover {
        background: rgba(37,211,102,.1);
      }

      .wa-qr-panel {
        display: none;
        background: var(--wa-bg-light);
        padding: 20px;
        border-radius: 16px;
        border: 1px solid var(--wa-border);
        box-shadow: var(--wa-shadow);
        animation: wa-bubble-in .4s cubic-bezier(.68,-.55,.265,1.55);
        align-self: flex-end;
        text-align: center;
      }
      
      .wa-qr-panel img {
        width: 180px;
        height: 180px;
        display: block;
        margin: 0 auto 12px;
        border-radius: 8px;
        background: white;
        padding: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,.1);
      }
      
      .wa-qr-panel .wa-label {
        font-size: 11px;
        letter-spacing: 0.8px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        color: var(--wa-green-dark);
        margin-bottom: 12px;
      }
      
      .wa-qr-panel .wa-scan-text {
        font-size: 13px;
        color: var(--wa-text-secondary);
        line-height: 1.4;
      }

      .wa-footer {
        font-size: 11px;
        color: var(--wa-text-secondary);
        text-align: center;
        background: var(--wa-bg-light);
        padding: 8px 12px;
        border-radius: 12px;
        border: 1px solid var(--wa-border);
        line-height: 1.4;
        align-self: flex-end;
        animation: wa-pill-in .5s cubic-bezier(.68,-.55,.265,1.55) backwards;
        animation-delay: 0.4s;
      }
      
      .wa-powered-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        color: var(--wa-text-secondary);
        font-weight: 600;
        transition: color .2s;
      }
      
      .wa-powered-link:hover {
        color: var(--wa-green-dark);
      }
      
      .wa-powered-link svg {
        width: 12px;
        height: 12px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .wa-tooltip {
        position: fixed;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 10px);
        right: 20px;
        background: var(--wa-teal);
        color: white;
        padding: 8px 12px;
        font-size: 12px;
        border-radius: 6px;
        box-shadow: var(--wa-shadow);
        opacity: 0;
        transform: translateY(5px) scale(.95);
        pointer-events: none;
        transition: all .3s;
        white-space: nowrap;
        z-index: 2147483646;
      }
      
      .wa-tooltip.show {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      
      .wa-tooltip:after {
        content: "";
        position: absolute;
        bottom: -4px;
        right: 32px;
        width: 8px;
        height: 8px;
        background: var(--wa-teal);
        transform: rotate(45deg);
      }

      @media (max-width: 640px) {
        :host { --wa-launcher-size: 56px; }
        .wa-shelf { right: 15px; bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 10px); }
        .wa-launcher { right: 15px; }
        .wa-tooltip { right: 15px; }
        .wa-pill { font-size: 13px; padding: 9px 14px; }
      }
    `;
    shadow.appendChild(style);

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'wa-tooltip';
    tooltip.textContent = 'PCMC WhatsApp Assistant';
    shadow.appendChild(tooltip);

    // Create launcher button
    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'wa-launcher';
    launcher.setAttribute('aria-label', 'Open PCMC WhatsApp Assistant');
    launcher.innerHTML = `
      <span class="wa-badge-ai">AI</span>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `;
    shadow.appendChild(launcher);

    let shelf = null;
    let qrPanelVisible = false;

    // Tooltip events
    launcher.addEventListener('mouseenter', () => tooltip.classList.add('show'));
    launcher.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
    launcher.addEventListener('focus', () => tooltip.classList.add('show'));
    launcher.addEventListener('blur', () => tooltip.classList.remove('show'));
    launcher.addEventListener('click', () => { shelf ? closeShelf() : openShelf(); });

    function openShelf() {
      if (shelf) return;
      shelf = document.createElement('div');
      shelf.className = 'wa-shelf';
      shelf.setAttribute('role', 'dialog');
      shelf.setAttribute('aria-label', 'PCMC WhatsApp Assistant');

      const greetKey = '__pcmc_greeting_dismiss_' + PCMC_CONFIG.orgId;
      const showGreeting = !PCMC_CONFIG.suppressGreet && (PCMC_CONFIG.forceGreet || !localStorage.getItem(greetKey));

      if (showGreeting) {
        const bubble = document.createElement('div');
        bubble.className = 'wa-bubble';
        bubble.innerHTML = '<button class="wa-dismiss" aria-label="Dismiss greeting">×</button>' + escapeHtml(PCMC_CONFIG.welcome);
        bubble.querySelector('.wa-dismiss').addEventListener('click', () => {
          bubble.remove();
          localStorage.setItem(greetKey, '1');
        });
        shelf.appendChild(bubble);
      }

      const recentKey = '__pcmc_recent_' + PCMC_CONFIG.orgId;
      const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');

      suggestions.forEach((text, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'wa-pill';
        pill.style.animationDelay = (idx * 0.08) + 's';
        pill.innerHTML = '<span>' + escapeHtml(text) + '</span>';
        if (recent.includes(text)) pill.dataset.recent = '1';
        pill.addEventListener('click', () => handleSuggestion(text, recentKey, pill));
        shelf.appendChild(pill);
      });

      const qrToggle = document.createElement('button');
      qrToggle.type = 'button';
      qrToggle.className = 'wa-qr-toggle';
      qrToggle.textContent = '📱 Show QR Code';
      qrToggle.addEventListener('click', () => {
        qrPanelVisible = !qrPanelVisible;
        qrToggle.textContent = qrPanelVisible ? '✕ Hide QR Code' : '📱 Show QR Code';
        qrPanel.style.display = qrPanelVisible ? 'block' : 'none';
      });

      const qrPanel = document.createElement('div');
      qrPanel.className = 'wa-qr-panel';
      qrPanel.innerHTML = `
        <div class="wa-label">Scan with WhatsApp</div>
        <img alt="WhatsApp QR Code" src="${qrImageUrl}" />
        <div class="wa-scan-text">
          Open WhatsApp on your phone<br>
          Tap Menu or Settings and select<br>
          <strong>Linked Devices</strong> → <strong>Link a Device</strong>
        </div>
      `;

      shelf.appendChild(qrToggle);
      shelf.appendChild(qrPanel);

      const footer = document.createElement('div');
      footer.className = 'wa-footer';
      footer.innerHTML = `
        <a class="wa-powered-link" href="${PCMC_CONFIG.poweredByUrl}" target="_blank" rel="noopener" aria-label="Visit WoW-Strategies website">
          <span>Powered by <strong>${PCMC_CONFIG.poweredBy}</strong></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </a>
      `;
      shelf.appendChild(footer);

      shadow.appendChild(shelf);
    }

    function closeShelf() {
      if (!shelf) return;
      shelf.remove();
      shelf = null;
    }

    function handleSuggestion(text, recentKey, pill) {
      // Remove emoji for message text
      const cleanText = text.replace(/^[^\w\s]+\s/, '');
      const message = `Hi, I need help with: ${cleanText}`;
      const waLink = `${waBase}?text=${encodeURIComponent(message)}`;
      
      window.open(waLink, '_blank', 'noopener');
      
      // Update recent selections
      let r = JSON.parse(localStorage.getItem(recentKey) || '[]');
      r = [text, ...r.filter(x => x !== text)].slice(0, 4);
      localStorage.setItem(recentKey, JSON.stringify(r));
      pill.dataset.recent = '1';
    }

    if (PCMC_CONFIG.autoOpen) {
      const key = '__pcmc_auto_opened_' + PCMC_CONFIG.orgId;
      if (!sessionStorage.getItem(key)) {
        setTimeout(() => {
          openShelf();
          sessionStorage.setItem(key, '1');
        }, PCMC_CONFIG.openDelay);
      }
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && shelf) closeShelf();
    });
  }

  // Initialize widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})();
