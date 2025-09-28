/**
 * PCMC Municipal Corporation AI Assistant Widget
 * Professional Government Chatbot for Citizen Services
 * (c) 2025 Powered by WoW-Strategies Private Limited
 */

(function(window, document) {
    'use strict';

    // Widget Configuration
    const PCMC_CONFIG = {
        apiEndpoint: 'https://api.pcmc.gov.in/chat',
        whatsappNumber: '918888006666',
        version: '1.0.0',
        theme: {
            primary: '#2563eb',
            secondary: '#0ea5e9',
            accent: '#06b6d4',
            dark: '#0f172a',
            light: '#f8fafc'
        }
    };

    // Inject Styles
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            .pcmc-widget * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            }

            .pcmc-widget {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 99999;
                font-size: 16px;
                line-height: 1.5;
            }

            /* Main floating button */
            .pcmc-float-btn {
                width: 64px;
                height: 64px;
                background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3),
                           0 4px 6px -2px rgba(37, 99, 235, 0.1);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }

            .pcmc-float-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.5s ease-out;
            }

            .pcmc-float-btn:hover::before {
                transform: translate(-50%, -50%) scale(1);
            }

            .pcmc-float-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.4),
                           0 8px 16px -4px rgba(37, 99, 235, 0.2);
            }

            .pcmc-float-btn svg {
                width: 32px;
                height: 32px;
                fill: white;
                transition: transform 0.3s ease;
            }

            .pcmc-float-btn.active svg {
                transform: rotate(90deg);
            }

            /* Pulse animation for attention */
            .pcmc-pulse {
                position: absolute;
                top: -4px;
                right: -4px;
                width: 20px;
                height: 20px;
                background: #ef4444;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 11px;
                font-weight: 600;
                animation: pulse 2s infinite;
                border: 2px solid white;
            }

            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                }
            }

            /* Hint tooltip */
            .pcmc-hint {
                position: absolute;
                bottom: 80px;
                right: 0;
                background: rgba(15, 23, 42, 0.95);
                color: white;
                padding: 12px 16px;
                border-radius: 12px;
                font-size: 14px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
            }

            .pcmc-hint.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .pcmc-hint::after {
                content: '';
                position: absolute;
                bottom: -6px;
                right: 24px;
                width: 12px;
                height: 12px;
                background: rgba(15, 23, 42, 0.95);
                transform: rotate(45deg);
            }

            /* Main chat interface */
            .pcmc-chat-window {
                position: absolute;
                bottom: 88px;
                right: 0;
                width: 380px;
                height: 600px;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                border-radius: 24px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                opacity: 0;
                visibility: hidden;
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid rgba(226, 232, 240, 0.8);
            }

            .pcmc-chat-window.active {
                opacity: 1;
                visibility: visible;
                transform: scale(1) translateY(0);
            }

            /* Chat header */
            .pcmc-chat-header {
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
                padding: 20px;
                border-bottom: 1px solid rgba(226, 232, 240, 0.5);
                position: relative;
            }

            .pcmc-header-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
            }

            .pcmc-header-title {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .pcmc-ai-icon {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .pcmc-ai-icon svg {
                width: 24px;
                height: 24px;
                fill: white;
            }

            .pcmc-ai-status {
                width: 10px;
                height: 10px;
                background: #10b981;
                border-radius: 50%;
                position: absolute;
                bottom: -2px;
                right: -2px;
                border: 2px solid white;
                animation: blink 2s infinite;
            }

            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }

            .pcmc-header-text h3 {
                font-size: 16px;
                font-weight: 600;
                color: #0f172a;
                margin-bottom: 2px;
            }

            .pcmc-header-text p {
                font-size: 12px;
                color: #64748b;
            }

            .pcmc-header-actions {
                display: flex;
                gap: 8px;
            }

            .pcmc-header-btn {
                width: 32px;
                height: 32px;
                background: transparent;
                border: 1px solid rgba(226, 232, 240, 0.8);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .pcmc-header-btn:hover {
                background: white;
                border-color: #e2e8f0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .pcmc-header-btn svg {
                width: 16px;
                height: 16px;
                fill: #64748b;
            }

            /* AI Assistant Badge */
            .pcmc-ai-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 12px;
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%);
                border: 1px solid rgba(37, 99, 235, 0.2);
                border-radius: 20px;
                font-size: 11px;
                color: #2563eb;
                font-weight: 500;
            }

            .pcmc-ai-badge svg {
                width: 12px;
                height: 12px;
                fill: currentColor;
            }

            /* Service buttons grid */
            .pcmc-services {
                padding: 20px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }

            .pcmc-service-btn {
                background: white;
                border: 1.5px solid #e2e8f0;
                border-radius: 16px;
                padding: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .pcmc-service-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%);
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }

            .pcmc-service-btn:hover::before {
                transform: translateX(0);
            }

            .pcmc-service-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.15);
                border-color: #2563eb;
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(14, 165, 233, 0.02) 100%);
            }

            .pcmc-service-icon {
                font-size: 24px;
                margin-bottom: 4px;
            }

            .pcmc-service-name {
                font-size: 13px;
                font-weight: 500;
                color: #0f172a;
                text-align: center;
            }

            /* Chat messages area */
            .pcmc-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .pcmc-chat-messages::-webkit-scrollbar {
                width: 4px;
            }

            .pcmc-chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }

            .pcmc-chat-messages::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 2px;
            }

            .pcmc-message {
                display: flex;
                gap: 12px;
                animation: messageIn 0.3s ease-out;
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

            .pcmc-message.user {
                flex-direction: row-reverse;
            }

            .pcmc-message-bubble {
                max-width: 70%;
                padding: 12px 16px;
                background: #f1f5f9;
                border-radius: 16px;
                font-size: 14px;
                color: #0f172a;
                line-height: 1.5;
            }

            .pcmc-message.user .pcmc-message-bubble {
                background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
                color: white;
            }

            .pcmc-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: #f1f5f9;
                border-radius: 16px;
                width: fit-content;
            }

            .pcmc-typing span {
                width: 8px;
                height: 8px;
                background: #94a3b8;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }

            .pcmc-typing span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .pcmc-typing span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 80%, 100% {
                    transform: scale(1);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1.3);
                    opacity: 1;
                }
            }

            /* Input area */
            .pcmc-chat-input {
                padding: 16px;
                border-top: 1px solid rgba(226, 232, 240, 0.5);
                background: rgba(248, 250, 252, 0.5);
            }

            .pcmc-input-wrapper {
                display: flex;
                gap: 12px;
                align-items: center;
            }

            .pcmc-input-field {
                flex: 1;
                padding: 12px 16px;
                background: white;
                border: 1.5px solid #e2e8f0;
                border-radius: 12px;
                font-size: 14px;
                outline: none;
                transition: all 0.2s ease;
            }

            .pcmc-input-field:focus {
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }

            .pcmc-input-field::placeholder {
                color: #94a3b8;
            }

            .pcmc-send-btn {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
                border: none;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .pcmc-send-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            }

            .pcmc-send-btn:active {
                transform: scale(0.95);
            }

            .pcmc-send-btn svg {
                width: 20px;
                height: 20px;
                fill: white;
            }

            /* QR Code Modal */
            .pcmc-qr-modal {
                position: absolute;
                inset: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 24px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .pcmc-qr-modal.active {
                opacity: 1;
                visibility: visible;
            }

            .pcmc-qr-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 32px;
                height: 32px;
                background: #f1f5f9;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .pcmc-qr-close:hover {
                background: #e2e8f0;
            }

            .pcmc-qr-close svg {
                width: 16px;
                height: 16px;
                fill: #64748b;
            }

            .pcmc-qr-content {
                text-align: center;
                max-width: 280px;
            }

            .pcmc-qr-image {
                width: 200px;
                height: 200px;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 16px;
                padding: 16px;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .pcmc-qr-image img {
                width: 100%;
                height: 100%;
            }

            .pcmc-qr-title {
                font-size: 18px;
                font-weight: 600;
                color: #0f172a;
                margin-bottom: 8px;
            }

            .pcmc-qr-desc {
                font-size: 14px;
                color: #64748b;
                line-height: 1.5;
                margin-bottom: 20px;
            }

            .pcmc-qr-button {
                padding: 12px 24px;
                background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .pcmc-qr-button:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            }

            /* Mobile responsive */
            @media (max-width: 480px) {
                .pcmc-widget {
                    bottom: 16px;
                    right: 16px;
                }

                .pcmc-chat-window {
                    width: calc(100vw - 32px);
                    height: calc(100vh - 100px);
                    bottom: 80px;
                }

                .pcmc-services {
                    grid-template-columns: 1fr;
                }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation: none !important;
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // SVG Icons
    const icons = {
        ai: '<svg viewBox="0 0 24 24"><path d="M21 11V9h-2V7a2 2 0 0 0-2-2h-2V3h-2v2h-2V3H9v2H7a2 2 0 0 0-2 2v2H3v2h2v2H3v2h2v2a2 2 0 0 0 2 2h2v2h2v-2h2v2h2v-2h2a2 2 0 0 0 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"/><circle cx="12" cy="12" r="1.5"/></svg>',
        chat: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>',
        close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
        qr: '<svg viewBox="0 0 24 24"><path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/></svg>',
        send: '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
        minimize: '<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>',
        spark: '<svg viewBox="0 0 24 24"><path d="M12 2l.324 6.162 4.243-4.243-1.743 5.82L19.5 7.5l-4.676 4.324L21 12l-6.176.324 4.243 4.243-5.82-1.743L15.5 19.5l-4.324-4.676L12 21l-.324-6.176-4.243 4.243 1.743-5.82L4.5 15.5l4.676-4.324L3 12l6.176-.324-4.243-4.243 5.82 1.743L8.5 4.5l4.324 4.676z"/></svg>'
    };

    // Service menu items
    const services = [
        { id: 'info', name: 'Information', icon: 'ℹ️', description: 'General information and FAQs' },
        { id: 'property', name: 'My Properties', icon: '🏠', description: 'Property tax and documents' },
        { id: 'grievance', name: 'Grievance', icon: '📝', description: 'Register complaints' },
        { id: 'schemes', name: 'Schemes', icon: '📋', description: 'Government schemes' },
        { id: 'cfc', name: 'CFC Services', icon: '🏛️', description: 'Citizen facilitation' },
        { id: 'payment', name: 'Payments', icon: '💳', description: 'Online payments' }
    ];

    // Widget HTML structure
    const createWidget = () => {
        const widget = document.createElement('div');
        widget.className = 'pcmc-widget';
        widget.innerHTML = `
            <div class="pcmc-hint">
                <span>👋 Hi! Need help with PCMC services?</span>
            </div>
            
            <div class="pcmc-chat-window">
                <div class="pcmc-chat-header">
                    <div class="pcmc-header-top">
                        <div class="pcmc-header-title">
                            <div class="pcmc-ai-icon">
                                ${icons.ai}
                                <span class="pcmc-ai-status"></span>
                            </div>
                            <div class="pcmc-header-text">
                                <h3>PCMC AI Assistant</h3>
                                <p>Always here to help</p>
                            </div>
                        </div>
                        <div class="pcmc-header-actions">
                            <button class="pcmc-header-btn" id="pcmcQrBtn" title="Show QR Code">
                                ${icons.qr}
                            </button>
                            <button class="pcmc-header-btn" id="pcmcMinimizeBtn" title="Minimize">
                                ${icons.minimize}
                            </button>
                        </div>
                    </div>
                    <div class="pcmc-ai-badge">
                        ${icons.spark}
                        <span>AI-Powered Assistant</span>
                    </div>
                </div>
                
                <div class="pcmc-chat-messages" id="pcmcMessages">
                    <div class="pcmc-message">
                        <div class="pcmc-message-bubble">
                            👋 Welcome to PCMC Digital Services! I'm your AI assistant. How can I help you today?
                        </div>
                    </div>
                </div>
                
                <div class="pcmc-services" id="pcmcServices">
                    ${services.map(service => `
                        <button class="pcmc-service-btn" data-service="${service.id}">
                            <span class="pcmc-service-icon">${service.icon}</span>
                            <span class="pcmc-service-name">${service.name}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="pcmc-chat-input">
                    <div class="pcmc-input-wrapper">
                        <input type="text" class="pcmc-input-field" placeholder="Type your message..." id="pcmcInput">
                        <button class="pcmc-send-btn" id="pcmcSendBtn">
                            ${icons.send}
                        </button>
                    </div>
                </div>
                
                <div class="pcmc-qr-modal" id="pcmcQrModal">
                    <button class="pcmc-qr-close" id="pcmcQrClose">
                        ${icons.close}
                    </button>
                    <div class="pcmc-qr-content">
                        <div class="pcmc-qr-image">
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDBoMTA0djEwNEgweiIvPjxwYXRoIGQ9Ik0xNTIgMGgxMDR2MTA0SDE1MnoiLz48cGF0aCBkPSJNMCAxNTJoMTA0djEwNEgweiIvPjxwYXRoIGQ9Ik0yNCAxNzZoNTZ2NTZIMjR6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTI0IDI0aDU2djU2SDI0eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNzYgMjRoNTZ2NTZoLTU2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNTIgMTUyaDMydjMyaC0zMnpNMTg0IDE1Mmg3MnY3MmgtNzJ6Ii8+PC9zdmc+" alt="QR Code">
                        </div>
                        <h3 class="pcmc-qr-title">Scan to Connect on WhatsApp</h3>
                        <p class="pcmc-qr-desc">Scan this QR code with your phone to continue the conversation on WhatsApp</p>
                        <button class="pcmc-qr-button" onclick="window.open('https://wa.me/${PCMC_CONFIG.whatsappNumber}', '_blank')">
                            Open WhatsApp
                        </button>
                    </div>
                </div>
            </div>
            
            <button class="pcmc-float-btn" id="pcmcFloatBtn">
                ${icons.chat}
                <span class="pcmc-pulse">1</span>
            </button>
        `;
        return widget;
    };

    // Initialize widget
    const init = () => {
        // Inject styles
        injectStyles();
        
        // Create and append widget
        const widget = createWidget();
        document.body.appendChild(widget);
        
        // Get elements
        const floatBtn = document.getElementById('pcmcFloatBtn');
        const chatWindow = widget.querySelector('.pcmc-chat-window');
        const minimizeBtn = document.getElementById('pcmcMinimizeBtn');
        const qrBtn = document.getElementById('pcmcQrBtn');
        const qrModal = document.getElementById('pcmcQrModal');
        const qrClose = document.getElementById('pcmcQrClose');
        const input = document.getElementById('pcmcInput');
        const sendBtn = document.getElementById('pcmcSendBtn');
        const messagesDiv = document.getElementById('pcmcMessages');
        const servicesDiv = document.getElementById('pcmcServices');
        const hint = widget.querySelector('.pcmc-hint');
        const pulse = widget.querySelector('.pcmc-pulse');
        
        let isOpen = false;
        let isFirstTime = !localStorage.getItem('pcmc_visited');
        
        // Toggle chat window
        const toggleChat = () => {
            isOpen = !isOpen;
            if (isOpen) {
                chatWindow.classList.add('active');
                floatBtn.classList.add('active');
                hint.classList.remove('show');
                pulse.style.display = 'none';
                input.focus();
                
                if (isFirstTime) {
                    localStorage.setItem('pcmc_visited', 'true');
                    isFirstTime = false;
                }
            } else {
                chatWindow.classList.remove('active');
                floatBtn.classList.remove('active');
            }
        };
        
        // Event listeners
        floatBtn.addEventListener('click', toggleChat);
        minimizeBtn.addEventListener('click', toggleChat);
        
        // QR Code modal
        qrBtn.addEventListener('click', () => {
            qrModal.classList.add('active');
        });
        
        qrClose.addEventListener('click', () => {
            qrModal.classList.remove('active');
        });
        
        // Service buttons
        servicesDiv.addEventListener('click', (e) => {
            const btn = e.target.closest('.pcmc-service-btn');
            if (btn) {
                const service = btn.dataset.service;
                const serviceName = services.find(s => s.id === service)?.name;
                handleServiceClick(serviceName);
            }
        });
        
        // Handle service selection
        const handleServiceClick = (serviceName) => {
            servicesDiv.style.display = 'none';
            addMessage(`I need help with ${serviceName}`, true);
            
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage(`I can help you with ${serviceName}. Please tell me more about what you need.`);
                }, 1500);
            }, 500);
        };
        
        // Add message to chat
        const addMessage = (text, isUser = false) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `pcmc-message ${isUser ? 'user' : ''}`;
            messageDiv.innerHTML = `
                <div class="pcmc-message-bubble">${text}</div>
            `;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        };
        
        // Show typing indicator
        const showTyping = () => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'pcmc-message';
            typingDiv.id = 'pcmcTyping';
            typingDiv.innerHTML = `
                <div class="pcmc-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        };
        
        // Remove typing indicator
        const removeTyping = () => {
            const typing = document.getElementById('pcmcTyping');
            if (typing) typing.remove();
        };
        
        // Send message
        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                if (servicesDiv.style.display !== 'none') {
                    servicesDiv.style.display = 'none';
                }
                
                addMessage(message, true);
                input.value = '';
                
                setTimeout(() => {
                    showTyping();
                    setTimeout(() => {
                        removeTyping();
                        addMessage('Thank you for your message. For immediate assistance, you can also connect with us on WhatsApp.');
                    }, 2000);
                }, 500);
            }
        };
        
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Show hint after delay
        setTimeout(() => {
            if (!isOpen && isFirstTime) {
                hint.classList.add('show');
                setTimeout(() => {
                    hint.classList.remove('show');
                }, 5000);
            }
        }, 3000);
        
        // Auto-open for new visitors
        if (isFirstTime) {
            setTimeout(() => {
                if (!isOpen) {
                    toggleChat();
                }
            }, 5000);
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Public API
    window.PCMCChat = {
        open: () => {
            const btn = document.getElementById('pcmcFloatBtn');
            if (btn && !document.querySelector('.pcmc-chat-window.active')) {
                btn.click();
            }
        },
        close: () => {
            const chatWindow = document.querySelector('.pcmc-chat-window');
            if (chatWindow && chatWindow.classList.contains('active')) {
                chatWindow.classList.remove('active');
                document.getElementById('pcmcFloatBtn').classList.remove('active');
            }
        },
        version: PCMC_CONFIG.version
    };
    
})(window, document);
