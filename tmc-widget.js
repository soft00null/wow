/**
 * Thane Municipal Corporation (TMC) 311 Chat Widget
 * File: tmc-311-chat-widget.js
 * Version: 3.0.0
 * Date: 2026-01-03
 * Brand: WhatsUp.city
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    if (window.TMC311Widget) {
        console.warn('TMC 311 Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '15558830019',
        defaultMessage: 'Hi',
        logoUrl: 'https://wow-strategies.com/tmc.png',
        qrData: 'https://wa.me/15558830019?text=Hi',
        colors: {
            primary: '#0B5D52',
            secondary: '#0D9F6E',
            accent: '#1BD741',
            background: '#0F1115',
            card: 'rgba(255,255,255,0.06)',
            glass: 'rgba(255,255,255,0.16)',
            text: '#E9ECEF',
            subtext: '#A9B3BD',
            border: 'rgba(255,255,255,0.08)',
            white: '#FFFFFF',
            shadow: '0 20px 80px rgba(0,0,0,0.45)'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Core 311 civic grievance actions (urban municipal)
    const menuOptions = [
        { id: 'pothole', label: 'Report Pothole', icon: '🕳️', message: 'I want to report a pothole on the road' },
        { id: 'garbage', label: 'Garbage / Cleanliness', icon: '🧹', message: 'Please address garbage / cleanliness issue' },
        { id: 'streetlight', label: 'Streetlight Out', icon: '💡', message: 'A streetlight is not working' },
        { id: 'drainage', label: 'Drainage / Waterlogging', icon: '🌧️', message: 'Drainage or waterlogging issue' },
        { id: 'tree', label: 'Tree Fall / Pruning', icon: '🌳', message: 'Tree fall or pruning request' },
        { id: 'noise', label: 'Noise / Nuisance', icon: '🔊', message: 'Report noise or public nuisance' }
    ];
    
    const createQrMarkup = (data) => {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&color=0D9F6E&bgcolor=0F1115&data=${encodeURIComponent(data)}`;
        return `
            <div class="tmc-qr-frame">
                <div class="tmc-qr-glow"></div>
                <img src="${qrUrl}" alt="Scan to chat on WhatsApp" class="tmc-qr-image">
                <div class="tmc-qr-badge">Scan to chat</div>
            </div>
        `;
    };
    
    const createWidget = () => {
        return `
            <div class="tmc-widget" id="tmcWidget">
                <!-- FAB -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open TMC 311 Chat">
                    <div class="tmc-fab-ring"></div>
                    <div class="tmc-fab-icon">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="tmc-fab-badge">311</div>
                </button>
                
                <!-- Chat -->
                <div class="tmc-chat" id="tmcChat">
                    <!-- Header -->
                    <div class="tmc-header">
                        <div class="tmc-header-left">
                            <div class="tmc-avatar">
                                <img src="${config.logoUrl}" alt="TMC Logo">
                            </div>
                            <div class="tmc-headings">
                                <div class="tmc-title">Thane Municipal Corporation</div>
                                <div class="tmc-subtitle">Official 311 AI Assistant</div>
                            </div>
                        </div>
                        <button class="tmc-close" aria-label="Close chat">
                            <span>×</span>
                        </button>
                    </div>
                    
                    <!-- Body -->
                    <div class="tmc-body">
                        <div class="tmc-qr-section">
                            ${createQrMarkup(config.qrData)}
                            <div class="tmc-qr-copy">Point your camera to start a WhatsApp chat</div>
                            <div class="tmc-qr-chip">Works in 22 Indian languages · Text · Voice · Images · Location</div>
                        </div>
                        
                        <div class="tmc-chat-preview">
                            <div class="tmc-bubble">
                                <div class="tmc-bubble-text">
                                    🙏 Namaskar! I’m your TMC 311 assistant.<br>
                                    Tell me the issue, send a voice note, or attach a photo. I’ll route it to the right ward officer.
                                </div>
                                <div class="tmc-bubble-meta">AI · Online now</div>
                            </div>
                        </div>
                        
                        <div class="tmc-grid">
                            ${menuOptions.map(option => `
                                <button class="tmc-card" data-message="${option.message}">
                                    <div class="tmc-card-icon">${option.icon}</div>
                                    <div class="tmc-card-label">${option.label}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-action" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <span>Continue on WhatsApp</span>
                        </button>
                        <div class="tmc-powered">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Notification -->
                <div class="tmc-toast" id="tmcToast">
                    <div class="tmc-toast-left">
                        <div class="tmc-toast-avatar">
                            <img src="${config.logoUrl}" alt="TMC">
                        </div>
                        <div>
                            <div class="tmc-toast-title">TMC 311</div>
                            <div class="tmc-toast-sub">Report civic issues in your language</div>
                        </div>
                    </div>
                    <button class="tmc-toast-close" aria-label="Close">×</button>
                </div>
            </div>
            
            <style>
                .tmc-widget * { box-sizing: border-box; }
                .tmc-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 999999;
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    color: ${config.colors.text};
                }
                
                /* FAB */
                .tmc-fab {
                    width: 64px;
                    height: 64px;
                    border-radius: 18px;
                    border: 1px solid ${config.colors.border};
                    background: linear-gradient(145deg, ${config.colors.primary}, ${config.colors.secondary});
                    color: #fff;
                    cursor: pointer;
                    display: grid;
                    place-items: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: ${config.colors.shadow};
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .tmc-fab:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 30px 80px rgba(0,0,0,0.35); }
                .tmc-fab-ring {
                    position: absolute;
                    inset: -12px;
                    border-radius: 24px;
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 45%),
                                radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2), transparent 50%);
                    filter: blur(6px);
                    opacity: 0.9;
                    animation: ring 6s linear infinite;
                }
                @keyframes ring { to { transform: rotate(360deg); } }
                .tmc-fab-icon { position: relative; z-index: 2; }
                .tmc-fab-badge {
                    position: absolute;
                    bottom: -4px;
                    right: 8px;
                    padding: 4px 8px;
                    background: rgba(0,0,0,0.65);
                    color: #fff;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                
                /* Chat container */
                .tmc-chat {
                    position: absolute;
                    bottom: 78px;
                    right: 0;
                    width: 400px;
                    max-height: 760px;
                    background: ${config.colors.background};
                    border: 1px solid ${config.colors.border};
                    border-radius: 22px;
                    box-shadow: ${config.colors.shadow};
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(16px) scale(0.97);
                    transition: all 0.25s ease;
                }
                .tmc-chat.show { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
                
                /* Header */
                .tmc-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 18px;
                    background: linear-gradient(120deg, rgba(11,93,82,0.9), rgba(13,159,110,0.9));
                    border-bottom: 1px solid ${config.colors.border};
                    backdrop-filter: blur(8px);
                }
                .tmc-header-left { display: flex; align-items: center; gap: 12px; }
                .tmc-avatar {
                    width: 46px; height: 46px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.25);
                    overflow: hidden;
                    display: grid; place-items: center;
                }
                .tmc-avatar img { width: 100%; height: 100%; object-fit: contain; background: #fff; }
                .tmc-headings { color: #fff; }
                .tmc-title { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
                .tmc-subtitle { font-size: 12px; opacity: 0.9; }
                .tmc-close {
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.25);
                    color: #fff;
                    width: 32px; height: 32px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 18px;
                    display: grid; place-items: center;
                    transition: background 0.2s ease;
                }
                .tmc-close:hover { background: rgba(255,255,255,0.2); }
                
                /* Body */
                .tmc-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px 16px 6px;
                    background: radial-gradient(circle at 20% 20%, rgba(27,215,65,0.08), transparent 28%),
                                radial-gradient(circle at 80% 10%, rgba(255,255,255,0.04), transparent 30%),
                                ${config.colors.background};
                }
                
                /* QR section */
                .tmc-qr-section {
                    background: ${config.colors.card};
                    border: 1px solid ${config.colors.border};
                    border-radius: 18px;
                    padding: 18px;
                    margin-bottom: 14px;
                    position: relative;
                    overflow: hidden;
                }
                .tmc-qr-section::after {
                    content:'';
                    position:absolute;
                    inset:0;
                    background: linear-gradient(135deg, rgba(27,215,65,0.10), rgba(13,159,110,0.08), rgba(255,255,255,0.02));
                    pointer-events:none;
                }
                .tmc-qr-frame {
                    position: relative;
                    width: 220px;
                    margin: 0 auto;
                    padding: 12px;
                    border-radius: 18px;
                    background: linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
                    border: 1px solid ${config.colors.border};
                    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
                }
                .tmc-qr-glow {
                    position: absolute;
                    inset: 10px;
                    background: radial-gradient(circle, rgba(27,215,65,0.14), transparent 55%);
                    filter: blur(12px);
                }
                .tmc-qr-image {
                    width: 100%;
                    border-radius: 12px;
                    position: relative;
                    z-index: 1;
                }
                .tmc-qr-badge {
                    position: absolute;
                    bottom: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 6px 14px;
                    background: #0D9F6E;
                    color: #fff;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.2px;
                    box-shadow: 0 12px 30px rgba(13,159,110,0.4);
                    z-index: 2;
                }
                .tmc-qr-copy {
                    text-align: center;
                    margin-top: 24px;
                    font-size: 13px;
                    color: ${config.colors.subtext};
                }
                .tmc-qr-chip {
                    margin-top: 8px;
                    text-align: center;
                    font-size: 12px;
                    color: ${config.colors.text};
                    background: ${config.colors.glass};
                    border: 1px solid ${config.colors.border};
                    display: inline-block;
                    padding: 8px 10px;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                }
                
                /* Preview bubble */
                .tmc-chat-preview { margin: 16px 0 12px; }
                .tmc-bubble {
                    background: ${config.colors.card};
                    border: 1px solid ${config.colors.border};
                    border-radius: 18px;
                    padding: 14px 16px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.18);
                }
                .tmc-bubble-text { font-size: 14px; line-height: 1.55; }
                .tmc-bubble-meta { margin-top: 8px; font-size: 12px; color: ${config.colors.subtext}; }
                
                /* Grid */
                .tmc-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 12px;
                    padding-bottom: 12px;
                }
                .tmc-card {
                    background: ${config.colors.card};
                    border: 1px solid ${config.colors.border};
                    border-radius: 16px;
                    padding: 14px 12px;
                    color: ${config.colors.text};
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.16);
                    display: grid;
                    gap: 8px;
                    justify-items: center;
                }
                .tmc-card:hover {
                    transform: translateY(-2px);
                    border-color: rgba(27,215,65,0.6);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.28);
                    background: rgba(255,255,255,0.08);
                }
                .tmc-card-icon { font-size: 22px; }
                .tmc-card-label { font-size: 13px; font-weight: 700; letter-spacing: -0.01em; }
                
                /* Footer */
                .tmc-footer {
                    padding: 14px 16px 16px;
                    border-top: 1px solid ${config.colors.border};
                    background: rgba(0,0,0,0.35);
                    backdrop-filter: blur(12px);
                }
                .tmc-action {
                    width: 100%;
                    padding: 14px;
                    border: none;
                    border-radius: 14px;
                    background: linear-gradient(135deg, ${config.colors.secondary}, ${config.colors.accent});
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.1px;
                    cursor: pointer;
                    box-shadow: 0 12px 30px rgba(27,215,65,0.35);
                    transition: transform 0.16s ease, box-shadow 0.16s ease;
                }
                .tmc-action:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(27,215,65,0.45); }
                .tmc-powered {
                    margin-top: 10px;
                    text-align: center;
                    font-size: 11px;
                    color: ${config.colors.subtext};
                }
                .tmc-powered a { color: ${config.colors.subtext}; text-decoration: none; }
                .tmc-powered a:hover { color: #fff; }
                
                /* Toast */
                .tmc-toast {
                    position: absolute;
                    bottom: 86px;
                    right: 0;
                    background: ${config.colors.background};
                    border: 1px solid ${config.colors.border};
                    border-radius: 16px;
                    padding: 12px;
                    box-shadow: ${config.colors.shadow};
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(16px);
                    transition: all 0.25s ease;
                    width: 300px;
                }
                .tmc-toast.show { opacity: 1; visibility: visible; transform: translateX(0); }
                .tmc-toast-left { display: flex; align-items: center; gap: 10px; }
                .tmc-toast-avatar { width: 38px; height: 38px; border-radius: 10px; overflow: hidden; background: #fff; display: grid; place-items: center; }
                .tmc-toast-avatar img { width: 100%; height: 100%; object-fit: contain; }
                .tmc-toast-title { font-size: 13px; font-weight: 700; }
                .tmc-toast-sub { font-size: 11px; color: ${config.colors.subtext}; }
                .tmc-toast-close {
                    margin-left: auto;
                    background: transparent;
                    border: none;
                    color: ${config.colors.subtext};
                    font-size: 16px;
                    cursor: pointer;
                }
                
                /* Scrollbar */
                .tmc-body::-webkit-scrollbar { width: 8px; }
                .tmc-body::-webkit-scrollbar-thumb { background: ${config.colors.glass}; border-radius: 10px; }
                
                /* Mobile */
                @media (max-width: 480px) {
                    .tmc-widget { bottom: 16px; right: 16px; }
                    .tmc-chat { width: calc(100vw - 28px); max-height: calc(100vh - 120px); }
                }
                
                @media print {
                    .tmc-widget { display: none !important; }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            let container = document.getElementById('tmc-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'tmc-chat-widget-container';
                document.body.appendChild(container);
            }
            container.innerHTML = createWidget();
            
            const fab = document.getElementById('tmcFab');
            const chat = document.getElementById('tmcChat');
            const closeBtn = chat.querySelector('.tmc-close');
            const toast = document.getElementById('tmcToast');
            const toastClose = toast.querySelector('.tmc-toast-close');
            const cards = chat.querySelectorAll('.tmc-card');
            
            const toggleChat = () => {
                const open = chat.classList.contains('show');
                chat.classList.toggle('show', !open);
                if (!open) toast.classList.remove('show');
            };
            
            fab.addEventListener('click', toggleChat);
            closeBtn.addEventListener('click', () => chat.classList.remove('show'));
            toastClose.addEventListener('click', () => toast.classList.remove('show'));
            
            // Auto toast
            setTimeout(() => {
                if (!chat.classList.contains('show')) {
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 9000);
                }
            }, 4500);
            
            // Card clicks
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                });
            });
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                const widget = document.getElementById('tmcWidget');
                if (widget && !widget.contains(e.target) && chat.classList.contains('show')) {
                    chat.classList.remove('show');
                }
            });
            
            // Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && chat.classList.contains('show')) chat.classList.remove('show');
            });
            
            console.log('✅ TMC 311 Widget initialized');
        } catch (err) {
            console.error('❌ Widget init failed:', err);
        }
    };
    
    // Public API
    window.TMC311Widget = {
        open: () => document.getElementById('tmcChat')?.classList.add('show'),
        close: () => document.getElementById('tmcChat')?.classList.remove('show'),
        toggle: () => document.getElementById('tmcFab')?.click()
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
