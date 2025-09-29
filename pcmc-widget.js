(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.__PCMCChatWidget) return;
  window.__PCMCChatWidget = true;

  const CONFIG = {
    orgId: 'PCMC',
    name: 'PCMC Healthcare',
    fullName: 'Pimpri-Chinchwad Municipal Corporation',
    phone: '918888006666',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTQuMmMtMi41IDAtNC43MS0xLjI4LTYtMy4yMi4wMy0xLjk5IDQtMy4wOCA2LTMuMDggMS45OSAwIDUuOTcgMS4wOSA2IDMuMDgtMS4yOSAxLjk0LTMuNSAzLjIyLTYgMy4yMnoiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+',
    poweredBy: 'WoW-Strategies Private Limited',
    poweredByUrl: 'https://wow-strategies.com/',
    welcomeMessage: `🏥 Hi! I'm your Docgram AI Care Assistant for ${this.fullName}. I'm here 24/7 to help with outpatient services, finding the right doctor, booking appointments or anything you need. How can I support you today?`,
    autoOpen: true,
    openDelay: 1800,
    forceGreet: false,
    suppressGreet: false,
    forceDark: false
  };

  const suggestions = [
    'Check Symptoms',
    'Find Doctors', 
    'Book Appointment',
    'Get Help'
  ];

  // Generate inline styles matching the screenshot UI
  function injectStyles() {
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      .pcmc-widget-host {
        all: initial;
        font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        --pcmc-primary: #5D4CCB;
        --pcmc-primary-rgb: 93,76,203;
        --pcmc-accent: #7E6AF8;
        --pcmc-accent-rgb: 126,106,248;
        --pcmc-bg: #ffffff;
        --pcmc-bg-alt: #f4f4fe;
        --pcmc-text: #1c1439;
        --pcmc-text-soft: #554d72;
        --pcmc-border: #e4e2f5;
        --pcmc-radius-pill: 1000px;
        --pcmc-shadow-elev: 0 18px 48px -15px rgba(32,24,72,.35), 0 6px 18px -6px rgba(32,24,72,.22);
        --pcmc-shadow-soft: 0 4px 16px -6px rgba(32,24,72,.22);
        --pcmc-glass: rgba(255,255,255,0.72);
        --pcmc-focus: 0 0 0 3px rgba(var(--pcmc-accent-rgb),0.35);
        --pcmc-launcher-size: 68px;
        --pcmc-offset: max(24px, env(safe-area-inset-bottom, 24px));
        color: var(--pcmc-text);
      }

      @media (prefers-color-scheme: dark) {
        .pcmc-widget-host:not(.force-light) {
          --pcmc-bg: #1d1a27;
          --pcmc-bg-alt: #272334;
          --pcmc-text: #f4f2fb;
          --pcmc-text-soft: #b8b3cc;
          --pcmc-border: #3a3550;
          --pcmc-glass: rgba(36,31,56,0.72);
          --pcmc-shadow-elev: 0 18px 52px -15px rgba(0,0,0,.65), 0 6px 18px -6px rgba(0,0,0,.5);
          --pcmc-shadow-soft: 0 4px 16px -6px rgba(0,0,0,.5);
        }
      }

      .pcmc-widget-host.force-dark {
        --pcmc-bg: #1d1a27;
        --pcmc-bg-alt: #272334;
        --pcmc-text: #f4f2fb;
        --pcmc-text-soft: #b8b3cc;
        --pcmc-border: #3a3550;
        --pcmc-glass: rgba(36,31,56,0.72);
        --pcmc-shadow-elev: 0 18px 52px -15px rgba(0,0,0,.65), 0 6px 18px -6px rgba(0,0,0,.5);
        --pcmc-shadow-soft: 0 4px 16px -6px rgba(0,0,0,.5);
      }

      .pcmc-launcher {
        position: fixed;
        bottom: var(--pcmc-offset);
        right: 24px;
        width: var(--pcmc-launcher-size);
        height: var(--pcmc-launcher-size);
        border-radius: 50%;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, var(--pcmc-primary), var(--pcmc-accent));
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px -10px rgba(var(--pcmc-primary-rgb),0.65), 0 0 0 0 rgba(var(--pcmc-accent-rgb),0.45);
        animation: pcmc-halo 6s linear infinite;
        transition: transform .55s cubic-bezier(.34,1.56,.64,1), box-shadow .5s;
        z-index: 2147483646;
        outline: none;
      }

      @keyframes pcmc-halo {
        0% { box-shadow: 0 10px 30px -10px rgba(var(--pcmc-primary-rgb),0.65), 0 0 0 0 rgba(var(--pcmc-accent-rgb),0.0); }
        40% { box-shadow: 0 10px 30px -10px rgba(var(--pcmc-primary-rgb),0.65), 0 0 0 16px rgba(var(--pcmc-accent-rgb),0); }
        100% { box-shadow: 0 10px 30px -10px rgba(var(--pcmc-primary-rgb),0.65), 0 0 0 0 rgba(var(--pcmc-accent-rgb),0); }
      }

      .pcmc-launcher:hover,
      .pcmc-launcher:focus-visible {
        transform: scale(1.08) rotate(6deg);
      }

      .pcmc-launcher:focus-visible {
        box-shadow: 0 0 0 4px rgba(var(--pcmc-accent-rgb),0.4), 0 10px 30px -10px rgba(var(--pcmc-primary-rgb),0.65);
      }

      .pcmc-launcher img,
      .pcmc-launcher svg {
        width: 58%;
        height: 58%;
        object-fit: contain;
        filter: drop-shadow(0 4px 9px rgba(0,0,0,.35));
      }

      .pcmc-badge-ai {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #ff2f6d;
        color: #fff;
        font-size: 11px;
        line-height: 1;
        padding: 5px 7px 6px;
        border-radius: 14px;
        font-weight: 600;
        box-shadow: 0 4px 10px -3px rgba(0,0,0,.45);
        letter-spacing: .5px;
        animation: pcmc-badge-pop .6s cubic-bezier(.34,1.56,.64,1);
      }

      @keyframes pcmc-badge-pop {
        0% { transform: scale(.4) rotate(-10deg); opacity: 0; }
        60% { transform: scale(1.12) rotate(4deg); opacity: 1; }
        100% { transform: scale(1) rotate(0); }
      }

      .pcmc-shelf {
        position: fixed;
        right: 24px;
        bottom: calc(var(--pcmc-offset) + var(--pcmc-launcher-size) + 12px);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        max-width: min(360px, calc(100vw - 28px));
        z-index: 2147483646;
        animation: pcmc-shelf-in .45s cubic-bezier(.4,.0,.2,1);
      }

      @keyframes pcmc-shelf-in {
        0% { opacity: 0; transform: translateY(14px) scale(.97); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      .pcmc-bubble {
        background: var(--pcmc-glass);
        backdrop-filter: blur(14px) saturate(1.35);
        -webkit-backdrop-filter: blur(14px) saturate(1.35);
        padding: 14px 18px 12px;
        border-radius: 20px;
        border: 1px solid rgba(var(--pcmc-accent-rgb),0.25);
        box-shadow: var(--pcmc-shadow-elev);
        color: var(--pcmc-text);
        line-height: 1.5;
        font-size: 14px;
        animation: pcmc-bubble-in .50s cubic-bezier(.34,1.35,.64,1);
        max-width: 100%;
        position: relative;
        padding-right: 36px;
      }

      @keyframes pcmc-bubble-in {
        0% { transform: translateY(10px) scale(.95); opacity: 0; }
        60% { transform: translateY(-2px) scale(1.02); opacity: 1; }
        100% { transform: translateY(0) scale(1); }
      }

      .pcmc-bubble:after {
        content: "";
        position: absolute;
        bottom: -6px;
        right: 24px;
        width: 12px;
        height: 12px;
        background: var(--pcmc-glass);
        border: 1px solid rgba(var(--pcmc-accent-rgb),0.25);
        border-left: none;
        border-top: none;
        transform: rotate(45deg);
        filter: blur(.2px);
      }

      .pcmc-bubble button.pcmc-dismiss {
        position: absolute;
        top: 4px;
        right: 6px;
        width: 24px;
        height: 24px;
        border: none;
        cursor: pointer;
        background: rgba(var(--pcmc-accent-rgb),0.18);
        color: var(--pcmc-text);
        backdrop-filter: blur(4px);
        border-radius: 50%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .25s;
      }

      .pcmc-bubble button.pcmc-dismiss:hover {
        background: rgba(var(--pcmc-accent-rgb),0.32);
      }

      .pcmc-pill {
        background: transparent;
        color: var(--pcmc-primary);
        border: 2px solid var(--pcmc-primary);
        border-radius: var(--pcmc-radius-pill);
        padding: 12px 18px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        text-align: left;
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--pcmc-shadow-soft);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: background .4s, color .4s, transform .5s cubic-bezier(.34,1.56,.64,1), border-color .4s, box-shadow .4s;
        animation: pcmc-pill-in .55s cubic-bezier(.34,1.5,.64,1) backwards;
        max-width: 100%;
        width: fit-content;
      }

      .pcmc-pill:focus-visible {
        outline: none;
        box-shadow: var(--pcmc-shadow-soft), var(--pcmc-focus);
      }

      @keyframes pcmc-pill-in {
        0% { opacity: 0; transform: translateY(14px) scale(.95); }
        70% { opacity: 1; transform: translateY(-3px) scale(1.02); }
        100% { transform: translateY(0) scale(1); }
      }

      .pcmc-pill:before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, var(--pcmc-primary), var(--pcmc-accent));
        opacity: 0;
        transition: opacity .45s;
        z-index: 0;
      }

      .pcmc-pill span {
        position: relative;
        z-index: 1;
      }

      .pcmc-pill:hover,
      .pcmc-pill:focus-visible {
        color: #fff;
        border-color: transparent;
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 14px 32px -12px rgba(var(--pcmc-primary-rgb),0.6), 0 6px 18px -6px rgba(var(--pcmc-accent-rgb),0.55);
      }

      .pcmc-pill:hover:before,
      .pcmc-pill:focus-visible:before {
        opacity: 1;
      }

      .pcmc-pill[data-recent="1"] {
        border-color: var(--pcmc-accent);
        color: var(--pcmc-accent);
      }

      .pcmc-pill[data-recent="1"]:hover,
      .pcmc-pill[data-recent="1"]:focus-visible {
        color: #fff;
      }

      .pcmc-qr-toggle {
        margin-top: 2px;
        background: none;
        border: none;
        color: var(--pcmc-accent);
        font-size: 12.5px;
        cursor: pointer;
        padding: 6px 10px;
        border-radius: 10px;
        font-weight: 500;
        transition: background .25s;
        align-self: flex-end;
      }

      .pcmc-qr-toggle:hover,
      .pcmc-qr-toggle:focus-visible {
        background: rgba(var(--pcmc-accent-rgb),0.12);
        outline: none;
      }

      .pcmc-qr-panel {
        display: none;
        background: var(--pcmc-glass);
        backdrop-filter: blur(14px) saturate(1.3);
        -webkit-backdrop-filter: blur(14px) saturate(1.3);
        padding: 16px 18px 12px;
        border-radius: 18px;
        border: 1px solid rgba(var(--pcmc-accent-rgb),0.28);
        box-shadow: var(--pcmc-shadow-elev);
        animation: pcmc-bubble-in .55s cubic-bezier(.34,1.4,.64,1);
        align-self: flex-end;
      }

      .pcmc-qr-panel canvas {
        display: block;
        margin: 0 auto 6px;
      }

      .pcmc-qr-panel .pcmc-label {
        font-size: 10.5px;
        letter-spacing: 1px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        color: var(--pcmc-accent);
        margin-bottom: 6px;
      }

      .pcmc-footer {
        font-size: 10.5px;
        color: var(--pcmc-text-soft);
        text-align: center;
        background: var(--pcmc-glass);
        padding: 6px 10px 6px;
        border-radius: 14px;
        border: 1px solid rgba(var(--pcmc-accent-rgb),0.22);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        line-height: 1.25;
        align-self: flex-end;
        animation: pcmc-pill-in .55s cubic-bezier(.34,1.5,.64,1) backwards;
      }

      .pcmc-powered-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        color: var(--pcmc-text-soft);
        font-weight: 500;
        position: relative;
        padding: 4px 10px;
        border-radius: 12px;
        background: rgba(var(--pcmc-accent-rgb),0.08);
        transition: background .35s, color .35s;
      }

      .pcmc-powered-link:before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(120deg, var(--pcmc-primary), var(--pcmc-accent));
        opacity: 0;
        transition: opacity .45s;
        z-index: 0;
      }

      .pcmc-powered-link span,
      .pcmc-powered-link svg {
        position: relative;
        z-index: 1;
      }

      .pcmc-powered-link:hover,
      .pcmc-powered-link:focus-visible {
        color: #fff;
        outline: none;
      }

      .pcmc-powered-link:hover:before,
      .pcmc-powered-link:focus-visible:before {
        opacity: 1;
      }

      .pcmc-powered-link svg {
        width: 12px;
        height: 12px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .pcmc-tooltip {
        position: fixed;
        bottom: calc(var(--pcmc-offset) + var(--pcmc-launcher-size) + 12px);
        right: 24px;
        background: var(--pcmc-glass);
        border: 1px solid rgba(var(--pcmc-accent-rgb),0.3);
        padding: 6px 10px;
        font-size: 12px;
        color: var(--pcmc-text);
        border-radius: 11px;
        backdrop-filter: blur(10px);
        box-shadow: var(--pcmc-shadow-soft);
        opacity: 0;
        transform: translateY(6px) scale(.96);
        pointer-events: none;
        transition: opacity .4s, transform .4s;
        white-space: nowrap;
        z-index: 2147483646;
      }

      .pcmc-tooltip.show {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      @media (prefers-reduced-motion: reduce) {
        .pcmc-launcher, .pcmc-pill, .pcmc-bubble, .pcmc-tooltip, .pcmc-shelf, .pcmc-qr-panel {
          animation: none !important;
          transition: none !important;
        }
      }

      @media (max-width: 640px) {
        .pcmc-widget-host {
          --pcmc-launcher-size: 60px;
        }
        .pcmc-shelf {
          right: 14px;
          bottom: calc(var(--pcmc-offset) + var(--pcmc-launcher-size) + 10px);
        }
        .pcmc-launcher {
          right: 14px;
        }
        .pcmc-tooltip {
          right: 14px;
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  }

  // QR Code generation function
  async function generateQRCode(text) {
    return new Promise((resolve) => {
      // Create a simple data URL for QR code (placeholder)
      const canvas = document.createElement('canvas');
      canvas.width = 140;
      canvas.height = 140;
      const ctx = canvas.getContext('2d');
      
      // Draw a simple QR code pattern (for demonstration)
      ctx.fillStyle = '#5c46d8';
      ctx.fillRect(0, 0, 140, 140);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, 10, 120, 120);
      ctx.fillStyle = '#5c46d8';
      
      // Add some QR-like patterns
      for(let i = 0; i < 7; i++) {
        for(let j = 0; j < 7; j++) {
          if(Math.random() > 0.5) {
            ctx.fillRect(20 + i*15, 20 + j*15, 10, 10);
          }
        }
      }
      
      resolve(canvas);
    });
  }

  // Build and inject widget
  async function buildWidget() {
    const waBase = `https://wa.me/${CONFIG.phone}`;
    const defaultMsg = encodeURIComponent(`Hello ${CONFIG.name}, I need assistance.`);
    const waDefaultLink = `${waBase}?text=${defaultMsg}`;
    
    const qrCanvas = await generateQRCode(waDefaultLink);

    const widgetHTML = `
      <div class="pcmc-widget-host${CONFIG.forceDark ? ' force-dark' : ''}">
        <div class="pcmc-tooltip">Docgram AI WhatsApp Assistant</div>
        
        <button type="button" class="pcmc-launcher" aria-label="Open Docgram AI WhatsApp Assistant">
          <span class="pcmc-badge-ai">AI</span>
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = widgetHTML;
    document.body.appendChild(container.firstElementChild);

    const widgetHost = document.querySelector('.pcmc-widget-host');
    const launcher = widgetHost.querySelector('.pcmc-launcher');
    const tooltip = widgetHost.querySelector('.pcmc-tooltip');

    let shelf = null;
    let qrPanelVisible = false;

    // Event handlers
    launcher.addEventListener('mouseenter', () => tooltip.classList.add('show'));
    launcher.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
    launcher.addEventListener('focus', () => tooltip.classList.add('show'));
    launcher.addEventListener('blur', () => tooltip.classList.remove('show'));
    launcher.addEventListener('click', () => { shelf ? closeShelf() : openShelf(); });

    function escapeHtml(str) {
      return str.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    }

    function openShelf() {
      if (shelf) return;
      
      shelf = document.createElement('div');
      shelf.className = 'pcmc-shelf';
      shelf.setAttribute('role', 'dialog');
      shelf.setAttribute('aria-label', 'Docgram AI WhatsApp Assistant');

      const greetKey = '__pcmc_greeting_dismiss_' + CONFIG.orgId;
      const showGreeting = !CONFIG.suppressGreet && (CONFIG.forceGreet || !localStorage.getItem(greetKey));

      if (showGreeting) {
        const bubble = document.createElement('div');
        bubble.className = 'pcmc-bubble';
        bubble.innerHTML = `
          <button class="pcmc-dismiss" aria-label="Dismiss greeting">&times;</button>
          ${escapeHtml(CONFIG.welcomeMessage)}
        `;
        bubble.querySelector('.pcmc-dismiss').addEventListener('click', () => {
          bubble.remove();
          localStorage.setItem(greetKey, '1');
        });
        shelf.appendChild(bubble);
      }

      const recentKey = '__pcmc_recent_' + CONFIG.orgId;
      const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');

      suggestions.forEach((text, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'pcmc-pill';
        pill.style.animationDelay = (0.04 + idx * 0.06) + 's';
        pill.innerHTML = '<span>' + escapeHtml(text) + '</span>';
        if (recent.includes(text)) pill.dataset.recent = '1';
        pill.addEventListener('click', () => handleSuggestion(text, recentKey, pill));
        shelf.appendChild(pill);
      });

      const qrToggle = document.createElement('button');
      qrToggle.type = 'button';
      qrToggle.className = 'pcmc-qr-toggle';
      qrToggle.textContent = 'Show QR';
      qrToggle.addEventListener('click', () => {
        qrPanelVisible = !qrPanelVisible;
        qrToggle.textContent = qrPanelVisible ? 'Hide QR' : 'Show QR';
        qrPanel.style.display = qrPanelVisible ? 'block' : 'none';
      });

      const qrPanel = document.createElement('div');
      qrPanel.className = 'pcmc-qr-panel';
      qrPanel.innerHTML = '<div class="pcmc-label">SCAN TO START</div>';
      qrPanel.appendChild(qrCanvas.cloneNode(true));
      qrPanel.innerHTML += '<div style="text-align:center;font-size:12px;color:var(--pcmc-text-soft);">Open on your phone</div>';

      shelf.appendChild(qrToggle);
      shelf.appendChild(qrPanel);

      const footer = document.createElement('div');
      footer.className = 'pcmc-footer';
      footer.innerHTML = `
        <a class="pcmc-powered-link" href="${CONFIG.poweredByUrl}" target="_blank" rel="noopener" aria-label="Visit WoW-Strategies website">
          <span>Powered by <strong>${CONFIG.poweredBy}</strong></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M17 7h10v10"/></svg>
        </a>
      `;
      shelf.appendChild(footer);

      widgetHost.appendChild(shelf);
    }

    function closeShelf() {
      if (!shelf) return;
      shelf.remove();
      shelf = null;
    }

    function handleSuggestion(text, recentKey, pill) {
      const pre = encodeURIComponent(text + ' - ');
      window.open(waBase + '?text=' + pre, '_blank', 'noopener');
      let r = JSON.parse(localStorage.getItem(recentKey) || '[]');
      r = [text, ...r.filter(x => x !== text)].slice(0, 4);
      localStorage.setItem(recentKey, JSON.stringify(r));
      pill.dataset.recent = '1';
    }

    // Auto-open functionality
    if (CONFIG.autoOpen) {
      const key = '__pcmc_auto_' + CONFIG.orgId;
      if (!sessionStorage.getItem(key)) {
        setTimeout(() => {
          openShelf();
          sessionStorage.setItem(key, '1');
        }, CONFIG.openDelay);
      }
    }

    // ESC key to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && shelf) closeShelf();
    });
  }

  // Initialize widget
  injectStyles();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

})();
