/**
 * Thane 311 AI Widget
 * File: tmc-311-ai-widget.js
 * Version: 5.0.0 (Mobile Optimized & AI Focus)
 * Date: 2026-01-03
 * Brand: WhatsUp.city
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    if (window.Thane311Widget) {
        console.warn('Thane 311 Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '15558830019',
        defaultMessage: 'Hi',
        logoUrl: 'https://wow-strategies.com/tmc.png',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/15558830019?text=Hi&margin=10&bgcolor=ffffff',
        colors: {
            primary: '#10b981',        // Emerald Green
            primaryDark: '#059669',
            accent: '#3b82f6',         // AI Blue Accent
            textDark: '#111827',
            textLight: '#6b7280',
            surface: 'rgba(255, 255, 255, 0.95)'
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
            <div class="t311-root" id="t311Widget">
                <!-- Pulse Effect Ring -->
                <div class="t311-fab-pulse"></div>
                
                <!-- Main FAB -->
                <button class="t311-fab" id="t311Fab" aria-label="Open Thane 311">
                    <div class="t311-fab-content">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                </button>
                
                <!-- Main Card -->
                <div class="t311-card" id="t311Card">
                    <!-- Header -->
                    <div class="t311-header">
                        <div class="t311-brand">
                            <img src="${config.logoUrl}" alt="TMC Logo" class="t311-logo">
                            <div class="t311-titles">
                                <h1 class="t311-h1">Thane 311</h1>
                                <div class="t311-ai-badge">
                                    <span class="t311-sparkle">✨</span> AI Powered
                                </div>
                            </div>
                        </div>
                        <button class="t311-close" aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="t311-body">
                        <!-- QR Hero -->
                        <div class="t311-qr-section">
                            <div class="t311-qr-card">
                                <img src="${config.qrCodeUrl}" alt="Scan QR" class="t311-qr-img">
                                <div class="t311-scan-laser"></div>
                            </div>
                            <p class="t311-qr-text">Scan to report issues instantly</p>
                        </div>

                        <!-- Divider -->
                        <div class="t311-divider">
                            <span>Quick Services</span>
                        </div>

                        <!-- Grid -->
                        <div class="t311-grid">
                            ${menuOptions.map(opt => `
                                <button class="t311-option" data-msg="${opt.message}">
                                    <div class="t311-icon">${opt.icon}</div>
                                    <span class="t311-label">${opt.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="t311-footer">
                        <button class="t311-btn-primary" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            Chat on WhatsApp
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                        <div class="t311-copyright">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .t311-root {
                    font-family: 'Inter', -apple-system, sans-serif;
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 2147483647;
                    --t311-primary: ${config.colors.primary};
                    --t311-accent: ${config.colors.accent};
                    --t311-bg: ${config.colors.surface};
                    --t311-text: ${config.colors.textDark};
                }

                /* FAB Animation */
                .t311-fab {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                    position: relative;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease;
                }

                .t311-fab:hover {
                    transform: scale(1.05);
                }

                .t311-fab-pulse {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--t311-primary);
                    opacity: 0.4;
                    z-index: 1;
                    animation: pulse-ring 2s infinite;
                }

                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(1.8); opacity: 0; }
                }

                /* Main Card */
                .t311-card {
                    position: absolute;
                    bottom: 76px;
                    right: 0;
                    width: 360px;
                    background: var(--t311-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.4);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transform-origin: bottom right;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .t311-card.is-open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                /* Header */
                .t311-header {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    background: rgba(255,255,255,0.8);
                }

                .t311-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .t311-logo {
                    width: 40px;
                    height: 40px;
                    object-fit: contain;
                }

                .t311-titles {
                    display: flex;
                    flex-direction: column;
                }

                .t311-h1 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--t311-text);
                    letter-spacing: -0.01em;
                }

                .t311-ai-badge {
                    font-size: 11px;
                    color: var(--t311-accent);
                    background: #eff6ff;
                    padding: 2px 8px;
                    border-radius: 12px;
                    width: fit-content;
                    font-weight: 600;
                    margin-top: 2px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    border: 1px solid #dbeafe;
                }

                .t311-sparkle {
                    font-size: 10px;
                    animation: sparkle 1.5s infinite alternate;
                }

                @keyframes sparkle {
                    0% { opacity: 0.6; transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1.1); }
                }

                .t311-close {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #9ca3af;
                    padding: 4px;
                    border-radius: 50%;
                    transition: all 0.2s;
                    display: flex;
                }

                .t311-close:hover {
                    background: #f3f4f6;
                    color: #374151;
                }

                /* Body */
                .t311-body {
                    padding: 20px 20px 10px;
                    overflow-y: auto;
                    max-height: 60vh;
                }

                /* QR Section */
                .t311-qr-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .t311-qr-card {
                    padding: 10px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
                    position: relative;
                    border: 1px solid #f3f4f6;
                }

                .t311-qr-img {
                    width: 140px;
                    height: 140px;
                    border-radius: 8px;
                    display: block;
                }

                .t311-scan-laser {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: var(--t311-primary);
                    box-shadow: 0 0 8px var(--t311-primary);
                    top: 10px;
                    left: 0;
                    animation: scan 2s linear infinite;
                    opacity: 0.8;
                }

                @keyframes scan {
                    0% { top: 10px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 150px; opacity: 0; }
                }

                .t311-qr-text {
                    margin-top: 12px;
                    font-size: 12px;
                    color: #6b7280;
                    font-weight: 500;
                }

                /* Divider */
                .t311-divider {
                    display: flex;
                    align-items: center;
                    margin: 10px 0 16px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #9ca3af;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .t311-divider::before, .t311-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #e5e7eb;
                }

                .t311-divider span {
                    padding: 0 10px;
                }

                /* Grid */
                .t311-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .t311-option {
                    background: white;
                    border: 1px solid #f3f4f6;
                    border-radius: 12px;
                    padding: 12px;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .t311-option:hover {
                    border-color: var(--t311-primary);
                    background: #ecfdf5;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.04);
                }

                .t311-icon {
                    font-size: 18px;
                    width: 32px;
                    height: 32px;
                    background: #f9fafb;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .t311-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--t311-text);
                    line-height: 1.3;
                }

                /* Footer */
                .t311-footer {
                    padding: 16px 20px 20px;
                    background: #f9fafb;
                    border-top: 1px solid #f3f4f6;
                }

                .t311-btn-primary {
                    width: 100%;
                    background: var(--t311-primary);
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: opacity 0.2s;
                    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
                }

                .t311-btn-primary:hover {
                    opacity: 0.95;
                }

                .t311-copyright {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 10px;
                }

                .t311-copyright a {
                    color: #9ca3af;
                    text-decoration: none;
                    font-weight: 500;
                }

                .t311-copyright a:hover {
                    color: var(--t311-primary);
                }

                /* Mobile Optimization */
                @media (max-width: 480px) {
                    .t311-root {
                        bottom: 16px;
                        right: 16px;
                    }
                    
                    .t311-card {
                        width: calc(100vw - 32px);
                        bottom: 80px;
                        right: 0;
                        max-height: calc(100vh - 120px);
                    }

                    .t311-body {
                        padding: 16px;
                    }

                    .t311-grid {
                        grid-template-columns: 1fr; /* Stack on very small screens */
                    }
                    
                    /* iPhone Notch Safety */
                    .t311-card {
                        padding-bottom: env(safe-area-inset-bottom);
                    }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        if(document.getElementById('t311Widget')) return;

        const container = document.createElement('div');
        document.body.appendChild(container);
        container.innerHTML = createWidget();
        
        const fab = document.getElementById('t311Fab');
        const card = document.getElementById('t311Card');
        const close = card.querySelector('.t311-close');
        const options = document.querySelectorAll('.t311-option');
        
        const toggle = () => card.classList.toggle('is-open');
        
        fab.addEventListener('click', toggle);
        close.addEventListener('click', () => card.classList.remove('is-open'));
        
        options.forEach(opt => {
            opt.addEventListener('click', function() {
                const msg = this.getAttribute('data-msg');
                window.open(`https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            const root = document.getElementById('t311Widget');
            if (root && !root.contains(e.target) && card.classList.contains('is-open')) {
                card.classList.remove('is-open');
            }
        });

        console.log('✅ Thane 311 Widget Loaded');
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
