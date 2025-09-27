/**
 * Divisional Commissioner Pune - AI WhatsApp Integration Widget
 * Version: 1.0.0
 * Date: 2025-09-27
 * Author: soft00null (refactored for Divisional Commissioner Pune)
 * Base Inspiration: ZPP Widget (earlier version), redesigned for Govt Professional UI
 * 
 * Powered by WoW-Strategies Private Limited
 * https://wow-strategies.com/
 *
 * Features:
 *  - Glass morph translucent panel with subtle shadows
 *  - Bilingual (Marathi / English) toggle
 *  - Quick action pill buttons (accessible)
 *  - Dynamic + fallback QR code (API based)
 *  - AI emphasis animations & pulsing nudge
 *  - Office hours highlighting (configurable)
 *  - Auto-first-popup + repeat nudge (non-intrusive)
 *  - Public API: DCWidget.show(), hide(), toggle(), refreshQR(), setLanguage(lang)
 *  - No external library dependency
 */
(function() {
    'use strict';

    if (window.DCWidget) {
        console.warn('DC WhatsApp Widget already initialized');
        return;
    }

    const config = {
        entityName: 'Divisional Commissioner, Pune',
        phoneNumber: '919226556203',
        defaultMessageMarathi: 'नमस्कार! मला विभागीय आयुक्त कार्यालयाच्या सेवांबद्दल माहिती हवी आहे.',
        defaultMessageEnglish: 'Hello! I need information about the Divisional Commissioner office services.',
        whatsappBaseText: 'Hi',
        position: 'bottom-right',          // bottom-right | bottom-left | top-right | top-left
        autoShowAfterMs: 4000,             // First automatic popup delay
        nudgeEveryMs: 35000,               // Nudge pulse interval if not opened yet (0 to disable)
        maxNudges: 4,
        showNotificationBadge: true,
        showOfficeStatus: true,
        officeHours: {                     // 24h times local to Asia/Kolkata
            monFri: ['10:00','18:00'],
            sat: ['10:00','14:00'],
            sun: null
        },
        colors: {
            primary: '#25D366',            // WhatsApp Green
            accent: '#3D33A0',             // Deep Indigo accent
            accentSoft: '#5a4bd3',
            bubbleBg: 'rgba(255,255,255,0.86)',
            border: 'rgba(70,60,160,0.25)',
            shadow: '0 12px 48px -12px rgba(40,45,85,0.25),0 4px 16px -4px rgba(40,45,85,0.15)'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        },
        language: 'mr', // 'mr' (Marathi) or 'en'
        qr: {
            // If you have a static government-approved QR image, set staticImageUrl.
            staticImageUrl: '',
            size: 200,
            cornerRadius: 20
        },
        accessibility: {
            langMap: { mr: 'mr-IN', en: 'en-IN' }
        }
    };

    const state = {
        hasOpened: false,
        nudges: 0,
        isQRVisible: true,
        currentLang: config.language
    };

    const utils = {
        safeLocalSet: (k,v) => {
            try { localStorage.setItem(k,v); } catch(_) {}
        },
        safeLocalGet: k => {
            try { return localStorage.getItem(k); } catch(_) { return null; }
        },
        isBackdropSupported: () => CSS && CSS.supports && (CSS.supports('backdrop-filter: blur(10px)') || CSS.supports('-webkit-backdrop-filter: blur(10px)')),
        nowIST: () => {
            const now = new Date();
            try {
                return new Date(now.toLocaleString('en-US',{ timeZone: 'Asia/Kolkata' }));
            } catch {
                return now;
            }
        },
        officeStatus: () => {
            if (!config.showOfficeStatus) return { open: true, label: '' };
            const d = utils.nowIST();
            const day = d.getDay(); // 0 Sun
            const hh = d.getHours().toString().padStart(2,'0');
            const mm = d.getMinutes().toString().padStart(2,'0');
            const timeStr = `${hh}:${mm}`;
            const within = (range) => {
                if (!range) return false;
                const [start,end] = range;
                return timeStr >= start && timeStr <= end;
            };
            let open = false;
            if (day === 0) open = within(config.officeHours.sun);
            else if (day >=1 && day <=5) open = within(config.officeHours.monFri);
            else if (day ===6) open = within(config.officeHours.sat);
            return {
                open,
                label: open ? (state.currentLang==='mr' ? 'कार्यरत' : 'Online') : (state.currentLang==='mr' ? 'बंद (कार्यालयीन वेळा)' : 'Offline (Office Hours)')
            };
        },
        langText: {
            mr: {
                aiAssistantIntro: "🤖 नमस्कार! मी विभागीय आयुक्त कार्यालयाचा AI सहाय्यक आहे. सेवा, तक्रारी, प्रमाणपत्रे, योजना, दर व संपर्क यांसाठी मी मदत करू शकतो. कृपया एक पर्याय निवडा किंवा WhatsApp वर संदेश पाठवा.",
                quick: {
                    grievance: "लोकअर्ज / तक्रार",
                    schemes: "शासकीय योजना",
                    certificates: "प्रमाणपत्रे व परवाने",
                    rti: "माहितीचा अधिकार (RTI)",
                    contacts: "अधिकाऱ्यांचा संपर्क",
                    emergency: "आपत्कालीन मदत",
                    statistics: "जिल्हा आकडेवारी"
                },
                showQR: "QR दाखवा",
                hideQR: "QR लपवा",
                scanToStart: "प्रारंभ करण्यासाठी स्कॅन करा",
                openOnPhone: "तुमच्या फोनवर उघडा",
                langSwitch: "English",
                mobileChat: "मोबाइल WhatsApp चॅट",
                webChat: "वेब WhatsApp चॅट",
                close: "बंद",
                aiBadge: "AI",
                govtNotice: "शासन सेवा सहाय्य"
            },
            en: {
                aiAssistantIntro: "🤖 Hello! I am the AI Assistant for the Divisional Commissioner Office, Pune. I can help with services, grievances, certificates, schemes, RTI, contacts & more. Select an option or start WhatsApp chat.",
                quick: {
                    grievance: "Public Grievance",
                    schemes: "Govt Schemes",
                    certificates: "Certificates & Licenses",
                    rti: "RTI Information",
                    contacts: "Officer Contacts",
                    emergency: "Emergency Help",
                    statistics: "District Statistics"
                },
                showQR: "Show QR",
                hideQR: "Hide QR",
                scanToStart: "SCAN TO START",
                openOnPhone: "Open on your phone",
                langSwitch: "मराठी",
                mobileChat: "Mobile WhatsApp Chat",
                webChat: "Web WhatsApp Chat",
                close: "Close",
                aiBadge: "AI",
                govtNotice: "Government Digital Assistance"
            }
        },
        buildWhatsAppURL: (baseMessage) => {
            const msg = baseMessage || (state.currentLang==='mr' ? config.defaultMessageMarathi : config.defaultMessageEnglish);
            return `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(msg)}`;
        },
        actionMessage: (key) => {
            const base = state.currentLang==='mr' ? config.defaultMessageMarathi : config.defaultMessageEnglish;
            const map = utils.langText[state.currentLang].quick;
            const translated = map[key];
            return `${base}\nTopic: ${translated}`;
        },
        createQR: (whatsappUrl) => {
            // Container
            const wrap = document.createElement('div');
            wrap.className = 'dcw-qr-wrapper';
            wrap.setAttribute('role','group');

            const inner = document.createElement('div');
            inner.className = 'dcw-qr-inner';
            inner.style.position = 'relative';
            inner.style.display = 'flex';
            inner.style.alignItems = 'center';
            inner.style.justifyContent = 'center';
            inner.style.width = inner.style.height = (config.qr.size+40)+'px';
            inner.style.borderRadius = '24px';
            inner.style.background = 'rgba(255,255,255,0.92)';
            inner.style.boxShadow = '0 6px 32px -8px rgba(0,0,0,0.25)';
            inner.style.border = '1px solid '+config.colors.border;
            inner.style.padding = '20px';
            inner.style.backdropFilter = 'blur(10px)';
            inner.style.webkitBackdropFilter = 'blur(10px)';

            const label = document.createElement('div');
            label.style.fontSize = '11px';
            label.style.fontWeight = '600';
            label.style.letterSpacing = '2px';
            label.style.textTransform = 'uppercase';
            label.style.marginBottom = '8px';
            label.style.textAlign = 'center';
            label.style.color = config.colors.accent;
            label.textContent = utils.langText[state.currentLang].scanToStart;

            const img = document.createElement('img');
            img.alt = 'WhatsApp QR Code';
            img.width = config.qr.size;
            img.height = config.qr.size;
            img.style.borderRadius = '12px';
            img.style.background = '#fff';
            img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            img.style.objectFit = 'cover';
            img.style.transition = 'transform .4s ease';

            if (config.qr.staticImageUrl) {
                img.src = config.qr.staticImageUrl;
            } else {
                img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${config.qr.size}x${config.qr.size}&data=${encodeURIComponent(whatsappUrl)}`;
            }

            img.onerror = () => {
                img.replaceWith(utils.buildFallbackQR(whatsappUrl));
            };

            inner.appendChild(img);

            const phoneNote = document.createElement('div');
            phoneNote.style.fontSize = '12px';
            phoneNote.style.color = '#555';
            phoneNote.style.marginTop = '10px';
            phoneNote.style.textAlign = 'center';
            phoneNote.textContent = utils.langText[state.currentLang].openOnPhone;

            wrap.appendChild(label);
            wrap.appendChild(inner);
            wrap.appendChild(phoneNote);

            inner.addEventListener('mouseenter', ()=> {
                img.style.transform = 'scale(1.04)';
            });
            inner.addEventListener('mouseleave', ()=> {
                img.style.transform = 'scale(1)';
            });

            return wrap;
        },
        buildFallbackQR: (url) => {
            const div = document.createElement('div');
            div.style.width = config.qr.size+'px';
            div.style.height = config.qr.size+'px';
            div.style.display='flex';
            div.style.alignItems='center';
            div.style.justifyContent='center';
            div.style.fontSize='12px';
            div.style.textAlign='center';
            div.style.color='#6c6c6c';
            div.style.border='2px dashed '+config.colors.accentSoft;
            div.style.borderRadius='16px';
            div.innerHTML = 'QR unavailable<br><a style="color:'+config.colors.accentSoft+';text-decoration:none;font-weight:600" target="_blank" href="'+url+'">Open Chat</a>';
            return div;
        },
        setLanguage: (lang) => {
            if (!utils.langText[lang]) return;
            state.currentLang = lang;
            document.documentElement.setAttribute('lang', config.accessibility.langMap[lang] || 'en-IN');
            utils.rerenderDynamicTexts();
            utils.safeLocalSet('dcw_lang', lang);
        },
        rerenderDynamicTexts: () => {
            const t = utils.langText[state.currentLang];
            const intro = document.querySelector('.dcw-intro-text');
            if (intro) intro.textContent = t.aiAssistantIntro;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const parts = key.split('.');
                let ref = utils.langText[state.currentLang];
                parts.forEach(p=> { if (ref) ref = ref[p]; });
                if (typeof ref === 'string') {
                    el.textContent = ref;
                }
            });

            // Quick action labels
            document.querySelectorAll('.dcw-quick-action').forEach(btn => {
                const act = btn.getAttribute('data-action');
                btn.textContent = t.quick[act];
            });

            // Office status
            const os = utils.officeStatus();
            const statusEl = document.querySelector('.dcw-office-status');
            if (statusEl) {
                statusEl.textContent = os.label;
                statusEl.classList.toggle('dcw-open', os.open);
                statusEl.classList.toggle('dcw-closed', !os.open);
            }

            // QR area rebuild if exists
            utils.refreshQRIfVisible();
        },
        refreshQRIfVisible: () => {
            const qrArea = document.querySelector('.dcw-qr-area');
            if (!qrArea) return;
            const isVisible = state.isQRVisible;
            qrArea.innerHTML = '';
            if (isVisible) {
                const el = utils.createQR(utils.buildWhatsAppURL());
                qrArea.appendChild(el);
            }
            const toggleLink = document.querySelector('.dcw-qr-toggle');
            if (toggleLink) {
                toggleLink.textContent = utils.langText[state.currentLang][ isVisible ? 'hideQR' : 'showQR' ];
            }
        },
        smoothShow: (el) => {
            requestAnimationFrame(()=> {
                el.style.opacity='1';
                el.style.transform='translateY(0) scale(1)';
                el.setAttribute('data-open','true');
            });
        },
        smoothHide: (el) => {
            el.style.opacity='0';
            el.style.transform='translateY(14px) scale(.96)';
            el.setAttribute('data-open','false');
        },
        trapFocus: (container) => {
            const focusable = container.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length -1];
            container.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault(); last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault(); first.focus();
                    }
                }
            });
        },
        openModal: () => {
            const modal = document.querySelector('.dcw-modal');
            const btn = document.querySelector('.dcw-launch-btn');
            if (!modal) return;
            utils.smoothShow(modal);
            state.hasOpened = true;
            utils.safeLocalSet('dcw_opened','1');
            // Remove badge
            const badge = document.querySelector('.dcw-badge');
            if (badge) badge.style.display='none';
            // Focus first element
            const firstAction = modal.querySelector('.dcw-quick-action');
            if (firstAction) setTimeout(()=> firstAction.focus(), 300);
            if (btn) {
                btn.setAttribute('aria-expanded','true');
            }
        },
        closeModal: () => {
            const modal = document.querySelector('.dcw-modal');
            const btn = document.querySelector('.dcw-launch-btn');
            if (!modal) return;
            utils.smoothHide(modal);
            if (btn) {
                btn.focus();
                btn.setAttribute('aria-expanded','false');
            }
        },
        toggleModal: () => {
            const modal = document.querySelector('.dcw-modal');
            if (!modal) return;
            const open = modal.getAttribute('data-open') === 'true';
            open ? utils.closeModal() : utils.openModal();
        },
        handleQuickAction: (actionKey) => {
            const url = utils.buildWhatsAppURL(utils.actionMessage(actionKey));
            window.open(url,'_blank','noopener,noreferrer');
        },
        scheduleAutoShow: () => {
            if (utils.safeLocalGet('dcw_opened')) return;
            setTimeout(()=> {
                if (!state.hasOpened) {
                    utils.openModal();
                }
            }, config.autoShowAfterMs);
        },
        scheduleNudges: () => {
            if (!config.nudgeEveryMs) return;
            const btn = document.querySelector('.dcw-launch-btn');
            if (!btn) return;
            const nudge = () => {
                if (state.hasOpened) return;
                if (state.nudges >= config.maxNudges) return;
                btn.classList.add('dcw-nudge');
                setTimeout(()=> btn.classList.remove('dcw-nudge'), 1800);
                state.nudges++;
                setTimeout(nudge, config.nudgeEveryMs);
            };
            setTimeout(nudge, config.nudgeEveryMs);
        }
    };

    const render = () => {
        // Container
        let host = document.getElementById('dc-whatsapp-widget');
        if (!host) {
            host = document.createElement('div');
            host.id = 'dc-whatsapp-widget';
            document.body.appendChild(host);
        }

        const posY = config.position.includes('bottom') ? 'bottom:24px;' : 'top:24px;';
        const posX = config.position.includes('right') ? 'right:24px;' : 'left:24px;';

        host.innerHTML = `
            <div class="dcw-root" style="position:fixed;${posY}${posX}z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',Arial,sans-serif">
                <button class="dcw-launch-btn" aria-label="Open WhatsApp AI Assistant" aria-expanded="false" aria-controls="dcwModal"
                    style="cursor:pointer;width:76px;height:76px;border:none;outline:none;border-radius:50%;background:radial-gradient(circle at 30% 30%, ${config.colors.accentSoft}, ${config.colors.accent});color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 28px -6px rgba(80,60,180,0.45);position:relative;transition:all .45s cubic-bezier(.19,1,.22,1);">
                    <div class="dcw-icon" style="font-size:34px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.25));">💬</div>
                    ${config.showNotificationBadge ? `<span class="dcw-badge" aria-hidden="true" style="position:absolute;top:-2px;right:-2px;background:#FF3D4F;color:#fff;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.25);">${utils.langText[state.currentLang].aiBadge}</span>` : ''}
                    <span class="dcw-launch-halo" aria-hidden="true"></span>
                </button>

                <div class="dcw-modal" id="dcwModal" role="dialog" aria-modal="true" aria-label="AI WhatsApp Assistant"
                    data-open="false"
                    style="position:absolute;${config.position.includes('bottom')?'bottom:100px;':'top:100px;'}${config.position.includes('right')?'right:0;':'left:0;'}
                    width:420px;max-width:calc(100vw - 28px);transform:translateY(14px) scale(.96);opacity:0;transition:all .5s cubic-bezier(.19,1,.22,1);
                    border-radius:32px;overflow:hidden;
                    background:${config.colors.bubbleBg};
                    ${utils.isBackdropSupported()? 'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);':''}
                    box-shadow:${config.colors.shadow};
                    border:1px solid ${config.colors.border};">

                    <div class="dcw-inner" style="position:relative;padding:26px;padding-top:28px;">
                        <button class="dcw-close-btn" type="button" aria-label="${utils.langText[state.currentLang].close}"
                            style="position:absolute;top:12px;right:12px;width:34px;height:34px;border:none;border-radius:50%;background:rgba(100,90,200,0.12);color:${config.colors.accent};cursor:pointer;font-size:18px;font-weight:500;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">
                            ×
                        </button>

                        <div class="dcw-header" style="margin-right:42px;">
                            <div style="font-size:17px;font-weight:700;line-height:1.3;color:#1f2340;display:flex;align-items:center;gap:10px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,${config.colors.primary},${config.colors.accentSoft});color:#fff;font-size:22px;box-shadow:0 4px 12px rgba(0,0,0,0.18);">🤖</span>
                                <div style="display:flex;flex-direction:column;">
                                    <span>${config.entityName}</span>
                                    <small class="dcw-office-status" style="margin-top:2px;font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;"></small>
                                </div>
                            </div>
                        </div>

                        <div class="dcw-bubble" style="margin-top:22px; position:relative; background:${config.colors.bubbleBg}; border:1px solid ${config.colors.border}; border-radius:26px; padding:20px 22px; line-height:1.5; font-size:14.5px; color:#252a3f; box-shadow:0 12px 32px -10px rgba(50,45,120,0.25);">
                            <div class="dcw-typing" style="display:flex;gap:6px;margin-bottom:8px;">
                                <span class="dcw-dot"></span><span class="dcw-dot"></span><span class="dcw-dot"></span>
                            </div>
                            <div class="dcw-intro-text" style="display:none;"></div>
                        </div>

                        <div class="dcw-actions-wrap" style="margin-top:26px;display:flex;flex-wrap:wrap;gap:14px;">
                            ${['grievance','schemes','certificates','rti','contacts','emergency','statistics'].map(k=>`
                                <button type="button" class="dcw-quick-action" data-action="${k}"
                                    style="flex:1 1 46%;min-width:140px;padding:12px 14px;border:2px solid ${config.colors.accentSoft};
                                    background:rgba(255,255,255,0.55);color:${config.colors.accent};font-weight:600;font-size:13px;border-radius:40px;
                                    cursor:pointer;transition:all .35s ease;position:relative;overflow:hidden;">
                                </button>`).join('')}
                        </div>

                        <div class="dcw-chat-links" style="margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                            <a class="dcw-chat-link-mobile" data-i18n="mobileChat" target="_blank" rel="noopener noreferrer"
                               style="text-decoration:none;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600;
                               padding:14px 12px;border-radius:20px;border:1px solid ${config.colors.accentSoft};color:${config.colors.accent};
                               background:linear-gradient(145deg,#ffffff,rgba(255,255,255,0.5));box-shadow:0 4px 14px -4px rgba(60,50,140,0.25);
                               transition:all .4s ease;">📱</a>
                            <a class="dcw-chat-link-web" data-i18n="webChat" target="_blank" rel="noopener noreferrer"
                               style="text-decoration:none;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600;
                               padding:14px 12px;border-radius:20px;border:1px solid ${config.colors.accentSoft};color:${config.colors.accent};
                               background:linear-gradient(145deg,#ffffff,rgba(255,255,255,0.5));box-shadow:0 4px 14px -4px rgba(60,50,140,0.25);
                               transition:all .4s ease;">💻</a>
                        </div>

                        <div class="dcw-qr-toggle" data-i18n="hideQR" role="button" tabindex="0"
                            style="margin-top:24px;font-size:13px;font-weight:600;color:${config.colors.accent};cursor:pointer;user-select:none;">
                            ${utils.langText[state.currentLang].hideQR}
                        </div>

                        <div class="dcw-qr-area" style="margin-top:18px;display:flex;align-items:center;justify-content:center;"></div>

                        <div class="dcw-footer" style="margin-top:26px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
                            <button class="dcw-lang-switch" type="button" data-i18n="langSwitch"
                                style="background:rgba(255,255,255,0.55);border:1px solid ${config.colors.accentSoft};color:${config.colors.accent};font-weight:600;
                                padding:10px 16px;border-radius:30px;font-size:12px;cursor:pointer;transition:all .35s ease;">${utils.langText[state.currentLang].langSwitch}</button>
                            <a class="dcw-powered" href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer"
                                style="flex:1;text-decoration:none;font-size:11.5px;padding:10px 16px;border-radius:30px;background:rgba(255,255,255,.6);
                                border:1px solid ${config.colors.accentSoft};display:inline-flex;align-items:center;justify-content:center;gap:6px;
                                color:${config.colors.accent};font-weight:600;letter-spacing:.2px;transition:all .35s;">⚡ ${config.poweredBy.text}</a>
                        </div>
                    </div>
                </div>
            </div>

            <style>
            .dcw-launch-btn:hover { transform: translateY(-4px) scale(1.05); box-shadow:0 18px 40px -10px rgba(60,50,160,0.55); }
            .dcw-launch-btn:focus { outline:3px solid ${config.colors.primary}; outline-offset:2px; }
            .dcw-launch-btn .dcw-launch-halo {
                position:absolute;inset:-6px;border-radius:inherit;
                background:radial-gradient(circle at 50% 50%, rgba(120,110,240,0.45), rgba(120,110,240,0) 70%);
                opacity:.0;animation:dcwHalo 4s ease-in-out infinite;
                pointer-events:none;
            }
            .dcw-nudge { animation: dcwNudgePulse 1.2s ease forwards; }
            .dcw-quick-action:hover, .dcw-quick-action:focus {
                background:${config.colors.accent}; color:#fff; box-shadow:0 8px 20px -6px rgba(50,40,140,0.55);
            }
            .dcw-quick-action:focus { outline:3px solid ${config.colors.primary}; outline-offset:2px; }
            .dcw-close-btn:hover { background:rgba(90,75,210,0.25); }
            .dcw-close-btn:focus { outline:3px solid ${config.colors.primary}; }
            .dcw-chat-link-mobile:hover, .dcw-chat-link-web:hover,
            .dcw-chat-link-mobile:focus, .dcw-chat-link-web:focus {
                background:${config.colors.accent}; color:#fff; transform:translateY(-3px);
            }
            .dcw-chat-link-mobile:focus, .dcw-chat-link-web:focus { outline:3px solid ${config.colors.primary}; outline-offset:2px; }
            .dcw-qr-toggle:hover, .dcw-qr-toggle:focus { text-decoration:underline; }
            .dcw-qr-toggle:focus { outline:2px dashed ${config.colors.primary}; outline-offset:4px; border-radius:4px; }
            .dcw-lang-switch:hover, .dcw-lang-switch:focus { background:${config.colors.accent}; color:#fff; }
            .dcw-powered:hover, .dcw-powered:focus { background:${config.colors.accent}; color:#fff; }
            .dcw-office-status { color:${config.colors.accent}; }
            .dcw-office-status.dcw-closed { color:#C25A00; }
            .dcw-dot {
                width:8px;height:8px;border-radius:50%;background:${config.colors.accentSoft};animation:dcwTyping 1.2s infinite ease-in-out;
            }
            .dcw-dot:nth-child(2){ animation-delay:.2s; }
            .dcw-dot:nth-child(3){ animation-delay:.4s; }
            @keyframes dcwTyping {
                0%,80%,100% { transform:scale(.4); opacity:.5;}
                40% { transform:scale(1); opacity:1;}
            }
            @keyframes dcwHalo {
                0%,60%,100% { opacity:.0; }
                10% { opacity:.9; }
            }
            @keyframes dcwNudgePulse {
                0% { transform:scale(1); box-shadow:0 0 0 0 rgba(90,75,210,0.7); }
                60% { transform:scale(1.08); box-shadow:0 0 0 18px rgba(90,75,210,0); }
                100% { transform:scale(1); box-shadow:0 0 0 0 rgba(90,75,210,0); }
            }
            @media (max-width:580px) {
                .dcw-modal { width:calc(100vw - 20px) !important; ${config.position.includes('right')?'right:-4px;':'left:-4px;'} }
                .dcw-launch-btn { width:66px !important; height:66px !important; }
                .dcw-actions-wrap { gap:10px !important; }
                .dcw-quick-action { flex:1 1 48%; min-width:46%; }
            }
            @media (prefers-reduced-motion: reduce) {
                * { animation:none !important; transition:none !important; }
            }
            </style>
        `;
    };

    const attachEvents = () => {
        const launchBtn = document.querySelector('.dcw-launch-btn');
        const modal = document.querySelector('.dcw-modal');
        const closeBtn = document.querySelector('.dcw-close-btn');
        const langSwitch = document.querySelector('.dcw-lang-switch');
        const qrToggle = document.querySelector('.dcw-qr-toggle');
        const quickActions = document.querySelectorAll('.dcw-quick-action');
        const mobileLink = document.querySelector('.dcw-chat-link-mobile');
        const webLink = document.querySelector('.dcw-chat-link-web');

        if (launchBtn) launchBtn.addEventListener('click', utils.toggleModal);
        if (closeBtn) closeBtn.addEventListener('click', utils.closeModal);
        if (langSwitch) langSwitch.addEventListener('click', () => {
            const newLang = state.currentLang === 'mr' ? 'en' : 'mr';
            utils.setLanguage(newLang);
        });
        if (qrToggle) {
            const toggle = () => {
                state.isQRVisible = !state.isQRVisible;
                utils.refreshQRIfVisible();
            };
            qrToggle.addEventListener('click', toggle);
            qrToggle.addEventListener('keydown', (e)=> {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); toggle();
                }
            });
        }
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                utils.handleQuickAction(btn.getAttribute('data-action'));
            });
        });

        if (mobileLink) mobileLink.href = utils.buildWhatsAppURL();
        if (webLink) webLink.href = `https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(state.currentLang==='mr'?config.defaultMessageMarathi:config.defaultMessageEnglish)}`;

        document.addEventListener('click', (e) => {
            if (!modal) return;
            if (modal.getAttribute('data-open')==='true') {
                if (!modal.contains(e.target) && !launchBtn.contains(e.target)) {
                    utils.closeModal();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (modal.getAttribute('data-open')==='true') {
                    utils.closeModal();
                }
            }
        });

        utils.trapFocus(modal);

        // Simulate typing introduction
        setTimeout(()=> {
            const typing = document.querySelector('.dcw-typing');
            const intro = document.querySelector('.dcw-intro-text');
            if (typing && intro) {
                typing.style.display='flex';
                setTimeout(()=> {
                    typing.style.display='none';
                    intro.style.display='block';
                }, 1300);
            }
        }, 300);
    };

    const init = () => {
        render();
        const storedLang = utils.safeLocalGet('dcw_lang');
        if (storedLang && utils.langText[storedLang]) state.currentLang = storedLang;
        utils.rerenderDynamicTexts();
        utils.refreshQRIfVisible();
        attachEvents();
        utils.scheduleAutoShow();
        utils.scheduleNudges();
        console.log('✅ DC WhatsApp AI Widget initialized (v1.0.0)');
    };

    // PUBLIC API
    window.DCWidget = {
        version: '1.0.0',
        config,
        show: () => utils.openModal(),
        hide: () => utils.closeModal(),
        toggle: () => utils.toggleModal(),
        refreshQR: () => utils.refreshQRIfVisible(),
        setLanguage: (lang) => utils.setLanguage(lang)
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
