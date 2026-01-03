/**
 * Thane Municipal Corporation (TMC) 311 Grievance Widget
 * File: tmc-311-modern-widget.js
 * Version: 3.0.0 (Modern UI Overhaul)
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
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/15558830019?text=Hi&margin=10',
        colors: {
            primary: '#0F5132',        // Deep Municipal Green
            gradientStart: '#198754',  // Vibrant Green
            gradientEnd: '#0DCAF0',    // Cyan/Blue Accent
            accent: '#25D366',         // WhatsApp Brand Color
            bg: '#F3F4F6',
            surface: '#FFFFFF',
            textMain: '#1F2937',
            textSub: '#6B7280',
            border: '#E5E7EB'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Strictly 311 Urban Grievance Options
    const menuOptions = [
        { id: 'pothole', label: 'Report Pothole', icon: '🚧', message: 'I want to report a pothole' },
        { id: 'garbage', label: 'Garbage Dump', icon: '🗑️', message: 'I want to report uncollected garbage' },
        { id: 'light', label: 'Street Light', icon: '💡', message: 'Street light not working' },
        { id: 'drain', label: 'Drainage/Sewage', icon: '🕳️', message: 'Report drainage overflow' },
        { id: 'tree', label: 'Tree Trimming', icon: '🌳', message: 'Request tree trimming' },
        { id: 'debris', label: 'Constr. Debris', icon: '🏗️', message: 'Report construction debris' }
    ];
    
    const createWidget = () => {
        return `
            <div class="tmc-widget" id="tmcWidget">
                <!-- Modern FAB with Ripple Effect -->
                <div class="tmc-fab-wrapper">
                    <button class="tmc-fab" id="tmcFab" aria-label="Open TMC 311 Support">
                        <div class="tmc-fab-content">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                        </div>
                    </button>
                    <div class="tmc-badge">311 Help</div>
                </div>
                
                <!-- Main Widget Card -->
                <div class="tmc-card" id="tmcChat">
                    <!-- Glass Header -->
                    <div class="tmc-header">
                        <div class="tmc-header-left">
                            <div class="tmc-logo-wrap">
                                <img src="${config.logoUrl}" alt="TMC" class="tmc-logo-img">
                            </div>
                            <div class="tmc-titles">
                                <h1>Thane Municipal Corp</h1>
                                <p>311 Grievance Assistant</p>
                            </div>
                        </div>
                        <button class="tmc-close" aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                    </div>
                    
                    <div class="tmc-body">
                        <!-- Stunning QR Section -->
                        <div class="tmc-hero-qr">
                            <div class="tmc-qr-frame">
                                <div class="tmc-scanner-line"></div>
                                <img src="${config.qrCodeUrl}" alt="Scan to Chat" class="tmc-qr-code">
                            </div>
                            <p class="tmc-qr-label">Scan to launch WhatsApp 311</p>
                        </div>

                        <div class="tmc-divider">
                            <span>OR SELECT ISSUE</span>
                        </div>

                        <!-- 311 Grid Menu -->
                        <div class="tmc-grid">
                            ${menuOptions.map(opt => `
                                <button class="tmc-grid-item" data-msg="${opt.message}">
                                    <div class="tmc-icon-box">${opt.icon}</div>
                                    <span>${opt.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-wa-btn" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            Open WhatsApp Chat
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                        <div class="tmc-copyright">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .tmc-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 999999;
                    font-family: 'Inter', sans-serif;
                    --tmc-accent: ${config.colors.accent};
                    --tmc-grad-1: ${config.colors.gradientStart};
                    --tmc-grad-2: ${config.colors.gradientEnd};
                }

                /* FAB Styles */
                .tmc-fab-wrapper {
                    position: relative;
                }

                .tmc-fab {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    border: none;
                    background: linear-gradient(135deg, var(--tmc-accent), #128C7E);
                    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
                    cursor: pointer;
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tmc-fab:hover {
                    transform: scale(1.1) rotate(-5deg);
                }

                .tmc-badge {
                    position: absolute;
                    top: -8px;
                    right: 0;
                    background: #EF4444;
                    color: white;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 4px 8px;
                    border-radius: 12px;
                    border: 2px solid white;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    animation: bounce 2s infinite;
                }

                /* Main Card Styles */
                .tmc-card {
                    position: absolute;
                    bottom: 84px;
                    right: 0;
                    width: 360px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    box-shadow: 
                        0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                        0 10px 10px -5px rgba(0, 0, 0, 0.04),
                        0 0 0 1px rgba(0,0,0,0.05);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transform-origin: bottom right;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .tmc-card.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                /* Header */
                .tmc-header {
                    padding: 20px;
                    background: linear-gradient(to right, #ffffff, #f9fafb);
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .tmc-header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .tmc-logo-wrap {
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    background: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    padding: 4px;
                }

                .tmc-logo-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .tmc-titles h1 {
                    font-size: 15px;
                    font-weight: 700;
                    color: ${config.colors.textMain};
                    margin: 0;
                    line-height: 1.2;
                }

                .tmc-titles p {
                    font-size: 12px;
                    color: ${config.colors.textSub};
                    margin: 2px 0 0 0;
                    font-weight: 500;
                }

                .tmc-close {
                    background: transparent;
                    border: none;
                    color: #9CA3AF;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    transition: all 0.2s;
                    display: flex;
                }

                .tmc-close:hover {
                    background: #F3F4F6;
                    color: #4B5563;
                }

                /* Body */
                .tmc-body {
                    padding: 24px 20px 10px;
                    background: #F9FAFB;
                }

                /* Stunning QR */
                .tmc-hero-qr {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .tmc-qr-frame {
                    position: relative;
                    padding: 12px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(0,0,0,0.05);
                }

                .tmc-qr-code {
                    width: 140px;
                    height: 140px;
                    border-radius: 12px;
                    display: block;
                }

                /* Laser Scanner Animation */
                .tmc-scanner-line {
                    position: absolute;
                    width: 85%;
                    height: 3px;
                    background: linear-gradient(to right, transparent, var(--tmc-accent), transparent);
                    top: 15px;
                    left: 7.5%;
                    box-shadow: 0 0 4px var(--tmc-accent);
                    animation: scan 2.5s ease-in-out infinite;
                    border-radius: 50%;
                }

                .tmc-qr-label {
                    margin-top: 12px;
                    font-size: 13px;
                    color: ${config.colors.textSub};
                    font-weight: 500;
                }

                /* Divider */
                .tmc-divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #9CA3AF;
                    font-size: 11px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    letter-spacing: 0.05em;
                }

                .tmc-divider::before, .tmc-divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #E5E7EB;
                }

                .tmc-divider span {
                    padding: 0 10px;
                }

                /* Grid Menu */
                .tmc-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }

                .tmc-grid-item {
                    background: white;
                    border: 1px solid #E5E7EB;
                    border-radius: 12px;
                    padding: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                    text-align: left;
                }

                .tmc-grid-item:hover {
                    border-color: var(--tmc-accent);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    transform: translateY(-2px);
                }

                .tmc-icon-box {
                    font-size: 18px;
                    width: 32px;
                    height: 32px;
                    background: #F0FDF4;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tmc-grid-item span {
                    font-size: 12px;
                    font-weight: 600;
                    color: ${config.colors.textMain};
                    line-height: 1.3;
                }

                /* Footer */
                .tmc-footer {
                    padding: 20px;
                    background: white;
                    border-top: 1px solid #F3F4F6;
                }

                .tmc-wa-btn {
                    width: 100%;
                    background: linear-gradient(135deg, var(--tmc-grad-1) 0%, var(--tmc-grad-2) 100%);
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: opacity 0.2s;
                    box-shadow: 0 4px 12px rgba(25, 135, 84, 0.2);
                }

                .tmc-wa-btn:hover {
                    opacity: 0.95;
                }

                .tmc-copyright {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 10px;
                }

                .tmc-copyright a {
                    color: #9CA3AF;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }

                .tmc-copyright a:hover {
                    color: var(--tmc-grad-1);
                }

                @keyframes scan {
                    0% { top: 15px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 85%; opacity: 0; }
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }

                @media (max-width: 480px) {
                    .tmc-widget { bottom: 16px; right: 16px; }
                    .tmc-card { width: calc(100vw - 32px); bottom: 90px; }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        let container = document.getElementById('tmc-widget-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'tmc-widget-container';
            document.body.appendChild(container);
        }
        container.innerHTML = createWidget();
        
        const fab = document.getElementById('tmcFab');
        const chat = document.getElementById('tmcChat');
        const close = chat.querySelector('.tmc-close');
        const gridItems = document.querySelectorAll('.tmc-grid-item');
        
        const toggle = () => chat.classList.toggle('show');
        
        fab.addEventListener('click', toggle);
        close.addEventListener('click', () => chat.classList.remove('show'));
        
        gridItems.forEach(item => {
            item.addEventListener('click', function() {
                const msg = this.getAttribute('data-msg');
                window.open(`https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            });
        });
        
        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && chat.classList.contains('show')) {
                chat.classList.remove('show');
            }
        });

        console.log('✅ TMC 311 Modern Widget Loaded');
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
