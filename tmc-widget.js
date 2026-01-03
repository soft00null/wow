/**
 * Thane Municipal Corporation (TMC) 311 Grievance Widget
 * File: tmc-311-modern-widget.js
 * Version: 3.0.0 (Modern UI)
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
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=https://wa.me/15558830019?text=Hi',
        colors: {
            primary: '#128C7E',      // WhatsApp Teal
            dark: '#075E54',         // Darker Teal
            accent: '#25D366',       // Bright Green
            bg: '#F0F2F5',           // Light Gray BG
            surface: '#FFFFFF',
            text: '#111B21',
            subtext: '#54656F',
            danger: '#EA4335',       // For high priority/potholes
            warning: '#FBBC04',      // For garbage
            info: '#4285F4'          // For others
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Pure 311 Grievance Menu (No Payments/Water)
    const menuOptions = [
        { id: 'pothole', label: 'Report Pothole', icon: '🚧', color: '#FFF5F5', border: '#FEB2B2', message: 'I want to report a pothole' },
        { id: 'garbage', label: 'Garbage Dump', icon: '🗑️', color: '#F0FFF4', border: '#9AE6B4', message: 'I want to report uncollected garbage' },
        { id: 'lights', label: 'Street Lights', icon: '💡', color: '#FFFFF0', border: '#FBD38D', message: 'Street light is not working' },
        { id: 'drainage', label: 'Drainage/Sewage', icon: '🚿', color: '#EBF8FF', border: '#90CDF4', message: 'Report drainage overflow' },
        { id: 'parking', label: 'Illegal Parking', icon: '🚫', color: '#FFF5F7', border: '#FFBBF8', message: 'Report illegal parking' },
        { id: 'debris', label: 'Construction Debris', icon: '🏗️', color: '#F7FAFC', border: '#CBD5E0', message: 'Report construction debris' }
    ];
    
    const createWidget = () => {
        return `
            <div class="tmc-widget" id="tmcWidget">
                <!-- Modern FAB with notification dot -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open 311 Support">
                    <div class="tmc-fab-content">
                        <img src="${config.logoUrl}" alt="TMC" class="tmc-fab-logo">
                        <div class="tmc-fab-badge">311</div>
                    </div>
                </button>
                
                <!-- Main Widget Container -->
                <div class="tmc-chat" id="tmcChat">
                    <!-- Hero Header -->
                    <div class="tmc-header">
                        <div class="tmc-header-top">
                            <span class="tmc-live-badge">● Live Agent AI</span>
                            <button class="tmc-close" aria-label="Close">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div class="tmc-brand-area">
                            <h1 class="tmc-title">Thane Municipal Corporation</h1>
                            <p class="tmc-subtitle">Citizen Grievance Redressal</p>
                        </div>
                    </div>
                    
                    <div class="tmc-scroll-area">
                        <!-- Stunning QR Card -->
                        <div class="tmc-qr-card">
                            <div class="tmc-qr-glass">
                                <div class="tmc-qr-header">
                                    <span>Scan to Chat</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${config.colors.accent}"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/></svg>
                                </div>
                                <div class="tmc-qr-body">
                                    <img src="${config.qrCodeUrl}" alt="QR Code" class="tmc-qr-code">
                                </div>
                                <div class="tmc-qr-footer">
                                    <span class="tmc-qr-tag">Multilingual Support (22 Languages)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Welcome Text -->
                        <div class="tmc-welcome">
                            <p>👋 <strong>Namaskar!</strong> Report civic issues instantly by clicking below or scanning the QR.</p>
                        </div>

                        <!-- 311 Grid -->
                        <div class="tmc-grid">
                            ${menuOptions.map(opt => `
                                <button class="tmc-grid-item" data-message="${opt.message}" style="--item-bg:${opt.color}; --item-border:${opt.border}">
                                    <span class="tmc-grid-icon">${opt.icon}</span>
                                    <span class="tmc-grid-label">${opt.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-cta" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            Open WhatsApp
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                        <div class="tmc-powered">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Notification Pill -->
                <div class="tmc-notify" id="tmcNotify">
                    <div class="tmc-notify-dot"></div>
                    <span>Report a pothole in 30 seconds!</span>
                    <button class="tmc-notify-close">×</button>
                </div>
            </div>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .tmc-widget * {
                    box-sizing: border-box;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                .tmc-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 100000;
                    isolation: isolate;
                }

                /* --- FAB Design --- */
                .tmc-fab {
                    width: 64px;
                    height: 64px;
                    border-radius: 24px;
                    background: ${config.colors.surface};
                    border: none;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04);
                    cursor: pointer;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    padding: 0;
                    overflow: visible;
                }

                .tmc-fab:hover {
                    transform: scale(1.05) translateY(-2px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
                }

                .tmc-fab-content {
                    width: 100%;
                    height: 100%;
                    border-radius: 24px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                }

                .tmc-fab-logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                }

                .tmc-fab-badge {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    background: ${config.colors.danger};
                    color: white;
                    font-size: 11px;
                    font-weight: 800;
                    padding: 4px 8px;
                    border-radius: 10px;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                /* --- Chat Window --- */
                .tmc-chat {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 360px;
                    max-height: 85vh;
                    background: ${config.colors.bg};
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                    transform-origin: bottom right;
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .tmc-chat.active {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    visibility: visible;
                }

                /* --- Header --- */
                .tmc-header {
                    background: linear-gradient(135deg, ${config.colors.primary}, ${config.colors.dark});
                    padding: 24px;
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .tmc-header::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 70%);
                    pointer-events: none;
                }

                .tmc-header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .tmc-live-badge {
                    font-size: 11px;
                    background: rgba(255,255,255,0.2);
                    backdrop-filter: blur(4px);
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-weight: 600;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .tmc-live-badge::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: #4ADE80;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #4ADE80;
                }

                .tmc-close {
                    background: rgba(255,255,255,0.15);
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                    z-index: 2;
                }

                .tmc-close:hover {
                    background: rgba(255,255,255,0.3);
                }

                .tmc-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 4px;
                    letter-spacing: -0.02em;
                }

                .tmc-subtitle {
                    font-size: 13px;
                    opacity: 0.9;
                }

                /* --- Scroll Content --- */
                .tmc-scroll-area {
                    flex: 1;
                    overflow-y: auto;
                    padding: 0 20px 20px;
                }

                /* --- Stunning QR Card --- */
                .tmc-qr-card {
                    margin-top: -30px;
                    position: relative;
                    z-index: 10;
                    padding: 0 10px;
                }

                .tmc-qr-glass {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.8);
                    border-radius: 20px;
                    padding: 16px;
                    box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1);
                    text-align: center;
                }

                .tmc-qr-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    color: ${config.colors.subtext};
                    margin-bottom: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .tmc-qr-body {
                    background: white;
                    padding: 12px;
                    border-radius: 12px;
                    border: 1px solid #eee;
                    display: inline-block;
                    margin-bottom: 12px;
                }

                .tmc-qr-code {
                    width: 140px;
                    height: 140px;
                    display: block;
                }

                .tmc-qr-tag {
                    font-size: 11px;
                    background: ${config.colors.bg};
                    color: ${config.colors.text};
                    padding: 6px 12px;
                    border-radius: 12px;
                    font-weight: 600;
                }

                /* --- Welcome --- */
                .tmc-welcome {
                    margin: 20px 0;
                    text-align: center;
                    font-size: 14px;
                    color: ${config.colors.subtext};
                    line-height: 1.5;
                }

                /* --- Grid --- */
                .tmc-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .tmc-grid-item {
                    background: var(--item-bg);
                    border: 1px solid var(--item-border);
                    border-radius: 16px;
                    padding: 16px;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .tmc-grid-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    filter: brightness(0.98);
                }

                .tmc-grid-icon {
                    font-size: 24px;
                }

                .tmc-grid-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: ${config.colors.text};
                    line-height: 1.3;
                }

                /* --- Footer --- */
                .tmc-footer {
                    background: white;
                    padding: 16px 20px 20px;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .tmc-cta {
                    width: 100%;
                    background: ${config.colors.text};
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: transform 0.1s;
                }

                .tmc-cta:active {
                    transform: scale(0.98);
                }

                .tmc-powered {
                    margin-top: 12px;
                    text-align: center;
                    font-size: 10px;
                    color: #999;
                }

                .tmc-powered a {
                    color: inherit;
                    text-decoration: none;
                    font-weight: 500;
                }

                .tmc-powered a:hover {
                    text-decoration: underline;
                }

                /* --- Notification --- */
                .tmc-notify {
                    position: absolute;
                    bottom: 24px;
                    right: 80px;
                    background: white;
                    padding: 12px 16px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    white-space: nowrap;
                    font-size: 13px;
                    font-weight: 500;
                    color: ${config.colors.text};
                    opacity: 0;
                    transform: translateX(10px);
                    visibility: hidden;
                    transition: all 0.4s ease;
                }

                .tmc-notify.show {
                    opacity: 1;
                    transform: translateX(0);
                    visibility: visible;
                }

                .tmc-notify-dot {
                    width: 8px;
                    height: 8px;
                    background: ${config.colors.danger};
                    border-radius: 50%;
                    animation: pulseDot 1.5s infinite;
                }

                .tmc-notify-close {
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    font-size: 16px;
                    padding-left: 8px;
                }

                @keyframes pulseDot {
                    0% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0.4); }
                    70% { box-shadow: 0 0 0 6px rgba(234, 67, 53, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0); }
                }

                /* Mobile Override */
                @media (max-width: 480px) {
                    .tmc-chat {
                        width: calc(100vw - 32px);
                        right: 16px;
                        bottom: 96px;
                    }
                    .tmc-notify {
                        display: none;
                    }
                }
                
                @media print { .tmc-widget { display: none; } }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            let container = document.getElementById('tmc-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'tmc-widget-container';
                document.body.appendChild(container);
            }
            container.innerHTML = createWidget();
            
            // Logic
            const fab = document.getElementById('tmcFab');
            const chat = document.getElementById('tmcChat');
            const close = document.querySelector('.tmc-close');
            const notify = document.getElementById('tmcNotify');
            const notifyClose = document.querySelector('.tmc-notify-close');
            const gridItems = document.querySelectorAll('.tmc-grid-item');
            
            const toggle = () => {
                const isActive = chat.classList.contains('active');
                if (isActive) {
                    chat.classList.remove('active');
                } else {
                    chat.classList.add('active');
                    notify.classList.remove('show');
                }
            };
            
            fab.addEventListener('click', toggle);
            close.addEventListener('click', () => chat.classList.remove('active'));
            
            // Auto-notify after 3s
            setTimeout(() => {
                if(!chat.classList.contains('active')) notify.classList.add('show');
            }, 3000);
            
            notifyClose.addEventListener('click', (e) => {
                e.stopPropagation();
                notify.classList.remove('show');
            });
            
            gridItems.forEach(item => {
                item.addEventListener('click', function() {
                    const msg = this.getAttribute('data-message');
                    window.open(`https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                });
            });
            
            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target) && chat.classList.contains('active')) {
                    chat.classList.remove('active');
                }
            });

            console.log('✅ TMC 311 Modern Widget Loaded');
        } catch (e) {
            console.error('Widget Error:', e);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
