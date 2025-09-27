/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dc-pune-widget.js
 * Version: 4.0.0 - Modern UI/UX Design
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dc-pune-widget.js
 * 
 * Modern Chat Interface with QR Code Integration
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
        defaultMessage: 'Hi',
        organization: {
            name: 'Divisional Commissioner Pune',
            tagline: 'AI-Powered Citizen Services',
            avatar: '🏛️',
            welcomeMessage: "Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, certificates, schemes, or anything you need. How can I support you today?"
        },
        quickActions: [
            { icon: '📋', label: 'Apply for Certificates', action: 'certificates' },
            { icon: '📑', label: 'Check Application Status', action: 'status' },
            { icon: '🏛️', label: 'Government Schemes', action: 'schemes' },
            { icon: '💬', label: 'Get Help', action: 'help' }
        ],
        theme: {
            primaryColor: '#6366f1', // Modern purple/blue gradient base
            secondaryColor: '#818cf8',
            gradientStart: '#6366f1',
            gradientEnd: '#a78bfa',
            buttonColor: '#7c3aed',
            chatBubbleColor: '#ede9fe',
            backgroundColor: '#fafafa'
        },
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // QR Code Generator using modern approach
    const generateQRCode = (data) => {
        // Using qr-server.com API for simplicity
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&color=6366f1&bgcolor=ffffff`;
        return qrApiUrl;
    };
    
    // Modern styled widget HTML
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        const qrCodeUrl = generateQRCode(whatsappUrl);
        
        return `
            <div id="dcPuneWidget" style="position:fixed;bottom:20px;right:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif">
                
                <!-- Floating Action Button -->
                <button id="dcPuneMainBtn" onclick="DCPuneWidget.toggle()" style="width:65px;height:65px;border-radius:50%;background:linear-gradient(135deg,${config.theme.gradientStart},${config.theme.gradientEnd});border:none;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,0.35);transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;position:relative">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.5 13.5c-.25.25-.56.5-.88.5-.16 0-.32-.03-.48-.08-.89-.31-1.76-.73-2.58-1.27-1.44-.95-2.7-2.22-3.65-3.65-.54-.82-.96-1.69-1.27-2.58-.09-.26-.09-.53.01-.78.09-.26.27-.48.51-.62l.87-.5c.17-.1.39-.04.51.13l1.44 2.08c.1.14.09.32-.02.45l-.68 1.01c-.08.12-.07.27.03.38.46.5.95.96 1.44 1.42.49.46.92.98 1.42 1.44.11.1.26.11.38.03l1.01-.68c.13-.11.31-.12.45-.02l2.08 1.44c.17.12.23.34.13.51l-.5.87c-.1.15-.23.29-.39.4z"/>
                    </svg>
                    <div id="dcPuneNotification" style="position:absolute;top:-5px;right:-5px;background:#ef4444;color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;border:2px solid white;animation:pulse 2s infinite">AI</div>
                </button>
                
                <!-- Modern Chat Window -->
                <div id="dcPuneChatWindow" style="display:none;position:absolute;bottom:85px;right:0;width:420px;background:white;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.15);overflow:hidden;transform-origin:bottom right;animation:slideUp 0.3s ease">
                    
                    <!-- Chat Header -->
                    <div style="background:linear-gradient(135deg,${config.theme.gradientStart},${config.theme.gradientEnd});padding:20px;position:relative">
                        <button onclick="DCPuneWidget.toggle()" style="position:absolute;top:15px;right:15px;background:rgba(255,255,255,0.2);border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                        <div style="display:flex;align-items:center;gap:12px">
                            <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px">
                                ${config.organization.avatar}
                            </div>
                            <div style="color:white">
                                <div style="font-size:16px;font-weight:600">${config.organization.name}</div>
                                <div style="font-size:12px;opacity:0.9">${config.organization.tagline}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Welcome Message -->
                    <div style="padding:20px;background:${config.theme.backgroundColor}">
                        <div style="background:${config.theme.chatBubbleColor};padding:15px;border-radius:15px 15px 15px 0;margin-bottom:20px">
                            <div style="display:flex;align-items:start;gap:8px">
                                <span style="font-size:18px">💬</span>
                                <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.5">
                                    ${config.organization.welcomeMessage}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div id="quickActionsContainer" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
                            ${config.quickActions.map(action => `
                                <button onclick="DCPuneWidget.sendQuickAction('${action.action}')" style="padding:12px;background:white;border:1.5px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:8px;font-size:13px;color:#374151;font-weight:500" onmouseover="this.style.borderColor='${config.theme.primaryColor}';this.style.background='${config.theme.chatBubbleColor}'" onmouseout="this.style.borderColor='#e5e7eb';this.style.background='white'">
                                    <span style="font-size:18px">${action.icon}</span>
                                    <span>${action.label}</span>
                                </button>
                            `).join('')}
                        </div>
                        
                        <!-- QR Code Section -->
                        <div id="qrSection" style="display:none;text-align:center;padding:20px;background:white;border-radius:15px;border:1px solid #e5e7eb">
                            <div style="margin-bottom:10px;font-size:14px;color:#6b7280;font-weight:500">SCAN TO START</div>
                            <img src="${qrCodeUrl}" alt="WhatsApp QR Code" style="width:180px;height:180px;margin:10px auto;border-radius:12px;border:2px solid #e5e7eb">
                            <div style="font-size:12px;color:#9ca3af;margin-top:10px">Open on your phone</div>
                        </div>
                        
                        <!-- Toggle QR Button -->
                        <button onclick="DCPuneWidget.toggleQR()" style="width:100%;padding:12px;background:transparent;border:1px solid #e5e7eb;border-radius:12px;color:#6b7280;font-size:13px;cursor:pointer;transition:all 0.2s;margin-bottom:15px" onmouseover="this.style.borderColor='${config.theme.primaryColor}';this.style.color='${config.theme.primaryColor}'" onmouseout="this.style.borderColor='#e5e7eb';this.style.color='#6b7280'">
                            <span id="qrToggleText">Show QR Code</span>
                        </button>
                        
                        <!-- Start Chat Button -->
                        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none">
                            <button style="width:100%;padding:14px;background:linear-gradient(135deg,${config.theme.gradientStart},${config.theme.gradientEnd});color:white;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 15px rgba(99,102,241,0.25)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(99,102,241,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(99,102,241,0.25)'">
                                Start Chat on WhatsApp →
                            </button>
                        </a>
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding:15px;background:${config.theme.backgroundColor};border-top:1px solid #e5e7eb;text-align:center">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;color:#9ca3af;text-decoration:none;font-size:12px;transition:color 0.2s" onmouseover="this.style.color='${config.theme.primaryColor}'" onmouseout="this.style.color='#9ca3af'">
                            <span>Powered by</span>
                            <strong>${config.poweredBy.text}</strong>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                #dcPuneMainBtn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(99,102,241,0.45) !important;
                }
                
                #dcPuneChatWindow {
                    max-height: 600px;
                }
                
                @media (max-width: 480px) {
                    #dcPuneChatWindow {
                        width: calc(100vw - 20px) !important;
                        right: -10px !important;
                        bottom: 75px !important;
                    }
                }
                
                @media print {
                    #dcPuneWidget { display: none !important; }
                }
            </style>
        `;
    };
    
    // Initialize widget
    const initWidget = () => {
        try {
            const container = document.createElement('div');
            container.innerHTML = createWidget();
            document.body.appendChild(container.firstElementChild);
            
            console.log('✅ DC Pune WhatsApp Widget v4.0.0 initialized');
            console.log('🚀 Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneWidget = {
        version: '4.0.0',
        
        toggle: function() {
            const chatWindow = document.getElementById('dcPuneChatWindow');
            const notification = document.getElementById('dcPuneNotification');
            
            if (chatWindow) {
                const isVisible = chatWindow.style.display !== 'none';
                chatWindow.style.display = isVisible ? 'none' : 'block';
                
                if (!isVisible && notification) {
                    notification.style.display = 'none';
                }
            }
        },
        
        toggleQR: function() {
            const qrSection = document.getElementById('qrSection');
            const quickActions = document.getElementById('quickActionsContainer');
            const toggleText = document.getElementById('qrToggleText');
            
            if (qrSection && quickActions) {
                const isQRVisible = qrSection.style.display !== 'none';
                qrSection.style.display = isQRVisible ? 'none' : 'block';
                quickActions.style.display = isQRVisible ? 'grid' : 'none';
                if (toggleText) {
                    toggleText.textContent = isQRVisible ? 'Show QR Code' : 'Hide QR Code';
                }
            }
        },
        
        sendQuickAction: function(action) {
            const messages = {
                certificates: 'I need help with certificate applications',
                status: 'I want to check my application status',
                schemes: 'Tell me about government schemes',
                help: 'I need assistance'
            };
            
            const message = messages[action] || config.defaultMessage;
            const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        },
        
        show: function() {
            const chatWindow = document.getElementById('dcPuneChatWindow');
            if (chatWindow) chatWindow.style.display = 'block';
        },
        
        hide: function() {
            const chatWindow = document.getElementById('dcPuneChatWindow');
            if (chatWindow) chatWindow.style.display = 'none';
        }
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
