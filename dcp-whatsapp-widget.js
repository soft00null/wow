/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget-ultimate.js
 * Version: 7.0.0 - Ultimate Professional Government AI Assistant
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dcp-widget.js
 * 
 * Ultimate WhatsApp-Style Government AI Chatbot with Full Transparency
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
            role: 'AI Government Assistant',
            greeting: "Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, documents, and information. How may I assist you today?"
        },
        position: 'bottom-right',
        autoShow: true,
        showDelay: 1000,
        colors: {
            whatsappGreen: '#25D366',
            whatsappDark: '#075E54',
            whatsappLight: '#DCF8C6',
            purple: '#6B66F1',
            purpleLight: '#8B85FF',
            purpleBorder: '#8B5CF6',
            white: '#FFFFFF',
            black: '#000000',
            text: '#303030',
            textLight: '#667781',
            aiRed: '#FF3B30',
            transparent: 'transparent',
            glassWhite: 'rgba(255, 255, 255, 0.75)',
            glassOverlay: 'rgba(248, 249, 250, 0.65)',
            shadowLight: 'rgba(0, 0, 0, 0.08)',
            shadowMedium: 'rgba(0, 0, 0, 0.15)'
        },
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Menu items configuration
    const menuItems = [
        { id: 'administrative', text: 'Administrative Services', message: 'I need help with Administrative services like revenue, land records, and certificates' },
        { id: 'departments', text: 'Departments', message: 'Show me information about government departments' },
        { id: 'schemes', text: 'Government Schemes', message: 'Tell me about government welfare schemes and benefits' },
        { id: 'documents', text: 'Document Status', message: 'I want to check my document or application status' },
        { id: 'contact', text: 'Contact Information', message: 'I need contact information for government offices' },
        { id: 'help', text: 'General Help', message: 'I have a general query about government services' }
    ];
    
    // Utility functions
    const utils = {
        generateQRCode: (text) => {
            const qrSize = 160;
            return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}&bgcolor=FFFFFF&color=6B66F1&margin=0`;
        },
        
        isMobile: () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        createElement: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            Object.entries(attributes).forEach(([key, value]) => {
                if (key === 'style' && typeof value === 'object') {
                    Object.assign(element.style, value);
                } else if (key === 'className') {
                    element.className = value;
                } else if (key.startsWith('on')) {
                    element.addEventListener(key.substring(2).toLowerCase(), value);
                } else {
                    element.setAttribute(key, value);
                }
            });
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
            return element;
        }
    };
    
    // Create widget HTML with ultimate transparency
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        
        const widgetHTML = `
            <!-- Main Widget Container with Full Transparency -->
            <div class="dcp-widget-ultimate" style="position:fixed;bottom:24px;right:24px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif">
                
                <!-- WhatsApp Floating Action Button -->
                <button class="dcp-fab-btn" id="dcpFabBtn" onclick="toggleDCPWidget()" style="width:62px;height:62px;background:${config.colors.whatsappGreen};border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 12px ${config.colors.shadowMedium}, 0 4px 20px rgba(37,211,102,0.25);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none;overflow:visible">
                    <!-- WhatsApp Icon -->
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.1))">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    
                    <!-- AI Badge Indicator -->
                    <div class="dcp-ai-badge" style="position:absolute;top:-4px;right:-4px;background:${config.colors.aiRed};color:white;width:22px;height:22px;border-radius:50%;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(255,59,48,0.4);animation:aiBadgeBounce 2s infinite">
                        AI
                    </div>
                    
                    <!-- Pulse Ring Animation -->
                    <div class="dcp-pulse-ring" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:62px;height:62px;border:2px solid ${config.colors.whatsappGreen};border-radius:50%;opacity:0;animation:pulseRing 3s infinite"></div>
                </button>
                
                <!-- Chat Popup with Ultimate Glass Effect -->
                <div class="dcp-chat-popup" id="dcpChatPopup" style="position:absolute;bottom:85px;right:0;width:370px;background:${config.colors.glassWhite};backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.3);border-radius:20px;box-shadow:0 8px 32px ${config.colors.shadowLight}, 0 0 80px rgba(37,211,102,0.05);opacity:0;visibility:hidden;transform:scale(0.95) translateY(20px);transition:all 0.35s cubic-bezier(0.4,0,0.2,1);pointer-events:none;overflow:hidden">
                    
                    <!-- Header Section -->
                    <div style="background:linear-gradient(135deg, ${config.colors.whatsappGreen} 0%, ${config.colors.whatsappDark} 100%);padding:18px 20px;position:relative">
                        <!-- Close Button -->
                        <button onclick="toggleDCPWidget()" style="position:absolute;top:14px;right:14px;width:26px;height:26px;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);border-radius:50%;color:white;font-size:18px;font-weight:300;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;outline:none" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">×</button>
                        
                        <!-- Header Content -->
                        <div style="display:flex;align-items:center;gap:14px">
                            <div style="width:44px;height:44px;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.2)">
                                <span style="font-size:22px">🏛️</span>
                            </div>
                            <div style="flex:1">
                                <div style="color:white;font-weight:600;font-size:15px;margin-bottom:3px">
                                    ${config.organization.nameMarathi}
                                </div>
                                <div style="color:rgba(255,255,255,0.95);font-size:12px;display:flex;align-items:center;gap:5px">
                                    <span style="width:7px;height:7px;background:#4FCE5D;border-radius:50%;display:inline-block;animation:statusPulse 2s infinite"></span>
                                    ${config.organization.role} • Active Now
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Welcome Message Section -->
                    <div style="padding:14px 16px;background:${config.colors.glassOverlay};backdrop-filter:blur(10px)">
                        <div style="background:white;border-radius:14px 14px 4px 14px;padding:14px;box-shadow:0 1px 3px ${config.colors.shadowLight};position:relative">
                            <div style="display:flex;gap:8px;align-items:flex-start">
                                <span style="font-size:18px">🏛️💜</span>
                                <div style="flex:1;font-size:13px;color:${config.colors.text};line-height:1.6">
                                    ${config.organization.greeting}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Menu Buttons Section with Perfect Sizing -->
                    <div style="padding:0 16px 14px;background:${config.colors.transparent};display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-start">
                        ${menuItems.map(item => `
                            <button onclick="sendDCPMessage('${item.message}')" style="padding:10px 18px;background:white;border:1.5px solid ${config.colors.purpleBorder};border-radius:24px;color:${config.colors.purple};font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s ease;outline:none;white-space:nowrap;box-shadow:0 1px 3px ${config.colors.shadowLight}" onmouseover="this.style.background='#F5F3FF';this.style.transform='translateY(-1px)';this.style.boxShadow='0 3px 8px rgba(139,92,246,0.15)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='0 1px 3px ${config.colors.shadowLight}'">
                                ${item.text}
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- QR Code Toggle Section -->
                    <div style="padding:10px 16px;background:${config.colors.glassOverlay};backdrop-filter:blur(10px);text-align:center;border-top:1px solid rgba(0,0,0,0.06)">
                        <button onclick="toggleDCPQR()" id="dcpQRToggle" style="color:${config.colors.purple};background:none;border:none;font-size:13px;font-weight:500;cursor:pointer;padding:4px 12px;transition:all 0.2s;outline:none" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                            Show QR Code
                        </button>
                    </div>
                    
                    <!-- QR Code Section (Hidden by default) -->
                    <div id="dcpQRSection" style="display:none;padding:16px;background:white;text-align:center;animation:slideDown 0.3s ease">
                        <div style="font-size:12px;font-weight:600;color:${config.colors.purple};margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">
                            SCAN TO START
                        </div>
                        <div style="display:inline-block;padding:10px;background:white;border:1px solid #E5E7EB;border-radius:12px;box-shadow:0 2px 8px ${config.colors.shadowLight}">
                            <img src="${utils.generateQRCode(whatsappUrl)}" alt="WhatsApp QR" style="width:140px;height:140px;display:block">
                        </div>
                        <div style="font-size:11px;color:${config.colors.textLight};margin-top:10px">
                            Open WhatsApp on your phone and scan
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding:12px;background:${config.colors.glassOverlay};backdrop-filter:blur(10px);text-align:center;border-radius:0 0 20px 20px">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:${config.colors.textLight};text-decoration:none;font-size:11px;display:inline-flex;align-items:center;gap:5px;transition:color 0.2s" onmouseover="this.style.color='${config.colors.purple}'" onmouseout="this.style.color='${config.colors.textLight}'">
                            Powered by ${config.poweredBy.text} ↗
                        </a>
                    </div>
                </div>
                
                <!-- Notification Bubble -->
                <div class="dcp-notification" id="dcpNotification" style="position:absolute;bottom:85px;right:0;background:white;padding:12px 16px;border-radius:14px;font-size:13px;color:${config.colors.text};box-shadow:0 4px 16px ${config.colors.shadowMedium};opacity:0;visibility:hidden;transform:translateY(10px) scale(0.95);transition:all 0.3s ease;white-space:nowrap;pointer-events:none;max-width:260px">
                    <div style="position:absolute;bottom:-4px;right:26px;width:8px;height:8px;background:white;transform:rotate(45deg);box-shadow:2px 2px 3px rgba(0,0,0,0.05)"></div>
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-size:16px;animation:wave 1s ease-in-out 2">👋</span>
                        <span>Need help? I'm your AI Assistant!</span>
                    </div>
                </div>
            </div>
            
            <!-- Professional Styles -->
            <style>
                @keyframes aiBadgeBounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
                
                @keyframes pulseRing {
                    0% {
                        opacity: 0.6;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(2.5);
                    }
                }
                
                @keyframes statusPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-20deg); }
                }
                
                @keyframes slideDown {
                    from {
                        max-height: 0;
                        opacity: 0;
                    }
                    to {
                        max-height: 300px;
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Main button animations */
                .dcp-fab-btn {
                    animation: fadeInUp 0.5s ease;
                }
                
                .dcp-fab-btn:hover {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 6px 24px rgba(37,211,102,0.35), 0 12px 32px rgba(37,211,102,0.15);
                }
                
                .dcp-fab-btn:active {
                    transform: scale(0.95);
                }
                
                /* Chat popup states */
                .dcp-chat-popup.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: scale(1) translateY(0) !important;
                    pointer-events: auto !important;
                }
                
                .dcp-notification.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) scale(1) !important;
                }
                
                /* Glass morphism enhancement */
                .dcp-chat-popup {
                    background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
                }
                
                /* Smooth transitions */
                .dcp-chat-popup * {
                    transition: all 0.2s ease;
                }
                
                /* Scrollbar styling */
                .dcp-chat-popup::-webkit-scrollbar {
                    width: 4px;
                }
                
                .dcp-chat-popup::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .dcp-chat-popup::-webkit-scrollbar-thumb {
                    background: rgba(139,92,246,0.3);
                    border-radius: 2px;
                }
                
                /* Mobile Responsive */
                @media (max-width: 480px) {
                    .dcp-chat-popup {
                        width: calc(100vw - 32px) !important;
                        right: -8px !important;
                        bottom: 75px !important;
                    }
                    
                    .dcp-fab-btn {
                        width: 56px !important;
                        height: 56px !important;
                    }
                    
                    .dcp-fab-btn svg {
                        width: 26px !important;
                        height: 26px !important;
                    }
                    
                    .dcp-pulse-ring {
                        width: 56px !important;
                        height: 56px !important;
                    }
                }
                
                /* Print styles */
                @media print {
                    .dcp-widget-ultimate {
                        display: none !important;
                    }
                }
                
                /* Accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .dcp-widget-ultimate *,
                    .dcp-widget-ultimate *::before,
                    .dcp-widget-ultimate *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
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
            
            // Auto-show behaviors
            if (config.autoShow) {
                // Show notification
                setTimeout(() => {
                    const notification = document.getElementById('dcpNotification');
                    if (notification) {
                        notification.classList.add('active');
                        
                        // Hide after 4 seconds
                        setTimeout(() => {
                            notification.classList.remove('active');
                        }, 4000);
                    }
                }, config.showDelay);
                
                // Auto-open for new visitors
                setTimeout(() => {
                    const hasVisited = sessionStorage.getItem('dcp_widget_visited');
                    if (!hasVisited) {
                        toggleDCPWidget();
                        sessionStorage.setItem('dcp_widget_visited', 'true');
                    }
                }, config.showDelay + 2000);
            }
            
            console.log('✅ DCP WhatsApp Widget Ultimate v7.0.0 Initialized');
            console.log('🤖 AI-Powered Government Assistant Ready');
            console.log('💜 Full Transparency & Professional UI Active');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Toggle chat popup
    window.toggleDCPWidget = function() {
        const popup = document.getElementById('dcpChatPopup');
        const notification = document.getElementById('dcpNotification');
        const badge = document.querySelector('.dcp-ai-badge');
        
        if (popup) {
            const isActive = popup.classList.contains('active');
            
            if (isActive) {
                popup.classList.remove('active');
                // Show AI badge again
                if (badge) {
                    badge.style.display = 'flex';
                }
            } else {
                popup.classList.add('active');
                // Hide notification
                if (notification) {
                    notification.classList.remove('active');
                }
                // Hide AI badge
                if (badge) {
                    setTimeout(() => {
                        badge.style.display = 'none';
                    }, 300);
                }
            }
        }
    };
    
    // Toggle QR code section
    window.toggleDCPQR = function() {
        const qrSection = document.getElementById('dcpQRSection');
        const toggleBtn = document.getElementById('dcpQRToggle');
        
        if (qrSection && toggleBtn) {
            if (qrSection.style.display === 'none') {
                qrSection.style.display = 'block';
                toggleBtn.textContent = 'Hide QR Code';
            } else {
                qrSection.style.display = 'none';
                toggleBtn.textContent = 'Show QR Code';
            }
        }
    };
    
    // Send message to WhatsApp
    window.sendDCPMessage = function(message) {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
        if (utils.isMobile()) {
            window.location.href = whatsappUrl;
        } else {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('dcpChatPopup');
        const btn = document.getElementById('dcpFabBtn');
        
        if (popup && btn && !popup.contains(e.target) && !btn.contains(e.target)) {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
                // Show AI badge again
                const badge = document.querySelector('.dcp-ai-badge');
                if (badge) {
                    badge.style.display = 'flex';
                }
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('dcpChatPopup');
            if (popup && popup.classList.contains('active')) {
                popup.classList.remove('active');
                const badge = document.querySelector('.dcp-ai-badge');
                if (badge) {
                    badge.style.display = 'flex';
                }
            }
        }
    });
    
    // Public API
    window.DCPWidget = {
        version: '7.0.0',
        open: () => {
            const popup = document.getElementById('dcpChatPopup');
            if (popup && !popup.classList.contains('active')) {
                toggleDCPWidget();
            }
        },
        close: () => {
            const popup = document.getElementById('dcpChatPopup');
            if (popup && popup.classList.contains('active')) {
                toggleDCPWidget();
            }
        },
        toggle: () => toggleDCPWidget(),
        sendMessage: (msg) => sendDCPMessage(msg)
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
