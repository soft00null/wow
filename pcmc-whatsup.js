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
    welcome: '👋 Welcome to PCMC Digital Assistant!\n\nI\'m here to help you 24/7 with all municipal services. How can I assist you today?',
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
    { icon: '📋', text: 'Service Information', desc: 'Get details about PCMC services' },
    { icon: '🏠', text: 'Property Tax', desc: 'Pay or check property tax status' },
    { icon: '📝', text: 'Register Grievance', desc: 'Report issues or complaints' },
    { icon: '💧', text: 'Water Services', desc: 'Water connection & billing' },
    { icon: '📄', text: 'Certificates', desc: 'Apply for municipal certificates' },
    { icon: '📞', text: 'Contact Department', desc: 'Connect with specific departments' }
  ];

  // Helper functions
  function escapeHtml(str) {
    return str.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  // Generate proper QR Code URL
  function generateQRUrl(phoneNumber, message = 'Hi') {
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waLink)}&bgcolor=FFFFFF&color=075E54&margin=2`;
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

    // Inject enhanced styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        --wa-green: #25D366;
        --wa-green-dark: #128C7E;
        --wa-teal: #075E54;
        --wa-teal-dark: #054640;
        --wa-light-green: #DCF8C6;
        --wa-blue: #34B7F1;
        --wa-bg-chat: #ECE5DD;
        --wa-bg-light: #FFFFFF;
        --wa-bg-panel: #F0F2F5;
        --wa-text-primary: #1C1E21;
        --wa-text-secondary: #667781;
        --wa-text-tertiary: #8696A0;
        --wa-border: #E4E6EB;
        --wa-border-light: #F0F2F5;
        --wa-shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
        --wa-shadow: 0 4px 12px rgba(0,0,0,0.15);
        --wa-shadow-lg: 0 12px 28px rgba(0,0,0,0.15);
        --wa-shadow-xl: 0 20px 60px rgba(0,0,0,0.3);
        --wa-radius: 12px;
        --wa-launcher-size: 68px;
        --wa-offset: max(24px, env(safe-area-inset-bottom, 24px));
        --wa-transition: cubic-bezier(0.4, 0, 0.2, 1);
        color: var(--wa-text-primary);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      @media (prefers-color-scheme: dark) {
        :host:not(.force-light) {
          --wa-bg-chat: #0B141A;
          --wa-bg-light: #111B21;
          --wa-bg-panel: #202C33;
          --wa-text-primary: #E9EDEF;
          --wa-text-secondary: #8696A0;
          --wa-text-tertiary: #667781;
          --wa-border: #3B4A54;
          --wa-border-light: #2A3942;
          --wa-light-green: #005C4B;
        }
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .wa-launcher {
        position: fixed;
        bottom: var(--wa-offset);
        right: 24px;
        width: var(--wa-launcher-size);
        height: var(--wa-launcher-size);
        border-radius: 50%;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--wa-shadow-lg);
        transition: all .3s var(--wa-transition);
        z-index: 2147483646;
        outline: none;
        overflow: hidden;
        position: relative;
      }
      
      .wa-launcher:before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.1) 100%);
        opacity: 0;
        transition: opacity .3s;
      }
      
      .wa-launcher:hover:before {
        opacity: 1;
      }
      
      .wa-launcher-pulse {
        position: absolute;
        inset: -20px;
        border: 3px solid var(--wa-green);
        border-radius: 50%;
        animation: wa-pulse 2s infinite;
      }
      
      @keyframes wa-pulse {
        0% { transform: scale(0.8); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0; }
        100% { transform: scale(1.2); opacity: 0; }
      }
      
      .wa-launcher:hover {
        transform: scale(1.1) translateY(-2px);
        box-shadow: var(--wa-shadow-xl);
      }
      
      .wa-launcher:active {
        transform: scale(0.95);
      }
      
      .wa-launcher svg {
        width: 32px;
        height: 32px;
        fill: white;
        z-index: 1;
      }
      
      .wa-badge-ai {
        position: absolute;
        top: 0;
        right: 0;
        background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
        color: white;
        font-size: 11px;
        line-height: 1;
        padding: 5px 7px;
        border-radius: 12px;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(255,107,107,.4);
        letter-spacing: 0.5px;
        animation: wa-badge-pop .6s var(--wa-transition);
      }
      
      @keyframes wa-badge-pop {
        0% { transform: scale(0) rotate(-180deg); }
        50% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1) rotate(0); }
      }

      .wa-shelf {
        position: fixed;
        right: 24px;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 16px);
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: min(420px, calc(100vw - 48px));
        z-index: 2147483646;
        animation: wa-shelf-enter .4s var(--wa-transition);
      }
      
      @keyframes wa-shelf-enter {
        0% { 
          opacity: 0; 
          transform: translateY(20px) scale(.95);
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1);
        }
      }

      .wa-bubble {
        background: var(--wa-bg-light);
        padding: 20px;
        border-radius: 16px;
        box-shadow: var(--wa-shadow-lg);
        color: var(--wa-text-primary);
        line-height: 1.6;
        font-size: 15px;
        animation: wa-bubble-in .5s var(--wa-transition);
        position: relative;
        border: 1px solid var(--wa-border-light);
        backdrop-filter: blur(10px);
      }
      
      .wa-bubble-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }
      
      .wa-bubble-avatar {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      
      .wa-bubble-avatar svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
      
      .wa-bubble-info {
        flex: 1;
      }
      
      .wa-bubble-name {
        font-weight: 600;
        font-size: 14px;
        color: var(--wa-text-primary);
      }
      
      .wa-bubble-status {
        font-size: 12px;
        color: var(--wa-green);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .wa-status-dot {
        width: 6px;
        height: 6px;
        background: var(--wa-green);
        border-radius: 50%;
        animation: wa-blink 1.5s infinite;
      }
      
      @keyframes wa-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      .wa-bubble-message {
        white-space: pre-line;
        color: var(--wa-text-primary);
      }
      
      @keyframes wa-bubble-in {
        0% { 
          transform: translateY(10px) translateX(10px) scale(.9); 
          opacity: 0;
        }
        100% { 
          transform: translateY(0) translateX(0) scale(1); 
          opacity: 1;
        }
      }
      
      .wa-bubble:after {
        content: "";
        position: absolute;
        bottom: -8px;
        right: 30px;
        width: 16px;
        height: 16px;
        background: var(--wa-bg-light);
        border-right: 1px solid var(--wa-border-light);
        border-bottom: 1px solid var(--wa-border-light);
        transform: rotate(45deg);
      }
      
      .wa-bubble button.wa-dismiss {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        border: none;
        cursor: pointer;
        background: var(--wa-bg-panel);
        color: var(--wa-text-secondary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .2s;
        font-size: 18px;
      }
      
      .wa-bubble button.wa-dismiss:hover {
        background: var(--wa-text-secondary);
        color: white;
        transform: rotate(90deg);
      }

      .wa-suggestions-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .wa-pill {
        background: var(--wa-bg-light);
        color: var(--wa-text-primary);
        border: 1px solid var(--wa-border);
        border-radius: 16px;
        padding: 14px 18px;
        cursor: pointer;
        text-align: left;
        position: relative;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: var(--wa-shadow-sm);
        transition: all .3s var(--wa-transition);
        animation: wa-pill-in .5s var(--wa-transition) backwards;
        overflow: hidden;
      }
      
      .wa-pill:before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        opacity: 0;
        transition: opacity .3s;
      }
      
      .wa-pill:hover {
        transform: translateX(8px) scale(1.02);
        box-shadow: var(--wa-shadow);
        border-color: var(--wa-green);
      }
      
      .wa-pill:hover:before {
        opacity: 0.05;
      }
      
      .wa-pill:active {
        transform: translateX(4px) scale(.98);
      }
      
      .wa-pill-icon {
        font-size: 24px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--wa-bg-panel);
        border-radius: 12px;
        flex-shrink: 0;
      }
      
      .wa-pill:hover .wa-pill-icon {
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        transform: rotate(-5deg);
      }
      
      .wa-pill:hover .wa-pill-icon {
        filter: grayscale(0%) brightness(1.2);
      }
      
      .wa-pill-content {
        flex: 1;
        min-width: 0;
      }
      
      .wa-pill-text {
        font-weight: 600;
        font-size: 14px;
        color: var(--wa-text-primary);
        margin-bottom: 2px;
      }
      
      .wa-pill-desc {
        font-size: 12px;
        color: var(--wa-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .wa-pill-arrow {
        width: 20px;
        height: 20px;
        color: var(--wa-text-tertiary);
        transition: all .3s;
        flex-shrink: 0;
      }
      
      .wa-pill:hover .wa-pill-arrow {
        color: var(--wa-green);
        transform: translateX(4px);
      }
      
      @keyframes wa-pill-in {
        0% { 
          opacity: 0; 
          transform: translateX(20px) scale(.9);
        }
        100% { 
          opacity: 1; 
          transform: translateX(0) scale(1);
        }
      }
      
      .wa-pill[data-recent="1"] .wa-pill-icon {
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
      }
      
      .wa-pill[data-recent="1"] .wa-pill-icon {
        filter: grayscale(0%);
      }

      .wa-qr-toggle {
        margin-top: 8px;
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        border: none;
        color: white;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        padding: 12px 20px;
        border-radius: 24px;
        transition: all .3s var(--wa-transition);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        box-shadow: var(--wa-shadow);
        animation: wa-pill-in .5s var(--wa-transition) backwards;
        animation-delay: 0.4s;
      }
      
      .wa-qr-toggle:hover {
        transform: translateY(-2px);
        box-shadow: var(--wa-shadow-lg);
      }
      
      .wa-qr-toggle:active {
        transform: translateY(0);
      }
      
      .wa-qr-toggle svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      .wa-qr-panel {
        display: none;
        background: var(--wa-bg-light);
        padding: 24px;
        border-radius: 16px;
        border: 1px solid var(--wa-border);
        box-shadow: var(--wa-shadow-lg);
        animation: wa-bubble-in .4s var(--wa-transition);
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .wa-qr-panel:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
      }
      
      .wa-qr-header {
        margin-bottom: 20px;
      }
      
      .wa-qr-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--wa-text-primary);
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      
      .wa-qr-subtitle {
        font-size: 13px;
        color: var(--wa-text-secondary);
        line-height: 1.5;
      }
      
      .wa-qr-wrapper {
        position: relative;
        display: inline-block;
        padding: 16px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        margin-bottom: 20px;
      }
      
      .wa-qr-wrapper:before {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-green-dark) 100%);
        border-radius: 18px;
        z-index: -1;
        opacity: 0.5;
      }
      
      .wa-qr-panel img {
        width: 200px;
        height: 200px;
        display: block;
        border-radius: 8px;
      }
      
      .wa-qr-steps {
        background: var(--wa-bg-panel);
        border-radius: 12px;
        padding: 16px;
        text-align: left;
      }
      
      .wa-qr-step {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 12px;
        font-size: 13px;
        color: var(--wa-text-primary);
        line-height: 1.5;
      }
      
      .wa-qr-step:last-child {
        margin-bottom: 0;
      }
      
      .wa-qr-step-number {
        width: 24px;
        height: 24px;
        background: var(--wa-green);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 12px;
        flex-shrink: 0;
      }
      
      .wa-qr-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        border: none;
        background: var(--wa-bg-panel);
        color: var(--wa-text-secondary);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .2s;
        font-size: 20px;
      }
      
      .wa-qr-close:hover {
        background: var(--wa-text-secondary);
        color: white;
        transform: rotate(90deg);
      }

      .wa-footer {
        font-size: 12px;
        color: var(--wa-text-tertiary);
        text-align: center;
        background: var(--wa-bg-light);
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px solid var(--wa-border-light);
        line-height: 1.5;
        animation: wa-pill-in .5s var(--wa-transition) backwards;
        animation-delay: 0.5s;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      
      .wa-footer-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .wa-secure-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--wa-green);
        font-weight: 600;
      }
      
      .wa-secure-badge svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
      }
      
      .wa-powered-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        color: var(--wa-text-tertiary);
        transition: color .2s;
      }
      
      .wa-powered-link:hover {
        color: var(--wa-green-dark);
      }
      
      .wa-powered-link svg {
        width: 14px;
        height: 14px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .wa-tooltip {
        position: fixed;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 12px);
        right: 24px;
        background: var(--wa-teal);
        color: white;
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 600;
        border-radius: 8px;
        box-shadow: var(--wa-shadow);
        opacity: 0;
        transform: translateY(5px) scale(.95);
        pointer-events: none;
        transition: all .3s var(--wa-transition);
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
        bottom: -5px;
        right: 34px;
        width: 10px;
        height: 10px;
        background: var(--wa-teal);
        transform: rotate(45deg);
      }

      @media (max-width: 640px) {
        :host { 
          --wa-launcher-size: 60px;
          --wa-offset: 16px;
        }
        .wa-shelf { 
          right: 16px; 
          left: 16px;
          max-width: none;
          bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 12px);
        }
        .wa-launcher { right: 16px; }
        .wa-tooltip { right: 16px; }
        .wa-pill { padding: 12px 16px; }
        .wa-pill-desc { display: none; }
        .wa-footer {
          flex-direction: column;
          gap: 8px;
        }
      }
      
      @media (hover: none) {
        .wa-launcher:hover {
          transform: none;
        }
        .wa-pill:hover {
          transform: none;
        }
      }
    `;
    shadow.appendChild(style);

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'wa-tooltip';
    tooltip.textContent = '💬 Chat with PCMC Assistant';
    shadow.appendChild(tooltip);

    // Create launcher button with pulse effect
    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'wa-launcher';
    launcher.setAttribute('aria-label', 'Open PCMC WhatsApp Assistant');
    launcher.innerHTML = `
      <span class="wa-launcher-pulse"></span>
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
        bubble.innerHTML = `
          <button class="wa-dismiss" aria-label="Dismiss greeting">×</button>
          <div class="wa-bubble-header">
            <div class="wa-bubble-avatar">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div class="wa-bubble-info">
              <div class="wa-bubble-name">PCMC Assistant</div>
              <div class="wa-bubble-status">
                <span class="wa-status-dot"></span>
                Available 24/7
              </div>
            </div>
          </div>
          <div class="wa-bubble-message">${escapeHtml(PCMC_CONFIG.welcome)}</div>
        `;
        bubble.querySelector('.wa-dismiss').addEventListener('click', () => {
          bubble.remove();
          localStorage.setItem(greetKey, '1');
        });
        shelf.appendChild(bubble);
      }

      const suggestionsContainer = document.createElement('div');
      suggestionsContainer.className = 'wa-suggestions-container';
      
      const recentKey = '__pcmc_recent_' + PCMC_CONFIG.orgId;
      const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');

      suggestions.forEach((item, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'wa-pill';
        pill.style.animationDelay = (idx * 0.08) + 's';
        pill.innerHTML = `
          <span class="wa-pill-icon">${item.icon}</span>
          <div class="wa-pill-content">
            <div class="wa-pill-text">${escapeHtml(item.text)}</div>
            <div class="wa-pill-desc">${escapeHtml(item.desc)}</div>
          </div>
          <svg class="wa-pill-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        `;
        if (recent.includes(item.text)) pill.dataset.recent = '1';
        pill.addEventListener('click', () => handleSuggestion(item, recentKey, pill));
        suggestionsContainer.appendChild(pill);
      });
      
      shelf.appendChild(suggestionsContainer);

      const qrToggle = document.createElement('button');
      qrToggle.type = 'button';
      qrToggle.className = 'wa-qr-toggle';
      qrToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13 6h3v-3h-3v3zm-3 0h2v-2h-1v-1h-1v3zm-2-3h1v1h1v-2h-2v1zm4-1v1h1v1h1v-1h1v-1h-3zm3-1h1v-1h-1v1zm-7 2h1v-1h-1v1zm3-2v1h1v-1h-1zm-1 0h-1v1h1v-1zm6 2h1v-1h-1v1zm0 3h1v-2h-1v2z"/>
        </svg>
        <span>Scan QR Code</span>
      `;
      qrToggle.addEventListener('click', () => {
        qrPanelVisible = !qrPanelVisible;
        qrToggle.innerHTML = qrPanelVisible ? `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
          <span>Close QR Code</span>
        ` : `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13 6h3v-3h-3v3zm-3 0h2v-2h-1v-1h-1v3zm-2-3h1v1h1v-2h-2v1zm4-1v1h1v1h1v-1h1v-1h-3zm3-1h1v-1h-1v1zm-7 2h1v-1h-1v1zm3-2v1h1v-1h-1zm-1 0h-1v1h1v-1zm6 2h1v-1h-1v1zm0 3h1v-2h-1v2z"/>
          </svg>
          <span>Scan QR Code</span>
        `;
        qrPanel.style.display = qrPanelVisible ? 'block' : 'none';
      });

      const qrPanel = document.createElement('div');
      qrPanel.className = 'wa-qr-panel';
      qrPanel.innerHTML = `
        <button class="wa-qr-close" aria-label="Close QR panel">×</button>
        <div class="wa-qr-header">
          <div class="wa-qr-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--wa-green)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Quick Connect
          </div>
          <div class="wa-qr-subtitle">Scan the QR code below to instantly start chatting with our AI-powered assistant</div>
        </div>
        <div class="wa-qr-wrapper">
          <img alt="WhatsApp QR Code" src="${qrImageUrl}" />
        </div>
        <div class="wa-qr-steps">
          <div class="wa-qr-step">
            <span class="wa-qr-step-number">1</span>
            <span>Open WhatsApp on your mobile device</span>
          </div>
          <div class="wa-qr-step">
            <span class="wa-qr-step-number">2</span>
            <span>Tap the camera icon in the search bar</span>
          </div>
          <div class="wa-qr-step">
            <span class="wa-qr-step-number">3</span>
            <span>Point your camera at this QR code to scan</span>
          </div>
          <div class="wa-qr-step">
            <span class="wa-qr-step-number">4</span>
            <span>Start chatting with PCMC Assistant instantly!</span>
          </div>
        </div>
      `;
      
      qrPanel.querySelector('.wa-qr-close').addEventListener('click', () => {
        qrPanelVisible = false;
        qrToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13 6h3v-3h-3v3zm-3 0h2v-2h-1v-1h-1v3zm-2-3h1v1h1v-2h-2v1zm4-1v1h1v1h1v-1h1v-1h-3zm3-1h1v-1h-1v1zm-7 2h1v-1h-1v1zm3-2v1h1v-1h-1zm-1 0h-1v1h1v-1zm6 2h1v-1h-1v1zm0 3h1v-2h-1v2z"/>
          </svg>
          <span>Scan QR Code</span>
        `;
        qrPanel.style.display = 'none';
      });

      shelf.appendChild(qrToggle);
      shelf.appendChild(qrPanel);

      const footer = document.createElement('div');
      footer.className = 'wa-footer';
      footer.innerHTML = `
        <div class="wa-footer-left">
          <span class="wa-secure-badge">
            <svg viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Secure Chat
          </span>
        </div>
        <a class="wa-powered-link" href="${PCMC_CONFIG.poweredByUrl}" target="_blank" rel="noopener" aria-label="Visit WoW-Strategies website">
          <span>Powered by <strong>${PCMC_CONFIG.poweredBy}</strong></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M17 7h-10M17 7v10"/></svg>
        </a>
      `;
      shelf.appendChild(footer);

      shadow.appendChild(shelf);
      tooltip.classList.remove('show');
    }

    function closeShelf() {
      if (!shelf) return;
      shelf.style.animation = 'wa-shelf-exit .3s var(--wa-transition)';
      setTimeout(() => {
        shelf.remove();
        shelf = null;
      }, 300);
    }

    function handleSuggestion(item, recentKey, pill) {
      const message = `Hi, I need help with: ${item.text}`;
      const waLink = `${waBase}?text=${encodeURIComponent(message)}`;
      
      window.open(waLink, '_blank', 'noopener');
      
      // Update recent selections
      let r = JSON.parse(localStorage.getItem(recentKey) || '[]');
      r = [item.text, ...r.filter(x => x !== item.text)].slice(0, 4);
      localStorage.setItem(recentKey, JSON.stringify(r));
      pill.dataset.recent = '1';
    }

    // Add exit animation
    const exitStyle = document.createElement('style');
    exitStyle.textContent = `
      @keyframes wa-shelf-exit {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(20px) scale(.95); }
      }
    `;
    shadow.appendChild(exitStyle);

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
