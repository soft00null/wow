/**
 * Divisional Commissioner Pune AI WhatsApp Widget
 * File: dc-pune-transparent-widget.js
 * Version: 5.0.0 - Transparent Modern UI
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dc-pune-transparent-widget.js
 * 
 * Transparent Glass Morphism Design with WhatsApp Colors
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCPuneTransparentWidget) {
        console.warn('DC Pune Transparent Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi',
        organization: {
            name: 'Divisional Commissioner Pune',
            tagline: 'AI-Powered Government Services',
            avatar: '🏛️',
            emoji: '💜',
            welcomeMessage: "Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with administrative services, civil services, government schemes or anything you need. How can I support you today?"
        },
        services: [
            { 
                icon: '🏛️', 
                label: 'Administrative Services', 
                action: 'administrative',
                message: 'I need help with administrative services'
            },
            { 
                icon: '📋', 
                label: 'Civil Services', 
                action: 'civil',
                message: 'I want information about civil services'
            },
            { 
                icon: '📑', 
                label: 'Government Schemes', 
                action: 'schemes',
                message: 'Tell me about government schemes'
            },
            { 
                icon: '📞', 
                label: 'Contact Office', 
                action: 'contact',
                message: 'I need to contact the DC office'
            }
        ],
        theme: {
            // WhatsApp friendly colors
            primaryColor: '#25D366',      // WhatsApp green
            secondaryColor: '#128C7E',    // WhatsApp dark green
            accentColor: '#075E54',       // WhatsApp darker green
            purpleAccent: '#7c3aed',      // Purple for buttons
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            glassBg: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // QR Code Generator
    const generateQRCode = (data) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&color=7c3aed&bgcolor=ffffff`;
    };
    
    // Create transparent widget with glass morphism
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        const qrCodeUrl = generateQRCode(whatsappUrl);
        
        return `
            <div id="dcPuneTransparentWidget" style="position:fixed;bottom:20px;right:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif">
                
                <!-- Floating Action Button with WhatsApp Colors -->
                <button id="dcPuneFloatingBtn" onclick="DCPuneTransparentWidget.toggle()" style="
                    width:65px;
                    height:65px;
                    border-radius:50%;
                    background:linear-gradient(135deg, ${config.theme.primaryColor}, ${config.theme.secondaryColor});
                    border:none;
                    cursor:pointer;
                    box-shadow:0 4px 20px rgba(37, 211, 102, 0.35);
                    transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    position:relative;
                    backdrop-filter:blur(10px);
                ">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                    </svg>
                    <div style="
                        position:absolute;
                        top:-5px;
                        right:-5px;
                        background:#FF3B30;
                        color:white;
                        border-radius:50%;
                        width:24px;
                        height:24px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:10px;
                        font-weight:bold;
                        border:2px solid white;
                        animation:pulse 2s infinite;
                    ">AI</div>
                </button>
                
                <!-- Transparent Chat Window with Glass Effect -->
                <div id="dcPuneTransparentChat" style="
                    display:none;
                    position:absolute;
                    bottom:85px;
                    right:0;
                    width:420px;
                    background:${config.theme.glassBg};
                    backdrop-filter:blur(20px);
                    -webkit-backdrop-filter:blur(20px);
                    border-radius:24px;
                    box-shadow:0 10px 40px ${config.theme.shadowColor}, 0 0 1px ${config.theme.borderColor};
                    border:1px solid ${config.theme.borderColor};
                    overflow:hidden;
                    transform-origin:bottom right;
                    animation:slideUpFade 0.3s ease;
                ">
                    
                    <!-- Transparent Header -->
                    <div style="
                        padding:20px;
                        background:linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(37, 211, 102, 0.1));
                        backdrop-filter:blur(10px);
                        border-bottom:1px solid ${config.theme.borderColor};
                        position:relative;
                    ">
                        <button onclick="DCPuneTransparentWidget.toggle()" style="
                            position:absolute;
                            top:15px;
                            right:15px;
                            background:rgba(0, 0, 0, 0.1);
                            border:none;
                            width:30px;
                            height:30px;
                            border-radius:50%;
                            cursor:pointer;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            transition:all 0.2s;
                        " onmouseover="this.style.background='rgba(0,0,0,0.2)'" onmouseout="this.style.background='rgba(0,0,0,0.1)'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#374151">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                        <div style="display:flex;align-items:center;gap:12px">
                            <div style="
                                width:48px;
                                height:48px;
                                background:rgba(124, 58, 237, 0.1);
                                border:1px solid rgba(124, 58, 237, 0.2);
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                font-size:24px;
                            ">
                                ${config.organization.avatar}
                            </div>
                            <div style="color:#1f2937">
                                <div style="font-size:16px;font-weight:600">${config.organization.emoji} ${config.organization.name}</div>
                                <div style="font-size:12px;color:#6b7280">${config.organization.tagline}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Transparent Body -->
                    <div style="padding:20px;max-height:450px;overflow-y:auto">
                        
                        <!-- Welcome Message Bubble -->
                        <div style="
                            background:rgba(237, 233, 254, 0.5);
                            backdrop-filter:blur(10px);
                            padding:15px;
                            border-radius:18px 18px 18px 4px;
                            margin-bottom:20px;
                            border:1px solid rgba(124, 58, 237, 0.1);
                        ">
                            <p style="margin:0;color:#374151;font-size:14px;line-height:1.6">
                                ${config.organization.welcomeMessage}
                            </p>
                        </div>
                        
                        <!-- Service Options with Transparent Buttons -->
                        <div id="serviceOptionsContainer" style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
                            ${config.services.map(service => `
                                <button onclick="DCPuneTransparentWidget.sendService('${service.action}')" style="
                                    padding:14px;
                                    background:rgba(255, 255, 255, 0.7);
                                    backdrop-filter:blur(10px);
                                    border:1.5px solid rgba(124, 58, 237, 0.2);
                                    border-radius:16px;
                                    cursor:pointer;
                                    transition:all 0.2s;
                                    display:flex;
                                    align-items:center;
                                    gap:12px;
                                    font-size:14px;
                                    color:#374151;
                                    font-weight:500;
                                    text-align:left;
                                " onmouseover="
                                    this.style.borderColor='${config.theme.purpleAccent}';
                                    this.style.background='rgba(237, 233, 254, 0.7)';
                                    this.style.transform='translateX(4px)';
                                " onmouseout="
                                    this.style.borderColor='rgba(124, 58, 237, 0.2)';
                                    this.style.background='rgba(255, 255, 255, 0.7)';
                                    this.style.transform='translateX(0)';
                                ">
                                    <span style="font-size:20px;width:28px">${service.icon}</span>
                                    <span>${service.label}</span>
                                </button>
                            `).join('')}
                        </div>
                        
                        <!-- Toggle QR Button -->
                        <button onclick="DCPuneTransparentWidget.toggleQR()" style="
                            width:100%;
                            padding:12px;
                            background:transparent;
                            border:1px solid rgba(124, 58, 237, 0.2);
                            border-radius:12px;
                            color:${config.theme.purpleAccent};
                            font-size:13px;
                            cursor:pointer;
                            transition:all 0.2s;
                            margin-bottom:15px;
                            font-weight:500;
                        " onmouseover="
                            this.style.borderColor='${config.theme.purpleAccent}';
                            this.style.background='rgba(124, 58, 237, 0.05)';
                        " onmouseout="
                            this.style.borderColor='rgba(124, 58, 237, 0.2)';
                            this.style.background='transparent';
                        ">
                            <span id="qrToggleText">Show QR Code</span>
                        </button>
                        
                        <!-- QR Code Section -->
                        <div id="qrSection" style="
                            display:none;
                            text-align:center;
                            padding:20px;
                            background:rgba(255, 255, 255, 0.7);
                            backdrop-filter:blur(10px);
                            border-radius:16px;
                            border:1px solid rgba(124, 58, 237, 0.1);
                            margin-bottom:15px;
                        ">
                            <div style="
                                margin-bottom:10px;
                                font-size:14px;
                                color:${config.theme.purpleAccent};
                                font-weight:600;
                                text-transform:uppercase;
                                letter-spacing:1px;
                            ">Scan to Start</div>
                            <div style="
                                display:inline-block;
                                padding:10px;
                                background:white;
                                border-radius:12px;
                                box-shadow:0 2px 10px rgba(0,0,0,0.1);
                            ">
                                <img src="${qrCodeUrl}" alt="WhatsApp QR Code" style="
                                    width:160px;
                                    height:160px;
                                    display:block;
                                ">
                            </div>
                            <div style="font-size:12px;color:#6b7280;margin-top:10px">Open on your phone</div>
                        </div>
                        
                        <!-- WhatsApp Start Button with Green Gradient -->
                        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none">
                            <button style="
                                width:100%;
                                padding:14px;
                                background:linear-gradient(135deg, ${config.theme.primaryColor}, ${config.theme.secondaryColor});
                                color:white;
                                border:none;
                                border-radius:12px;
                                font-size:15px;
                                font-weight:600;
                                cursor:pointer;
                                transition:all 0.2s;
                                box-shadow:0 4px 15px rgba(37, 211, 102, 0.25);
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                gap:8px;
                            " onmouseover="
                                this.style.transform='translateY(-2px)';
                                this.style.boxShadow='0 6px 20px rgba(37, 211, 102, 0.35)';
                            " onmouseout="
                                this.style.transform='translateY(0)';
                                this.style.boxShadow='0 4px 15px rgba(37, 211, 102, 0.25)';
                            ">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                </svg>
                                Start Chat on WhatsApp
                            </button>
                        </a>
                    </div>
                    
                    <!-- Transparent Footer -->
                    <div style="
                        padding:15px;
                        background:rgba(249, 250, 251, 0.5);
                        backdrop-filter:blur(10px);
                        border-top:1px solid ${config.theme.borderColor};
                        text-align:center;
                    ">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="
                            display:inline-flex;
                            align-items:center;
                            gap:6px;
                            color:#6b7280;
                            text-decoration:none;
                            font-size:12px;
                            transition:color 0.2s;
                        " onmouseover="this.style.color='${config.theme.purpleAccent}'" onmouseout="this.style.color='#6b7280'">
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
                
                @keyframes slideUpFade {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                #dcPuneFloatingBtn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.45) !important;
                }
                
                #dcPuneTransparentChat::-webkit-scrollbar {
                    width: 6px;
                }
                
                #dcPuneTransparentChat::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 3px;
                }
                
                #dcPuneTransparentChat::-webkit-scrollbar-thumb {
                    background: rgba(124, 58, 237, 0.3);
                    border-radius: 3px;
                }
                
                #dcPuneTransparentChat::-webkit-scrollbar-thumb:hover {
                    background: rgba(124, 58, 237, 0.5);
                }
                
                @supports not (backdrop-filter: blur(20px)) {
                    #dcPuneTransparentChat {
                        background: rgba(255, 255, 255, 0.98) !important;
                    }
                }
                
                @media (max-width: 480px) {
                    #dcPuneTransparentChat {
                        width: calc(100vw - 20px) !important;
                        right: -10px !important;
                        bottom: 75px !important;
                    }
                    
                    #dcPuneFloatingBtn {
                        width: 56px !important;
                        height: 56px !important;
                    }
                    
                    #dcPuneFloatingBtn svg {
                        width: 28px !important;
                        height: 28px !important;
                    }
                }
                
                @media print {
                    #dcPuneTransparentWidget { 
                        display: none !important; 
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    #dcPuneTransparentWidget * {
                        animation: none !important;
                        transition: none !important;
                    }
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
            
            console.log('✅ DC Pune Transparent WhatsApp Widget v5.0.0 initialized');
            console.log('🎨 Glass morphism UI with WhatsApp colors');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneTransparentWidget = {
        version: '5.0.0',
        
        toggle: function() {
            const chatWindow = document.getElementById('dcPuneTransparentChat');
            const notification = document.querySelector('#dcPuneFloatingBtn > div');
            
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
            const servicesContainer = document.getElementById('serviceOptionsContainer');
            const toggleText = document.getElementById('qrToggleText');
            
            if (qrSection && servicesContainer) {
                const isQRVisible = qrSection.style.display !== 'none';
                qrSection.style.display = isQRVisible ? 'none' : 'block';
                servicesContainer.style.display = isQRVisible ? 'flex' : 'none';
                if (toggleText) {
                    toggleText.textContent = isQRVisible ? 'Show QR Code' : 'Hide QR Code';
                }
            }
        },
        
        sendService: function(serviceType) {
            const service = config.services.find(s => s.action === serviceType);
            if (service) {
                const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(service.message)}`;
                window.open(whatsappUrl, '_blank');
            }
        },
        
        show: function() {
            const chatWindow = document.getElementById('dcPuneTransparentChat');
            if (chatWindow) chatWindow.style.display = 'block';
        },
        
        hide: function() {
            const chatWindow = document.getElementById('dcPuneTransparentChat');
            if (chatWindow) chatWindow.style.display = 'none';
        }
    };
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        const widget = document.getElementById('dcPuneTransparentWidget');
        const chatWindow = document.getElementById('dcPuneTransparentChat');
        const floatingBtn = document.getElementById('dcPuneFloatingBtn');
        
        if (widget && chatWindow && floatingBtn &&
            !chatWindow.contains(e.target) && 
            !floatingBtn.contains(e.target) &&
            chatWindow.style.display === 'block') {
            DCPuneTransparentWidget.hide();
        }
    });
    
    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            DCPuneTransparentWidget.hide();
        }
    });
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
