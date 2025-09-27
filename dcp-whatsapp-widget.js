/**
 * Divisional Commissioner, Pune - AI WhatsApp Assistant Widget
 * File: zpp-whatsapp-widget.js
 * Version: 1.0.0 (DivComm Edition)
 * Date: 2025-09-27
 * Author: soft00null (adapted for Divisional Commissioner, Pune)
 * Base Inspiration: ZPP Widget v3.5.0
 *
 * WhatsApp Redirect: https://wa.me/919226556203?text=Hi
 * Secondary Reference: WoW-Strategies Pvt. Ltd.
 *
 * Purpose:
 *  - Provide a trustworthy, citizen-friendly AI help entry point
 *  - Offer structured, intent-aligned quick actions
 *  - Maintain Government credibility (solid colors, accessible, no transparency)
 *  - Encourage citizens to use WhatsApp for deeper AI-powered assistance
 *
 * Accessibility:
 *  - Keyboard operable (Enter/Space on launcher, Esc to close)
 *  - ARIA roles & labels
 *  - Focus trap inside modal
 *
 * Public API:
 *  window.DivCommWidget.show()
 *  window.DivCommWidget.hide()
 *  window.DivCommWidget.toggle()
 *  window.DivCommWidget.refreshQR()
 *  window.DivCommWidget.setConfig(partialConfigObject)
 *
 * NOTE: Replace placeholder logo (config.logoUrl) with an official hosted asset.
 */

(function () {
    'use strict';

    if (window.DivCommWidget) {
        console.warn('[DivCommWidget] Already initialized.');
        return;
    }

    const config = {
        phoneNumber: '919226556203',
        baseMessage: 'Hi',
        defaultGreeting: '👋 नमस्कार! | Hello!\nमी विभागीय आयुक्त पुणे कार्यालयाचा अधिकृत AI सहाय्यक आहे. कशा प्रकारे मदत करू शकतो? / I am the Official AI Assistant of the Divisional Commissioner, Pune. How may I help you today?',
        intents: [
            { id: 'info', label: 'Information', hi: 'माहिती', message: 'Information about divisions / विभागीय माहिती' },
            { id: 'services', label: 'Services / RTS', hi: 'सेवा / RTS', message: 'List of citizen services / नागरिक सेवा सूची' },
            { id: 'grievance', label: 'Grievances', hi: 'तक्रारी', message: 'File a grievance / तक्रार नोंद' },
            { id: 'account', label: 'My Account', hi: 'माझे खाते', message: 'Account status / खाते स्थिती' },
        ],
        position: 'bottom-right',
        autoOpenDelay: 3500,
        showTooltipDelay: 6000,
        tooltipText: 'Need help? Ask me on WhatsApp!',
        primaryColor: '#136F34',         // Deep governance green
        primaryColorSoft: '#1f8743',
        accentColor: '#25D366',          // WhatsApp accent
        surfaceColor: '#FFFFFF',
        borderColor: '#E2E6EA',
        bubbleColor: '#F5F7F9',
        aiBadgeColor: '#D81B60',
        logoUrl: 'https://example.gov.in/logo.png', // TODO: Replace with official logo
        qrImageUrl: '', // If empty, uses auto-generated fallback QR
        poweredBy: {
            text: 'Powered by AI • WoW-Strategies Pvt. Ltd.',
            url: 'https://wow-strategies.com/'
        },
        typingDelay: 1200,
        localStorageKey: 'divcomm_widget_seen'
    };

    const state = {
        isOpen: false,
        focusableEls: [],
        lastFocusedBeforeOpen: null,
        tooltipTimeout: null,
        autoOpenTimeout: null,
        typingTimeout: null,
        hasShownGreeting: false
    };

    const utils = {
        encodeWA(msg) {
            return encodeURIComponent(msg);
        },
        buildWAUrl(customMessage) {
            return `https://wa.me/${config.phoneNumber}?text=${utils.encodeWA(customMessage || config.baseMessage)}`;
        },
        createEl(tag, opts = {}) {
            const el = document.createElement(tag);
            if (opts.className) el.className = opts.className;
            if (opts.html) el.innerHTML = opts.html;
            if (opts.attrs) {
                Object.entries(opts.attrs).forEach(([k, v]) => el.setAttribute(k, v));
            }
            if (opts.style) Object.assign(el.style, opts.style);
            return el;
        },
        generateFallbackQR(url, size = 160) {
            // Simple Google Chart fallback
            const safe = encodeURIComponent(url);
            const img = new Image();
            img.src = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${safe}&choe=UTF-8`;
            img.alt = 'WhatsApp QR Code';
            img.width = size;
            img.height = size;
            img.style.borderRadius = '12px';
            img.loading = 'lazy';
            return img;
        },
        createQRContainer() {
            const container = utils.createEl('div', { className: 'dcw-qr-wrapper' });
            const label = utils.createEl('div', {
                className: 'dcw-qr-label',
                html: 'SCAN TO START<br><span>स्कॅन करा</span>'
            });
            const inner = utils.createEl('div', { className: 'dcw-qr-inner' });

            if (config.qrImageUrl) {
                const img = new Image();
                img.alt = 'WhatsApp QR Code';
                img.decoding = 'async';
                img.src = config.qrImageUrl;
                img.onload = () => {
                    inner.innerHTML = '';
                    img.className = 'dcw-qr-img';
                    inner.appendChild(img);
                };
                img.onerror = () => {
                    inner.innerHTML = '';
                    inner.appendChild(utils.generateFallbackQR(utils.buildWAUrl(config.baseMessage)));
                };
                inner.innerHTML = '<div class="dcw-qr-loading" aria-hidden="true"></div>';
            } else {
                inner.appendChild(utils.generateFallbackQR(utils.buildWAUrl(config.baseMessage)));
            }

            container.appendChild(label);
            container.appendChild(inner);
            const foot = utils.createEl('div', { className: 'dcw-qr-foot', html: 'Open on your phone' });
            container.appendChild(foot);
            return container;
        },
        showTypingThenGreeting() {
            const chat = document.querySelector('.dcw-chat-body');
            if (!chat || state.hasShownGreeting) return;

            state.hasShownGreeting = true;

            const typing = utils.createEl('div', { className: 'dcw-bubble dcw-typing', html: `
                <div class="dcw-bubble-inner">
                    <span class="dcw-ai-emoji">🤖</span>
                    <span class="dcw-typing-dots" aria-label="AI is typing">
                        <span></span><span></span><span></span>
                    </span>
                </div>
            `});

            chat.appendChild(typing);
            chat.scrollTop = chat.scrollHeight;

            state.typingTimeout = setTimeout(() => {
                typing.remove();
                const greet = utils.createEl('div', {
                    className: 'dcw-bubble dcw-bubble-ai',
                    html: `
                        <div class="dcw-bubble-inner">
                            <span class="dcw-ai-emoji">🤖</span>
                            <div class="dcw-bubble-text">${config.defaultGreeting.replace(/\n/g, '<br>')}</div>
                        </div>
                    `
                });
                chat.appendChild(greet);
                chat.scrollTop = chat.scrollHeight;
            }, config.typingDelay);
        },
        buildIntentButtons() {
            const wrap = utils.createEl('div', { className: 'dcw-intent-wrap', attrs: { role: 'group', 'aria-label': 'Quick actions' } });
            config.intents.forEach(intent => {
                const btn = utils.createEl('button', {
                    className: 'dcw-intent-btn',
                    html: `<span>${intent.hi} | ${intent.label}</span>`,
                    attrs: {
                        type: 'button',
                        'data-intent': intent.id,
                        'aria-label': intent.label
                    }
                });
                btn.addEventListener('click', () => {
                    const url = utils.buildWAUrl(intent.message);
                    window.open(url, '_blank', 'noopener,noreferrer');
                });
                wrap.appendChild(btn);
            });
            return wrap;
        },
        maybeShowTooltip() {
            try {
                if (localStorage.getItem(config.localStorageKey)) return;
            } catch (_) { /* ignore */ }

            const launcher = document.getElementById('dcw-launcher');
            if (!launcher) return;

            const tip = utils.createEl('div', {
                className: 'dcw-tooltip',
                html: `<span>${config.tooltipText}</span>`
            });
            launcher.appendChild(tip);

            setTimeout(() => tip.classList.add('dcw-visible'), 50);

            setTimeout(() => {
                tip.classList.remove('dcw-visible');
                setTimeout(() => tip.remove(), 400);
            }, 9000);
        },
        trapFocus(e) {
            if (!state.isOpen) return;
            if (e.key !== 'Tab') return;
            const modal = document.getElementById('dcw-modal');
            if (!modal) return;
            state.focusableEls = Array.from(modal.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'))
                .filter(el => el.offsetParent !== null);

            if (!state.focusableEls.length) return;

            const first = state.focusableEls[0];
            const last = state.focusableEls[state.focusableEls.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                last.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        },
        markSeen() {
            try {
                localStorage.setItem(config.localStorageKey, '1');
            } catch (_) { /* ignore */ }
        },
        setAriaExpanded(val) {
            const launcher = document.getElementById('dcw-launcher');
            if (launcher) launcher.setAttribute('aria-expanded', String(val));
        }
    };

    function createWidgetHTML() {
        const waUrl = utils.buildWAUrl(config.baseMessage);

        return `
            <div class="dcw-root" aria-live="polite">
                <button id="dcw-launcher" class="dcw-launcher" aria-haspopup="dialog" aria-expanded="false" aria-controls="dcw-modal" title="Open Divisional Commissioner WhatsApp Assistant">
                    <span class="dcw-launcher-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </span>
                    <span class="dcw-ai-badge" aria-hidden="true">AI</span>
                </button>

                <div id="dcw-modal" class="dcw-modal" role="dialog" aria-modal="true" aria-label="Divisional Commissioner Pune WhatsApp Assistant">
                    <div class="dcw-modal-inner">
                        <header class="dcw-header">
                            <div class="dcw-header-left">
                                <div class="dcw-logo" aria-hidden="true">
                                    <img src="${config.logoUrl}" alt="Official Emblem" onerror="this.style.display='none'">
                                </div>
                                <div class="dcw-title-group">
                                    <div class="dcw-title">Official Chatbot</div>
                                    <div class="dcw-subtitle">Divisional Commissioner, Pune</div>
                                    <div class="dcw-ai-line">🤖 Powered by AI</div>
                                </div>
                            </div>
                            <div class="dcw-header-actions">
                                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="dcw-open-wa" aria-label="Open WhatsApp">
                                    Open WhatsApp
                                </a>
                                <button class="dcw-close-btn" aria-label="Close chat">&times;</button>
                            </div>
                        </header>

                        <div class="dcw-body">
                            <div class="dcw-chat-body" tabindex="0" aria-live="polite"></div>
                            <div class="dcw-intents-region"></div>
                            <div class="dcw-qr-toggle-area">
                                <button type="button" class="dcw-qr-toggle" aria-expanded="false" aria-controls="dcw-qr-section">Show QR</button>
                            </div>
                            <div id="dcw-qr-section" class="dcw-qr-section" hidden></div>
                        </div>

                        <footer class="dcw-footer">
                            <a class="dcw-powered" target="_blank" rel="noopener noreferrer" href="${config.poweredBy.url}">
                                ${config.poweredBy.text}
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        `;
    }

    function injectStyles() {
        if (document.getElementById('dcw-styles')) return;
        const css = `
            .dcw-root{position:fixed;${config.position.includes('bottom') ? 'bottom:20px;' : 'top:20px;'}${config.position.includes('right') ? 'right:20px;' : 'left:20px;'}z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif}
            .dcw-launcher{position:relative;border:none;cursor:pointer;width:66px;height:66px;border-radius:50%;background:linear-gradient(135deg,${config.primaryColor},${config.primaryColorSoft});color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(0,0,0,.25);transition:transform .25s,box-shadow .25s;outline:none}
            .dcw-launcher:focus-visible{box-shadow:0 0 0 4px rgba(19,111,52,0.35)}
            .dcw-launcher:hover{transform:scale(1.07)}
            .dcw-launcher:active{transform:scale(.95)}
            .dcw-ai-badge{position:absolute;top:-4px;right:-4px;background:${config.aiBadgeColor};color:#fff;font-weight:600;font-size:11px;border-radius:999px;padding:3px 7px;box-shadow:0 0 0 2px #fff;animation:dcwBadgePulse 2.6s infinite}
            @keyframes dcwBadgePulse{0%,100%{transform:scale(1)}45%{transform:scale(1.18)}}

            .dcw-modal{position:absolute;${config.position.includes('bottom') ? 'bottom:90px;' : 'top:90px;'}${config.position.includes('right') ? 'right:0;' : 'left:0;'}width:420px;max-width:calc(100vw - 30px);background:${config.surfaceColor};border-radius:28px;box-shadow:0 28px 60px -10px rgba(0,0,0,.35),0 6px 18px -6px rgba(0,0,0,.18);transform:translateY(25px) scale(.92);opacity:0;visibility:hidden;transition:all .4s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;border:1px solid ${config.borderColor}}
            .dcw-modal.dcw-open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
            .dcw-modal-inner{display:flex;flex-direction:column;height:100%;max-height:620px}

            .dcw-header{background:#fff;border-bottom:1px solid ${config.borderColor};padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px}
            .dcw-header-left{display:flex;align-items:center;gap:14px;min-width:0}
            .dcw-logo{width:54px;height:54px;flex:0 0 54px;border-radius:14px;background:#f2f4f6;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid ${config.borderColor}}
            .dcw-logo img{width:100%;height:100%;object-fit:contain}
            .dcw-title-group{display:flex;flex-direction:column;gap:2px}
            .dcw-title{font-size:14px;font-weight:600;color:#1d2b23;text-transform:uppercase;letter-spacing:.5px}
            .dcw-subtitle{font-size:13px;font-weight:500;color:#2f3d35}
            .dcw-ai-line{font-size:11px;color:${config.primaryColor};font-weight:600;letter-spacing:.3px}
            .dcw-header-actions{display:flex;align-items:center;gap:8px}
            .dcw-open-wa{font-size:12px;font-weight:600;padding:8px 14px;border-radius:999px;background:${config.primaryColor};color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:background .25s, box-shadow .25s}
            .dcw-open-wa:hover{background:${config.primaryColorSoft}}
            .dcw-close-btn{width:36px;height:36px;border:none;background:#f2f4f5;color:#333;font-size:20px;line-height:1;border-radius:50%;cursor:pointer;font-weight:500;display:flex;align-items:center;justify-content:center;transition:background .25s}
            .dcw-close-btn:hover{background:#e2e6e8}
            .dcw-close-btn:focus-visible{outline:2px solid ${config.primaryColor};outline-offset:2px}

            .dcw-body{padding:20px 22px 14px;display:flex;flex-direction:column;overflow:hidden}
            .dcw-chat-body{background:linear-gradient(180deg,#ffffff,#fafbfc);border:1px solid ${config.borderColor};border-radius:22px;padding:18px 18px 20px;min-height:140px;max-height:240px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:${config.primaryColor} #fff;position:relative;box-shadow:inset 0 0 0 1px rgba(0,0,0,.015)}
            .dcw-chat-body::-webkit-scrollbar{width:8px}
            .dcw-chat-body::-webkit-scrollbar-track{background:transparent;border-radius:10px}
            .dcw-chat-body::-webkit-scrollbar-thumb{background:${config.primaryColor};border-radius:10px}

            .dcw-bubble{margin:0 0 14px;display:flex;align-items:flex-start;animation:dcwFadeIn .5s ease}
            @keyframes dcwFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
            .dcw-bubble-inner{background:${config.bubbleColor};padding:14px 16px;border-radius:18px 18px 18px 6px;box-shadow:0 4px 14px -6px rgba(0,0,0,.18);font-size:14px;line-height:1.5;color:#1f2c24;display:flex;gap:10px;position:relative}
            .dcw-bubble-ai .dcw-bubble-inner{background:#eef6f0;border:1px solid #dce7de}
            .dcw-ai-emoji{flex:0 0 auto;font-size:18px;margin-top:2px}
            .dcw-bubble-text{white-space:pre-line}
            .dcw-typing .dcw-bubble-inner{background:#f1f5f2;border:1px solid #d7ded9}
            .dcw-typing-dots{display:inline-flex;gap:4px}
            .dcw-typing-dots span{width:6px;height:6px;background:${config.primaryColor};display:block;border-radius:50%;animation:dcwBounce .9s infinite ease-in-out}
            .dcw-typing-dots span:nth-child(2){animation-delay:.15s}
            .dcw-typing-dots span:nth-child(3){animation-delay:.3s}
            @keyframes dcwBounce{0%,80%,100%{transform:scale(.4);opacity:.4}40%{transform:scale(1);opacity:1}}

            .dcw-intent-wrap{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 6px}
            .dcw-intent-btn{background:#fff;border:1px solid #cfd7d1;border-radius:999px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;line-height:1;color:#1d2b23;box-shadow:0 1px 2px rgba(0,0,0,.07);transition:background .25s,border-color .25s,transform .25s}
            .dcw-intent-btn:hover{background:#eef6f0;border-color:${config.primaryColor};transform:translateY(-2px)}
            .dcw-intent-btn:focus-visible{outline:2px solid ${config.primaryColor};outline-offset:2px}

            .dcw-qr-toggle-area{text-align:right;margin:4px 0 8px}
            .dcw-qr-toggle{background:none;border:none;color:${config.primaryColor};font-size:13px;font-weight:600;cursor:pointer;padding:4px 8px;border-radius:8px;transition:background .25s}
            .dcw-qr-toggle:hover{background:#edf5ef}
            .dcw-qr-section{border:1px dashed #ced7d1;border-radius:18px;padding:18px;text-align:center;animation:dcwExpand .4s ease}
            @keyframes dcwExpand{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
            .dcw-qr-wrapper{display:flex;flex-direction:column;align-items:center;gap:14px}
            .dcw-qr-label{font-size:12px;font-weight:700;color:#2e3c33;letter-spacing:.8px;text-transform:uppercase}
            .dcw-qr-label span{display:block;font-weight:500;color:#607066;font-size:11px;margin-top:3px}
            .dcw-qr-inner{width:170px;height:170px;display:flex;align-items:center;justify-content:center;position:relative;background:#fff;border:1px solid #d9e1db;border-radius:16px}
            .dcw-qr-img{width:160px;height:160px;display:block}
            .dcw-qr-loading{width:42px;height:42px;border:4px solid #e3e8e4;border-top:4px solid ${config.primaryColor};border-radius:50%;animation:dcwSpin 1s linear infinite}
            @keyframes dcwSpin{to{transform:rotate(360deg)}}
            .dcw-qr-foot{font-size:11px;color:#607066;font-weight:500}

            .dcw-footer{padding:12px 20px 18px;border-top:1px solid ${config.borderColor};background:#fff}
            .dcw-powered{display:inline-flex;align-items:center;font-size:11px;font-weight:600;color:#5a6961;text-decoration:none;padding:8px 14px;border-radius:999px;background:#f2f5f3;border:1px solid #dce3de;transition:color .25s,border-color .25s,background .25s}
            .dcw-powered:hover{color:${config.primaryColor};border-color:${config.primaryColor};background:#eef6f0}

            .dcw-tooltip{position:absolute;bottom:80px;${config.position.includes('right') ? 'right:0;' : 'left:0;'}background:#1d3125;color:#fff;padding:10px 14px;font-size:12px;font-weight:500;border-radius:12px;box-shadow:0 10px 24px -6px rgba(0,0,0,.35);opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .35s,transform .35s;max-width:220px;line-height:1.4}
            .dcw-tooltip:after{content:"";position:absolute;bottom:-6px;${config.position.includes('right') ? 'right:20px;' : 'left:20px;'}width:12px;height:12px;background:#1d3125;transform:rotate(45deg)}
            .dcw-tooltip.dcw-visible{opacity:1;transform:translateY(0)}

            @media (max-width:520px){
                .dcw-modal{width:calc(100vw - 16px);${config.position.includes('right') ? 'right:0;' : 'left:0;'}${config.position.includes('bottom') ? 'bottom:84px;' : 'top:84px;'}border-radius:24px}
                .dcw-header{padding:14px 16px}
                .dcw-body{padding:16px 16px 10px}
                .dcw-chat-body{max-height:210px}
                .dcw-launcher{width:60px;height:60px}
            }

            @media (prefers-reduced-motion:reduce){
                .dcw-modal,.dcw-launcher,.dcw-intent-btn,.dcw-tooltip,.dcw-bubble{animation:none!important;transition:none!important}
            }

            @media print{
                .dcw-root{display:none!important}
            }
        `;
        const style = document.createElement('style');
        style.id = 'dcw-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function attachEvents(root) {
        const launcher = root.querySelector('#dcw-launcher');
        const modal = root.querySelector('#dcw-modal');
        const closeBtn = root.querySelector('.dcw-close-btn');
        const qrToggleBtn = root.querySelector('.dcw-qr-toggle');
        const qrSection = root.querySelector('#dcw-qr-section');
        const intentsRegion = root.querySelector('.dcw-intents-region');

        intentsRegion.appendChild(utils.buildIntentButtons());

        qrToggleBtn.addEventListener('click', () => {
            const expanded = qrToggleBtn.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                qrSection.setAttribute('hidden', 'true');
                qrToggleBtn.textContent = 'Show QR';
                qrToggleBtn.setAttribute('aria-expanded', 'false');
                qrSection.innerHTML = '';
            } else {
                qrSection.removeAttribute('hidden');
                qrToggleBtn.textContent = 'Hide QR';
                qrToggleBtn.setAttribute('aria-expanded', 'true');
                qrSection.innerHTML = '';
                qrSection.appendChild(utils.createQRContainer());
            }
        });

        const openModal = () => {
            if (state.isOpen) return;
            state.isOpen = true;
            state.lastFocusedBeforeOpen = document.activeElement;
            modal.classList.add('dcw-open');
            utils.setAriaExpanded(true);
            utils.showTypingThenGreeting();
            utils.markSeen();
            setTimeout(() => {
                const firstBtn = modal.querySelector('.dcw-intent-btn');
                if (firstBtn) firstBtn.focus();
            }, 200);
        };

        const closeModal = () => {
            if (!state.isOpen) return;
            state.isOpen = false;
            modal.classList.remove('dcw-open');
            utils.setAriaExpanded(false);
            if (state.typingTimeout) {
                clearTimeout(state.typingTimeout);
                state.typingTimeout = null;
            }
            if (state.lastFocusedBeforeOpen) state.lastFocusedBeforeOpen.focus({ preventScroll: true });
        };

        launcher.addEventListener('click', () => {
            state.isOpen ? closeModal() : openModal();
        });
        launcher.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                launcher.click();
            }
        });

        closeBtn.addEventListener('click', closeModal);

        document.addEventListener('click', (e) => {
            if (!state.isOpen) return;
            if (!modal.contains(e.target) && !launcher.contains(e.target)) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isOpen) {
                closeModal();
            }
            utils.trapFocus(e);
        });

        // Public API methods
        window.DivCommWidget = {
            version: '1.0.0',
            config,
            show: openModal,
            hide: closeModal,
            toggle: () => state.isOpen ? closeModal() : openModal(),
            refreshQR: () => {
                const isVisible = !qrSection.hasAttribute('hidden');
                if (isVisible) {
                    qrSection.innerHTML = '';
                    qrSection.appendChild(utils.createQRContainer());
                }
            },
            setConfig: (partial) => {
                Object.assign(config, partial || {});
                console.log('[DivCommWidget] Config updated. Reload page to reflect structural changes if any.');
            }
        };
    }

    function init() {
        try {
            injectStyles();

            let mount = document.getElementById('divcomm-whatsapp-widget');
            if (!mount) {
                mount = document.createElement('div');
                mount.id = 'divcomm-whatsapp-widget';
                document.body.appendChild(mount);
            }
            mount.innerHTML = createWidgetHTML();
            attachEvents(mount);

            // Auto open prompt (soft attention) without opening full chat
            state.autoOpenTimeout = setTimeout(() => {
                const launcher = document.getElementById('dcw-launcher');
                if (launcher) launcher.classList.add('dcw-attention');
                setTimeout(() => launcher && launcher.classList.remove('dcw-attention'), 1600);
            }, config.autoOpenDelay);

            // Tooltip gentle nudge
            state.tooltipTimeout = setTimeout(() => {
                utils.maybeShowTooltip();
            }, config.showTooltipDelay);

            console.log('✅ Divisional Commissioner WhatsApp AI Widget initialized.');
        } catch (err) {
            console.error('❌ DivComm Widget failed to initialize:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
