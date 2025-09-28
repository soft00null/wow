/**
 * PCMC Municipal Corporation AI Chat Widget
 * File: pcmc-whatsup.js
 * Version: 1.0.1 
 * Date: 2025-09-28
 * Author: Team WoW
 * URL: https://wow-strategies.com/pcmc-whatsup.js
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    console.log('🚀 PCMC Chat Widget loading...');
    
    if (window.PCMCChatWidget) {
        console.warn('PCMC Chat Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi! I need assistance from PCMC Municipal Corporation.',
        position: 'bottom-right',
        colors: {
            primary: '#4A90E2',
            secondary: '#2E5F8A',
            accent: '#00D4FF',
            glass: 'rgba(255, 255, 255, 0.1)',
            glassHover: 'rgba(255, 255, 255, 0.15)',
            text: '#FFFFFF',
            darkText: '#333333',
            gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            gradientAI: 'linear-gradient(135deg, #00D4FF 0%, #4A90E2 100%)'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies',
            url: 'https://wow-strategies.com/'
        },
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/919226556203'
    };
    
    const menuOptions = [
        { id: 'info', label: 'Information', icon: 'ℹ️', message: 'I need information about PCMC services' },
        { id: 'property', label: 'My Properties', icon: '🏠', message: 'I want to check my property details' },
        { id: 'grievance', label: 'Grievance', icon: '📝', message: 'I want to register a grievance' },
        { id: 'schemes', label: 'Schemes', icon: '📋', message: 'Tell me about government schemes' },
        { id: 'cfc', label: 'CFC', icon: '🏢', message: 'I need information about Citizen Facilitation Centre' },
        { id: 'bills', label: 'Pay Bills', icon: '💳', message: 'I want to pay my municipal bills' }
    ];
    
    function injectStyles() {
        const styleId = 'pcmc-chat-widget-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const styles = document.createElement('style');
        styles.id = styleId;
        styles.textContent = `
            /* PCMC Chat Widget Styles */
            .pcmc-widget * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            }
            
            .pcmc-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
            }
            
            /* Hint Bubble */
            .pcmc-hint {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 24px;
                padding: 12px 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px) scale(0.9);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                white-space: nowrap;
            }
            
            .pcmc-hint.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }
            
            .pcmc-hint-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .pcmc-hint-ai {
                background: ${config.colors.gradientAI};
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            
            .pcmc-hint-text {
                color: ${config.colors.darkText};
                font-size: 14px;
            }
            
            .pcmc-hint-close {
                background: none;
                border: none;
                color: #999;
                font-size: 20px;
                cursor: pointer;
                padding: 0 0 0 8px;
                line-height: 1;
            }
            
            /* Floating Action Button */
            .pcmc-fab {
                width: 56px;
                height: 56px;
                background: ${config.colors.gradientAI};
                border: none;
                border-radius: 28px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(74, 144, 226, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .pcmc-fab:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 8px 30px rgba(74, 144, 226, 0.5);
            }
            
            .pcmc-fab:active {
                transform: scale(0.95);
            }
            
            .pcmc-fab-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: ${config.colors.gradient2};
                color: white;
                font-size: 10px;
                font-weight: 700;
                padding: 4px 6px;
                border-radius: 10px;
                animation: pulse 2s infinite;
                letter-spacing: 0.5px;
            }
            
            /* Chat Window */
            .pcmc-chat {
                position: absolute;
                bottom: 72px;
                right: 0;
                width: 400px;
                height: 600px;
                border-radius: 24px;
                overflow: hidden;
                display: none;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .pcmc-chat.show {
                display: flex;
            }
            
            /* Glass Background */
            .pcmc-glass-bg {
                position: absolute;
                inset: 0;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            /* Header */
            .pcmc-header {
                position: relative;
                background: ${config.colors.glass};
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 1;
            }
            
            .pcmc-header-left {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .pcmc-logo {
                position: relative;
            }
            
            .pcmc-logo-circle {
                width: 40px;
                height: 40px;
                background: ${config.colors.gradientAI};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                font-size: 12px;
            }
            
            .pcmc-status-indicator {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 12px;
                height: 12px;
                background: #4CAF50;
                border: 2px solid white;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            
            .pcmc-header-info {
                color: ${config.colors.darkText};
            }
            
            .pcmc-header-title {
                font-size: 15px;
                font-weight: 600;
                margin-bottom: 2px;
            }
            
            .pcmc-header-subtitle {
                font-size: 12px;
                color: #666;
            }
            
            .pcmc-header-actions {
                display: flex;
                gap: 8px;
            }
            
            .pcmc-qr-toggle,
            .pcmc-close {
                background: ${config.colors.glass};
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                color: ${config.colors.darkText};
            }
            
            .pcmc-qr-toggle:hover,
            .pcmc-close:hover {
                background: ${config.colors.glassHover};
                transform: scale(1.05);
            }
            
            /* QR Code Section */
            .pcmc-qr-section {
                position: relative;
                background: rgba(255, 255, 255, 0.5);
                padding: 20px;
                display: none;
                z-index: 1;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .pcmc-qr-section.show {
                display: block;
            }
            
            .pcmc-qr-container {
                text-align: center;
            }
            
            .pcmc-qr-image {
                width: 150px;
                height: 150px;
                border-radius: 12px;
                margin-bottom: 12px;
            }
            
            .pcmc-qr-text {
                font-size: 13px;
                color: #666;
            }
            
            /* Messages Area */
            .pcmc-messages {
                position: relative;
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                z-index: 1;
            }
            
            /* Welcome Section */
            .pcmc-welcome {
                text-align: center;
                margin-bottom: 24px;
            }
            
            .pcmc-welcome-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }
            
            .pcmc-welcome-title {
                font-size: 20px;
                font-weight: 600;
                color: ${config.colors.darkText};
                margin-bottom: 8px;
            }
            
            .pcmc-welcome-text {
                font-size: 14px;
                color: #666;
                line-height: 1.5;
            }
            
            /* Menu Grid */
            .pcmc-menu {
                margin-top: 24px;
            }
            
            .pcmc-menu-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }
            
            .pcmc-menu-item {
                background: ${config.colors.glass};
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 16px;
                padding: 16px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                color: ${config.colors.darkText};
            }
            
            .pcmc-menu-item:hover {
                background: ${config.colors.glassHover};
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                border-color: ${config.colors.accent};
            }
            
            .pcmc-menu-icon {
                font-size: 24px;
            }
            
            .pcmc-menu-label {
                font-size: 13px;
                font-weight: 500;
            }
            
            /* Footer */
            .pcmc-footer {
                position: relative;
                padding: 16px;
                background: ${config.colors.glass};
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                z-index: 1;
            }
            
            .pcmc-action-btn {
                width: 100%;
                padding: 14px;
                background: ${config.colors.gradientAI};
                border: none;
                border-radius: 16px;
                color: white;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.3s;
                box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
            }
            
            .pcmc-action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(74, 144, 226, 0.4);
            }
            
            .pcmc-powered {
                text-align: center;
                margin-top: 12px;
                font-size: 11px;
            }
            
            .pcmc-powered a {
                color: #999;
                text-decoration: none;
                transition: color 0.2s;
            }
            
            .pcmc-powered a:hover {
                color: ${config.colors.primary};
            }
            
            /* Animations */
            @keyframes pulse {
                0%, 100% { 
                    transform: scale(1);
                    opacity: 1;
                }
                50% { 
                    transform: scale(1.2);
                    opacity: 0.7;
                }
            }
            
            /* Scrollbar */
            .pcmc-messages::-webkit-scrollbar {
                width: 6px;
            }
            
            .pcmc-messages::-webkit-scrollbar-track {
                background: transparent;
            }
            
            .pcmc-messages::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 3px;
            }
            
            /* Responsive */
            @media (max-width: 480px) {
                .pcmc-widget {
                    bottom: 12px;
                    right: 12px;
                }
                
                .pcmc-chat {
                    width: calc(100vw - 24px);
                    height: calc(100vh - 100px);
                    bottom: 68px;
                    right: -6px;
                }
                
                .pcmc-menu-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            /* Print */
            @media print {
                .pcmc-widget {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(styles);
        console.log('✅ Styles injected');
    }
    
    function createWidget() {
        const widgetHTML = `
            <!-- Hint Bubble -->
            <div class="pcmc-hint" id="pcmcHint">
                <div class="pcmc-hint-content">
                    <span class="pcmc-hint-ai">AI</span>
                    <span class="pcmc-hint-text">Hi! I'm your PCMC Assistant</span>
                </div>
                <button class="pcmc-hint-close" aria-label="Close hint">×</button>
            </div>
            
            <!-- Floating Action Button -->
            <button class="pcmc-fab" id="pcmcFab" aria-label="Open Chat">
                <div class="pcmc-fab-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                        <circle cx="12" cy="10" r="1"/>
                        <circle cx="8" cy="10" r="1"/>
                        <circle cx="16" cy="10" r="1"/>
                    </svg>
                </div>
                <div class="pcmc-fab-badge">AI</div>
            </button>
            
            <!-- Chat Interface -->
            <div class="pcmc-chat" id="pcmcChat">
                <!-- Glass Background -->
                <div class="pcmc-glass-bg"></div>
                
                <!-- Header -->
                <div class="pcmc-header">
                    <div class="pcmc-header-left">
                        <div class="pcmc-logo">
                            <div class="pcmc-logo-circle">
                                <span>PCMC</span>
                            </div>
                            <div class="pcmc-status-indicator"></div>
                        </div>
                        <div class="pcmc-header-info">
                            <div class="pcmc-header-title">PCMC Care Assistant</div>
                            <div class="pcmc-header-subtitle">AI Powered • Online</div>
                        </div>
                    </div>
                    <div class="pcmc-header-actions">
                        <button class="pcmc-qr-toggle" id="pcmcQrToggle" aria-label="Toggle QR Code">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM15 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
                            </svg>
                        </button>
                        <button class="pcmc-close" id="pcmcClose" aria-label="Close chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- QR Code Section -->
                <div class="pcmc-qr-section" id="pcmcQrSection">
                    <div class="pcmc-qr-container">
                        <img src="${config.qrCode}" alt="WhatsApp QR Code" class="pcmc-qr-image"/>
                        <p class="pcmc-qr-text">Scan to chat on WhatsApp</p>
                    </div>
                </div>
                
                <!-- Messages Area -->
                <div class="pcmc-messages">
                    <div class="pcmc-welcome">
                        <div class="pcmc-welcome-icon">
                            <span>👋</span>
                        </div>
                        <h3 class="pcmc-welcome-title">Welcome to PCMC Care!</h3>
                        <p class="pcmc-welcome-text">
                            I'm your AI-powered assistant for all municipal services.
                            How can I help you today?
                        </p>
                    </div>
                    
                    <!-- Menu Options -->
                    <div class="pcmc-menu">
                        <div class="pcmc-menu-grid">
                            ${menuOptions.map(option => `
                                <button class="pcmc-menu-item" data-message="${option.message}">
                                    <div class="pcmc-menu-icon">${option.icon}</div>
                                    <div class="pcmc-menu-label">${option.label}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="pcmc-footer">
                    <button class="pcmc-action-btn" id="pcmcWhatsappBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                        <span>Continue on WhatsApp</span>
                    </button>
                    <div class="pcmc-powered">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                            ${config.poweredBy.text}
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        return widgetHTML;
    }
    
    function initWidget() {
        try {
            console.log('📦 Initializing PCMC Chat Widget...');
            
            // Inject styles first
            injectStyles();
            
            // Create container
            let container = document.getElementById('pcmc-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'pcmc-chat-widget-container';
                container.className = 'pcmc-widget';
                document.body.appendChild(container);
                console.log('✅ Container created');
            }
            
            // Add widget HTML
            container.innerHTML = createWidget();
            console.log('✅ Widget HTML added');
            
            // Get elements
            const fab = document.getElementById('pcmcFab');
            const chat = document.getElementById('pcmcChat');
            const closeBtn = document.getElementById('pcmcClose');
            const hint = document.getElementById('pcmcHint');
            const hintClose = hint?.querySelector('.pcmc-hint-close');
            const qrToggle = document.getElementById('pcmcQrToggle');
            const qrSection = document.getElementById('pcmcQrSection');
            const menuItems = document.querySelectorAll('.pcmc-menu-item');
            const whatsappBtn = document.getElementById('pcmcWhatsappBtn');
            
            // State
            let isOpen = false;
            let qrVisible = false;
            
            // FAB click handler
            if (fab) {
                fab.addEventListener('click', () => {
                    isOpen = !isOpen;
                    if (isOpen) {
                        chat.classList.add('show');
                        hint.classList.remove('show');
                    } else {
                        chat.classList.remove('show');
                    }
                    console.log('Chat toggled:', isOpen ? 'open' : 'closed');
                });
            }
            
            // Close button handler
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    isOpen = false;
                    chat.classList.remove('show');
                });
            }
            
            // QR Toggle
            if (qrToggle && qrSection) {
                qrToggle.addEventListener('click', () => {
                    qrVisible = !qrVisible;
                    if (qrVisible) {
                        qrSection.classList.add('show');
                    } else {
                        qrSection.classList.remove('show');
                    }
                });
            }
            
            // WhatsApp button
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
                    window.open(url, '_blank');
                });
            }
            
            // Show hint after delay
            setTimeout(() => {
                if (!isOpen && hint) {
                    hint.classList.add('show');
                    console.log('Hint shown');
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        hint.classList.remove('show');
                    }, 5000);
                }
            }, 2000);
            
            // Hint close handler
            if (hintClose) {
                hintClose.addEventListener('click', () => {
                    hint.classList.remove('show');
                });
            }
            
            // Menu item handlers
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                });
            });
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (container && !container.contains(e.target) && isOpen) {
                    isOpen = false;
                    chat.classList.remove('show');
                }
            });
            
            // Escape key handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isOpen) {
                    isOpen = false;
                    chat.classList.remove('show');
                }
            });
            
            console.log('✅ PCMC Chat Widget initialized successfully');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    }
    
    // Public API
    window.PCMCChatWidget = {
        version: '1.0.1',
        open: () => {
            document.getElementById('pcmcChat')?.classList.add('show');
        },
        close: () => {
            document.getElementById('pcmcChat')?.classList.remove('show');
        },
        toggle: () => {
            document.getElementById('pcmcChat')?.classList.toggle('show');
        },
        init: initWidget
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        // Small delay to ensure DOM is ready
        setTimeout(initWidget, 100);
    }
    
})();
