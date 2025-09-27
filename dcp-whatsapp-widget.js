/**
 * Divisional Commissioner Pune - AI WhatsApp Assistant Widget
 * File: dcp-whatsapp-widget.js
 * Version: 4.0.0 - Enhanced UI/UX
 * Date: 2025-09-27
 * Author: soft00null for WoW-Strategies
 * URL: https://wow-strategies.com/dcp-widget.js
 * 
 * Modern Chat Interface with Government Integration
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
        phoneNumber: '912026058100', // Divisional Commissioner Pune Office
        defaultMessage: 'नमस्कार! मला विभागीय आयुक्त पुणे कार्यालयाच्या सेवांबद्दल माहिती हवी आहे. / Hello! I need information about Divisional Commissioner Pune office services.',
        position: 'bottom-right',
        autoShow: true,
        showNotification: true,
        primaryColor: '#6366F1', // Modern purple gradient
        secondaryColor: '#8B5CF6',
        accentColor: '#A78BFA',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=',
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        },
        quickActions: [
            {
                id: 'certificates',
                icon: '📜',
                title: 'प्रमाणपत्रे',
                subtitle: 'Certificates',
                message: 'मला प्रमाणपत्र सेवांबद्दल माहिती हवी आहे'
            },
            {
                id: 'appeals',
                icon: '⚖️',
                title: 'अपील',
                subtitle: 'Appeals & Grievances',
                message: 'मला अपील/तक्रार नोंदवायची आहे'
            },
            {
                id: 'services',
                icon: '🏛️',
                title: 'सेवा',
                subtitle: 'Government Services',
                message: 'मला सरकारी सेवांबद्दल माहिती हवी आहे'
            },
            {
                id: 'contact',
                icon: '📞',
                title: 'संपर्क',
                subtitle: 'Contact Office',
                message: 'मला कार्यालयाशी संपर्क साधायचा आहे'
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
                
                // Government office hours: Mon-Fri 10:00-17:30
                if (day === 0 || day === 6) return false; // Weekend closed
                return currentTime >= 1000 && currentTime <= 1730;
            } catch (error) {
                return true;
            }
        },
        
        generateQRCode: (message) => {
            const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            return `${config.qrCodeUrl}${encodeURIComponent(whatsappUrl)}`;
        }
    };
    
    // Create modern widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const statusDot = isOfficeOpen ? '#22C55E' : '#FFA500';
        
        const widgetHTML = `
            <div class="dcp-widget" style="position:fixed;${config.position.includes('bottom')?'bottom':'top'}:24px;${config.position.includes('right')?'right':'left'}:24px;z-index:999999;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                
                <!-- Main Button -->
                <button class="dcp-button" onclick="toggleDCPChat()" style="width:72px;height:72px;background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 32px rgba(99,102,241,0.35);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none;backdrop-filter:blur(10px)" onmouseover="this.style.transform='scale(1.08)';this.style.boxShadow='0 12px 40px rgba(99,102,241,0.5)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 8px 32px rgba(99,102,241,0.35)'">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.61 13.61c-.24.67-.93 1.25-1.58 1.38-.42.09-.96.16-2.79-.59-2.35-.97-3.85-3.35-3.97-3.51-.11-.15-.95-1.26-.95-2.41 0-1.15.6-1.71.81-1.95.21-.24.47-.3.62-.3.15 0 .31 0 .44.01.14 0 .33-.05.52.4.19.45.65 1.58.71 1.7.06.11.1.25.02.4-.08.15-.12.24-.24.37-.11.13-.24.28-.35.38-.11.1-.23.21-.1.41.13.2.58.96 1.24 1.55.85.76 1.58 1 1.8 1.11.22.11.35.09.48-.06.13-.15.55-.64.7-.86.15-.22.29-.18.49-.11.2.07 1.27.6 1.49.71.22.11.37.17.42.26.06.09.06.52-.14 1.03z"/>
                    </svg>
                    ${config.showNotification ? `
                        <div style="position:absolute;top:-2px;right:-2px;background:#EF4444;color:white;border-radius:50%;width:24px;height:24px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;animation:dcpPulse 2s infinite;border:3px solid white;box-shadow:0 2px 8px rgba(239,68,68,0.4)">AI</div>
                    ` : ''}
                    <div style="position:absolute;bottom:0;right:0;width:16px;height:16px;background:${statusDot};border-radius:50%;border:3px solid white"></div>
                </button>
                
                <!-- Chat Modal -->
                <div class="dcp-modal" id="dcpModal" style="position:absolute;${config.position.includes('bottom')?'bottom':'top'}:88px;${config.position.includes('right')?'right':'left'}:0;width:420px;max-width:calc(100vw - 48px);background:white;border-radius:28px;box-shadow:0 24px 72px rgba(0,0,0,0.15);transform:translateY(20px) scale(0.95);opacity:0;visibility:hidden;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);overflow:hidden;border:1px solid rgba(0,0,0,0.04)">
                    
                    <!-- Enhanced Header -->
                    <div style="background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});padding:28px;position:relative;overflow:hidden">
                        <div style="position:absolute;top:-40px;right:-40px;width:120px;height:120px;background:rgba(255,255,255,0.1);border-radius:50%"></div>
                        <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;background:rgba(255,255,255,0.08);border-radius:50%"></div>
                        
                        <button onclick="toggleDCPChat()" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border:none;color:white;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:20px;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;font-weight:300" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                        
                        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
                            <div style="width:56px;height:56px;background:rgba(255,255,255,0.95);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 4px 16px rgba(0,0,0,0.1)">🏛️</div>
                            <div>
                                <h3 style="color:white;font-size:20px;font-weight:700;margin:0;margin-bottom:4px">विभागीय आयुक्त पुणे</h3>
                                <p style="color:rgba(255,255,255,0.9);font-size:13px;margin:0">Divisional Commissioner Pune</p>
                            </div>
                        </div>
                        
                        <div style="background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border-radius:16px;padding:16px;color:white">
                            <div style="display:flex;align-items:center;gap:8px;font-size:15px">
                                <span style="font-size:20px">🤖</span>
                                <span style="font-weight:600">नमस्कार! मी तुमचा AI सहाय्यक आहे</span>
                            </div>
                            <p style="margin:8px 0 0 0;font-size:13px;opacity:0.95;line-height:1.5">
                                मी तुम्हाला २४/७ सरकारी सेवा, प्रमाणपत्रे, अपील आणि इतर माहितीसाठी मदत करू शकतो.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Quick Actions Grid -->
                    <div style="padding:24px;background:#FAFBFC">
                        <h4 style="color:#1F2937;font-size:14px;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.5px;opacity:0.7">द्रुत सेवा • Quick Services</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                            ${config.quickActions.map(action => `
                                <button onclick="sendDCPMessage('${action.message}')" style="background:white;border:2px solid #E5E7EB;border-radius:16px;padding:16px;text-align:left;cursor:pointer;transition:all 0.3s ease;position:relative;overflow:hidden;outline:none" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 24px rgba(99,102,241,0.15)'" onmouseout="this.style.borderColor='#E5E7EB';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                                    <div style="font-size:28px;margin-bottom:8px">${action.icon}</div>
                                    <div style="color:#1F2937;font-size:14px;font-weight:600;margin-bottom:2px">${action.title}</div>
                                    <div style="color:#6B7280;font-size:11px">${action.subtitle}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Chat Options Section -->
                    <div style="padding:0 24px 24px 24px">
                        <div style="display:flex;gap:12px;margin-bottom:20px">
                            <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}" target="_blank" rel="noopener noreferrer" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});color:white;border-radius:14px;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.3s ease;box-shadow:0 4px 16px rgba(99,102,241,0.2)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 24px rgba(99,102,241,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 16px rgba(99,102,241,0.2)'">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                </svg>
                                Start Chat
                            </a>
                            
                            <button onclick="toggleQRCode()" id="qrToggleBtn" style="padding:14px 20px;background:white;border:2px solid ${config.primaryColor};color:${config.primaryColor};border-radius:14px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.3s ease;outline:none" onmouseover="this.style.background='${config.primaryColor}';this.style.color='white'" onmouseout="this.style.background='white';this.style.color='${config.primaryColor}'">
                                Show QR
                            </button>
                        </div>
                        
                        <!-- QR Code Section (Initially Hidden) -->
                        <div id="qrSection" style="display:none;text-align:center;padding:20px;background:#F9FAFB;border-radius:16px;margin-top:16px;transition:all 0.3s ease">
                            <div style="font-size:14px;font-weight:600;color:#4B5563;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px">Scan to Start</div>
                            <div id="qrCodeContainer" style="display:inline-block;padding:16px;background:white;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.08)">
                                <img id="qrCodeImage" style="width:180px;height:180px;display:block" alt="WhatsApp QR Code">
                            </div>
                            <div style="font-size:12px;color:#6B7280;margin-top:12px;line-height:1.5">
                                Open WhatsApp on your phone<br>
                                <span style="color:#9CA3AF">Tap Menu → Linked Devices → Link a Device</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding:20px 24px;background:linear-gradient(to bottom,#FAFBFC,#F3F4F6);border-top:1px solid #E5E7EB;text-align:center">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;color:#6B7280;text-decoration:none;font-size:12px;transition:all 0.3s ease" onmouseover="this.style.color='${config.primaryColor}'" onmouseout="this.style.color='#6B7280'">
                            <span style="font-size:14px">⚡</span>
                            <span>Powered by <strong>${config.poweredBy.text}</strong></span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="opacity:0.5">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                @keyframes dcpPulse { 
                    0%, 100% { transform: scale(1); } 
                    50% { transform: scale(1.1); } 
                }
                
                .dcp-widget * {
                    box-sizing: border-box;
                }
                
                @media (max-width: 480px) {
                    .dcp-modal {
                        width: calc(100vw - 32px) !important;
                        ${config.position.includes('right') ? 'right' : 'left'}: 16px !important;
                    }
                    .dcp-button {
                        width: 64px !important;
                        height: 64px !important;
                    }
                    .dcp-button svg {
                        width: 28px !important;
                        height: 28px !important;
                    }
                }
                
                @media print {
                    .dcp-widget {
                        display: none !important;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .dcp-widget * {
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
            
            // Setup QR code
            const qrImage = document.getElementById('qrCodeImage');
            if (qrImage) {
                qrImage.src = utils.generateQRCode(config.defaultMessage);
            }
            
            // Auto-show animation
            if (config.autoShow) {
                setTimeout(() => {
                    const button = document.querySelector('.dcp-button');
                    if (button) {
                        button.style.animation = 'dcpPulse 1.5s ease-in-out 3';
                    }
                }, 3000);
            }
            
            console.log('🚀 DCP WhatsApp Widget v4.0.0 initialized!');
            console.log('🏛️ Divisional Commissioner Pune');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DCP Widget initialization failed:', error);
        }
    };
    
    // Toggle functions
    window.toggleDCPChat = function() {
        try {
            const modal = document.getElementById('dcpModal');
            if (!modal) return;
            
            const isActive = modal.style.opacity === '1';
            
            if (isActive) {
                modal.style.opacity = '0';
                modal.style.visibility = 'hidden';
                modal.style.transform = 'translateY(20px) scale(0.95)';
            } else {
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modal.style.transform = 'translateY(0) scale(1)';
                
                // Hide notification
                const badge = document.querySelector('.dcp-button div[style*="animation"]');
                if (badge) {
                    badge.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Modal toggle failed:', error);
        }
    };
    
    window.toggleQRCode = function() {
        const qrSection = document.getElementById('qrSection');
        const qrToggleBtn = document.getElementById('qrToggleBtn');
        
        if (qrSection && qrToggleBtn) {
            if (qrSection.style.display === 'none') {
                qrSection.style.display = 'block';
                qrToggleBtn.textContent = 'Hide QR';
            } else {
                qrSection.style.display = 'none';
                qrToggleBtn.textContent = 'Show QR';
            }
        }
    };
    
    window.sendDCPMessage = function(message) {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    // Event listeners
    document.addEventListener('click', function(e) {
        try {
            const modal = document.getElementById('dcpModal');
            const button = document.querySelector('.dcp-button');
            
            if (modal && button && 
                !modal.contains(e.target) && 
                !button.contains(e.target) && 
                modal.style.opacity === '1') {
                toggleDCPChat();
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    document.addEventListener('keydown', function(e) {
        try {
            if (e.key === 'Escape') {
                const modal = document.getElementById('dcpModal');
                if (modal && modal.style.opacity === '1') {
                    toggleDCPChat();
                }
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Public API
    window.DCPWidget = {
        version: '4.0.0',
        config: config,
        show: () => {
            const modal = document.getElementById('dcpModal');
            if (modal && modal.style.opacity !== '1') {
                toggleDCPChat();
            }
        },
        hide: () => {
            const modal = document.getElementById('dcpModal');
            if (modal && modal.style.opacity === '1') {
                toggleDCPChat();
            }
        },
        toggle: () => toggleDCPChat(),
        sendMessage: (msg) => sendDCPMessage(msg),
        updateQR: (message) => {
            const qrImage = document.getElementById('qrCodeImage');
            if (qrImage) {
                qrImage.src = utils.generateQRCode(message);
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
