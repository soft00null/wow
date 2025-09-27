/**
 * Divisional Commissioner Pune WhatsApp AI Integration Widget
 * File: dc-pune-chat-widget.js
 * Version: 4.0.0 - Professional Government AI Chatbot
 * Date: 2025-09-27
 * Author: Enhanced Version
 * 
 * WordPress Compatible with AI-First Design
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCPuneWidget) {
        console.warn('DC Pune Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi, I need assistance from Divisional Commissioner Pune office.',
        position: 'bottom-right',
        autoShow: true,
        primaryColor: '#075E54', // Professional WhatsApp Dark Green
        secondaryColor: '#25D366', // WhatsApp Light Green
        accentColor: '#128C7E', // WhatsApp Medium Green
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Widget Creation
    const createWidget = () => {
        const widgetHTML = `
            <!-- Main Widget Container -->
            <div id="dc-pune-widget" class="dc-widget-container">
                
                <!-- Floating Action Button -->
                <div class="dc-fab" id="dcFab">
                    <div class="dc-fab-icon">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                    </div>
                    <div class="dc-fab-badge">AI</div>
                    <div class="dc-fab-pulse"></div>
                </div>
                
                <!-- Chat Window -->
                <div class="dc-chat-window" id="dcChatWindow">
                    
                    <!-- Header -->
                    <div class="dc-chat-header">
                        <div class="dc-header-content">
                            <div class="dc-header-avatar">
                                <div class="dc-avatar-emblem">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="dc-header-info">
                                <div class="dc-header-title">Divisional Commissioner Pune</div>
                                <div class="dc-header-subtitle">
                                    <span class="dc-status-dot"></span>
                                    AI Assistant Available 24/7
                                </div>
                            </div>
                            <button class="dc-close-btn" id="dcCloseBtn">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Chat Body -->
                    <div class="dc-chat-body">
                        
                        <!-- Welcome Message -->
                        <div class="dc-welcome-container">
                            <div class="dc-bot-message">
                                <div class="dc-message-bubble">
                                    <div class="dc-ai-indicator">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="${config.primaryColor}">
                                            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5"/>
                                        </svg>
                                        AI Assistant
                                    </div>
                                    Welcome! I'm the AI Assistant for Divisional Commissioner Pune office. How can I help you today?
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="dc-quick-actions">
                            <div class="dc-quick-action-title">Quick Actions</div>
                            <div class="dc-action-grid">
                                <button class="dc-action-btn" data-message="I need information about government services">
                                    <span class="dc-action-icon">📋</span>
                                    <span class="dc-action-text">Services</span>
                                </button>
                                <button class="dc-action-btn" data-message="I want to file a complaint">
                                    <span class="dc-action-icon">📝</span>
                                    <span class="dc-action-text">Complaints</span>
                                </button>
                                <button class="dc-action-btn" data-message="I need document verification status">
                                    <span class="dc-action-icon">✅</span>
                                    <span class="dc-action-text">Verification</span>
                                </button>
                                <button class="dc-action-btn" data-message="I want to book an appointment">
                                    <span class="dc-action-icon">📅</span>
                                    <span class="dc-action-text">Appointment</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Chat Options -->
                        <div class="dc-chat-options">
                            <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}" 
                               target="_blank" 
                               class="dc-chat-option dc-mobile-chat">
                                <div class="dc-option-icon">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="${config.primaryColor}">
                                        <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-3H9V5h6v12z"/>
                                    </svg>
                                </div>
                                <div class="dc-option-content">
                                    <div class="dc-option-title">Mobile Chat</div>
                                    <div class="dc-option-desc">Open in WhatsApp Mobile</div>
                                </div>
                                <div class="dc-option-arrow">→</div>
                            </a>
                            
                            <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.defaultMessage)}" 
                               target="_blank"
                               class="dc-chat-option dc-web-chat">
                                <div class="dc-option-icon">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="${config.primaryColor}">
                                        <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/>
                                    </svg>
                                </div>
                                <div class="dc-option-content">
                                    <div class="dc-option-title">WhatsApp Web</div>
                                    <div class="dc-option-desc">Open in Desktop Browser</div>
                                </div>
                                <div class="dc-option-arrow">→</div>
                            </a>
                        </div>
                        
                    </div>
                    
                    <!-- Footer -->
                    <div class="dc-chat-footer">
                        <a href="${config.poweredBy.url}" target="_blank" class="dc-powered-by">
                            ⚡ ${config.poweredBy.text}
                        </a>
                    </div>
                    
                </div>
                
                <!-- Tooltip -->
                <div class="dc-tooltip" id="dcTooltip">
                    Click to chat with AI Assistant
                </div>
                
            </div>
            
            <!-- Styles -->
            <style>
                /* Base Container */
                .dc-widget-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                
                /* Floating Action Button */
                .dc-fab {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor});
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: dcFabEntrance 0.5s ease-out;
                }
                
                .dc-fab:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 30px rgba(0,0,0,0.3);
                }
                
                .dc-fab:active {
                    transform: scale(0.95);
                }
                
                .dc-fab.active {
                    transform: scale(0) rotate(180deg);
                    opacity: 0;
                    pointer-events: none;
                }
                
                .dc-fab-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* AI Badge */
                .dc-fab-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #FF5722;
                    color: white;
                    border-radius: 10px;
                    padding: 2px 6px;
                    font-size: 10px;
                    font-weight: bold;
                    border: 2px solid white;
                    animation: dcBadgePulse 2s infinite;
                }
                
                /* Pulse Effect */
                .dc-fab-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: ${config.secondaryColor};
                    opacity: 0.4;
                    animation: dcPulse 2s infinite;
                    pointer-events: none;
                }
                
                /* Chat Window */
                .dc-chat-window {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 380px;
                    max-width: calc(100vw - 40px);
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }
                
                .dc-chat-window.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                /* Header */
                .dc-chat-header {
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor});
                    color: white;
                    padding: 16px;
                    position: relative;
                }
                
                .dc-header-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .dc-header-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dc-avatar-emblem {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dc-header-info {
                    flex: 1;
                }
                
                .dc-header-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                
                .dc-header-subtitle {
                    font-size: 13px;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .dc-status-dot {
                    width: 8px;
                    height: 8px;
                    background: #4CAF50;
                    border-radius: 50%;
                    animation: dcStatusPulse 2s infinite;
                }
                
                .dc-close-btn {
                    width: 32px;
                    height: 32px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .dc-close-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: rotate(90deg);
                }
                
                /* Chat Body */
                .dc-chat-body {
                    padding: 20px;
                    max-height: 450px;
                    overflow-y: auto;
                    background: #f0f2f5;
                }
                
                .dc-welcome-container {
                    margin-bottom: 20px;
                }
                
                .dc-bot-message {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 12px;
                    animation: dcMessageSlide 0.4s ease-out;
                }
                
                .dc-message-bubble {
                    background: white;
                    padding: 12px 16px;
                    border-radius: 8px 8px 8px 0;
                    max-width: 85%;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    font-size: 14px;
                    line-height: 1.4;
                    color: #262626;
                }
                
                .dc-ai-indicator {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    color: ${config.primaryColor};
                    font-weight: 600;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    opacity: 0.8;
                }
                
                /* Quick Actions */
                .dc-quick-actions {
                    margin-bottom: 20px;
                }
                
                .dc-quick-action-title {
                    font-size: 12px;
                    color: #667781;
                    font-weight: 600;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                }
                
                .dc-action-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }
                
                .dc-action-btn {
                    background: white;
                    border: 1px solid #e9edef;
                    border-radius: 8px;
                    padding: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                }
                
                .dc-action-btn:hover {
                    background: ${config.primaryColor};
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                
                .dc-action-btn:hover .dc-action-text {
                    color: white;
                }
                
                .dc-action-icon {
                    font-size: 20px;
                }
                
                .dc-action-text {
                    font-size: 12px;
                    color: #667781;
                    font-weight: 500;
                }
                
                /* Chat Options */
                .dc-chat-options {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .dc-chat-option {
                    background: white;
                    border: 1px solid #e9edef;
                    border-radius: 8px;
                    padding: 14px;
                    text-decoration: none;
                    color: inherit;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .dc-chat-option:hover {
                    background: #f8f9fa;
                    border-color: ${config.primaryColor};
                    transform: translateX(4px);
                }
                
                .dc-option-icon {
                    width: 40px;
                    height: 40px;
                    background: rgba(37, 211, 102, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dc-option-content {
                    flex: 1;
                }
                
                .dc-option-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #111b21;
                    margin-bottom: 2px;
                }
                
                .dc-option-desc {
                    font-size: 12px;
                    color: #667781;
                }
                
                .dc-option-arrow {
                    color: #667781;
                    font-size: 20px;
                    transition: transform 0.3s ease;
                }
                
                .dc-chat-option:hover .dc-option-arrow {
                    transform: translateX(4px);
                }
                
                /* Footer */
                .dc-chat-footer {
                    padding: 12px;
                    background: #f8f9fa;
                    border-top: 1px solid #e9edef;
                    text-align: center;
                }
                
                .dc-powered-by {
                    font-size: 11px;
                    color: #667781;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .dc-powered-by:hover {
                    color: ${config.primaryColor};
                }
                
                /* Tooltip */
                .dc-tooltip {
                    position: absolute;
                    bottom: 70px;
                    right: 80px;
                    background: #111b21;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                }
                
                .dc-tooltip.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .dc-tooltip::before {
                    content: '';
                    position: absolute;
                    right: -6px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-left: 6px solid #111b21;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                }
                
                /* Animations */
                @keyframes dcFabEntrance {
                    0% {
                        transform: scale(0) rotate(-180deg);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1) rotate(0);
                        opacity: 1;
                    }
                }
                
                @keyframes dcBadgePulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                
                @keyframes dcPulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                
                @keyframes dcStatusPulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
                
                @keyframes dcMessageSlide {
                    0% {
                        transform: translateX(-20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                /* Scrollbar Styling */
                .dc-chat-body::-webkit-scrollbar {
                    width: 6px;
                }
                
                .dc-chat-body::-webkit-scrollbar-track {
                    background: #f0f2f5;
                }
                
                .dc-chat-body::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 3px;
                }
                
                .dc-chat-body::-webkit-scrollbar-thumb:hover {
                    background: #a0aec0;
                }
                
                /* Responsive Design */
                @media (max-width: 480px) {
                    .dc-widget-container {
                        bottom: 10px;
                        right: 10px;
                    }
                    
                    .dc-chat-window {
                        width: calc(100vw - 20px);
                        bottom: 70px;
                        right: -10px;
                    }
                    
                    .dc-action-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .dc-fab {
                        width: 56px;
                        height: 56px;
                    }
                }
                
                /* Print Styles */
                @media print {
                    .dc-widget-container {
                        display: none !important;
                    }
                }
                
                /* Reduced Motion */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            </style>
        `;
        
        return widgetHTML;
    };
    
    // Initialize Widget
    const initWidget = () => {
        try {
            // Create and insert widget
            const container = document.createElement('div');
            container.innerHTML = createWidget();
            document.body.appendChild(container.firstElementChild);
            
            // Get elements
            const fab = document.getElementById('dcFab');
            const chatWindow = document.getElementById('dcChatWindow');
            const closeBtn = document.getElementById('dcCloseBtn');
            const tooltip = document.getElementById('dcTooltip');
            const actionBtns = document.querySelectorAll('.dc-action-btn');
            
            // Toggle chat window
            const toggleChat = () => {
                const isActive = chatWindow.classList.contains('active');
                
                if (isActive) {
                    chatWindow.classList.remove('active');
                    fab.classList.remove('active');
                    tooltip.classList.remove('show');
                } else {
                    chatWindow.classList.add('active');
                    fab.classList.add('active');
                    
                    // Hide badge when opened
                    const badge = document.querySelector('.dc-fab-badge');
                    if (badge) {
                        badge.style.display = 'none';
                    }
                }
            };
            
            // Event listeners
            fab.addEventListener('click', toggleChat);
            closeBtn.addEventListener('click', toggleChat);
            
            // Tooltip on hover
            let tooltipTimeout;
            fab.addEventListener('mouseenter', () => {
                if (!chatWindow.classList.contains('active')) {
                    tooltipTimeout = setTimeout(() => {
                        tooltip.classList.add('show');
                    }, 500);
                }
            });
            
            fab.addEventListener('mouseleave', () => {
                clearTimeout(tooltipTimeout);
                tooltip.classList.remove('show');
            });
            
            // Quick action buttons
            actionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const message = btn.getAttribute('data-message');
                    const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                });
            });
            
            // Auto show animation
            if (config.autoShow) {
                setTimeout(() => {
                    tooltip.classList.add('show');
                    setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 3000);
                }, 3000);
            }
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.dc-widget-container')) {
                    if (chatWindow.classList.contains('active')) {
                        toggleChat();
                    }
                }
            });
            
            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && chatWindow.classList.contains('active')) {
                    toggleChat();
                }
            });
            
            console.log('✅ DC Pune WhatsApp Widget initialized successfully');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneWidget = {
        version: '4.0.0',
        open: () => {
            const chatWindow = document.getElementById('dcChatWindow');
            const fab = document.getElementById('dcFab');
            if (chatWindow && !chatWindow.classList.contains('active')) {
                chatWindow.classList.add('active');
                fab.classList.add('active');
            }
        },
        close: () => {
            const chatWindow = document.getElementById('dcChatWindow');
            const fab = document.getElementById('dcFab');
            if (chatWindow && chatWindow.classList.contains('active')) {
                chatWindow.classList.remove('active');
                fab.classList.remove('active');
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
