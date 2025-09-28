/**
 * Divisional Commissioner Pune Minimalist Chat Widget
 * File: dc-pune-chat-widget.js
 * Version: 5.0.0 - Elegant Minimalist Edition
 * Date: 2025-09-28
 * Author: soft00null
 * URL: https://wow-strategies.com/dc-pune-chat-widget.js
 * 
 * Minimalist WhatsApp-inspired design
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    if (window.DCPuneChatWidget) {
        console.warn('DC Pune Chat Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi! I need assistance from Divisional Commissioner Pune.',
        position: 'bottom-right',
        colors: {
            primary: '#25D366',        // WhatsApp green
            secondary: '#128C7E',      // WhatsApp dark green
            accent: '#DCF8C6',         // WhatsApp light green
            background: '#ECE5DD',     // WhatsApp background
            text: '#303030',
            white: '#FFFFFF',
            gray: '#8696A0',
            lightGray: '#F0F2F5',
            bubbleBlue: '#53BDEB',
            bubblePurple: '#7C66DC'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies',
            url: 'https://wow-strategies.com/'
        }
    };
    
    const menuOptions = [
        { id: 'about', label: 'About', icon: '🏛️', message: 'Tell me about Divisional Commissioner Pune office' },
        { id: 'services', label: 'Services', icon: '📋', message: 'What services do you provide?' },
        { id: 'schemes', label: 'Schemes', icon: '📑', message: 'Information about government schemes' },
        { id: 'contact', label: 'Contact', icon: '📞', message: 'How can I contact the office?' }
    ];
    
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        
        return `
            <div class="dcpc-widget" id="dcpcWidget">
                <!-- Floating Action Button -->
                <button class="dcpc-fab" id="dcpcFab" aria-label="Open WhatsApp Chat">
                    <div class="dcpc-fab-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="dcpc-fab-badge">AI</div>
                </button>
                
                <!-- Chat Interface -->
                <div class="dcpc-chat" id="dcpcChat">
                    <!-- Header -->
                    <div class="dcpc-header">
                        <div class="dcpc-header-avatar">
                            <div class="dcpc-avatar-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                </svg>
                            </div>
                            <div class="dcpc-status-dot"></div>
                        </div>
                        <div class="dcpc-header-info">
                            <div class="dcpc-header-title">Divisional Commissioner Pune</div>
                            <div class="dcpc-header-subtitle">AI Assistant · Online</div>
                        </div>
                        <button class="dcpc-close" aria-label="Close chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="${config.colors.gray}">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Messages Area -->
                    <div class="dcpc-messages">
                        <!-- Welcome Message -->
                        <div class="dcpc-message dcpc-message-received">
                            <div class="dcpc-message-bubble">
                                <div class="dcpc-message-text">
                                    👋 नमस्कार! Welcome to Divisional Commissioner Pune
                                </div>
                                <div class="dcpc-message-time">Just now</div>
                            </div>
                        </div>
                        
                        <div class="dcpc-message dcpc-message-received">
                            <div class="dcpc-message-bubble">
                                <div class="dcpc-message-text">
                                    I'm your AI Assistant. How can I help you today?
                                </div>
                                <div class="dcpc-message-time">Just now</div>
                            </div>
                        </div>
                        
                        <!-- Menu Pills -->
                        <div class="dcpc-menu-container">
                            <div class="dcpc-menu-title">Quick Actions</div>
                            <div class="dcpc-menu-pills">
                                ${menuOptions.map(option => `
                                    <button class="dcpc-pill" data-message="${option.message}">
                                        <span class="dcpc-pill-icon">${option.icon}</span>
                                        <span class="dcpc-pill-text">${option.label}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="dcpc-footer">
                        <button class="dcpc-action-btn dcpc-action-primary" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                            <span>Continue on WhatsApp</span>
                        </button>
                        <div class="dcpc-powered">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Notification Popup -->
                <div class="dcpc-notification" id="dcpcNotification">
                    <button class="dcpc-notification-close" aria-label="Close notification">×</button>
                    <div class="dcpc-notification-content">
                        <div class="dcpc-notification-text">
                            💬 Hi! I'm your AI Assistant for Divisional Commissioner Pune
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Reset & Base */
                .dcpc-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                }
                
                .dcpc-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 999999;
                }
                
                /* Floating Action Button */
                .dcpc-fab {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    border: none;
                    border-radius: 30px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .dcpc-fab:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
                }
                
                .dcpc-fab:active {
                    transform: scale(0.95);
                }
                
                .dcpc-fab-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%);
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 3px 5px;
                    border-radius: 10px;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                }
                
                /* Chat Window */
                .dcpc-chat {
                    position: absolute;
                    bottom: 76px;
                    right: 0;
                    width: 380px;
                    height: 580px;
                    background: ${config.colors.white};
                    border-radius: 16px;
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .dcpc-chat.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                /* Header */
                .dcpc-header {
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    position: relative;
                }
                
                .dcpc-header-avatar {
                    position: relative;
                }
                
                .dcpc-avatar-circle {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dcpc-status-dot {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: #4CAF50;
                    border: 2px solid white;
                    border-radius: 50%;
                }
                
                .dcpc-header-info {
                    flex: 1;
                    color: white;
                }
                
                .dcpc-header-title {
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                
                .dcpc-header-subtitle {
                    font-size: 12px;
                    opacity: 0.9;
                }
                
                .dcpc-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .dcpc-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                .dcpc-close svg {
                    fill: white;
                }
                
                /* Messages Area */
                .dcpc-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    background-color: ${config.colors.background};
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d5d5d5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }
                
                /* Message Bubbles */
                .dcpc-message {
                    margin-bottom: 16px;
                    display: flex;
                    animation: messageIn 0.3s ease-out;
                }
                
                .dcpc-message-received {
                    justify-content: flex-start;
                }
                
                .dcpc-message-sent {
                    justify-content: flex-end;
                }
                
                .dcpc-message-bubble {
                    max-width: 75%;
                    padding: 10px 14px;
                    border-radius: 18px;
                    position: relative;
                }
                
                .dcpc-message-received .dcpc-message-bubble {
                    background: ${config.colors.white};
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }
                
                .dcpc-message-sent .dcpc-message-bubble {
                    background: ${config.colors.accent};
                    border-bottom-right-radius: 4px;
                }
                
                .dcpc-message-text {
                    font-size: 14px;
                    line-height: 1.4;
                    color: ${config.colors.text};
                    word-wrap: break-word;
                }
                
                .dcpc-message-time {
                    font-size: 11px;
                    color: ${config.colors.gray};
                    margin-top: 4px;
                }
                
                /* Menu Pills */
                .dcpc-menu-container {
                    margin-top: 12px;
                    padding: 16px;
                    background: ${config.colors.white};
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .dcpc-menu-title {
                    font-size: 13px;
                    color: ${config.colors.gray};
                    margin-bottom: 12px;
                    font-weight: 500;
                }
                
                .dcpc-menu-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .dcpc-pill {
                    background: ${config.colors.lightGray};
                    border: 1.5px solid transparent;
                    padding: 8px 14px;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    color: ${config.colors.text};
                }
                
                .dcpc-pill:hover {
                    background: ${config.colors.accent};
                    border-color: ${config.colors.primary};
                    transform: translateY(-1px);
                }
                
                .dcpc-pill-icon {
                    font-size: 16px;
                }
                
                /* Footer */
                .dcpc-footer {
                    padding: 16px;
                    background: ${config.colors.white};
                    border-top: 1px solid ${config.colors.lightGray};
                }
                
                .dcpc-action-btn {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s;
                }
                
                .dcpc-action-primary {
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    color: white;
                }
                
                .dcpc-action-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                }
                
                .dcpc-powered {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 11px;
                }
                
                .dcpc-powered a {
                    color: ${config.colors.gray};
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .dcpc-powered a:hover {
                    color: ${config.colors.primary};
                }
                
                /* Notification */
                .dcpc-notification {
                    position: absolute;
                    bottom: 76px;
                    right: 0;
                    background: ${config.colors.white};
                    border-radius: 12px;
                    padding: 12px 16px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    max-width: 280px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                }
                
                .dcpc-notification.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(0);
                }
                
                .dcpc-notification-close {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: none;
                    border: none;
                    font-size: 18px;
                    color: ${config.colors.gray};
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dcpc-notification-text {
                    font-size: 13px;
                    color: ${config.colors.text};
                    padding-right: 20px;
                }
                
                /* Animations */
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes messageIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Responsive */
                @media (max-width: 480px) {
                    .dcpc-widget {
                        bottom: 16px;
                        right: 16px;
                    }
                    
                    .dcpc-chat {
                        width: calc(100vw - 32px);
                        height: calc(100vh - 100px);
                        bottom: 70px;
                        right: -8px;
                    }
                    
                    .dcpc-notification {
                        max-width: calc(100vw - 100px);
                    }
                }
                
                /* Scrollbar Styling */
                .dcpc-messages::-webkit-scrollbar {
                    width: 6px;
                }
                
                .dcpc-messages::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .dcpc-messages::-webkit-scrollbar-thumb {
                    background: ${config.colors.gray};
                    border-radius: 3px;
                }
                
                .dcpc-messages::-webkit-scrollbar-thumb:hover {
                    background: ${config.colors.secondary};
                }
                
                /* Print */
                @media print {
                    .dcpc-widget {
                        display: none !important;
                    }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            // Create container
            let container = document.getElementById('dcpc-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dcpc-chat-widget-container';
                document.body.appendChild(container);
            }
            
            container.innerHTML = createWidget();
            
            // Get elements
            const fab = document.getElementById('dcpcFab');
            const chat = document.getElementById('dcpcChat');
            const closeBtn = chat.querySelector('.dcpc-close');
            const notification = document.getElementById('dcpcNotification');
            const notificationClose = notification.querySelector('.dcpc-notification-close');
            const pills = document.querySelectorAll('.dcpc-pill');
            
            // FAB click handler
            fab.addEventListener('click', () => {
                const isOpen = chat.classList.contains('show');
                if (isOpen) {
                    chat.classList.remove('show');
                } else {
                    chat.classList.add('show');
                    notification.classList.remove('show');
                }
            });
            
            // Close button handler
            closeBtn.addEventListener('click', () => {
                chat.classList.remove('show');
            });
            
            // Notification handlers
            notificationClose.addEventListener('click', () => {
                notification.classList.remove('show');
            });
            
            // Show notification after delay
            setTimeout(() => {
                if (!chat.classList.contains('show')) {
                    notification.classList.add('show');
                    
                    // Auto-hide after 8 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 8000);
                }
            }, 3000);
            
            // Menu pill handlers
            pills.forEach(pill => {
                pill.addEventListener('click', function() {
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
            
            // Escape key handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && chat.classList.contains('show')) {
                    chat.classList.remove('show');
                }
            });
            
            console.log('✅ DC Pune Chat Widget initialized successfully');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneChatWidget = {
        version: '5.0.0',
        open: () => document.getElementById('dcpcChat')?.classList.add('show'),
        close: () => document.getElementById('dcpcChat')?.classList.remove('show'),
        toggle: () => document.getElementById('dcpcChat')?.classList.toggle('show')
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
