/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget.js
 * Version: 4.0.0 - Professional Government AI Assistant
 * Date: 2025-09-27
 * Author: soft00null
 * URL: https://wow-strategies.com/dcp-whatsapp-widget.js
 * 
 * Professional Government UI with AI-First Design
 * Powered by WoW-Strategies Private Limited
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
        message: 'Hi',
        botName: 'Divisional Commissioner Pune AI Assistant',
        botNameMarathi: 'विभागीय आयुक्त पुणे AI सहाय्यक',
        tagline: 'Your Digital Government Assistant • 24/7 AI Support',
        position: 'bottom-right',
        autoShow: true,
        showDelay: 3000,
        primaryColor: '#6366F1', // Professional purple
        secondaryColor: '#4F46E5', // Darker purple
        accentColor: '#EC4899', // Pink accent for AI badge
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropBlur: true,
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        },
        quickActions: [
            {
                id: 'services',
                icon: '🏛️',
                title: 'Government Services',
                titleMarathi: 'सरकारी सेवा',
                description: 'Access all divisional services'
            },
            {
                id: 'certificates',
                icon: '📋',
                title: 'Certificates & Documents',
                titleMarathi: 'प्रमाणपत्रे',
                description: 'Apply for various certificates'
            },
            {
                id: 'complaints',
                icon: '📢',
                title: 'Lodge Complaint',
                titleMarathi: 'तक्रार नोंदवा',
                description: 'Register your grievances'
            },
            {
                id: 'help',
                icon: '💬',
                title: 'AI Assistant Help',
                titleMarathi: 'मदत',
                description: 'Get instant AI support'
            }
        ]
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
                
                // Government office hours: Mon-Fri 10:00-18:00, Sat 10:00-14:00
                if (day === 0) return false; // Sunday closed
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1800;
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400;
                
                return false;
            } catch (error) {
                return true;
            }
        },
        
        // Generate QR code using QR Server API
        generateQRCode: (text) => {
            const size = 200;
            const data = encodeURIComponent(text);
            return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}&bgcolor=FFFFFF&color=4F46E5&margin=20`;
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
        const isOfficeOpen = utils.isOfficeHours();
        const qrCodeUrl = utils.generateQRCode(whatsappUrl);
        
        const widgetHTML = `
            <!-- Main Container -->
            <div class="dcp-widget" id="dcpWidget" style="position:fixed;${config.position.includes('bottom')?'bottom':'top'}:20px;${config.position.includes('right')?'right':'left'}:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
                
                <!-- Floating Action Button -->
                <button class="dcp-fab" id="dcpFab" onclick="DCPWidget.toggle()" style="width:60px;height:60px;background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});border-radius:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,0.3);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none;backdrop-filter:blur(10px)">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <div class="dcp-ai-badge" style="position:absolute;top:-5px;right:-5px;background:${config.accentColor};color:white;border-radius:10px;padding:2px 6px;font-size:9px;font-weight:700;display:flex;align-items:center;gap:2px;box-shadow:0 2px 8px rgba(236,72,153,0.4);animation:dcpPulse 2s infinite">
                        AI
                    </div>
                </button>
                
                <!-- Welcome Notification -->
                <div class="dcp-notification" id="dcpNotification" style="position:absolute;bottom:70px;right:0;background:white;border-radius:12px;padding:12px 16px;box-shadow:0 8px 24px rgba(0,0,0,0.12);transform:translateX(120%);opacity:0;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);white-space:nowrap;display:flex;align-items:center;gap:10px;backdrop-filter:blur(10px);background:rgba(255,255,255,0.95)">
                    <span style="font-size:20px">👋</span>
                    <span style="font-size:13px;color:#1F2937;font-weight:500">AI Assistant is here to help!</span>
                </div>
                
                <!-- Main Chat Modal -->
                <div class="dcp-modal" id="dcpModal" style="position:absolute;${config.position.includes('bottom')?'bottom':'top'}:80px;${config.position.includes('right')?'right':'left'}:0;width:380px;max-width:calc(100vw - 40px);background:${config.backgroundColor};border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.15);transform:scale(0.8) translateY(20px);opacity:0;visibility:hidden;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);overflow:hidden;${config.backdropBlur?'backdrop-filter:blur(20px);':''}">
                    
                    <!-- Header -->
                    <div class="dcp-header" style="background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});color:white;padding:20px;position:relative;overflow:hidden">
                        <button onclick="DCPWidget.hide()" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.2);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease">×</button>
                        
                        <!-- AI Animation Background -->
                        <div style="position:absolute;top:-50%;right:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%);animation:dcpRotate 20s linear infinite"></div>
                        
                        <div style="position:relative;z-index:1">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                                <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px)">
                                    <span style="font-size:24px">🤖</span>
                                </div>
                                <div>
                                    <div style="font-size:16px;font-weight:600;margin-bottom:2px">${config.botName}</div>
                                    <div style="font-size:11px;opacity:0.9">${config.botNameMarathi}</div>
                                </div>
                            </div>
                            <div style="font-size:12px;opacity:0.9;display:flex;align-items:center;gap:8px">
                                <span style="width:8px;height:8px;background:${isOfficeOpen?'#10B981':'#F59E0B'};border-radius:50%;display:inline-block;animation:${isOfficeOpen?'dcpBlink':'none'} 2s infinite"></span>
                                <span>${config.tagline}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Welcome Message -->
                    <div class="dcp-welcome" style="background:rgba(99,102,241,0.05);padding:16px 20px;border-bottom:1px solid rgba(99,102,241,0.1);display:flex;gap:12px;align-items:flex-start">
                        <span style="font-size:20px;flex-shrink:0">👋</span>
                        <div>
                            <div style="font-size:14px;color:#1F2937;line-height:1.5">
                                Welcome! I'm your AI Assistant for all Divisional Commissioner services. I can help you with:
                            </div>
                            <ul style="margin:8px 0 0 0;padding-left:20px;font-size:13px;color:#6B7280;line-height:1.6">
                                <li>Government services and schemes</li>
                                <li>Certificate applications</li>
                                <li>Complaint registration</li>
                                <li>General inquiries</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="dcp-actions" style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
                        ${config.quickActions.map(action => `
                            <button onclick="DCPWidget.sendMessage('${action.title}')" style="background:white;border:2px solid #E5E7EB;border-radius:12px;padding:16px;text-align:left;cursor:pointer;transition:all 0.3s ease;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:8px" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='rgba(99,102,241,0.05)'" onmouseout="this.style.borderColor='#E5E7EB';this.style.background='white'">
                                <div style="display:flex;align-items:center;gap:8px">
                                    <span style="font-size:20px">${action.icon}</span>
                                    <div style="flex:1">
                                        <div style="font-size:13px;font-weight:600;color:#1F2937;margin-bottom:2px">${action.title}</div>
                                        <div style="font-size:11px;color:#9CA3AF">${action.titleMarathi}</div>
                                    </div>
                                </div>
                                <div style="font-size:11px;color:#6B7280;line-height:1.3">${action.description}</div>
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- Chat Options -->
                    <div style="padding:0 20px 20px">
                        <div style="text-align:center;margin-bottom:16px;font-size:13px;color:#6B7280">Choose your preferred chat method:</div>
                        
                        <div style="display:flex;gap:12px;margin-bottom:16px">
                            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="flex:1;background:linear-gradient(135deg,#25D366,#128C7E);color:white;padding:12px;border-radius:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:500;font-size:14px;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(37,211,102,0.2)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(37,211,102,0.3)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(37,211,102,0.2)'">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/></svg>
                                Mobile Chat
                            </a>
                            <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" target="_blank" rel="noopener noreferrer" style="flex:1;background:white;color:#1F2937;padding:12px;border-radius:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:500;font-size:14px;border:2px solid #E5E7EB;transition:all 0.3s ease" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#E5E7EB';this.style.transform='translateY(0)'">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#6B7280"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                Web Chat
                            </a>
                        </div>
                        
                        <!-- QR Code Toggle -->
                        <button onclick="DCPWidget.toggleQR()" style="width:100%;background:rgba(99,102,241,0.1);color:${config.primaryColor};border:none;padding:12px;border-radius:12px;font-weight:500;font-size:14px;cursor:pointer;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;gap:8px" onmouseover="this.style.background='rgba(99,102,241,0.15)'" onmouseout="this.style.background='rgba(99,102,241,0.1)'">
                            <span>📱</span>
                            <span id="qrToggleText">Show QR Code</span>
                        </button>
                        
                        <!-- QR Code Container -->
                        <div id="dcpQRContainer" style="margin-top:16px;padding:20px;background:white;border:2px solid #E5E7EB;border-radius:16px;text-align:center;display:none;animation:dcpFadeIn 0.3s ease">
                            <div style="font-size:14px;font-weight:600;color:#1F2937;margin-bottom:16px">Scan to start WhatsApp chat</div>
                            <img src="${qrCodeUrl}" alt="WhatsApp QR Code" style="width:180px;height:180px;margin:0 auto;border-radius:8px">
                            <div style="font-size:12px;color:#6B7280;margin-top:12px">Open WhatsApp → Menu → Linked Devices → Link a Device</div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background:#F9FAFB;padding:16px 20px;text-align:center;border-top:1px solid #E5E7EB">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:#9CA3AF;text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:6px;transition:color 0.3s ease" onmouseover="this.style.color='${config.primaryColor}'" onmouseout="this.style.color='#9CA3AF'">
                            <span>⚡</span> ${config.poweredBy.text}
                        </a>
                    </div>
                    
                </div>
            </div>
            
            <!-- Styles -->
            <style>
                @keyframes dcpPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                
                @keyframes dcpBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                
                @keyframes dcpRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes dcpFadeIn {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
                
                @keyframes dcpSlideIn {
                    0% { transform: translateX(120%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                .dcp-fab:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 30px rgba(99, 102, 241, 0.4);
                }
                
                .dcp-modal * {
                    box-sizing: border-box;
                }
                
                @media (max-width: 480px) {
                    .dcp-modal {
                        width: calc(100vw - 20px) !important;
                        ${config.position.includes('right') ? 'right' : 'left'}: -10px !important;
                        bottom: 70px !important;
                        max-height: calc(100vh - 100px);
                        overflow-y: auto;
                    }
                    .dcp-actions {
                        grid-template-columns: 1fr !important;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .dcp-widget * {
                        animation: none !important;
                        transition: none !important;
                    }
                }
                
                @media print {
                    .dcp-widget {
                        display: none !important;
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
            
            // Show notification after delay
            if (config.autoShow) {
                setTimeout(() => {
                    const notification = document.getElementById('dcpNotification');
                    if (notification) {
                        notification.style.transform = 'translateX(0)';
                        notification.style.opacity = '1';
                        
                        // Hide notification after 5 seconds
                        setTimeout(() => {
                            notification.style.transform = 'translateX(120%)';
                            notification.style.opacity = '0';
                        }, 5000);
                    }
                    
                    // Animate AI badge
                    const fab = document.getElementById('dcpFab');
                    if (fab) {
                        fab.style.animation = 'dcpPulse 1s ease-in-out 3';
                    }
                }, config.showDelay);
            }
            
            // Handle click outside
            document.addEventListener('click', (e) => {
                const modal = document.getElementById('dcpModal');
                const fab = document.getElementById('dcpFab');
                
                if (modal && fab && 
                    !modal.contains(e.target) && 
                    !fab.contains(e.target) && 
                    modal.style.opacity === '1') {
                    DCPWidget.hide();
                }
            });
            
            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    DCPWidget.hide();
                }
            });
            
            console.log('🚀 DCP WhatsApp Widget v4.0.0 initialized');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DCP Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPWidget = {
        version: '4.0.0',
        config: config,
        
        show: function() {
            const modal = document.getElementById('dcpModal');
            if (modal) {
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1) translateY(0)';
            }
        },
        
        hide: function() {
            const modal = document.getElementById('dcpModal');
            if (modal) {
                modal.style.opacity = '0';
                modal.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    modal.style.visibility = 'hidden';
                }, 300);
            }
        },
        
        toggle: function() {
            const modal = document.getElementById('dcpModal');
            if (modal && modal.style.opacity === '1') {
                this.hide();
            } else {
                this.show();
            }
        },
        
        toggleQR: function() {
            const qrContainer = document.getElementById('dcpQRContainer');
            const toggleText = document.getElementById('qrToggleText');
            
            if (qrContainer) {
                if (qrContainer.style.display === 'none') {
                    qrContainer.style.display = 'block';
                    if (toggleText) toggleText.textContent = 'Hide QR Code';
                } else {
                    qrContainer.style.display = 'none';
                    if (toggleText) toggleText.textContent = 'Show QR Code';
                }
            }
        },
        
        sendMessage: function(message) {
            const fullMessage = `Hi, I need help with: ${message}`;
            const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
            window.open(whatsappUrl, '_blank');
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
