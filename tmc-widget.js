/**
 * Thane Municipal Corporation (TMC) 311 Chat Widget
 * File: tmc-311-chat-widget.js
 * Version: 2.0.0
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
        // Official Logo URL
        logoUrl: 'https://wow-strategies.com/tmc.png',
        // QR Code URL
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/15558830019?text=Hi',
        colors: {
            primary: '#075E54',        // WhatsApp Teal Dark
            secondary: '#128C7E',      // WhatsApp Teal
            accent: '#25D366',         // WhatsApp Bright Green
            background: '#E5DDD5',     // WhatsApp Chat Bg
            headerText: '#FFFFFF',
            text: '#111b21',
            white: '#FFFFFF',
            gray: '#8696A0',
            lightGray: '#F0F2F5',
            tmcBlue: '#0056b3'
        },
        poweredBy: {
            text: 'Powered by WhatsUp.city',
            url: 'https://whatsup.city/'
        }
    };
    
    const menuOptions = [
        { id: 'pothole', label: 'Report Pothole', icon: '🕳️', message: 'I want to report a pothole' },
        { id: 'garbage', label: 'Garbage Issue', icon: '🗑️', message: 'I want to report uncollected garbage' },
        { id: 'water', label: 'Water Supply', icon: '💧', message: 'Issue with water supply' },
        { id: 'tax', label: 'Pay Tax', icon: '💸', message: 'I want to pay property tax' },
        { id: 'cert', label: 'Birth/Death Cert', icon: '📜', message: 'I need a certificate' },
        { id: 'lang', label: 'Change Language', icon: '🗣️', message: 'Change Language' }
    ];
    
    const createWidget = () => {
        return `
            <div class="tmc-widget" id="tmcWidget">
                <!-- Floating Action Button -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open TMC 311 Chat">
                    <div class="tmc-fab-icon">
                        <!-- WhatsApp Icon -->
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="tmc-fab-badge">311</div>
                </button>
                
                <!-- Chat Interface -->
                <div class="tmc-chat" id="tmcChat">
                    <!-- Header -->
                    <div class="tmc-header">
                        <div class="tmc-header-avatar">
                            <div class="tmc-avatar-circle">
                                <img src="${config.logoUrl}" alt="TMC Logo" class="tmc-avatar-img">
                            </div>
                            <div class="tmc-status-dot"></div>
                        </div>
                        <div class="tmc-header-info">
                            <div class="tmc-header-title">Thane Municipal Corporation</div>
                            <div class="tmc-header-subtitle">Official AI Assistant</div>
                        </div>
                        <button class="tmc-close" aria-label="Close chat">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Content Area -->
                    <div class="tmc-content">
                        <!-- QR Code Section -->
                        <div class="tmc-qr-section">
                            <div class="tmc-qr-container">
                                <img src="${config.qrCodeUrl}" alt="Scan to Chat on WhatsApp" class="tmc-qr-image">
                                <div class="tmc-scan-hint">Scan with camera</div>
                            </div>
                            <p class="tmc-qr-text">Connect with TMC 311 on WhatsApp</p>
                        </div>

                        <!-- Chat Bubbles -->
                        <div class="tmc-messages">
                            <div class="tmc-message-bubble">
                                <div class="tmc-message-text">
                                    🙏 <strong>Namaskar!</strong> Welcome to TMC 311.<br><br>
                                    I am your multilingual AI assistant. You can speak to me in <strong>22 Indian languages</strong>.
                                </div>
                            </div>
                            
                            <!-- Menu Grid -->
                            <div class="tmc-menu-grid">
                                ${menuOptions.map(option => `
                                    <button class="tmc-menu-item" data-message="${option.message}">
                                        <div class="tmc-menu-icon-wrap">${option.icon}</div>
                                        <span class="tmc-menu-label">${option.label}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-action-btn" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                            <span>Start Chat on WhatsApp</span>
                        </button>
                        <div class="tmc-powered">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Notification Popup -->
                <div class="tmc-notification" id="tmcNotification">
                    <button class="tmc-notification-close" aria-label="Close notification">×</button>
                    <div class="tmc-notification-content">
                        <div class="tmc-notification-icon">
                            <img src="${config.logoUrl}" alt="TMC" style="width:100%; height:100%; border-radius:50%; object-fit:contain;">
                        </div>
                        <div class="tmc-notification-text">
                            <strong>TMC 311</strong><br>
                            How can we help you today?
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Reset & Base */
                .tmc-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                }
                
                .tmc-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 999999;
                }
                
                /* Floating Action Button (FAB) */
                .tmc-fab {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${config.colors.accent} 0%, ${config.colors.secondary} 100%);
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .tmc-fab:hover {
                    transform: scale(1.08);
                    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
                }
                
                /* Pulse Animation */
                .tmc-fab::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid ${config.colors.accent};
                    opacity: 0;
                    animation: tmcPulse 2s infinite;
                }
                
                @keyframes tmcPulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.5); opacity: 0; }
                }

                .tmc-fab-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: #FF3B30;
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 4px 8px;
                    border-radius: 12px;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                    z-index: 2;
                }
                
                /* Chat Window */
                .tmc-chat {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 380px;
                    max-height: 720px;
                    height: auto;
                    background: ${config.colors.white};
                    border-radius: 24px;
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.02);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.96);
                    transform-origin: bottom right;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .tmc-chat.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                /* Header */
                .tmc-header {
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    padding: 18px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: white;
                }
                
                .tmc-avatar-circle {
                    width: 44px;
                    height: 44px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid rgba(255,255,255,0.2);
                    overflow: hidden;
                    padding: 2px;
                }

                .tmc-avatar-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 50%;
                }
                
                .tmc-header-info {
                    flex: 1;
                }
                
                .tmc-header-title {
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    line-height: 1.2;
                }
                
                .tmc-header-subtitle {
                    font-size: 13px;
                    opacity: 0.9;
                    margin-top: 2px;
                    font-weight: 400;
                }
                
                .tmc-close {
                    background: rgba(255,255,255,0.1);
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                
                .tmc-close:hover {
                    background: rgba(255,255,255,0.2);
                }
                
                /* Content Area */
                .tmc-content {
                    flex: 1;
                    overflow-y: auto;
                    background-color: ${config.colors.background};
                    /* Standard WhatsApp doodle pattern opacity lowered */
                    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
                    background-size: 400px;
                    background-blend-mode: overlay;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                }
                
                /* QR Section */
                .tmc-qr-section {
                    background: ${config.colors.white};
                    padding: 24px;
                    text-align: center;
                    border-bottom: 1px solid rgba(0,0,0,0.06);
                }
                
                .tmc-qr-container {
                    width: 160px;
                    height: 160px;
                    margin: 0 auto 12px;
                    background: white;
                    padding: 8px;
                    border: 1px solid #eaeaea;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    position: relative;
                }
                
                .tmc-qr-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 4px;
                }

                .tmc-scan-hint {
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: ${config.colors.text};
                    color: white;
                    font-size: 10px;
                    padding: 4px 8px;
                    border-radius: 10px;
                    white-space: nowrap;
                    font-weight: 600;
                }
                
                .tmc-qr-text {
                    font-size: 13px;
                    color: ${config.colors.gray};
                    font-weight: 500;
                }

                /* Messages */
                .tmc-messages {
                    padding: 20px;
                }
                
                .tmc-message-bubble {
                    background: ${config.colors.white};
                    padding: 14px 18px;
                    border-radius: 0 16px 16px 16px;
                    box-shadow: 0 1px 1px rgba(0,0,0,0.08);
                    margin-bottom: 24px;
                    max-width: 90%;
                    align-self: flex-start;
                    position: relative;
                    animation: slideIn 0.3s ease-out;
                }
                
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .tmc-message-bubble::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 0;
                    height: 0;
                    border: 8px solid transparent;
                    border-top-color: ${config.colors.white};
                    border-right-color: ${config.colors.white};
                }
                
                .tmc-message-text {
                    font-size: 14px;
                    line-height: 1.5;
                    color: ${config.colors.text};
                }

                /* Menu Grid */
                .tmc-menu-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }
                
                .tmc-menu-item {
                    background: rgba(255, 255, 255, 0.95);
                    border: 1px solid rgba(255, 255, 255, 1);
                    padding: 16px 12px;
                    border-radius: 16px;
                    cursor: pointer;
                    text-align: center;
                    transition: all 0.2s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                    backdrop-filter: blur(5px);
                }
                
                .tmc-menu-item:hover {
                    background: #fff;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.06);
                }
                
                .tmc-menu-icon-wrap {
                    font-size: 24px;
                    margin-bottom: 4px;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }
                
                .tmc-menu-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: ${config.colors.text};
                    letter-spacing: -0.01em;
                }
                
                /* Footer */
                .tmc-footer {
                    padding: 16px 20px 20px;
                    background: ${config.colors.white};
                    border-top: 1px solid rgba(0,0,0,0.06);
                }
                
                .tmc-action-btn {
                    width: 100%;
                    padding: 14px;
                    border: none;
                    border-radius: 28px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s;
                    background: ${config.colors.accent};
                    color: white;
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
                }
                
                .tmc-action-btn:hover {
                    background: ${config.colors.secondary};
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
                }
                
                .tmc-powered {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 11px;
                }
                
                .tmc-powered a {
                    color: ${config.colors.gray};
                    text-decoration: none;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                
                .tmc-powered a:hover {
                    opacity: 1;
                    color: ${config.colors.primary};
                }
                
                /* Notification */
                .tmc-notification {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    background: ${config.colors.white};
                    border-radius: 16px;
                    padding: 16px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                    width: 280px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(20px);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .tmc-notification.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(0);
                }
                
                .tmc-notification-close {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: none;
                    border: none;
                    font-size: 16px;
                    color: ${config.colors.gray};
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .tmc-notification-content {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                
                .tmc-notification-icon {
                    width: 48px;
                    height: 48px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    padding: 2px;
                    border: 1px solid ${config.colors.lightGray};
                }
                
                .tmc-notification-text {
                    font-size: 13px;
                    line-height: 1.4;
                    color: ${config.colors.text};
                }
                
                /* Mobile Responsive */
                @media (max-width: 480px) {
                    .tmc-widget {
                        bottom: 16px;
                        right: 16px;
                    }
                    
                    .tmc-chat {
                        width: calc(100vw - 32px);
                        height: calc(100vh - 100px);
                        bottom: 84px;
                        right: 0;
                    }
                }
                
                @media print {
                    .tmc-widget { display: none !important; }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            // Create container
            let container = document.getElementById('tmc-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'tmc-chat-widget-container';
                document.body.appendChild(container);
            }
            
            container.innerHTML = createWidget();
            
            // Get elements
            const fab = document.getElementById('tmcFab');
            const chat = document.getElementById('tmcChat');
            const closeBtn = chat.querySelector('.tmc-close');
            const notification = document.getElementById('tmcNotification');
            const notificationClose = notification.querySelector('.tmc-notification-close');
            const menuItems = document.querySelectorAll('.tmc-menu-item');
            
            // Toggle Chat
            const toggleChat = () => {
                const isOpen = chat.classList.contains('show');
                if (isOpen) {
                    chat.classList.remove('show');
                } else {
                    chat.classList.add('show');
                    notification.classList.remove('show');
                }
            };

            fab.addEventListener('click', toggleChat);
            closeBtn.addEventListener('click', () => chat.classList.remove('show'));
            
            // Notification Logic
            notificationClose.addEventListener('click', () => {
                notification.classList.remove('show');
            });
            
            // Show notification automatically after 5 seconds if chat not opened
            setTimeout(() => {
                if (!chat.classList.contains('show')) {
                    notification.classList.add('show');
                    setTimeout(() => notification.classList.remove('show'), 10000); // Hide after 10s
                }
            }, 5000);
            
            // Menu Item Click Logic
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                });
            });
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target) && chat.classList.contains('show')) {
                    chat.classList.remove('show');
                }
            });
            
            console.log('✅ TMC 311 Widget initialized');
            
        } catch (error) {
            console.error('❌ Widget init failed:', error);
        }
    };
    
    // Public API
    window.TMC311Widget = {
        open: () => document.getElementById('tmcChat')?.classList.add('show'),
        close: () => document.getElementById('tmcChat')?.classList.remove('show'),
        toggle: () => document.getElementById('tmcFab')?.click()
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
