(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.__MMRSRAWidget && window.__MMRSRAWidget.SRA) return;
  window.__MMRSRAWidget = window.__MMRSRAWidget || {};
  window.__MMRSRAWidget.SRA = true;

  // MMR SRA Configuration
  const SRA_CONFIG = {
    orgId: 'MMR_SRA',
    name: 'MMR SRA AI',
    fullName: 'Mumbai Metropolitan Region Slum Rehabilitation Authority',
    marathiName: 'मुंबई महानगर प्रदेश झोपडपट्टी पुनर्वसन प्राधिकरण',
    phone: '8468897208',
    welcome: '👋 नमस्कार! मी मुंबई महानगर प्रदेश झोपडपट्टी पुनर्वसन प्राधिकरणाचा AI असिस्टंट आहे. तुम्ही येथे Annexure II, झोपडपट्टी पुनर्वसन योजना, पात्रता, कागदपत्रे, प्रकरण स्थिती किंवा मदत याबद्दल माहिती मिळवू शकता. मला मराठी आणि इंग्रजी समजते. मी तुमची कशी मदत करू?',
    poweredBy: 'WoW-Strategies Private Limited',
    poweredByUrl: 'https://wow-strategies.com/',
    autoOpen: true,
    openDelay: 1800,
    forceGreet: false,
    suppressGreet: false,
    forceDark: false
  };

  // Action Categories
  const actionItems = [
    {
      id: 'annexure-ii',
      label: 'Annexure II मिळवा (Get Annexure II)',
      icon: '📄',
      message: 'मला Annexure II बद्दल माहिती हवी आहे',
      highlight: true
    },
    {
      id: 'help',
      label: 'मदत मिळवा (Get Help)',
      icon: '🧭',
      message: 'मला SRA प्रक्रियेबद्दल मदत हवी आहे'
    },
    {
      id: 'eligibility',
      label: 'पात्रता तपासा (Check Eligibility)',
      icon: '✅',
      message: 'मला झोपडपट्टी पुनर्वसन योजनेसाठी पात्रता तपासायची आहे'
    },
    {
      id: 'case-status',
      label: 'प्रकरण स्थिती (Check Case Status)',
      icon: '🔎',
      message: 'मला माझ्या SRA प्रकरणाची स्थिती तपासायची आहे'
    },
    {
      id: 'documents',
      label: 'कागदपत्रांची यादी (Documents Required)',
      icon: '📁',
      message: 'SRA प्रक्रियेसाठी कोणती कागदपत्रे लागतात?'
    },
    {
      id: 'scheme-info',
      label: 'योजना माहिती (Scheme Information)',
      icon: '🏘️',
      message: 'मला झोपडपट्टी पुनर्वसन योजनेबद्दल माहिती हवी आहे'
    },
    {
      id: 'grievance',
      label: 'तक्रार नोंदवा (Register Grievance)',
      icon: '📝',
      message: 'मला SRA संबंधित तक्रार नोंदवायची आहे'
    },
    {
      id: 'appointment',
      label: 'भेटीची वेळ (Book Appointment)',
      icon: '📅',
      message: 'मला SRA कार्यालयात भेटीसाठी वेळ हवी आहे'
    }
  ];

  function escapeHtml(str) {
    return String(str).replace(/[&<>"]/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }[c]));
  }

  function generateQRUrl(phoneNumber, message = 'नमस्कार') {
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waLink)}&bgcolor=FFFFFF&color=128C7E&margin=1`;
  }

  async function initWidget() {
    const waBase = `https://wa.me/${SRA_CONFIG.phone}`;
    const defaultMsg = 'नमस्कार, मला SRA बद्दल मदत हवी आहे';
    const qrImageUrl = generateQRUrl(SRA_CONFIG.phone, defaultMsg);

    const host = document.createElement('div');
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    if (SRA_CONFIG.forceDark) host.classList.add('force-dark');

    const style = document.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        --wa-green: #128C7E;
        --wa-green-dark: #075E54;
        --wa-teal: #00897B;
        --wa-teal-dark: #00695C;
        --wa-light-green: #E8F5E9;
        --wa-bg-light: #FFFFFF;
        --wa-bg-panel: #F8F9FA;
        --wa-text-primary: #1A1A1A;
        --wa-text-secondary: #5F6368;
        --wa-border: #E0E0E0;
        --wa-shadow: 0 4px 6px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.06);
        --wa-shadow-strong: 0 10px 40px rgba(0,0,0,.15);
        --wa-shadow-hover: 0 20px 50px rgba(0,0,0,.2);
        --wa-launcher-size: 60px;
        --wa-offset: max(20px, env(safe-area-inset-bottom, 20px));
        color: var(--wa-text-primary);
      }

      @media (prefers-color-scheme: dark) {
        :host:not(.force-light) {
          --wa-green: #00BFA5;
          --wa-green-dark: #00897B;
          --wa-bg-light: #1E1E1E;
          --wa-bg-panel: #2C2C2C;
          --wa-text-primary: #FFFFFF;
          --wa-text-secondary: #B0B0B0;
          --wa-border: #424242;
          --wa-light-green: #004D40;
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
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--wa-shadow-strong);
        transition: all .3s cubic-bezier(.4,0,.2,1);
        z-index: 2147483646;
        outline: none;
        animation: wa-pulse 3s infinite;
      }

      @keyframes wa-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(18, 140, 126, .4), var(--wa-shadow-strong); }
        50% { box-shadow: 0 0 0 20px rgba(18, 140, 126, 0), var(--wa-shadow-strong); }
      }

      .wa-launcher:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: var(--wa-shadow-hover);
      }

      .wa-launcher svg {
        width: 55%;
        height: 55%;
        fill: white;
      }

      .wa-badge-ai {
        position: absolute;
        top: -4px;
        right: -4px;
        background: linear-gradient(135deg, #7B61FF 0%, #6246EA 100%);
        color: white;
        font-size: 10px;
        line-height: 1;
        padding: 5px 6px;
        border-radius: 12px;
        font-weight: 800;
        box-shadow: 0 2px 8px rgba(98, 70, 234, .4);
        letter-spacing: .5px;
        border: 2px solid var(--wa-bg-light);
      }

      .wa-shelf {
        position: fixed;
        right: 20px;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 15px);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        max-width: min(440px, calc(100vw - 40px));
        z-index: 2147483646;
        animation: wa-slide-up .5s cubic-bezier(.4,0,.2,1);
      }

      @keyframes wa-slide-up {
        0% { opacity: 0; transform: translateY(30px) scale(.92); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      .wa-bubble {
        background: var(--wa-bg-light);
        padding: 18px 42px 16px 20px;
        border-radius: 20px;
        box-shadow: var(--wa-shadow-strong);
        color: var(--wa-text-primary);
        line-height: 1.6;
        font-size: 14px;
        max-width: 100%;
        position: relative;
        border: 1px solid var(--wa-border);
      }

      .wa-bubble:after {
        content: "";
        position: absolute;
        bottom: -7px;
        right: 28px;
        width: 14px;
        height: 14px;
        background: var(--wa-bg-light);
        border-right: 1px solid var(--wa-border);
        border-bottom: 1px solid var(--wa-border);
        transform: rotate(45deg);
      }

      .wa-dismiss {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 22px;
        height: 22px;
        border: none;
        cursor: pointer;
        background: transparent;
        color: var(--wa-text-secondary);
        border-radius: 50%;
        font-size: 16px;
        line-height: 1;
      }

      .wa-pill {
        background: var(--wa-bg-light);
        color: var(--wa-text-primary);
        border: 1px solid var(--wa-border);
        border-radius: 30px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--wa-shadow);
        transition: all .3s cubic-bezier(.4,0,.2,1);
        max-width: 100%;
        width: fit-content;
        white-space: nowrap;
      }

      .wa-pill:hover {
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        color: white;
        border-color: transparent;
        transform: translateY(-3px) translateX(-5px) scale(1.02);
        box-shadow: 0 8px 20px rgba(18, 140, 126, .35);
      }

      .wa-pill.wa-highlight {
        background: linear-gradient(135deg, #FF8C00 0%, #FF6D00 100%);
        color: white;
        border-color: transparent;
        font-weight: 800;
        font-size: 15px;
        padding: 14px 22px;
        box-shadow: 0 6px 15px rgba(255, 109, 0, .3);
      }

      .wa-pill.wa-highlight:hover {
        background: linear-gradient(135deg, #FF6D00 0%, #DD2C00 100%);
        box-shadow: 0 8px 20px rgba(221, 44, 0, .4);
      }

      .wa-pill-icon {
        font-size: 16px;
        line-height: 1;
      }

      .wa-pill[data-recent="1"]:not(.wa-highlight) {
        background: linear-gradient(135deg, var(--wa-light-green) 0%, rgba(18, 140, 126, .08) 100%);
        border-color: var(--wa-green);
      }

      .wa-qr-toggle {
        margin-top: 6px;
        background: transparent;
        border: 2px solid var(--wa-green);
        color: var(--wa-green);
        font-size: 13px;
        cursor: pointer;
        padding: 10px 18px;
        border-radius: 25px;
        font-weight: 700;
        align-self: flex-end;
      }

      .wa-qr-toggle:hover {
        background: var(--wa-green);
        color: white;
      }

      .wa-qr-panel {
        display: none;
        background: var(--wa-bg-light);
        padding: 24px;
        border-radius: 20px;
        border: 1px solid var(--wa-border);
        box-shadow: var(--wa-shadow-strong);
        align-self: flex-end;
        text-align: center;
      }

      .wa-qr-panel img {
        width: 180px;
        height: 180px;
        display: block;
        margin: 0 auto 16px;
        border-radius: 12px;
        background: white;
        padding: 10px;
        border: 1px solid var(--wa-border);
      }

      .wa-label {
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        color: var(--wa-green);
        margin-bottom: 16px;
      }

      .wa-scan-text {
        font-size: 13px;
        color: var(--wa-text-secondary);
        line-height: 1.6;
        font-weight: 500;
      }

      .wa-scan-text strong {
        color: var(--wa-green);
        font-weight: 700;
      }

      .wa-ai-features {
        font-size: 11px;
        color: #7B61FF;
        font-weight: 600;
        margin-top: 8px;
        display: block;
      }

      .wa-footer {
        font-size: 11px;
        color: var(--wa-text-secondary);
        text-align: center;
        background: linear-gradient(135deg, var(--wa-bg-light) 0%, var(--wa-bg-panel) 100%);
        padding: 10px 16px;
        border-radius: 15px;
        border: 1px solid var(--wa-border);
        line-height: 1.5;
        align-self: flex-end;
      }

      .wa-powered-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        color: var(--wa-text-secondary);
        font-weight: 600;
        justify-content: center;
      }

      .wa-powered-link:hover {
        color: var(--wa-green);
      }

      .wa-powered-link svg {
        width: 12px;
        height: 12px;
        stroke: currentColor;
        stroke-width: 2.5;
        fill: none;
      }

      .wa-tooltip {
        position: fixed;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 12px);
        right: 20px;
        background: linear-gradient(135deg, var(--wa-teal) 0%, var(--wa-teal-dark) 100%);
        color: white;
        padding: 10px 16px;
        font-size: 12px;
        font-weight: 600;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,.15);
        opacity: 0;
        transform: translateY(8px) scale(.9);
        pointer-events: none;
        transition: all .3s;
        white-space: nowrap;
        z-index: 2147483646;
      }

      .wa-tooltip.show {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      @media (max-width: 640px) {
        :host { --wa-launcher-size: 54px; }
        .wa-shelf {
          right: 15px;
          bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 12px);
          gap: 8px;
        }
        .wa-launcher { right: 15px; }
        .wa-tooltip { right: 15px; font-size: 11px; }
        .wa-pill {
          font-size: 13px;
          padding: 10px 16px;
          white-space: normal;
          text-align: left;
        }
        .wa-pill.wa-highlight {
          font-size: 14px;
          padding: 12px 18px;
        }
        .wa-qr-panel { padding: 20px; }
      }
    `;
    shadow.appendChild(style);

    const tooltip = document.createElement('div');
    tooltip.className = 'wa-tooltip';
    tooltip.textContent = 'MMR SRA AI Assistant';
    shadow.appendChild(tooltip);

    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'wa-launcher';
    launcher.setAttribute('aria-label', 'Open MMR SRA AI Assistant');
    launcher.innerHTML = `
      <span class="wa-badge-ai">AI</span>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `;
    shadow.appendChild(launcher);

    let shelf = null;
    let qrPanelVisible = false;

    launcher.addEventListener('mouseenter', () => tooltip.classList.add('show'));
    launcher.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
    launcher.addEventListener('focus', () => tooltip.classList.add('show'));
    launcher.addEventListener('blur', () => tooltip.classList.remove('show'));
    launcher.addEventListener('click', () => {
      shelf ? closeShelf() : openShelf();
    });

    function openShelf() {
      if (shelf) return;

      shelf = document.createElement('div');
      shelf.className = 'wa-shelf';
      shelf.setAttribute('role', 'dialog');
      shelf.setAttribute('aria-label', 'MMR SRA AI Assistant');

      const greetKey = '__mmr_sra_greeting_dismiss_' + SRA_CONFIG.orgId;
      const showGreeting = !SRA_CONFIG.suppressGreet && (SRA_CONFIG.forceGreet || !localStorage.getItem(greetKey));

      if (showGreeting) {
        const bubble = document.createElement('div');
        bubble.className = 'wa-bubble';
        bubble.innerHTML = '<button class="wa-dismiss" aria-label="Dismiss greeting">×</button>' + escapeHtml(SRA_CONFIG.welcome);
        bubble.querySelector('.wa-dismiss').addEventListener('click', () => {
          bubble.remove();
          localStorage.setItem(greetKey, '1');
        });
        shelf.appendChild(bubble);
      }

      const recentKey = '__mmr_sra_recent_' + SRA_CONFIG.orgId;
      const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');

      actionItems.forEach((item, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'wa-pill';

        if (item.highlight) {
          pill.classList.add('wa-highlight');
        }

        pill.style.animationDelay = (idx * 0.08) + 's';
        pill.innerHTML = `<span class="wa-pill-icon">${item.icon}</span> <span>${escapeHtml(item.label)}</span>`;

        if (recent.includes(item.id) && !item.highlight) {
          pill.dataset.recent = '1';
        }

        pill.addEventListener('click', () => handleAction(item, recentKey, pill));
        shelf.appendChild(pill);
      });

      const qrToggle = document.createElement('button');
      qrToggle.type = 'button';
      qrToggle.className = 'wa-qr-toggle';
      qrToggle.textContent = '📱 Scan QR Code';

      const qrPanel = document.createElement('div');
      qrPanel.className = 'wa-qr-panel';
      qrPanel.innerHTML = `
        <div class="wa-label">SRA Help & Services</div>
        <img alt="WhatsApp QR Code" src="${qrImageUrl}" />
        <div class="wa-scan-text">
          <strong>MMR SRA AI शी चॅट करा!</strong><br>
          Annexure II, पात्रता, कागदपत्रे किंवा मदत मिळवा<br>
          <span class="wa-ai-features">मराठी • English • Audio • Image</span>
        </div>
      `;

      qrToggle.addEventListener('click', () => {
        qrPanelVisible = !qrPanelVisible;
        qrToggle.textContent = qrPanelVisible ? '✕ Close QR' : '📱 Scan QR Code';
        qrPanel.style.display = qrPanelVisible ? 'block' : 'none';
      });

      shelf.appendChild(qrToggle);
      shelf.appendChild(qrPanel);

      const footer = document.createElement('div');
      footer.className = 'wa-footer';
      footer.innerHTML = `
        <a class="wa-powered-link" href="${SRA_CONFIG.poweredByUrl}" target="_blank" rel="noopener" aria-label="Visit WoW-Strategies website">
          <span>Powered by <strong>${escapeHtml(SRA_CONFIG.poweredBy)}</strong></span>
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
      qrPanelVisible = false;
    }

    function handleAction(item, recentKey, pill) {
      const waLink = `${waBase}?text=${encodeURIComponent(item.message)}`;
      window.open(waLink, '_blank', 'noopener');

      let recent = JSON.parse(localStorage.getItem(recentKey) || '[]');
      recent = [item.id, ...recent.filter(id => id !== item.id)].slice(0, 4);
      localStorage.setItem(recentKey, JSON.stringify(recent));

      if (!item.highlight) {
        pill.dataset.recent = '1';
      }
    }

    if (SRA_CONFIG.autoOpen) {
      const key = '__mmr_sra_auto_opened_' + SRA_CONFIG.orgId;
      if (!sessionStorage.getItem(key)) {
        setTimeout(() => {
          openShelf();
          sessionStorage.setItem(key, '1');
        }, SRA_CONFIG.openDelay);
      }
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && shelf) closeShelf();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
