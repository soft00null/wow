/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget-v5.js
 * Version: 5.0.0 - Professional Government AI Assistant
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dcp-widget.js
 * 
 * Professional Government AI Chatbot with Transparent UI
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
            tagline: 'AI-Powered Government Assistant',
            taglineMarathi: 'AI-संचालित शासकीय सहाय्यक'
        },
        position: 'bottom-right',
        autoShow: true,
        showDelay: 2000,
        colors: {
            primary: '#5E5CE6',      // Professional purple (like reference)
            secondary: '#7C7CFF',    // Lighter purple
            success: '#34C759',      // WhatsApp green
            white: '#FFFFFF',
            text: '#1C1C1E',
            lightText: '#8E8E93',
            border: '#E5E5EA',
            transparentBg: 'rgba(255, 255, 255, 0.95)',
            glassBg: 'rgba(255, 255, 255, 0.85)',
            shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Utility functions
    const utils = {
        getCurrentISTTime: () => {
            try {
                const now = new Date();
                return new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
            } catch (error) {
                return new Date();
            }
        },
        
        isOfficeHours: () => {
            try {
                const now = utils.getCurrentISTTime();
                const day = now.getDay();
                const hour = now.getHours();
                const minute = now.getMinutes();
                const currentTime = hour * 100 + minute;
                
                // Government office hours: Mon-Fri 10:00-17:30, Sat 10:00-14:00
                if (day === 0) return false; // Sunday closed
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1730; // Mon-Fri
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400; // Saturday
                
                return false;
            } catch (error) {
                return true;
            }
        },
        
        generateQRCode: (text) => {
            const qrSize = 200;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}&bgcolor=FFFFFF&color=5E5CE6&margin=1`;
            return qrUrl;
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        
        const widgetHTML = `
            <!-- Main Container -->
            <div class="dcp-widget" style="position:fixed;bottom:24px;right:24px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
                
                <!-- Floating Action Button -->
                <button class="dcp-fab" id="dcpFab" onclick="toggleDCPChat()" style="width:65px;height:65px;background:${config.colors.primary};border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px ${config.colors.shadowColor}, 0 8px 24px rgba(94, 92, 230, 0.25);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none;overflow:visible">
                    <div class="dcp-fab-icon" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style="transition:transform 0.3s ease">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.61 13.61c-.24.67-.94 1.24-1.54 1.4-.39.1-1 .19-2.91-.62-2.43-.99-3.98-3.46-4.1-3.62-.12-.15-1-1.33-1-2.54 0-1.21.63-1.8.85-2.05.23-.24.49-.3.65-.3h.47c.15 0 .36-.06.56.43.24.54.76 1.86.83 2 .07.13.12.3.02.48-.1.19-.15.3-.3.47-.15.16-.31.35-.44.47-.14.13-.29.27-.12.53.17.25.74 1.22 1.58 1.97 1.09.97 2 1.27 2.28 1.41.28.14.45.12.61-.07.17-.2.7-.82.89-1.1.19-.28.38-.23.63-.14.26.1 1.62.77 1.9.91.28.14.47.21.54.33.07.12.07.69-.17 1.36z"/>
                        </svg>
                    </div>
                    <div class="dcp-ai-badge" style="position:absolute;top:-2px;right:-2px;background:#FF3B30;color:white;border-radius:10px;padding:2px 6px;font-size:9px;font-weight:700;display:flex;align-items:center;gap:2px;animation:aiPulse 2s infinite;box-shadow:0 2px 6px rgba(255,59,48,0.4);border:1.5px solid white;text-transform:uppercase;letter-spacing:0.5px">
                        AI
                    </div>
                    <div class="dcp-ripple" style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:65px;height:65px;border-radius:50%;background:${config.colors.primary};opacity:0.3;animation:rippleEffect 3s infinite"></div>
                </button>
                
                <!-- Chat Window with Transparent Background -->
                <div class="dcp-chat" id="dcpChat" style="position:absolute;bottom:85px;right:0;width:380px;max-width:calc(100vw - 48px);background:${config.colors.transparentBg};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;box-shadow:0 10px 40px ${config.colors.shadowColor}, 0 0 0 1px rgba(0,0,0,0.05);transform:translateY(20px) scale(0.95);opacity:0;visibility:hidden;pointer-events:none;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);overflow:hidden;display:flex;flex-direction:column">
                    
                    <!-- Header with Glass Effect -->
                    <div class="dcp-header" style="background:linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);padding:20px;position:relative;color:white;border-radius:24px 24px 0 0">
                        <!-- Close Button -->
                        <button onclick="toggleDCPChat()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:16px;font-weight:300;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;outline:none" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">×</button>
                        
                        <!-- Header Content -->
                        <div style="display:flex;align-items:center;gap:12px">
                            <div style="width:44px;height:44px;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:1px solid rgba(255,255,255,0.25)">
                                🏛️
                            </div>
                            <div style="flex:1">
                                <div style="font-size:16px;font-weight:600;margin-bottom:2px;display:flex;align-items:center;gap:6px">
                                    ${config.organization.nameMarathi}
                                    <span style="width:8px;height:8px;background:#34C759;border-radius:50%;display:inline-block;animation:pulse 2s infinite"></span>
                                </div>
                                <div style="font-size:12px;opacity:0.9">
                                    AI Assistant • Always Active
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Welcome Message with Semi-Transparent Background -->
                    <div class="dcp-welcome" style="padding:16px;background:${config.colors.glassBg};backdrop-filter:blur(10px);border-bottom:1px solid ${config.colors.border}">
                        <div style="background:white;border-radius:16px 16px 4px 16px;padding:14px;position:relative;box-shadow:0 2px 8px ${config.colors.shadowColor}">
                            <div style="display:flex;gap:8px;margin-bottom:8px">
                                <span style="font-size:18px">👋</span>
                                <span style="font-size:18px">💜</span>
                            </div>
                            <div style="font-size:14px;color:${config.colors.text};line-height:1.6;font-weight:500">
                                Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services and information. How can I support you today?
                            </div>
                        </div>
                    </div>
                    
                    <!-- Government Service Menu Options -->
                    <div class="dcp-menu" style="padding:16px;display:flex;flex-direction:column;gap:8px;max-height:300px;overflow-y:auto;background:${config.colors.glassBg};backdrop-filter:blur(10px)">
                        
                        <!-- Administrative Services -->
                        <button onclick="sendQuickMessage('I need help with Administrative services')" class="dcp-menu-btn" style="width:100%;padding:14px 16px;background:white;border:2px solid ${config.colors.border};border-radius:24px;cursor:pointer;transition:all 0.3s ease;text-align:center;font-size:15px;font-weight:500;color:${config.colors.primary};outline:none;display:block;box-shadow:0 1px 3px ${config.colors.shadowColor}" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F7F7FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(94,92,230,0.2)'" onmouseout="this.style.borderColor='${config.colors.border}';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowColor}'">
                            Administrative Services
                        </button>
                        
                        <!-- Departments -->
                        <button onclick="sendQuickMessage('Show me all government departments')" class="dcp-menu-btn" style="width:100%;padding:14px 16px;background:white;border:2px solid ${config.colors.border};border-radius:24px;cursor:pointer;transition:all 0.3s ease;text-align:center;font-size:15px;font-weight:500;color:${config.colors.primary};outline:none;display:block;box-shadow:0 1px 3px ${config.colors.shadowColor}" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F7F7FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(94,92,230,0.2)'" onmouseout="this.style.borderColor='${config.colors.border}';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowColor}'">
                            Departments
                        </button>
                        
                        <!-- Government Schemes -->
                        <button onclick="sendQuickMessage('Tell me about government schemes')" class="dcp-menu-btn" style="width:100%;padding:14px 16px;background:white;border:2px solid ${config.colors.border};border-radius:24px;cursor:pointer;transition:all 0.3s ease;text-align:center;font-size:15px;font-weight:500;color:${config.colors.primary};outline:none;display:block;box-shadow:0 1px 3px ${config.colors.shadowColor}" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F7F7FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(94,92,230,0.2)'" onmouseout="this.style.borderColor='${config.colors.border}';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowColor}'">
                            Government Schemes
                        </button>
                        
                        <!-- Contact Information -->
                        <button onclick="sendQuickMessage('I need contact information')" class="dcp-menu-btn" style="width:100%;padding:14px 16px;background:white;border:2px solid ${config.colors.border};border-radius:24px;cursor:pointer;transition:all 0.3s ease;text-align:center;font-size:15px;font-weight:500;color:${config.colors.primary};outline:none;display:block;box-shadow:0 1px 3px ${config.colors.shadowColor}" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F7F7FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(94,92,230,0.2)'" onmouseout="this.style.borderColor='${config.colors.border}';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowColor}'">
                            Contact Us
                        </button>
                        
                        <!-- Document Status -->
                        <button onclick="sendQuickMessage('Check my document or application status')" class="dcp-menu-btn" style="width:100%;padding:14px 16px;background:white;border:2px solid ${config.colors.border};border-radius:24px;cursor:pointer;transition:all 0.3s ease;text-align:center;font-size:15px;font-weight:500;color:${config.colors.primary};outline:none;display:block;box-shadow:0 1px 3px ${config.colors.shadowColor}" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F7F7FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(94,92,230,0.2)'" onmouseout="this.style.borderColor='${config.colors.border}';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowColor}'">
                            Document Status
                        </button>
                        
                        <!-- Other Query -->
                        <button onclick="sendQuickMessage('I have a different question')" class="dcp-menu-btn" style="width:100%;padding:14px 16px;background:white;border:2px solid ${config.colors.border};border-radius:24px;cursor:pointer;transition:all 0.3s ease;text-align:center;font-size:15px;font-weight:500;color:${config.colors.primary};outline:none;display:block;box-shadow:0 1px 3px ${config.colors.shadowColor}" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F7F7FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(94,92,230,0.2)'" onmouseout="this.style.borderColor='${config.colors.border}';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowColor}'">
                            Other Queries
                        </button>
                    </div>
                    
                    <!-- QR Code Section Toggle -->
                    <div style="padding:0 16px 16px;background:${config.colors.glassBg};backdrop-filter:blur(10px);text-align:center">
                        <button onclick="toggleQRCode()" style="color:${config.colors.primary};background:none;border:none;font-size:13px;font-weight:500;cursor:pointer;padding:8px;transition:all 0.3s ease;outline:none" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                            Show QR Code
                        </button>
                    </div>
                    
                    <!-- QR Code Section (Initially Hidden) -->
                    <div class="dcp-qr-section" id="dcpQRSection" style="padding:16px;background:white;border-top:1px solid ${config.colors.border};display:none">
                        <div style="text-align:center">
                            <div style="font-size:13px;font-weight:600;color:${config.colors.primary};margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">
                                Scan to Start
                            </div>
                            <div style="display:inline-block;padding:12px;background:white;border:2px solid ${config.colors.border};border-radius:16px">
                                <img src="${utils.generateQRCode(whatsappUrl)}" alt="QR Code" style="width:160px;height:160px;display:block">
                            </div>
                            <div style="font-size:11px;color:${config.colors.lightText};margin-top:8px">
                                Open WhatsApp on your phone
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer with Powered By -->
                    <div style="padding:12px 16px;background:rgba(248,248,248,0.8);backdrop-filter:blur(10px);border-top:1px solid ${config.colors.border};text-align:center;border-radius:0 0 24px 24px">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:${config.colors.lightText};text-decoration:none;font-size:11px;transition:color 0.3s ease;display:inline-flex;align-items:center;gap:4px;font-weight:500" onmouseover="this.style.color='${config.colors.primary}'" onmouseout="this.style.color='${config.colors.lightText}'">
                            Powered by ${config.poweredBy.text} ↗
                        </a>
                    </div>
                </div>
                
                <!-- Notification Popup (Shows after delay) -->
                <div class="dcp-notification" id="dcpNotification" style="position:absolute;bottom:85px;right:0;background:white;padding:14px 16px;border-radius:16px;font-size:14px;font-weight:500;color:${config.colors.text};opacity:0;visibility:hidden;transform:translateY(10px);transition:all 0.4s ease;white-space:nowrap;box-shadow:0 4px 12px ${config.colors.shadowColor}, 0 0 0 1px rgba(0,0,0,0.05);max-width:280px;pointer-events:none">
                    <div style="position:absolute;bottom:-5px;right:28px;width:10px;height:10px;background:white;transform:rotate(45deg);box-shadow:2px 2px 4px rgba(0,0,0,0.05)"></div>
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-size:16px;animation:wave 1s ease-in-out infinite">👋</span>
                        <span>AI Assistant is ready to help!</span>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes aiPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes rippleEffect {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2.5);
                        opacity: 0;
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-20deg); }
                }
                
                @keyframes slideInUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .dcp-fab {
                    animation: fadeIn 0.6s ease;
                }
                
                .dcp-fab:hover {
                    transform: scale(1.1) !important;
                    box-shadow: 0 6px 20px rgba(94, 92, 230, 0.35), 0 12px 32px rgba(94, 92, 230, 0.25) !important;
                }
                
                .dcp-fab:active {
                    transform: scale(0.95) !important;
                }
                
                .dcp-chat.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) scale(1) !important;
                    pointer-events: auto !important;
                }
                
                .dcp-notification.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) !important;
                }
                
                /* Custom Scrollbar */
                .dcp-menu::-webkit-scrollbar {
                    width: 4px;
                }
                
                .dcp-menu::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .dcp-menu::-webkit-scrollbar-thumb {
                    background: ${config.colors.border};
                    border-radius: 2px;
                }
                
                .dcp-menu::-webkit-scrollbar-thumb:hover {
                    background: ${config.colors.lightText};
                }
                
                @media (max-width: 480px) {
                    .dcp-chat {
                        width: calc(100vw - 24px) !important;
                        right: -12px !important;
                        bottom: 75px !important;
                    }
                    
                    .dcp-fab {
                        width: 56px !important;
                        height: 56px !important;
                    }
                    
                    .dcp-fab svg {
                        width: 26px !important;
                        height: 26px !important;
                    }
                    
                    .dcp-ripple {
                        width: 56px !important;
                        height: 56px !important;
                    }
                }
                
                @media print {
                    .dcp-widget {
                        display: none !important;
                    }
                }
                
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
            
            // Auto-show notification after delay
            if (config.autoShow) {
                setTimeout(() => {
                    showNotification();
                }, config.showDelay);
                
                // Auto-open chat on first visit
                setTimeout(() => {
                    const hasVisited = localStorage.getItem('dcp_visited');
                    if (!hasVisited) {
                        toggleDCPChat();
                        localStorage.setItem('dcp_visited', 'true');
                    }
                }, config.showDelay + 3000);
            }
            
            // Add entrance animation
            setTimeout(() => {
                const fab = document.querySelector('.dcp-fab');
                if (fab) {
                    fab.style.animation = 'aiPulse 2s ease-in-out 3';
                }
            }, 500);
            
            console.log('🚀 DCP WhatsApp Widget v5.0.0 initialized');
            console.log('🤖 AI-Powered Government Assistant Ready');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DCP Widget initialization failed:', error);
        }
    };
    
    // Toggle chat window
    window.toggleDCPChat = function() {
        try {
            const chat = document.getElementById('dcpChat');
            const notification = document.getElementById('dcpNotification');
            if (!chat) return;
            
            const isActive = chat.classList.contains('active');
            
            if (isActive) {
                chat.classList.remove('active');
            } else {
                chat.classList.add('active');
                // Hide notification when chat opens
                if (notification) {
                    notification.classList.remove('active');
                }
                // Hide AI badge
                const badge = document.querySelector('.dcp-ai-badge');
                if (badge) {
                    setTimeout(() => {
                        badge.style.display = 'none';
                    }, 300);
                }
            }
        } catch (error) {
            console.error('Toggle chat failed:', error);
        }
    };
    
    // Show notification
    function showNotification() {
        const notification = document.getElementById('dcpNotification');
        if (notification) {
            notification.classList.add('active');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                notification.classList.remove('active');
            }, 5000);
        }
    }
    
    // Toggle QR code visibility
    window.toggleQRCode = function() {
        const qrSection = document.getElementById('dcpQRSection');
        const button = event.target;
        if (qrSection) {
            if (qrSection.style.display === 'none') {
                qrSection.style.display = 'block';
                button.textContent = 'Hide QR Code';
            } else {
                qrSection.style.display = 'none';
                button.textContent = 'Show QR Code';
            }
        }
    };
    
    // Send quick message
    window.sendQuickMessage = function(message) {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        try {
            const chat = document.getElementById('dcpChat');
            const fab = document.getElementById('dcpFab');
            
            if (chat && fab && 
                !chat.contains(e.target) && 
                !fab.contains(e.target) && 
                chat.classList.contains('active')) {
                toggleDCPChat();
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const chat = document.getElementById('dcpChat');
            if (chat && chat.classList.contains('active')) {
                toggleDCPChat();
            }
        }
    });
    
    // Public API
    window.DCPWidget = {
        version: '5.0.0',
        config: config,
        open: () => {
            const chat = document.getElementById('dcpChat');
            if (chat && !chat.classList.contains('active')) {
                toggleDCPChat();
            }
        },
        close: () => {
            const chat = document.getElementById('dcpChat');
            if (chat && chat.classList.contains('active')) {
                toggleDCPChat();
            }
        },
        toggle: () => toggleDCPChat(),
        showNotification: () => showNotification()
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
