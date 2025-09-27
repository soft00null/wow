/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * Version: 5.0.0 - Transparent Modern UI with WhatsApp Colors
 * Author: WoW-Strategies Private Limited
 * Date: 2025-09-27
 */

(function() {
    'use strict';
    
    if (window.DCPuneWidget) {
        console.warn('DC Pune Widget already initialized');
        return;
    }
    
    // Configuration with WhatsApp-friendly colors
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi',
        organization: {
            name: 'Divisional Commissioner Pune',
            tagline: 'AI-Powered Citizen Services',
            avatar: '🏛️💜',
            welcomeMessage: "Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, administrative matters, schemes or anything you need. How can I support you today?"
        },
        services: [
            { 
                icon: '🏛️', 
                label: 'Administrative services', 
                color: '#7c3aed',
                message: 'I need help with administrative services'
            },
            { 
                icon: '📋', 
                label: 'Civil services', 
                color: '#6366f1',
                message: 'I want information about civil services'
            },
            { 
                icon: '💰', 
                label: 'Government Schemes', 
                color: '#8b5cf6',
                message: 'Tell me about government schemes'
            },
            { 
                icon: '📞', 
                label: 'Contact Office', 
                color: '#a78bfa',
                message: 'I need to contact the office'
            }
        ],
        theme: {
            whatsappGreen: '#25D366',
            whatsappDarkGreen: '#128C7E',
            whatsappLight: '#DCF8C6',
            primaryPurple: '#7c3aed',
            lightPurple: '#a78bfa',
            glassBg: 'rgba(255, 255, 255, 0.95)',
            glassButtonBg: 'rgba(124, 58, 237, 0.08)',
            shadowColor: 'rgba(124, 58, 237, 0.15)'
        },
        poweredBy: {
            text: 'WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Generate QR Code
    const generateQRCode = (data) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&color=7c3aed&bgcolor=ffffff`;
    };
    
    // Create the modern transparent widget
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        const qrCodeUrl = generateQRCode(whatsappUrl);
        
        return `
            <div id="dcPuneWidget" style="position:fixed;bottom:20px;right:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                
                <!-- Main WhatsApp Button -->
                <button id="dcPuneMainBtn" onclick="DCPuneWidget.toggle()" style="
                    width:60px;
                    height:60px;
                    border-radius:50%;
                    background:linear-gradient(135deg, ${config.theme.primaryPurple}, ${config.theme.lightPurple});
                    border:none;
                    cursor:pointer;
                    box-shadow:0 4px 20px ${config.theme.shadowColor};
                    transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    position:relative;
                    backdrop-filter:blur(10px);
                ">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                    </svg>
                    <div style="
                        position:absolute;
                        top:-4px;
                        right:-4px;
                        background:#ff4757;
                        color:white;
                        border-radius:50%;
                        width:20px;
                        height:20px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:9px;
                        font-weight:bold;
                        border:2px solid white;
                        animation:pulse 2s infinite;
                    ">AI</div>
                </button>
                
                <!-- Transparent Chat Window -->
                <div id="dcPuneChatWindow" style="
                    display:none;
                    position:absolute;
                    bottom:75px;
                    right:0;
                    width:400px;
                    background:${config.theme.glassBg};
                    backdrop-filter:blur(20px);
                    -webkit-backdrop-filter:blur(20px);
                    border-radius:24px;
                    box-shadow:0 20px 40px ${config.theme.shadowColor};
                    overflow:hidden;
                    transform-origin:bottom right;
                    animation:slideUp 0.3s cubic-bezier(0.4,0,0.2,1);
                    border:1px solid rgba(124, 58, 237, 0.1);
                ">
                    
                    <!-- Message Bubble -->
                    <div style="
                        background:rgba(255,255,255,0.98);
                        margin:16px 16px 0 16px;
                        padding:20px;
                        border-radius:20px 20px 20px 4px;
                        box-shadow:0 2px 10px rgba(0,0,0,0.05);
                        position:relative;
                    ">
                        <button onclick="DCPuneWidget.toggle()" style="
                            position:absolute;
                            top:12px;
                            right:12px;
                            background:transparent;
                            border:none;
                            cursor:pointer;
                            opacity:0.5;
                            transition:opacity 0.2s;
                            padding:4px;
                        " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#6b7280">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                        
                        <div style="display:flex;gap:12px;margin-bottom:12px;align-items:start;">
                            <span style="font-size:24px;">${config.organization.avatar}</span>
                            <div style="flex:1;">
                                <div style="font-weight:600;color:#1f2937;font-size:15px;margin-bottom:8px;">
                                    ${config.organization.welcomeMessage}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Service Buttons -->
                    <div style="padding:16px;display:flex;flex-direction:column;gap:10px;">
                        ${config.services.map(service => `
                            <button onclick="DCPuneWidget.sendMessage('${service.message}')" style="
                                display:flex;
                                align-items:center;
                                gap:12px;
                                padding:14px 20px;
                                background:white;
                                border:1.5px solid ${service.color};
                                border-radius:50px;
                                cursor:pointer;
                                transition:all 0.2s ease;
                                font-size:15px;
                                color:#374151;
                                font-weight:500;
                                width:100%;
                                text-align:left;
                                box-shadow:0 2px 8px rgba(124,58,237,0.08);
                            " onmouseover="
                                this.style.background='${service.color}';
                                this.style.color='white';
                                this.style.transform='translateX(4px)';
                                this.style.boxShadow='0 4px 12px rgba(124,58,237,0.2)';
                            " onmouseout="
                                this.style.background='white';
                                this.style.color='#374151';
                                this.style.transform='translateX(0)';
                                this.style.boxShadow='0 2px 8px rgba(124,58,237,0.08)';
                            ">
                                <span style="font-size:20px;">${service.icon}</span>
                                <span style="flex:1;">${service.label}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="opacity:0.5;">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                                </svg>
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- QR Code Section -->
                    <div id="qrSection" style="
                        display:none;
                        margin:16px;
                        padding:20px;
                        background:white;
                        border-radius:16px;
                        text-align:center;
                        box-shadow:0 2px 10px rgba(0,0,0,0.05);
                    ">
                        <div style="
                            font-size:13px;
                            color:${config.theme.primaryPurple};
                            font-weight:600;
                            text-transform:uppercase;
                            letter-spacing:0.5px;
                            margin-bottom:16px;
                        ">Scan to Start</div>
                        <div style="
                            display:inline-block;
                            padding:12px;
                            background:linear-gradient(135deg, rgba(124,58,237,0.05), rgba(167,139,250,0.05));
                            border-radius:16px;
                            border:2px solid ${config.theme.primaryPurple};
                        ">
                            <img src="${qrCodeUrl}" alt="WhatsApp QR Code" style="
                                width:160px;
                                height:160px;
                                display:block;
                            ">
                        </div>
                        <div style="
                            margin-top:12px;
                            font-size:13px;
                            color:#6b7280;
                        ">Open on your phone</div>
                    </div>
                    
                    <!-- Toggle QR Button -->
                    <div style="padding:0 16px;">
                        <button onclick="DCPuneWidget.toggleQR()" style="
                            width:100%;
                            padding:10px;
                            background:transparent;
                            border:none;
                            color:${config.theme.primaryPurple};
                            font-size:14px;
                            cursor:pointer;
                            transition:all 0.2s;
                            font-weight:500;
                        " onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                            <span id="qrToggleText">Show QR</span>
                        </button>
                    </div>
                    
                    <!-- Footer -->
                    <div style="
                        padding:16px;
                        text-align:center;
                        border-top:1px solid rgba(124,58,237,0.1);
                        margin-top:8px;
                    ">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="
                            display:inline-flex;
                            align-items:center;
                            gap:6px;
                            color:#9ca3af;
                            text-decoration:none;
                            font-size:12px;
                            transition:color 0.2s;
                        " onmouseover="this.style.color='${config.theme.primaryPurple}'" onmouseout="this.style.color='#9ca3af'">
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
                    from { 
                        opacity: 0; 
                        transform: translateY(20px) scale(0.95);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1);
                    }
                }
                
                #dcPuneMainBtn:hover {
                    transform: scale(1.08) rotate(2deg);
                    box-shadow: 0 6px 25px rgba(124, 58, 237, 0.25) !important;
                }
                
                @media (max-width: 480px) {
                    #dcPuneChatWindow {
                        width: calc(100vw - 20px) !important;
                        right: -10px !important;
                        bottom: 70px !important;
                    }
                    
                    #dcPuneMainBtn {
                        width: 56px !important;
                        height: 56px !important;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation: none !important;
                        transition: none !important;
                    }
                }
                
                @supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
                    #dcPuneChatWindow {
                        background: rgba(255, 255, 255, 0.85) !important;
                    }
                }
                
                @media print {
                    #dcPuneWidget { 
                        display: none !important; 
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
            
            console.log('✅ DC Pune WhatsApp Widget v5.0.0 initialized');
            console.log('🎨 Transparent UI with WhatsApp colors loaded');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
            // Auto pulse animation after 3 seconds
            setTimeout(() => {
                const btn = document.getElementById('dcPuneMainBtn');
                if (btn) {
                    btn.style.animation = 'pulse 0.5s ease-in-out 3';
                }
            }, 3000);
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneWidget = {
        version: '5.0.0',
        
        toggle: function() {
            const chatWindow = document.getElementById('dcPuneChatWindow');
            const notification = document.querySelector('#dcPuneMainBtn > div');
            
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
            const toggleText = document.getElementById('qrToggleText');
            const serviceButtons = document.querySelector('#dcPuneChatWindow > div:nth-child(2)');
            
            if (qrSection) {
                const isQRVisible = qrSection.style.display !== 'none';
                qrSection.style.display = isQRVisible ? 'none' : 'block';
                
                if (serviceButtons) {
                    serviceButtons.style.display = isQRVisible ? 'flex' : 'none';
                }
                
                if (toggleText) {
                    toggleText.textContent = isQRVisible ? 'Show QR' : 'Hide QR';
                }
            }
        },
        
        sendMessage: function(message) {
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
    
    // Close on click outside
    document.addEventListener('click', function(e) {
        const widget = document.getElementById('dcPuneWidget');
        const chatWindow = document.getElementById('dcPuneChatWindow');
        
        if (widget && !widget.contains(e.target) && chatWindow && chatWindow.style.display === 'block') {
            DCPuneWidget.hide();
        }
    });
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
