/**
 * Thane 311 AI Grievance Widget
 * File: tmc-311-ai-widget.js
 * Version: 5.0.0 (AI Edition)
 * Date: 2026-01-03
 * Brand: WhatsUp.city
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    if (window.TMC311Widget) {
        console.warn('TMC 311 AI Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '15558830019',
        defaultMessage: 'Hi',
        logoUrl: 'https://wow-strategies.com/tmc.png',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/15558830019?text=Hi&margin=10&bgcolor=ffffff',
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
                <!-- FAB with Pulse -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open Thane 311 AI">
                    <div class="tmc-fab-content">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                        <div class="tmc-fab-badge">AI</div>
                    </div>
                    <div class="tmc-pulse-ring"></div>
                </button>
                
                <!-- Main Widget Card -->
                <div class="tmc-card" id="tmcCard">
                    <!-- Modern Header -->
                    <div class="tmc-header">
                        <div class="tmc-brand-group">
                            <div class="tmc-logo-wrapper">
                                <img src="${config.logoUrl}" alt="TMC Logo" class="tmc-logo">
                                <div class="tmc-ai-dot"></div>
                            </div>
                            <div class="tmc-title-wrapper">
                                <div class="tmc-title-row">
                                    <h1 class="tmc-title">Thane 311</h1>
                                    <span class="tmc-ai-badge">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                                        AI
                                    </span>
                                </div>
                                <span class="tmc-subtitle">Smart Grievance Assistant</span>
                            </div>
                        </div>
                        <button class="tmc-close-btn" aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div class="tmc-body">
                        <!-- QR Section with Glassmorphism -->
                        <div class="tmc-qr-section">
                            <div class="tmc-qr-card">
                                <div class="tmc-qr-scan-effect"></div>
                                <img src="${config.qrCodeUrl}" alt="WhatsApp QR Code" class="tmc-qr-img">
                            </div>
                            <div class="tmc-qr-text">
                                <span class="tmc-scan-icon">📷</span> Scan to report issue instantly
                            </div>
                        </div>

                        <div class="tmc-divider">
                            <span>or choose a service</span>
                        </div>

                        <!-- Service Grid -->
                        <div class="tmc-grid">
                            ${menuOptions.map(opt => `
                                <button class="tmc-grid-item" data-msg="${opt.message}">
                                    <span class="tmc-grid-icon">${opt.icon}</span>
                                    <span class="tmc-grid-label">${opt.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-cta-btn" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                            <span>Start AI Conversation</span>
                            <div class="tmc-shimmer"></div>
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
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

                .tmc-widget-root {
                    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 2147483647;
                    --tmc-accent: #10b981;
                    --tmc-dark: #0f172a;
                    --tmc-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    --tmc-ai-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
                }

                /* --- FAB Styles --- */
                .tmc-fab {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--tmc-gradient);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                    position: relative;
                    z-index: 2;
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .tmc-fab:hover {
                    transform: scale(1.08);
                }

                .tmc-fab-content {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tmc-fab-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #ef4444;
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 3px 6px;
                    border-radius: 10px;
                    border: 2px solid white;
                }

                .tmc-pulse-ring {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid var(--tmc-accent);
                    opacity: 0;
                    animation: tmcPulse 2s infinite;
                    z-index: -1;
                }

                @keyframes tmcPulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.6); opacity: 0; }
                }

                /* --- Card Styles --- */
                .tmc-card {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 360px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(255, 255, 255, 1);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transform-origin: bottom right;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .tmc-card.tmc-show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                /* --- Header --- */
                .tmc-header {
                    padding: 20px;
                    background: linear-gradient(to bottom, #ffffff, #f8fafc);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 1px solid #e2e8f0;
                }

                .tmc-brand-group {
                    display: flex;
                    gap: 12px;
                }

                .tmc-logo-wrapper {
                    position: relative;
                    width: 48px;
                    height: 48px;
                    background: white;
                    border-radius: 12px;
                    padding: 4px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    border: 1px solid #f1f5f9;
                }

                .tmc-logo {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .tmc-ai-dot {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 12px;
                    height: 12px;
                    background: #22c55e;
                    border: 2px solid white;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
                }

                .tmc-title-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .tmc-title-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .tmc-title {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--tmc-dark);
                    letter-spacing: -0.02em;
                }

                .tmc-ai-badge {
                    background: var(--tmc-ai-gradient);
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 2px 8px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
                }

                .tmc-subtitle {
                    font-size: 12px;
                    color: #64748b;
                    font-weight: 500;
                    margin-top: 2px;
                }

                .tmc-close-btn {
                    background: transparent;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.2s;
                }

                .tmc-close-btn:hover {
                    color: var(--tmc-dark);
                }

                /* --- Body --- */
                .tmc-body {
                    padding: 20px;
                    background: #f8fafc;
                }

                /* QR Section */
                .tmc-qr-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .tmc-qr-card {
                    width: 160px;
                    height: 160px;
                    background: white;
                    padding: 10px;
                    border-radius: 16px;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                    border: 1px solid #e2e8f0;
                    position: relative;
                    overflow: hidden;
                }

                .tmc-qr-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 8px;
                }

                .tmc-qr-scan-effect {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, transparent, var(--tmc-accent), transparent);
                    animation: qrScan 2s ease-in-out infinite;
                    opacity: 0.8;
                }

                @keyframes qrScan {
                    0% { top: 10px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 150px; opacity: 0; }
                }

                .tmc-qr-text {
                    margin-top: 12px;
                    font-size: 13px;
                    color: #64748b;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                /* Divider */
                .tmc-divider {
                    display: flex;
                    align-items: center;
                    color: #94a3b8;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin: 20px 0;
                }

                .tmc-divider::before, .tmc-divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #e2e8f0;
                }

                .tmc-divider span {
                    padding: 0 10px;
                    background: #f8fafc;
                }

                /* Grid */
                .tmc-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .tmc-grid-item {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .tmc-grid-item:hover {
                    border-color: var(--tmc-accent);
                    background: #f0fdf4;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }

                .tmc-grid-icon {
                    font-size: 20px;
                }

                .tmc-grid-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                    text-align: center;
                }

                /* Footer */
                .tmc-footer {
                    padding: 16px 20px;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                }

                .tmc-cta-btn {
                    width: 100%;
                    background: var(--tmc-gradient);
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 12px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.2s;
                }

                .tmc-cta-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }

                .tmc-shimmer {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 2s infinite;
                }

                @keyframes shimmer {
                    100% { left: 100%; }
                }

                .tmc-copyright {
                    text-align: center;
                    margin-top: 10px;
                    font-size: 11px;
                }

                .tmc-copyright a {
                    color: #94a3b8;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .tmc-copyright a:hover {
                    color: var(--tmc-accent);
                }

                /* --- Mobile Responsive Bottom Sheet --- */
                @media (max-width: 480px) {
                    .tmc-widget-root {
                        bottom: 16px;
                        right: 16px;
                        left: 16px;
                        pointer-events: none; /* Let clicks pass through when collapsed */
                    }
                    
                    .tmc-fab {
                        pointer-events: auto;
                        margin-left: auto; /* Keep fab to right */
                    }

                    .tmc-card {
                        pointer-events: auto;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        border-radius: 20px 20px 0 0;
                        transform: translateY(100%);
                        opacity: 1;
                        visibility: visible;
                        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        max-height: 85vh;
                    }

                    .tmc-card.tmc-show {
                        transform: translateY(0);
                    }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        if(document.getElementById('tmc-widget-root')) return;

        let container = document.createElement('div');
        container.id = 'tmc-widget-root';
        document.body.appendChild(container);
        container.innerHTML = createWidget();
        
        const fab = document.getElementById('tmcFab');
        const card = document.getElementById('tmcCard');
        const closeBtn = card.querySelector('.tmc-close-btn');
        const gridItems = document.querySelectorAll('.tmc-grid-item');
        
        const toggle = () => {
            const isOpen = card.classList.contains('tmc-show');
            if(isOpen) {
                card.classList.remove('tmc-show');
            } else {
                card.classList.add('tmc-show');
            }
        };
        
        fab.addEventListener('click', toggle);
        closeBtn.addEventListener('click', toggle);
        
        gridItems.forEach(item => {
            item.addEventListener('click', function() {
                const msg = this.getAttribute('data-msg');
                window.open(`https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            });
        });

        // Close when clicking outside on desktop
        document.addEventListener('click', (e) => {
            if (window.innerWidth > 480) {
                if (!container.contains(e.target) && card.classList.contains('tmc-show')) {
                    card.classList.remove('tmc-show');
                }
            } else {
                // Mobile: close if clicking on the blurred backdrop area (if we had one)
                // For now, close only on button or swipe down (future)
                if (!card.contains(e.target) && !fab.contains(e.target) && card.classList.contains('tmc-show')) {
                    card.classList.remove('tmc-show');
                }
            }
        });
        
        console.log('✅ Thane 311 AI Widget Loaded');
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
