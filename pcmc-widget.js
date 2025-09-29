(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.__PCMCWidget && window.__PCMCWidget.PCMC) return;
  window.__PCMCWidget = window.__PCMCWidget || {};
  window.__PCMCWidget.PCMC = true;

  // PCMC Configuration with WhatsApp colors
  const PCMC_CONFIG = {
    orgId: 'PCMC',
    name: 'PCMC',
    fullName: 'Pimpri-Chinchwad Municipal Corporation',
    phone: '918888006666',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Official_Logo_of_PCMC.jpeg',
    welcome: '🤖✨ Welcome to PCMC AI Assistant! I\'m powered by advanced AI to help you 24/7 with municipal services. How can I assist you today?',
    poweredBy: 'WoW-Strategies Private Limited',
    poweredByUrl: 'https://wow-strategies.com/',
    autoOpen: true,
    openDelay: 1800,
    forceGreet: false,
    suppressGreet: false,
    forceDark: false
  };

  // Updated suggestions for PCMC services
  const suggestions = [
    '📋 Get Information',
    '🏠 Property Tax',
    '📝 Register Grievance', 
    '📞 Contact Department',
    '💧 Water Services',
    '📜 Certificates'
  ];

  // Helper functions
  function esc(str) {
    return (str || '')
      .replace(/\\/g,'\\\\')
      .replace(/`/g,'\\`')
      .replace(/\$/g,'\\$')
      .replace(/\r?\n/g,'\\n');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  // Generate actual QR Code using canvas
  function generateQRCode(text) {
    const size = 180;
    const modules = 25;
    const moduleSize = size / modules;
    
    // Create simple QR pattern (for demo - in production use QR library)
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Generate QR pattern
    ctx.fillStyle = '#000000';
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        if (Math.random() > 0.5 || 
            (row < 7 && col < 7) || 
            (row < 7 && col > modules - 8) || 
            (row > modules - 8 && col < 7)) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    
    // Add PCMC logo in center
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size/2 - 25, size/2 - 25, 50, 50);
    ctx.fillStyle = '#128c7e';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PCMC', size/2, size/2 + 5);
    
    return canvas.toDataURL();
  }

  // Build and inject widget
  async function initWidget() {
    const waBase = `https://wa.me/${PCMC_CONFIG.phone}`;
    const defaultMsg = encodeURIComponent(`Hi, I need assistance from ${PCMC_CONFIG.name}`);
    const waDefaultLink = `${waBase}?text=${defaultMsg}`;
    const qrDataUrl = generateQRCode(waDefaultLink);

    // Create host element
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    if (PCMC_CONFIG.forceDark) host.classList.add('force-dark');

    // Enhanced styles with WhatsApp colors and animations
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600;700&display=swap');
      
      :host {
        all: initial;
        font-family: "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
        --wa-primary: #25d366;
        --wa-primary-dark: #128c7e;
        --wa-primary-rgb: 37,211,102;
        --wa-secondary: #075e54;
        --wa-accent: #00bfa5;
        --wa-bg: #ffffff;
        --wa-bg-chat: #e5ddd5;
        --wa-bubble-out: #dcf8c6;
        --wa-text: #303030;
        --wa-text-soft: #667781;
        --wa-border: #dfe5e7;
        --wa-radius: 8px;
        --wa-shadow-elev: 0 20px 60px -10px rgba(18,140,126,.4), 0 10px 30px -5px rgba(0,0,0,.15);
        --wa-shadow-soft: 0 4px 20px -4px rgba(18,140,126,.25);
        --wa-glass: rgba(255,255,255,0.95);
        --wa-launcher-size: 72px;
        --wa-offset: max(24px, env(safe-area-inset-bottom, 24px));
        color: var(--wa-text);
      }
      
      @media (prefers-color-scheme: dark) {
        :host:not(.force-light) {
          --wa-bg: #111b21;
          --wa-bg-chat: #0b141a;
          --wa-bubble-out: #005c4b;
          --wa-text: #e9edef;
          --wa-text-soft: #8696a0;
          --wa-border: #222d34;
          --wa-glass: rgba(17,27,33,0.95);
        }
      }

      /* AI Glow Animation */
      @keyframes ai-glow {
        0%, 100% { 
          filter: drop-shadow(0 0 10px rgba(37,211,102,0.5)) 
                  drop-shadow(0 0 20px rgba(37,211,102,0.3));
        }
        50% { 
          filter: drop-shadow(0 0 20px rgba(37,211,102,0.8)) 
                  drop-shadow(0 0 40px rgba(37,211,102,0.5));
        }
      }

      /* Launcher Button with WhatsApp styling */
      .wa-launcher {
        position: fixed;
        bottom: var(--wa-offset);
        right: 24px;
        width: var(--wa-launcher-size);
        height: var(--wa-launcher-size);
        border-radius: 50%;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, var(--wa-primary), var(--wa-primary-dark));
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 12px 35px -8px rgba(var(--wa-primary-rgb),0.6), 
                    0 5px 15px -3px rgba(0,0,0,0.2);
        animation: wa-pulse 3s ease-in-out infinite;
        transition: all .4s cubic-bezier(.175,.885,.32,1.275);
        z-index:2147483646;
        outline:none;
        overflow: hidden;
        position: relative;
      }
      
      /* Ripple effect on launcher */
      @keyframes wa-pulse {
        0% { 
          box-shadow: 0 12px 35px -8px rgba(var(--wa-primary-rgb),0.6), 
                      0 5px 15px -3px rgba(0,0,0,0.2),
                      0 0 0 0 rgba(var(--wa-primary-rgb),0.6);
        }
        70% { 
          box-shadow: 0 12px 35px -8px rgba(var(--wa-primary-rgb),0.6), 
                      0 5px 15px -3px rgba(0,0,0,0.2),
                      0 0 0 25px rgba(var(--wa-primary-rgb),0);
        }
        100% { 
          box-shadow: 0 12px 35px -8px rgba(var(--wa-primary-rgb),0.6), 
                      0 5px 15px -3px rgba(0,0,0,0.2),
                      0 0 0 0 rgba(var(--wa-primary-rgb),0);
        }
      }
      
      .wa-launcher:hover {
        transform: scale(1.1) rotate(10deg);
        box-shadow: 0 16px 45px -10px rgba(var(--wa-primary-rgb),0.7), 
                    0 8px 20px -5px rgba(0,0,0,0.3);
      }
      
      .wa-launcher:active {
        transform: scale(0.95);
      }
      
      /* WhatsApp Icon */
      .wa-launcher svg {
        width:60%; height:60%;
        fill: white;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,.25));
        z-index: 2;
        position: relative;
      }
      
      /* AI Badge with animation */
      .wa-badge-ai {
        position:absolute;
        top:-2px; right:-2px;
        background: linear-gradient(135deg, #ff6b6b, #ff2e63);
        color:#fff;
        font-size:10px;
        line-height:1;
        padding:5px 8px 6px;
        border-radius:16px;
        font-weight:700;
        box-shadow:0 4px 12px -2px rgba(255,46,99,.6);
        letter-spacing:1px;
        animation: badge-bounce 2s ease-in-out infinite, ai-glow 2s ease-in-out infinite;
        z-index: 3;
      }
      
      @keyframes badge-bounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.05) rotate(5deg); }
      }

      /* PCMC Logo in launcher */
      .wa-launcher-logo {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 22px;
        height: 22px;
        background: white;
        border-radius: 50%;
        padding: 2px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        overflow: hidden;
      }
      
      .wa-launcher-logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      /* Chat shelf with WhatsApp styling */
      .wa-shelf {
        position: fixed;
        right: 24px;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 16px);
        display:flex;
        flex-direction:column;
        align-items:flex-end;
        gap:12px;
        max-width: min(380px, calc(100vw - 48px));
        z-index:2147483646;
        animation: shelf-slide-up .5s cubic-bezier(.175,.885,.32,1.275);
      }
      
      @keyframes shelf-slide-up {
        0% { 
          opacity:0; 
          transform: translateY(30px) scale(.9);
        }
        60% {
          transform: translateY(-5px) scale(1.02);
        }
        100% { 
          opacity:1; 
          transform: translateY(0) scale(1);
        }
      }

      /* Welcome bubble with WhatsApp style */
      .wa-bubble {
        background: var(--wa-glass);
        backdrop-filter: blur(20px) saturate(1.8);
        -webkit-backdrop-filter: blur(20px) saturate(1.8);
        padding:16px 20px 14px;
        border-radius: 18px;
        border:1px solid var(--wa-border);
        box-shadow: var(--wa-shadow-elev);
        color: var(--wa-text);
        line-height:1.6;
        font-size:14px;
        animation: bubble-pop .6s cubic-bezier(.175,.885,.32,1.275);
        max-width:100%;
        position:relative;
        background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
      }
      
      @keyframes bubble-pop {
        0% { 
          transform: scale(0) translateY(20px);
          opacity:0;
        }
        50% { 
          transform: scale(1.05) translateY(-5px);
        }
        100% { 
          transform: scale(1) translateY(0);
          opacity:1;
        }
      }
      
      /* Tail for bubble */
      .wa-bubble:after {
        content:"";
        position:absolute;
        bottom:-8px; right:28px;
        width:16px; height:16px;
        background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
        border:1px solid var(--wa-border);
        border-left:none; border-top:none;
        transform: rotate(45deg);
      }
      
      /* Dismiss button */
      .wa-bubble button.wa-dismiss {
        position:absolute;
        top:8px; right:8px;
        width:26px; height:26px;
        border:none; cursor:pointer;
        background: rgba(0,0,0,0.05);
        color: var(--wa-text-soft);
        backdrop-filter: blur(10px);
        border-radius:50%;
        font-size:16px;
        display:flex; align-items:center; justify-content:center;
        transition: all .3s;
      }
      
      .wa-bubble button.wa-dismiss:hover { 
        background: rgba(255,0,0,0.1);
        color: #ff4444;
        transform: rotate(90deg);
      }

      /* Action Pills with WhatsApp style */
      .wa-pill {
        background: var(--wa-bg);
        color: var(--wa-text);
        border: 2px solid var(--wa-primary);
        border-radius: 25px;
        padding: 14px 20px;
        font-size:14px;
        font-weight:500;
        cursor:pointer;
        text-align:left;
        position:relative;
        overflow:hidden;
        display:inline-flex;
        align-items:center;
        gap:12px;
        box-shadow: 0 4px 15px -3px rgba(var(--wa-primary-rgb),0.3);
        backdrop-filter: blur(10px);
        transition: all .4s cubic-bezier(.175,.885,.32,1.275);
        animation: pill-slide-in .6s cubic-bezier(.175,.885,.32,1.275) backwards;
        max-width:100%;
        width: fit-content;
        white-space: nowrap;
      }
      
      @keyframes pill-slide-in {
        0% { 
          opacity:0; 
          transform: translateX(50px) scale(.8);
        }
        100% { 
          opacity:1; 
          transform: translateX(0) scale(1);
        }
      }
      
      /* Gradient overlay on hover */
      .wa-pill:before {
        content:"";
        position:absolute;
        inset:0;
        background: linear-gradient(135deg, var(--wa-primary), var(--wa-primary-dark));
        opacity:0;
        transition: opacity .4s;
        z-index:0;
      }
      
      .wa-pill span { 
        position:relative; 
        z-index:1;
        font-weight: 600;
      }
      
      .wa-pill:hover {
        color:#fff;
        border-color: var(--wa-primary);
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 8px 25px -5px rgba(var(--wa-primary-rgb),0.5);
      }
      
      .wa-pill:hover:before { opacity:1; }
      
      .wa-pill:active {
        transform: translateY(-2px) scale(1.02);
      }
      
      /* Recently used indicator */
      .wa-pill[data-recent="1"] {
        border-color: var(--wa-accent);
        background: linear-gradient(135deg, rgba(37,211,102,0.1), rgba(18,140,126,0.1));
      }
      
      .wa-pill[data-recent="1"]:after {
        content:"✓";
        position:absolute;
        top:4px; right:8px;
        font-size:10px;
        color: var(--wa-primary);
        font-weight:bold;
      }

      /* QR Toggle button */
      .wa-qr-toggle {
        margin-top:4px;
        background: linear-gradient(135deg, var(--wa-primary), var(--wa-primary-dark));
        border:none;
        color: white;
        font-size:13px;
        cursor:pointer;
        padding: 10px 16px;
        border-radius: 20px;
        font-weight:600;
        transition: all .3s;
        align-self:flex-end;
        box-shadow: 0 4px 15px -3px rgba(var(--wa-primary-rgb),0.4);
      }
      
      .wa-qr-toggle:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px -4px rgba(var(--wa-primary-rgb),0.5);
      }

      /* QR Panel with animation */
      .wa-qr-panel {
        display:none;
        background: var(--wa-glass);
        backdrop-filter: blur(20px) saturate(1.8);
        padding:20px;
        border-radius: 20px;
        border:1px solid var(--wa-border);
        box-shadow: var(--wa-shadow-elev);
        animation: qr-flip-in .6s cubic-bezier(.175,.885,.32,1.275);
        align-self:flex-end;
        text-align:center;
        background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
      }
      
      @keyframes qr-flip-in {
        0% { 
          transform: rotateY(90deg) scale(0.8);
          opacity:0;
        }
        100% { 
          transform: rotateY(0) scale(1);
          opacity:1;
        }
      }
      
      .wa-qr-panel canvas,
      .wa-qr-panel img {
        width:180px; height:180px;
        display:block;
        margin:0 auto 12px;
        border-radius: 12px;
        box-shadow: 0 4px 20px -4px rgba(0,0,0,0.2);
        background: white;
        padding: 10px;
      }
      
      .wa-qr-panel .wa-label {
        font-size:12px;
        letter-spacing:1.5px;
        font-weight:700;
        text-transform:uppercase;
        text-align:center;
        color: var(--wa-primary-dark);
        margin-bottom:12px;
        animation: text-glow 2s ease-in-out infinite;
      }
      
      @keyframes text-glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      /* Footer with branding */
      .wa-footer {
        font-size:11px;
        color: var(--wa-text-soft);
        text-align:center;
        background: var(--wa-glass);
        padding:8px 12px;
        border-radius:16px;
        border:1px solid var(--wa-border);
        backdrop-filter: blur(10px);
        line-height:1.4;
        align-self:flex-end;
        animation: footer-fade-in 1s ease-out .8s backwards;
      }
      
      @keyframes footer-fade-in {
        0% { opacity:0; transform: translateY(10px); }
        100% { opacity:1; transform: translateY(0); }
      }
      
      .wa-powered-link {
        display:inline-flex;
        align-items:center;
        gap:8px;
        text-decoration:none;
        color: var(--wa-text-soft);
        font-weight:600;
        position:relative;
        padding:6px 12px;
        border-radius:14px;
        background: linear-gradient(135deg, rgba(37,211,102,0.1), rgba(18,140,126,0.1));
        transition: all .3s;
      }
      
      .wa-powered-link:hover {
        background: linear-gradient(135deg, var(--wa-primary), var(--wa-primary-dark));
        color: white;
        transform: scale(1.05);
      }
      
      .wa-powered-link svg {
        width:14px;
        height:14px;
        stroke: currentColor;
        stroke-width:2;
        fill:none;
        transition: transform .3s;
      }
      
      .wa-powered-link:hover svg {
        transform: translate(2px, -2px);
      }

      /* Tooltip with AI emphasis */
      .wa-tooltip {
        position:fixed;
        bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 12px);
        right: 24px;
        background: linear-gradient(135deg, var(--wa-primary), var(--wa-primary-dark));
        color: white;
        padding:10px 16px;
        font-size:13px;
        font-weight: 600;
        border-radius: 14px;
        box-shadow: 0 8px 24px -6px rgba(var(--wa-primary-rgb),0.5);
        opacity:0;
        transform: translateY(10px) scale(.9);
        pointer-events:none;
        transition: all .4s cubic-bezier(.175,.885,.32,1.275);
        white-space:nowrap;
        z-index:2147483647;
      }
      
      .wa-tooltip.show {
        opacity:1;
        transform: translateY(0) scale(1);
      }
      
      .wa-tooltip:before {
        content:"✨";
        margin-right:6px;
        animation: sparkle 1.5s ease-in-out infinite;
      }
      
      @keyframes sparkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }

      /* Loading animation */
      .wa-loading {
        display: inline-block;
        position: relative;
        width: 60px;
        height: 60px;
      }
      
      .wa-loading:after {
        content: " ";
        display: block;
        border-radius: 50%;
        width: 46px;
        height: 46px;
        margin: 7px;
        border: 5px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: wa-loading-spin 1.2s linear infinite;
      }
      
      @keyframes wa-loading-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Mobile responsiveness */
      @media (max-width:640px) {
        :host { --wa-launcher-size:64px; }
        .wa-shelf { right: 16px; bottom: calc(var(--wa-offset) + var(--wa-launcher-size) + 12px); }
        .wa-launcher { right:16px; }
        .wa-tooltip { right:16px; font-size: 12px; }
        .wa-pill { padding: 12px 16px; font-size: 13px; }
      }
      
      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .wa-launcher, .wa-pill, .wa-bubble, .wa-tooltip, .wa-shelf, .wa-qr-panel { 
          animation: none !important; 
          transition: opacity .3s, visibility .3s !important; 
        }
      }
    `;
    shadow.appendChild(style);

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className='wa-tooltip';
    tooltip.textContent='AI-Powered PCMC Assistant';
    shadow.appendChild(tooltip);

    // Create launcher button with PCMC logo
    const launcher = document.createElement('button');
    launcher.type='button';
    launcher.className='wa-launcher';
    launcher.setAttribute('aria-label','Open PCMC AI WhatsApp Assistant');
    launcher.innerHTML = `
      <span class="wa-badge-ai">AI</span>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <div class="wa-launcher-logo">
        <img src="${PCMC_CONFIG.logo}" alt="PCMC" onerror="this.style.display='none'">
      </div>
    `;
    shadow.appendChild(launcher);

    let shelf = null;
    let qrPanelVisible = false;

    // Tooltip events
    launcher.addEventListener('mouseenter',()=> tooltip.classList.add('show'));
    launcher.addEventListener('mouseleave',()=> tooltip.classList.remove('show'));
    launcher.addEventListener('focus',()=> tooltip.classList.add('show'));
    launcher.addEventListener('blur',()=> tooltip.classList.remove('show'));
    launcher.addEventListener('click', () => { shelf ? closeShelf() : openShelf(); });

    function openShelf() {
      if (shelf) return;
      shelf = document.createElement('div');
      shelf.className='wa-shelf';
      shelf.setAttribute('role','dialog');
      shelf.setAttribute('aria-label','PCMC AI WhatsApp Assistant');

      const greetKey = '__pcmc_greeting_dismiss_'+PCMC_CONFIG.orgId;
      const showGreeting = !PCMC_CONFIG.suppressGreet && (PCMC_CONFIG.forceGreet || !localStorage.getItem(greetKey));

      if (showGreeting) {
        const bubble = document.createElement('div');
        bubble.className='wa-bubble';
        bubble.innerHTML = '<button class="wa-dismiss" aria-label="Dismiss greeting">&times;</button>' + escapeHtml(PCMC_CONFIG.welcome);
        bubble.querySelector('.wa-dismiss').addEventListener('click', () => {
          bubble.remove();
          localStorage.setItem(greetKey,'1');
        });
        shelf.appendChild(bubble);
      }

      const recentKey = '__pcmc_recent_fixed4_'+PCMC_CONFIG.orgId;
      const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');

      suggestions.forEach((text, idx) => {
        const pill = document.createElement('button');
        pill.type='button';
        pill.className='wa-pill';
        pill.style.animationDelay = (idx*0.1)+'s';
        pill.innerHTML = '<span>'+escapeHtml(text)+'</span>';
        if (recent.includes(text)) pill.dataset.recent='1';
        pill.addEventListener('click', () => handleSuggestion(text, recentKey, pill));
        pill.addEventListener('keydown', e => {
          if (e.key==='Enter' || e.key===' ') { 
            e.preventDefault(); 
            handleSuggestion(text, recentKey, pill); 
          }
        });
        shelf.appendChild(pill);
      });

      const qrToggle = document.createElement('button');
      qrToggle.type='button';
      qrToggle.className='wa-qr-toggle';
      qrToggle.textContent='📱 Show QR Code';
      qrToggle.addEventListener('click', () => {
        qrPanelVisible = !qrPanelVisible;
        qrToggle.textContent = qrPanelVisible ? '✖ Hide QR Code' : '📱 Show QR Code';
        qrPanel.style.display = qrPanelVisible ? 'block' : 'none';
      });

      const qrPanel = document.createElement('div');
      qrPanel.className='wa-qr-panel';
      qrPanel.innerHTML = `
        <div class="wa-label">🚀 SCAN TO CONNECT</div>
        <img alt="WhatsApp QR" src="${qrDataUrl}"/>
        <div style="text-align:center;font-size:13px;color:var(--wa-text-soft);font-weight:500;">
          Instant AI Support on WhatsApp
        </div>
      `;

      shelf.appendChild(qrToggle);
      shelf.appendChild(qrPanel);

      const footer = document.createElement('div');
      footer.className='wa-footer';
      footer.innerHTML =
        '<a class="wa-powered-link" href="'+PCMC_CONFIG.poweredByUrl+'" target="_blank" rel="noopener" aria-label="Visit WoW-Strategies website">' +
        '<span>Powered by <strong>'+PCMC_CONFIG.poweredBy+'</strong></span>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>' +
        '</a>';
      shelf.appendChild(footer);

      shadow.appendChild(shelf);
    }

    function closeShelf() {
      if (!shelf) return;
      shelf.remove();
      shelf = null;
    }

    function handleSuggestion(text, recentKey, pill) {
      const cleanText = text.replace(/^[^\s]+\s/, ''); // Remove emoji
      const pre = encodeURIComponent('Hi, I need help with ' + cleanText);
      window.open(waBase + '?text=' + pre, '_blank', 'noopener');
      let r = JSON.parse(localStorage.getItem(recentKey) || '[]');
      r = [text, ...r.filter(x=>x!==text)].slice(0,4);
      localStorage.setItem(recentKey, JSON.stringify(r));
      pill.dataset.recent='1';
    }

    if (PCMC_CONFIG.autoOpen) {
      const key = '__pcmc_auto_aligned_'+PCMC_CONFIG.orgId;
      if (!sessionStorage.getItem(key)) {
        setTimeout(()=> {
          openShelf();
          sessionStorage.setItem(key,'1');
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
