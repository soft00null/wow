/**
 * Thane 311 - AI Civic Assistant Widget
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
        console.warn('TMC 311 Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '15558830019',
        defaultMessage: 'Hi',
        logoUrl: 'https://wow-strategies.com/tmc.png',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/15558830019?text=Hi&margin=10&bgcolor=ffffff',
        colors: {
            brand: '#10b981',         
            brandGradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            aiGradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo to Purple for AI vibe
            textDark: '#111827',
            textLight: '#6b7280',
            bgGlass: 'rgba(255, 255, 255, 0.95)'
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
                <!-- AI Pulse Effect Ring -->
                <div class="tmc-fab-pulse"></div>
                
                <!-- Main FAB -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open Thane 311 AI">
                    <div class="tmc-fab-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                    </div>
                    <span class="tmc-fab-tooltip">Thane 311 AI</span>
                </button>
                
                <!-- Main Card -->
                <div class="tmc-card" id="tmcCard">
                    <!-- Header -->
                    <div class="tmc-card-header">
                        <div class="tmc-brand-row">
                            <div class="tmc-logo-container">
                                <img src="${config.logoUrl}" alt="TMC" class="tmc-logo">
                                <div class="tmc-online-dot"></div>
                            </div>
                            <div class="tmc-brand-text">
                                <h1 class="tmc-title">Thane 311</h1>
                                <span class="tmc-badge">AI-Powered ⚡</span>
                            </div>
                        </div>
                        <button class="tmc-close-btn" aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <!-- Scrollable Content -->
                    <div class="tmc-card-body">
                        <!-- AI Introduction -->
                        <div class="tmc-ai-intro">
                            <span class="tmc-typing-text">Hello! I'm your AI assistant. Scan below or tap an option to start.</span>
                        </div>

                        <!-- QR Hero Section -->
                        <div class="tmc-qr-wrapper">
                            <div class="tmc-qr-glass">
                                <div class="tmc-qr-corners"></div>
                                <img src="${config.qrCodeUrl}" alt="Scan QR" class="tmc-qr-img">
                                <div class="tmc-scan-line"></div>
                            </div>
                        </div>

                        <!-- Divider -->
                        <div class="tmc-divider">
                            <span>Instant Services</span>
                        </div>

                        <!-- Service Grid -->
                        <div class="tmc-grid">
                            ${menuOptions.map(opt => `
                                <button class="tmc-service-card" data-msg="${opt.message}">
                                    <div class="tmc-service-icon">${opt.icon}</div>
                                    <span class="tmc-service-label">${opt.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-ai-btn" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <span class="tmc-btn-icon">✨</span>
                            Ask AI Assistant
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
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

                .tmc-widget-root {
                    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 2147483647;
                    --tmc-brand: ${config.colors.brand};
                    --tmc-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15);
                }

                /* FAB */
                .tmc-fab {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: ${config.colors.brandGradient};
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .tmc-fab:hover {
                    transform: scale(1.1);
                }

                .tmc-fab-pulse {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--tmc-brand);
                    opacity: 0.5;
                    z-index: 1;
                    animation: tmc-pulse 2s infinite;
                }

                @keyframes tmc-pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2.2); opacity: 0; }
                }

                .tmc-fab-tooltip {
                    position: absolute;
                    right: 75px;
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
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .tmc-fab:hover .tmc-fab-tooltip {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* Main Card */
                .tmc-card {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 360px;
                    background: ${config.colors.bgGlass};
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 24px;
                    box-shadow: var(--tmc-shadow);
                    border: 1px solid rgba(255, 255, 255, 0.6);
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

                /* Header */
                .tmc-card-header {
                    padding: 18px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }

                .tmc-brand-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .tmc-logo-container {
                    position: relative;
                }

                .tmc-logo {
                    width: 42px;
                    height: 42px;
                    object-fit: contain;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }

                .tmc-online-dot {
                    position: absolute;
                    bottom: 2px;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    background: #10b981;
                    border: 2px solid white;
                    border-radius: 50%;
                }

                .tmc-brand-text {
                    display: flex;
                    flex-direction: column;
                }

                .tmc-title {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 700;
                    color: #111827;
                    letter-spacing: -0.02em;
                }

                .tmc-badge {
                    font-size: 11px;
                    color: white;
                    background: ${config.colors.aiGradient};
                    padding: 2px 8px;
                    border-radius: 12px;
                    width: fit-content;
                    font-weight: 600;
                    margin-top: 2px;
                    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
                }

                .tmc-close-btn {
                    background: transparent;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #6b7280;
                    transition: background 0.2s;
                }

                .tmc-close-btn:hover {
                    background: rgba(0,0,0,0.05);
                    color: #111827;
                }

                /* Body */
                .tmc-card-body {
                    padding: 20px;
                    overflow-y: auto;
                    flex: 1;
                }

                .tmc-ai-intro {
                    background: #f3f4f6;
                    padding: 12px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    border-bottom-left-radius: 2px;
                }

                .tmc-typing-text {
                    font-size: 13px;
                    color: #374151;
                    line-height: 1.4;
                    font-weight: 500;
                }

                /* QR Section */
                .tmc-qr-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .tmc-qr-glass {
                    padding: 10px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    position: relative;
                    border: 1px solid #e5e7eb;
                }

                .tmc-qr-img {
                    width: 150px;
                    height: 150px;
                    display: block;
                    border-radius: 8px;
                }

                .tmc-scan-line {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: #6366f1;
                    box-shadow: 0 0 8px #6366f1;
                    top: 0;
                    left: 0;
                    animation: scan 2s ease-in-out infinite;
                }

                @keyframes scan {
                    0% { top: 10%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 90%; opacity: 0; }
                }

                /* Divider */
                .tmc-divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                }

                .tmc-divider::before, .tmc-divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #e5e7eb;
                }

                .tmc-divider span {
                    padding: 0 10px;
                }

                /* Grid */
                .tmc-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }

                .tmc-service-card {
                    background: white;
                    border: 1px solid #f3f4f6;
                    border-radius: 12px;
                    padding: 12px;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .tmc-service-card:hover {
                    border-color: #10b981;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .tmc-service-icon {
                    font-size: 20px;
                    width: 32px;
                    height: 32px;
                    background: #f0fdf4;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tmc-service-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #374151;
                    line-height: 1.2;
                }

                /* Footer */
                .tmc-footer {
                    padding: 16px 20px 20px;
                    background: rgba(255,255,255,0.5);
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .tmc-ai-btn {
                    width: 100%;
                    background: ${config.colors.aiGradient};
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
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
                    position: relative;
                    overflow: hidden;
                }

                /* Shimmer Effect */
                .tmc-ai-btn::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
                    transform: rotate(45deg);
                    animation: shimmer 3s infinite;
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }

                .tmc-ai-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
                }

                .tmc-btn-icon {
                    font-size: 16px;
                }

                .tmc-attribution {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 10px;
                }

                .tmc-attribution a {
                    color: #9ca3af;
                    text-decoration: none;
                    font-weight: 500;
                }

                /* Mobile Optimization */
                @media (max-width: 480px) {
                    .tmc-widget-root { 
                        bottom: 16px; 
                        right: 16px; 
                    }
                    
                    .tmc-fab {
                        width: 56px;
                        height: 56px;
                    }

                    .tmc-card { 
                        width: calc(100vw - 32px); 
                        bottom: 85px;
                        right: 0;
                        max-height: calc(100vh - 100px);
                    }

                    .tmc-grid {
                        grid-template-columns: 1fr; /* Stack buttons on very small screens if needed, otherwise keep 2col */
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
        const serviceCards = document.querySelectorAll('.tmc-service-card');
        const pulse = document.querySelector('.tmc-fab-pulse');
        
        const toggleWidget = () => {
            const isVisible = card.classList.contains('tmc-show');
            if (isVisible) {
                card.classList.remove('tmc-show');
                setTimeout(() => pulse.style.display = 'block', 300);
            } else {
                card.classList.add('tmc-show');
                pulse.style.display = 'none';
            }
        };

        fab.addEventListener('click', toggleWidget);
        closeBtn.addEventListener('click', toggleWidget);
        
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const message = this.getAttribute('data-msg');
                const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && card.classList.contains('tmc-show')) {
                toggleWidget();
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
