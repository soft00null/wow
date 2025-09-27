/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget-final.js
 * Version: 6.0.0 - WhatsApp-Style Government AI Assistant
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dcp-widget.js
 * 
 * Professional Government AI Chatbot with WhatsApp UI
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCPWidget) {
        console.warn('DCP Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi',
        organization: {
            name: 'Divisional Commissioner Pune',
            nameMarathi: 'विभागीय आयुक्त पुणे',
            greeting: "Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services. How can I support you today?"
        },
        position: 'bottom-right',
        autoShow: true,
        showDelay: 1500,
        colors: {
            whatsappGreen: '#25D366',
            whatsappDarkGreen: '#075E54',
            whatsappLight: '#DCF8C6',
            buttonBorder: '#8B5CF6',
            buttonText: '#6366F1',
            white: '#FFFFFF',
            text: '#303030',
            lightGray: '#F0F0F0',
            gray: '#8E8E93',
            transparentWhite: 'rgba(255, 255, 255, 0.92)',
            transparentOverlay: 'rgba(242, 242, 247, 0.85)',
            shadow: 'rgba(0, 0, 0, 0.12)'
        },
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Utility functions
    const utils = {
        generateQRCode: (text) => {
            const qrSize = 180;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}&bgcolor=FFFFFF&color=6366F1&margin=0`;
            return qrUrl;
        },
        
        isMobile: () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        
        const widgetHTML = `
            <!-- Main Widget Container -->
            <div class="dcp-widget-container" style="position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                
                <!-- WhatsApp Floating Button -->
                <button class="dcp-whatsapp-btn" id="dcpWhatsappBtn" onclick="toggleDCPWidget()" style="width:60px;height:60px;background:${config.colors.whatsappGreen};border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:all 0.3s ease;position:relative;border:none;outline:none">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <!-- AI Badge -->
                    <div class="dcp-ai-indicator" style="position:absolute;top:-3px;right:-3px;background:#FF3B30;color:white;border-radius:50%;width:20px;height:20px;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid white;animation:aiBadgePulse 2s infinite">
                        AI
                    </div>
                </button>
                
                <!-- Chat Popup Window -->
                <div class="dcp-chat-popup" id="dcpChatPopup" style="position:absolute;bottom:80px;right:0;width:360px;background:${config.colors.transparentWhite};backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:16px;box-shadow:0 8px 32px ${config.colors.shadow};opacity:0;visibility:hidden;transform:scale(0.9) translateY(20px);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);pointer-events:none;overflow:hidden">
                    
                    <!-- Chat Header -->
                    <div style="background:linear-gradient(135deg, ${config.colors.whatsappGreen} 0%, ${config.colors.whatsappDarkGreen} 100%);padding:16px;position:relative">
                        <button onclick="toggleDCPWidget()" style="position:absolute;top:12px;right:12px;width:24px;height:24px;background:transparent;border:none;color:white;font-size:20px;cursor:pointer;opacity:0.8;transition:opacity 0.2s" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">×</button>
                        
                        <div style="display:flex;align-items:center;gap:12px">
                            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center">
                                <span style="font-size:20px">🏛️</span>
                            </div>
                            <div style="flex:1">
                                <div style="color:white;font-weight:600;font-size:14px">
                                    ${config.organization.nameMarathi}
                                </div>
                                <div style="color:rgba(255,255,255,0.9);font-size:12px;display:flex;align-items:center;gap:4px">
                                    <span style="width:6px;height:6px;background:#4FCE5D;border-radius:50%;display:inline-block"></span>
                                    AI Assistant Active
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Welcome Message -->
                    <div style="padding:12px;background:${config.colors.transparentOverlay};backdrop-filter:blur(8px)">
                        <div style="background:white;border-radius:12px 12px 4px 12px;padding:12px;box-shadow:0 1px 2px rgba(0,0,0,0.08);position:relative">
                            <div style="display:flex;gap:6px;align-items:flex-start">
                                <span style="font-size:16px">🏛️💜</span>
                                <div style="flex:1;font-size:13px;color:${config.colors.text};line-height:1.5">
                                    ${config.organization.greeting}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Menu Buttons Container -->
                    <div style="padding:12px;background:${config.colors.transparentOverlay};backdrop-filter:blur(8px);display:flex;flex-direction:column;gap:8px">
                        
                        <!-- Administrative Button -->
                        <button onclick="sendDCPMessage('I need help with Administrative services')" style="width:100%;padding:12px 16px;background:white;border:1.5px solid ${config.colors.buttonBorder};border-radius:24px;color:${config.colors.buttonText};font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s ease;outline:none;text-align:center" onmouseover="this.style.background='#F5F3FF';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                            Administrative
                        </button>
                        
                        <!-- Departments Button -->
                        <button onclick="sendDCPMessage('Show me all government departments')" style="width:100%;padding:12px 16px;background:white;border:1.5px solid ${config.colors.buttonBorder};border-radius:24px;color:${config.colors.buttonText};font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s ease;outline:none;text-align:center" onmouseover="this.style.background='#F5F3FF';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                            Departments
                        </button>
                        
                        <!-- Schemes Button -->
                        <button onclick="sendDCPMessage('Tell me about government schemes')" style="width:100%;padding:12px 16px;background:white;border:1.5px solid ${config.colors.buttonBorder};border-radius:24px;color:${config.colors.buttonText};font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s ease;outline:none;text-align:center" onmouseover="this.style.background='#F5F3FF';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                            Schemes
                        </button>
                        
                        <!-- Contact Button -->
                        <button onclick="sendDCPMessage('I need contact information')" style="width:100%;padding:12px 16px;background:white;border:1.5px solid ${config.colors.buttonBorder};border-radius:24px;color:${config.colors.buttonText};font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s ease;outline:none;text-align:center" onmouseover="this.style.background='#F5F3FF';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                            Contact
                        </button>
                        
                        <!-- Get Help Button -->
                        <button onclick="sendDCPMessage('I have a general query')" style="width:100%;padding:12px 16px;background:white;border:1.5px solid ${config.colors.buttonBorder};border-radius:24px;color:${config.colors.buttonText};font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s ease;outline:none;text-align:center" onmouseover="this.style.background='#F5F3FF';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                            Get Help
                        </button>
                    </div>
                    
                    <!-- Show/Hide QR Toggle -->
                    <div style="padding:8px 12px;background:${config.colors.transparentOverlay};backdrop-filter:blur(8px);text-align:center;border-bottom:1px solid rgba(0,0,0,0.06)">
                        <button onclick="toggleDCPQR()" id="qrToggleBtn" style="color:${config.colors.buttonText};background:none;border:none;font-size:12px;font-weight:500;cursor:pointer;padding:4px 8px;transition:all 0.2s ease;outline:none" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                            Show QR
                        </button>
                    </div>
                    
                    <!-- QR Code Section -->
                    <div id="dcpQRSection" style="display:none;padding:16px;background:white;text-align:center;border-top:1px solid rgba(0,0,0,0.06)">
                        <div style="font-size:12px;font-weight:600;color:${config.colors.buttonText};margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">
                            SCAN TO START
                        </div>
                        <div style="display:inline-block;padding:8px;border:1px solid ${config.colors.lightGray};border-radius:12px;background:white">
                            <img src="${utils.generateQRCode(whatsappUrl)}" alt="WhatsApp QR" style="width:150px;height:150px;display:block">
                        </div>
                        <div style="font-size:11px;color:${config.colors.gray};margin-top:8px">
                            Open on your phone
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding:10px;background:rgba(250,250,250,0.9);text-align:center;border-radius:0 0 16px 16px">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:${config.colors.gray};text-decoration:none;font-size:11px;display:inline-flex;align-items:center;gap:4px;transition:color 0.2s" onmouseover="this.style.color='${config.colors.buttonText}'" onmouseout="this.style.color='${config.colors.gray}'">
                            Powered by ${config.poweredBy.text} ↗
                        </a>
                    </div>
                </div>
                
                <!-- Notification Bubble -->
                <div class="dcp-notification-bubble" id="dcpNotificationBubble" style="position:absolute;bottom:80px;right:0;background:white;padding:12px 16px;border-radius:12px;font-size:13px;color:${config.colors.text};box-shadow:0 4px 12px ${config.colors.shadow};opacity:0;visibility:hidden;transform:translateY(10px) scale(0.9);transition:all 0.3s ease;max-width:250px;pointer-events:none">
                    <div style="position:absolute;bottom:-4px;right:24px;width:8px;height:8px;background:white;transform:rotate(45deg)"></div>
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="animation:handWave 1s ease-in-out 2">👋</span>
                        <span>Need help? Chat with AI Assistant!</span>
                    </div>
                </div>
            </div>
            
            <!-- Styles -->
            <style>
                @keyframes aiBadgePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes handWave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-20deg); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .dcp-whatsapp-btn {
                    animation: fadeInUp 0.5s ease;
                }
                
                .dcp-whatsapp-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
                }
                
                .dcp-whatsapp-btn:active {
                    transform: scale(0.95);
                }
                
                .dcp-chat-popup.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: scale(1) translateY(0) !important;
                    pointer-events: auto !important;
                }
                
                .dcp-notification-bubble.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) scale(1) !important;
                }
                
                /* Smooth animations */
                .dcp-chat-popup * {
                    transition: all 0.2s ease;
                }
                
                /* Mobile responsive */
                @media (max-width: 480px) {
                    .dcp-chat-popup {
                        width: calc(100vw - 32px) !important;
                        right: -6px !important;
                        bottom: 70px !important;
                    }
                    
                    .dcp-whatsapp-btn {
                        width: 54px !important;
                        height: 54px !important;
                    }
                    
                    .dcp-whatsapp-btn svg {
                        width: 24px !important;
                        height: 24px !important;
                    }
                }
                
                @media print {
                    .dcp-widget-container {
                        display: none !important;
                    }
                }
                
                /* Accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .dcp-widget-container * {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            </style>
        `;
        
        return widgetHTML;
    };
    
    // Initialize widget
    const initWidget = () => {
        try {
            // Create container
            let container = document.getElementById('dcp-whatsapp-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dcp-whatsapp-widget';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Auto-show features
            if (config.autoShow) {
                // Show notification bubble
                setTimeout(() => {
                    const bubble = document.getElementById('dcpNotificationBubble');
                    if (bubble) {
                        bubble.classList.add('active');
                        
                        // Hide after 5 seconds
                        setTimeout(() => {
                            bubble.classList.remove('active');
                        }, 5000);
                    }
                }, config.showDelay);
                
                // Auto-open popup for first-time visitors
                setTimeout(() => {
                    const hasVisited = sessionStorage.getItem('dcp_widget_shown');
                    if (!hasVisited) {
                        toggleDCPWidget();
                        sessionStorage.setItem('dcp_widget_shown', 'true');
                    }
                }, config.showDelay + 2000);
            }
            
            console.log('✅ DCP WhatsApp Widget v6.0.0 initialized');
            console.log('🤖 AI-Powered Government Assistant Active');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Toggle chat popup
    window.toggleDCPWidget = function() {
        const popup = document.getElementById('dcpChatPopup');
        const bubble = document.getElementById('dcpNotificationBubble');
        
        if (popup) {
            const isActive = popup.classList.contains('active');
            
            if (isActive) {
                popup.classList.remove('active');
            } else {
                popup.classList.add('active');
                // Hide notification when opening
                if (bubble) {
                    bubble.classList.remove('active');
                }
            }
        }
    };
    
    // Toggle QR code
    window.toggleDCPQR = function() {
        const qrSection = document.getElementById('dcpQRSection');
        const toggleBtn = document.getElementById('qrToggleBtn');
        
        if (qrSection && toggleBtn) {
            if (qrSection.style.display === 'none') {
                qrSection.style.display = 'block';
                toggleBtn.textContent = 'Hide QR';
            } else {
                qrSection.style.display = 'none';
                toggleBtn.textContent = 'Show QR';
            }
        }
    };
    
    // Send message to WhatsApp
    window.sendDCPMessage = function(message) {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
        if (utils.isMobile()) {
            window.location.href = whatsappUrl;
        } else {
            window.open(whatsappUrl, '_blank');
        }
    };
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('dcpChatPopup');
        const btn = document.getElementById('dcpWhatsappBtn');
        
        if (popup && btn && !popup.contains(e.target) && !btn.contains(e.target)) {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('dcpChatPopup');
            if (popup && popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        }
    });
    
    // Public API
    window.DCPWidget = {
        version: '6.0.0',
        open: () => {
            const popup = document.getElementById('dcpChatPopup');
            if (popup && !popup.classList.contains('active')) {
                popup.classList.add('active');
            }
        },
        close: () => {
            const popup = document.getElementById('dcpChatPopup');
            if (popup && popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        },
        toggle: () => toggleDCPWidget()
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
