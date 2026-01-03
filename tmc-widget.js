/**
 * Thane Municipal Corporation (TMC) 311 Premium Widget
 * File: tmc-311-premium-widget.js
 * Version: 4.0.0 (Ultra Modern)
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
        // High-res QR with specific margin for better scanning
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/15558830019?text=Hi&margin=10&bgcolor=ffffff',
        colors: {
            brand: '#10b981',         // Modern Emerald
            brandDark: '#047857',     
            brandLight: '#d1fae5',
            darkText: '#111827',
            lightText: '#6b7280',
            bgBlur: 'rgba(255, 255, 255, 0.92)'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    const menuOptions = [
        { id: 'pothole', label: 'Report Pothole', icon: '🚧', message: 'I want to report a pothole' },
        { id: 'garbage', label: 'Garbage Dump', icon: '🗑️', message: 'I want to report uncollected garbage' },
        { id: 'light', label: 'Street Light', icon: '💡', message: 'Street light not working' },
        { id: 'drain', label: 'Drainage Issue', icon: '💧', message: 'Report drainage overflow' },
        { id: 'tree', label: 'Tree Trimming', icon: '🌳', message: 'Request tree trimming' },
        { id: 'animal', label: 'Dead Animal', icon: '🐄', message: 'Report dead animal' }
    ];
    
    const createWidget = () => {
        return `
            <div class="tmc-widget-root" id="tmcWidget">
                <!-- Pulse Effect Ring -->
                <div class="tmc-fab-pulse"></div>
                
                <!-- Main FAB -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open 311 Support">
                    <div class="tmc-fab-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <span class="tmc-fab-tooltip">311 Support</span>
                </button>
                
                <!-- Main Card -->
                <div class="tmc-card" id="tmcCard">
                    <!-- Header -->
                    <div class="tmc-card-header">
                        <div class="tmc-brand-row">
                            <img src="${config.logoUrl}" alt="TMC Logo" class="tmc-logo">
                            <div class="tmc-brand-text">
                                <h1 class="tmc-title">Thane Municipal Corp</h1>
                                <span class="tmc-badge">Official 311 Service</span>
                            </div>
                        </div>
                        <button class="tmc-close-btn" aria-label="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <!-- Scrollable Content -->
                    <div class="tmc-card-body">
                        <!-- QR Hero Section -->
                        <div class="tmc-qr-wrapper">
                            <div class="tmc-qr-glass">
                                <div class="tmc-qr-corners"></div>
                                <img src="${config.qrCodeUrl}" alt="WhatsApp QR" class="tmc-qr-img">
                                <div class="tmc-scan-line"></div>
                            </div>
                            <p class="tmc-qr-instruction">Scan to chat instantly on WhatsApp</p>
                        </div>

                        <!-- Divider -->
                        <div class="tmc-divider">
                            <span>or select a service below</span>
                        </div>

                        <!-- Service Grid -->
                        <div class="tmc-grid">
                            ${menuOptions.map(opt => `
                                <button class="tmc-service-card" data-msg="${opt.message}">
                                    <div class="tmc-service-icon">${opt.icon}</div>
                                    <span class="tmc-service-label">${opt.label}</span>
                                    <div class="tmc-arrow">→</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-whatsapp-full" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            Start New Conversation
                        </button>
                        <div class="tmc-attribution">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                .tmc-widget-root {
                    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 2147483647;
                    --tmc-primary: #10b981;
                    --tmc-primary-dark: #059669;
                    --tmc-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    --tmc-shadow-glow: 0 0 15px rgba(16, 185, 129, 0.5);
                }

                /* --- FAB & Animations --- */
                .tmc-fab {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #34d399 0%, #059669 100%);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .tmc-fab:hover {
                    transform: scale(1.1);
                    box-shadow: var(--tmc-shadow-glow);
                }

                .tmc-fab-pulse {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: var(--tmc-primary);
                    opacity: 0.5;
                    z-index: 1;
                    animation: tmc-pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                @keyframes tmc-pulse-ring {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2); opacity: 0; }
                }

                .tmc-fab-tooltip {
                    position: absolute;
                    right: 76px;
                    background: #1f2937;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.2s;
                    pointer-events: none;
                    white-space: nowrap;
                }

                .tmc-fab:hover .tmc-fab-tooltip {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* --- Main Card Container --- */
                .tmc-card {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 380px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-radius: 24px;
                    box-shadow: var(--tmc-shadow-lg);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    overflow: hidden;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transform-origin: bottom right;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                }

                .tmc-card.tmc-show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                /* --- Header --- */
                .tmc-card-header {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0));
                }

                .tmc-brand-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .tmc-logo {
                    width: 44px;
                    height: 44px;
                    object-fit: contain;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }

                .tmc-brand-text {
                    display: flex;
                    flex-direction: column;
                }

                .tmc-title {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 700;
                    color: #111827;
                    letter-spacing: -0.02em;
                }

                .tmc-badge {
                    font-size: 11px;
                    color: var(--tmc-primary);
                    background: #ecfdf5;
                    padding: 2px 6px;
                    border-radius: 4px;
                    width: fit-content;
                    font-weight: 600;
                    margin-top: 2px;
                }

                .tmc-close-btn {
                    background: #f3f4f6;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #6b7280;
                    transition: all 0.2s;
                }

                .tmc-close-btn:hover {
                    background: #e5e7eb;
                    color: #111827;
                    transform: rotate(90deg);
                }

                /* --- Body Content --- */
                .tmc-card-body {
                    padding: 0 20px;
                    overflow-y: auto;
                    max-height: 60vh;
                }

                /* --- QR Section --- */
                .tmc-qr-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 24px;
                    position: relative;
                }

                .tmc-qr-glass {
                    background: white;
                    padding: 12px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.15);
                    position: relative;
                    overflow: hidden;
                    border: 1px solid #f3f4f6;
                }

                .tmc-qr-img {
                    width: 160px;
                    height: 160px;
                    border-radius: 12px;
                    display: block;
                }

                .tmc-qr-corners {
                    position: absolute;
                    inset: 8px;
                    border: 2px solid transparent;
                    border-radius: 16px;
                    background: 
                        linear-gradient(to right, var(--tmc-primary) 4px, transparent 4px) 0 0,
                        linear-gradient(to bottom, var(--tmc-primary) 4px, transparent 4px) 0 0,
                        linear-gradient(to left, var(--tmc-primary) 4px, transparent 4px) 100% 0,
                        linear-gradient(to bottom, var(--tmc-primary) 4px, transparent 4px) 100% 0,
                        linear-gradient(to right, var(--tmc-primary) 4px, transparent 4px) 0 100%,
                        linear-gradient(to top, var(--tmc-primary) 4px, transparent 4px) 0 100%,
                        linear-gradient(to left, var(--tmc-primary) 4px, transparent 4px) 100% 100%,
                        linear-gradient(to top, var(--tmc-primary) 4px, transparent 4px) 100% 100%;
                    background-repeat: no-repeat;
                    background-size: 20px 20px;
                    pointer-events: none;
                }

                .tmc-scan-line {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: var(--tmc-primary);
                    box-shadow: 0 0 10px var(--tmc-primary);
                    top: 0;
                    left: 0;
                    animation: tmc-scan 2.5s ease-in-out infinite;
                }

                @keyframes tmc-scan {
                    0% { top: 10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 90%; opacity: 0; }
                }

                .tmc-qr-instruction {
                    margin-top: 12px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #6b7280;
                    background: #f9fafb;
                    padding: 6px 12px;
                    border-radius: 20px;
                }

                /* --- Divider --- */
                .tmc-divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin: 16px 0;
                }

                .tmc-divider::before, .tmc-divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #e5e7eb;
                }

                .tmc-divider span {
                    padding: 0 10px;
                }

                /* --- Grid Services --- */
                .tmc-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    padding-bottom: 20px;
                }

                .tmc-service-card {
                    background: white;
                    border: 1px solid #f3f4f6;
                    border-radius: 16px;
                    padding: 16px 12px;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }

                .tmc-service-card:hover {
                    border-color: var(--tmc-primary);
                    background: #f0fdf4;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                }

                .tmc-service-icon {
                    font-size: 20px;
                    width: 36px;
                    height: 36px;
                    background: #f9fafb;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }

                .tmc-service-card:hover .tmc-service-icon {
                    background: white;
                }

                .tmc-service-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #374151;
                    line-height: 1.2;
                }

                .tmc-arrow {
                    position: absolute;
                    top: 16px;
                    right: 12px;
                    font-size: 14px;
                    color: var(--tmc-primary);
                    opacity: 0;
                    transform: translateX(-5px);
                    transition: all 0.2s;
                }

                .tmc-service-card:hover .tmc-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* --- Footer --- */
                .tmc-footer {
                    padding: 20px;
                    background: #f9fafb;
                    border-top: 1px solid #f3f4f6;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .tmc-whatsapp-full {
                    width: 100%;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .tmc-whatsapp-full:hover {
                    opacity: 0.95;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 8px -1px rgba(16, 185, 129, 0.3);
                }

                .tmc-attribution {
                    text-align: center;
                    font-size: 11px;
                }

                .tmc-attribution a {
                    color: #9ca3af;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }

                .tmc-attribution a:hover {
                    color: var(--tmc-primary);
                }

                /* --- Mobile Responsiveness --- */
                @media (max-width: 480px) {
                    .tmc-widget-root { bottom: 16px; right: 16px; }
                    .tmc-card { 
                        width: calc(100vw - 32px); 
                        bottom: 90px;
                        right: 0; 
                    }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        // Only init if not present
        if(document.getElementById('tmc-widget-root')) return;

        let container = document.createElement('div');
        container.id = 'tmc-widget-root';
        document.body.appendChild(container);
        container.innerHTML = createWidget();
        
        // Element References
        const fab = document.getElementById('tmcFab');
        const card = document.getElementById('tmcCard');
        const closeBtn = card.querySelector('.tmc-close-btn');
        const serviceCards = document.querySelectorAll('.tmc-service-card');
        const pulse = document.querySelector('.tmc-fab-pulse');
        
        // Logic
        const toggleWidget = () => {
            const isVisible = card.classList.contains('tmc-show');
            if (isVisible) {
                card.classList.remove('tmc-show');
                pulse.style.display = 'block';
            } else {
                card.classList.add('tmc-show');
                pulse.style.display = 'none';
            }
        };

        fab.addEventListener('click', toggleWidget);
        closeBtn.addEventListener('click', toggleWidget);
        
        // Service Selection
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const message = this.getAttribute('data-msg');
                const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        });
        
        // Click Outside to Close
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && card.classList.contains('tmc-show')) {
                toggleWidget();
            }
        });

        console.log('✅ TMC 311 Premium Widget Initialized');
    };
    
    // Auto-load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
