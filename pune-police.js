/**
 * Pune City Police Chat Widget
 * File: pune_city_police_chat_widget.js
 * Version: 5.0.0 
 * Date: 2026-01-21
 * Author: Team WoW
 * URL: https://wow-strategies.com/pune-city-police-chat-widget.js
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent duplicate initialization
    if (window.PuneCityPoliceWidget) {
        console.warn('Pune City Police Chat Widget already initialized');
        return;
    }
    
    const config = {
        // Official Pune City Police WhatsApp Helpline: 89759 53100
        phoneNumber: '15558803136', 
        defaultMessage: 'Jai Hind! I need assistance from Pune City Police.',
        position: 'bottom-right',
        colors: {
            // Police Branding (Navy Blues)
            headerBgStart: '#002147',  // Deep Navy
            headerBgEnd: '#1A43BF',    // Police Blue
            
            // WhatsApp Standard Colors (for familiarity)
            whatsappGreen: '#25D366',
            whatsappDark: '#128C7E',
            
            // UI Colors
            accent: '#E3F2FD',         // Light Blue tint for sent bubbles
            background: '#ECE5DD',     // Standard WhatsApp Pattern BG
            text: '#303030',
            white: '#FFFFFF',
            gray: '#8696A0',
            lightGray: '#F0F2F5',
            alertRed: '#D32F2F'
        },
        branding: {
            title: 'Pune City Police',
            subtitle: 'सद्रक्षणाय खलनिग्रहणाय', // "To protect the good and destroy the evil"
            poweredText: 'Powered by WoW-Strategies Private Limited',
            poweredUrl: 'https://wow-strategies.com/'
        }
    };
    
    // Updated Menu Options for Police Services
    const menuOptions = [
        { id: 'report', label: 'Report Incident', icon: '👮', message: 'I want to report an incident/crime.' },
        { id: 'cyber', label: 'Cyber Crime', icon: '💻', message: 'I want to report a Cyber Crime.' },
        { id: 'traffic', label: 'Traffic Issue', icon: '🚦', message: 'I want to report a traffic violation/issue.' },
        { id: 'women', label: 'Women Safety', icon: '🛡️', message: 'I need assistance regarding Women Safety.' },
        { id: 'emergency', label: 'Emergency', icon: '🆘', message: 'What are the emergency contact numbers?' }
    ];
    
    const createWidget = () => {
        return `
            <div class="pcp-widget" id="pcpWidget">
                <!-- Floating Action Button -->
                <button class="pcp-fab" id="pcpFab" aria-label="Open Pune Police Chat">
                    <div class="pcp-fab-icon">
                        <!-- WhatsApp Logo for familiarity -->
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="pcp-fab-badge">24x7</div>
                </button>
                
                <!-- Chat Interface -->
                <div class="pcp-chat" id="pcpChat">
                    <!-- Header -->
                    <div class="pcp-header">
                        <div class="pcp-header-avatar">
                            <div class="pcp-avatar-circle">
                                <!-- Police Badge/Star Icon -->
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    <path d="M12 11.99h5.5c.5-2.5-1.5-4.5-5.5-4.5v4.5zm0 0h-5.5c-.5 2.5 1.5 4.5 5.5 4.5v-4.5z" fill="#002147"/>
                                </svg>
                            </div>
                            <div class="pcp-status-dot"></div>
                        </div>
                        <div class="pcp-header-info">
                            <div class="pcp-header-title">${config.branding.title}</div>
                            <div class="pcp-header-subtitle">${config.branding.subtitle}</div>
                        </div>
                        <button class="pcp-close" aria-label="Close chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="${config.colors.gray}">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Messages Area -->
                    <div class="pcp-messages">
                        <!-- Welcome Message -->
                        <div class="pcp-message pcp-message-received">
                            <div class="pcp-message-bubble">
                                <div class="pcp-message-text">
                                    <strong>Jai Hind! 🇮🇳</strong><br>
                                    Welcome to Pune City Police Citizen Portal.
                                </div>
                                <div class="pcp-message-time">Just now</div>
                            </div>
                        </div>
                        
                        <div class="pcp-message pcp-message-received">
                            <div class="pcp-message-bubble">
                                <div class="pcp-message-text">
                                    I am your automated assistant. How can we serve you today?
                                </div>
                                <div class="pcp-message-time">Just now</div>
                            </div>
                        </div>
                        
                        <!-- Menu Pills -->
                        <div class="pcp-menu-container">
                            <div class="pcp-menu-title">Select an option:</div>
                            <div class="pcp-menu-pills">
                                ${menuOptions.map(option => `
                                    <button class="pcp-pill" data-message="${option.message}">
                                        <span class="pcp-pill-icon">${option.icon}</span>
                                        <span class="pcp-pill-text">${option.label}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Disclaimer -->
                         <div class="pcp-system-message">
                            For immediate emergencies, please dial <strong>112</strong> or <strong>100</strong>.
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="pcp-footer">
                        <button class="pcp-action-btn pcp-action-primary" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                            <span>Chat on WhatsApp</span>
                        </button>
                        <div class="pcp-powered">
                            <a href="${config.branding.poweredUrl}" target="_blank" rel="noopener">
                                ${config.branding.poweredText}
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Notification Popup -->
                <div class="pcp-notification" id="pcpNotification">
                    <button class="pcp-notification-close" aria-label="Close notification">×</button>
                    <div class="pcp-notification-content">
                        <div class="pcp-notification-text">
                            👮‍♂️ <strong>Pune City Police</strong><br>
                            How can we help you today?
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Reset & Base */
                .pcp-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                }
                
                .pcp-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 999999;
                }
                
                /* Floating Action Button */
                .pcp-fab {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${config.colors.whatsappGreen} 0%, ${config.colors.whatsappDark} 100%);
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
                
                .pcp-fab:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
                }
                
                .pcp-fab:active {
                    transform: scale(0.95);
                }
                
                .pcp-fab-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: ${config.colors.alertRed};
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 3px 6px;
                    border-radius: 10px;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                }
                
                /* Chat Window */
                .pcp-chat {
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
                
                .pcp-chat.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                /* Header - POLICE BLUE BRANDING */
                .pcp-header {
                    background: linear-gradient(135deg, ${config.colors.headerBgStart} 0%, ${config.colors.headerBgEnd} 100%);
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    position: relative;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                
                .pcp-header-avatar {
                    position: relative;
                }
                
                .pcp-avatar-circle {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .pcp-status-dot {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: #4CAF50;
                    border: 2px solid white;
                    border-radius: 50%;
                }
                
                .pcp-header-info {
                    flex: 1;
                    color: white;
                }
                
                .pcp-header-title {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 2px;
                    letter-spacing: 0.3px;
                }
                
                .pcp-header-subtitle {
                    font-size: 11px;
                    opacity: 0.9;
                    font-style: italic;
                }
                
                .pcp-close {
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
                
                .pcp-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                .pcp-close svg {
                    fill: white;
                }
                
                /* Messages Area */
                .pcp-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    background-color: ${config.colors.background};
                    /* Subtle pattern opacity reduced */
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d5d5d5' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }
                
                /* System Message */
                .pcp-system-message {
                    text-align: center;
                    font-size: 11px;
                    color: ${config.colors.gray};
                    margin: 10px 0;
                    background: rgba(255,255,255,0.6);
                    padding: 4px 8px;
                    border-radius: 8px;
                    display: inline-block;
                    width: 100%;
                }
                
                /* Message Bubbles */
                .pcp-message {
                    margin-bottom: 16px;
                    display: flex;
                    animation: messageIn 0.3s ease-out;
                }
                
                .pcp-message-received {
                    justify-content: flex-start;
                }
                
                .pcp-message-bubble {
                    max-width: 80%;
                    padding: 10px 14px;
                    border-radius: 12px;
                    position: relative;
                }
                
                .pcp-message-received .pcp-message-bubble {
                    background: ${config.colors.white};
                    border-top-left-radius: 2px;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }
                
                .pcp-message-text {
                    font-size: 14px;
                    line-height: 1.4;
                    color: ${config.colors.text};
                    word-wrap: break-word;
                }
                
                .pcp-message-time {
                    font-size: 10px;
                    color: ${config.colors.gray};
                    margin-top: 4px;
                    text-align: right;
                }
                
                /* Menu Pills */
                .pcp-menu-container {
                    margin-top: 8px;
                    padding: 12px;
                    background: transparent;
                }
                
                .pcp-menu-title {
                    font-size: 12px;
                    color: ${config.colors.gray};
                    margin-bottom: 8px;
                    font-weight: 600;
                    margin-left: 4px;
                }
                
                .pcp-menu-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .pcp-pill {
                    background: ${config.colors.white};
                    border: 1px solid ${config.colors.lightGray};
                    padding: 8px 12px;
                    border-radius: 18px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    color: ${config.colors.text};
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    width: 100%; /* Full width for better mobile touch */
                    justify-content: flex-start;
                }
                
                .pcp-pill:hover {
                    background: ${config.colors.lightGray};
                    border-color: ${config.colors.headerBgStart};
                    transform: translateY(-1px);
                }
                
                .pcp-pill-icon {
                    font-size: 16px;
                    min-width: 24px;
                }
                
                /* Footer */
                .pcp-footer {
                    padding: 16px;
                    background: ${config.colors.white};
                    border-top: 1px solid ${config.colors.lightGray};
                }
                
                .pcp-action-btn {
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
                
                .pcp-action-primary {
                    background: linear-gradient(135deg, ${config.colors.whatsappGreen} 0%, ${config.colors.whatsappDark} 100%);
                    color: white;
                }
                
                .pcp-action-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                }
                
                .pcp-powered {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 10px;
                }
                
                .pcp-powered a {
                    color: ${config.colors.gray};
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .pcp-powered a:hover {
                    color: ${config.colors.headerBgStart};
                    text-decoration: underline;
                }
                
                /* Notification */
                .pcp-notification {
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
                    border-left: 4px solid ${config.colors.headerBgStart};
                }
                
                .pcp-notification.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(0);
                }
                
                .pcp-notification-close {
                    position: absolute;
                    top: 6px;
                    right: 6px;
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
                
                .pcp-notification-text {
                    font-size: 13px;
                    color: ${config.colors.text};
                    padding-right: 16px;
                    line-height: 1.4;
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
                    .pcp-widget {
                        bottom: 16px;
                        right: 16px;
                    }
                    
                    .pcp-chat {
                        width: calc(100vw - 32px);
                        height: calc(100vh - 100px);
                        bottom: 70px;
                        right: -8px;
                    }
                    
                    .pcp-notification {
                        max-width: calc(100vw - 100px);
                    }
                }
                
                /* Print */
                @media print {
                    .pcp-widget {
                        display: none !important;
                    }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            // Create container
            let container = document.getElementById('pcp-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'pcp-chat-widget-container';
                document.body.appendChild(container);
            }
            
            container.innerHTML = createWidget();
            
            // Get elements
            const fab = document.getElementById('pcpFab');
            const chat = document.getElementById('pcpChat');
            const closeBtn = chat.querySelector('.pcp-close');
            const notification = document.getElementById('pcpNotification');
            const notificationClose = notification.querySelector('.pcp-notification-close');
            const pills = document.querySelectorAll('.pcp-pill');
            
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
                    
                    // Auto-hide after 10 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 10000);
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
            
            console.log('✅ Pune City Police Widget initialized successfully');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.PuneCityPoliceWidget = {
        version: '5.0.0',
        open: () => document.getElementById('pcpChat')?.classList.add('show'),
        close: () => document.getElementById('pcpChat')?.classList.remove('show'),
        toggle: () => document.getElementById('pcpChat')?.classList.toggle('show')
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
