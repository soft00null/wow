/**
 * Divisional Commissioner Pune Professional WhatsApp AI Widget
 * Version: 6.0.0 - Government Professional UI with AI Focus
 * Author: WoW-Strategies Private Limited
 * Date: 2025-09-27
 */

(function() {
    'use strict';
    
    if (window.DCPuneAIWidget) return;
    
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi',
        organization: {
            name: 'Divisional Commissioner Pune',
            shortName: 'DC Pune AI Assistant',
            avatar: '🏛️',
            aiEmoji: '🤖',
            welcomeMessage: "Hi! I'm your DC Pune AI Assistant. I'm here 24/7 to help with government services. How can I assist you today?"
        },
        menuOptions: [
            { 
                label: 'Revenue Services',
                message: 'I need help with revenue services',
                color: '#25D366'
            },
            { 
                label: 'Certificates & Documents',
                message: 'I want to apply for certificates',
                color: '#25D366'
            },
            { 
                label: 'Government Schemes',
                message: 'Tell me about government schemes',
                color: '#25D366'
            },
            { 
                label: 'Lodge Complaint',
                message: 'I want to lodge a complaint',
                color: '#25D366'
            },
            { 
                label: 'Track Application',
                message: 'I want to track my application',
                color: '#25D366'
            },
            { 
                label: 'Contact DC Office',
                message: 'I need to contact DC office',
                color: '#25D366'
            }
        ],
        colors: {
            whatsappGreen: '#25D366',
            whatsappDark: '#075E54',
            whatsappLight: '#DCF8C6',
            textDark: '#303030',
            textLight: '#6B7280'
        }
    };
    
    // Auto popup configuration
    let hasShownPopup = false;
    let popupTimer = null;
    
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(whatsappUrl)}&color=075E54&bgcolor=ffffff`;
        
        return `
            <div id="dcPuneAIWidget" style="position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:'Segoe UI',system-ui,-apple-system,sans-serif">
                
                <!-- AI Indicator Animation -->
                <div id="aiIndicator" style="
                    position:fixed;
                    bottom:100px;
                    right:30px;
                    background:white;
                    padding:12px 18px;
                    border-radius:20px;
                    box-shadow:0 4px 15px rgba(0,0,0,0.15);
                    display:none;
                    animation:slideInRight 0.5s ease;
                    font-size:14px;
                    color:${config.colors.textDark};
                    font-weight:500;
                    white-space:nowrap;
                ">
                    <span style="animation:blink 1.5s infinite">🤖</span> AI Assistant is Online
                    <div style="
                        position:absolute;
                        bottom:-8px;
                        right:35px;
                        width:0;
                        height:0;
                        border-left:8px solid transparent;
                        border-right:8px solid transparent;
                        border-top:8px solid white;
                    "></div>
                </div>
                
                <!-- Main WhatsApp Button -->
                <button id="dcWhatsAppBtn" onclick="DCPuneAIWidget.toggle()" style="
                    width:60px;
                    height:60px;
                    border-radius:50%;
                    background:${config.colors.whatsappGreen};
                    border:none;
                    cursor:pointer;
                    box-shadow:0 4px 12px rgba(0,0,0,0.15);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    position:relative;
                    transition:all 0.3s ease;
                    animation:pulseGreen 2s infinite;
                ">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                    </svg>
                    <div id="aiDot" style="
                        position:absolute;
                        top:-2px;
                        right:-2px;
                        width:20px;
                        height:20px;
                        background:#FF3B30;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:9px;
                        font-weight:bold;
                        color:white;
                        border:2px solid white;
                        animation:bounce 2s infinite;
                    ">AI</div>
                </button>
                
                <!-- Professional Chat Window -->
                <div id="dcChatWindow" style="
                    display:none;
                    position:absolute;
                    bottom:80px;
                    right:0;
                    width:380px;
                    max-width:calc(100vw - 40px);
                    background:rgba(255,255,255,0.98);
                    backdrop-filter:blur(10px);
                    -webkit-backdrop-filter:blur(10px);
                    border-radius:16px;
                    box-shadow:0 10px 40px rgba(0,0,0,0.15);
                    overflow:hidden;
                    animation:slideUp 0.3s ease;
                    border:1px solid rgba(0,0,0,0.08);
                ">
                    
                    <!-- Header with Close -->
                    <div style="
                        padding:16px;
                        background:linear-gradient(135deg, rgba(37,211,102,0.05), rgba(255,255,255,0));
                        border-bottom:1px solid rgba(0,0,0,0.06);
                        position:relative;
                    ">
                        <button onclick="DCPuneAIWidget.close()" style="
                            position:absolute;
                            top:12px;
                            right:12px;
                            width:28px;
                            height:28px;
                            border-radius:50%;
                            background:rgba(0,0,0,0.04);
                            border:none;
                            cursor:pointer;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            transition:all 0.2s;
                            padding:0;
                        " onmouseover="this.style.background='rgba(0,0,0,0.08)'" onmouseout="this.style.background='rgba(0,0,0,0.04)'">
                            ×
                        </button>
                        
                        <div style="display:flex;align-items:center;gap:10px">
                            <div style="position:relative">
                                <span style="font-size:32px">${config.organization.avatar}</span>
                                <div style="
                                    position:absolute;
                                    bottom:0;
                                    right:0;
                                    width:12px;
                                    height:12px;
                                    background:#00E676;
                                    border-radius:50%;
                                    border:2px solid white;
                                    animation:pulse 2s infinite;
                                "></div>
                            </div>
                            <div>
                                <div style="font-size:16px;font-weight:600;color:${config.colors.textDark}">
                                    ${config.organization.aiEmoji} ${config.organization.shortName}
                                </div>
                                <div style="font-size:12px;color:${config.colors.textLight}">
                                    AI Powered • Available 24/7
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chat Body with Transparent Background -->
                    <div style="
                        padding:16px;
                        background:rgba(255,255,255,0.5);
                        max-height:420px;
                        overflow-y:auto;
                    ">
                        <!-- Welcome Message Bubble -->
                        <div style="
                            background:rgba(240,240,240,0.8);
                            padding:12px 16px;
                            border-radius:16px 16px 16px 4px;
                            margin-bottom:16px;
                            animation:fadeInUp 0.5s ease;
                        ">
                            <p style="margin:0;color:${config.colors.textDark};font-size:14px;line-height:1.5">
                                ${config.organization.welcomeMessage}
                            </p>
                        </div>
                        
                        <!-- Quick Actions Grid -->
                        <div id="menuOptions" style="
                            display:grid;
                            grid-template-columns:1fr 1fr;
                            gap:8px;
                            margin-bottom:16px;
                        ">
                            ${config.menuOptions.map((option, index) => `
                                <button 
                                    onclick="DCPuneAIWidget.selectOption('${option.message}')"
                                    style="
                                        padding:12px 10px;
                                        background:rgba(255,255,255,0.9);
                                        border:1.5px solid ${config.colors.whatsappGreen};
                                        border-radius:24px;
                                        color:${config.colors.textDark};
                                        font-size:13px;
                                        font-weight:500;
                                        cursor:pointer;
                                        transition:all 0.2s;
                                        animation:fadeInUp 0.5s ease ${0.1 * (index + 1)}s both;
                                        white-space:nowrap;
                                        overflow:hidden;
                                        text-overflow:ellipsis;
                                    "
                                    onmouseover="this.style.background='${config.colors.whatsappGreen}';this.style.color='white'"
                                    onmouseout="this.style.background='rgba(255,255,255,0.9)';this.style.color='${config.colors.textDark}'"
                                >
                                    ${option.label}
                                </button>
                            `).join('')}
                        </div>
                        
                        <!-- Show/Hide QR Toggle -->
                        <button id="qrToggleBtn" onclick="DCPuneAIWidget.toggleQR()" style="
                            width:100%;
                            padding:10px;
                            background:transparent;
                            border:1px solid rgba(0,0,0,0.1);
                            border-radius:8px;
                            color:${config.colors.textLight};
                            font-size:13px;
                            cursor:pointer;
                            transition:all 0.2s;
                            margin-bottom:12px;
                        " onmouseover="this.style.borderColor='${config.colors.whatsappGreen}';this.style.color='${config.colors.whatsappGreen}'" 
                           onmouseout="this.style.borderColor='rgba(0,0,0,0.1)';this.style.color='${config.colors.textLight}'">
                            Show QR Code
                        </button>
                        
                        <!-- QR Code Section -->
                        <div id="qrCodeSection" style="
                            display:none;
                            text-align:center;
                            padding:16px;
                            background:rgba(255,255,255,0.8);
                            border-radius:12px;
                            margin-bottom:12px;
                            animation:fadeIn 0.3s ease;
                        ">
                            <div style="color:${config.colors.whatsappGreen};font-weight:600;font-size:13px;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px">
                                Scan to Start
                            </div>
                            <img src="${qrCodeUrl}" alt="QR Code" style="width:160px;height:160px;border-radius:8px">
                            <div style="color:${config.colors.textLight};font-size:12px;margin-top:8px">
                                Open WhatsApp on your phone
                            </div>
                        </div>
                        
                        <!-- Start Chat Button -->
                        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">
                            <button style="
                                width:100%;
                                padding:14px;
                                background:${config.colors.whatsappGreen};
                                color:white;
                                border:none;
                                border-radius:24px;
                                font-size:15px;
                                font-weight:600;
                                cursor:pointer;
                                transition:all 0.2s;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                gap:8px;
                                animation:pulse 2s infinite;
                            " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                </svg>
                                Open WhatsApp Chat
                            </button>
                        </a>
                    </div>
                    
                    <!-- Footer -->
                    <div style="
                        padding:12px;
                        background:rgba(249,250,251,0.8);
                        border-top:1px solid rgba(0,0,0,0.06);
                        text-align:center;
                        font-size:11px;
                        color:${config.colors.textLight};
                    ">
                        Powered by <a href="https://wow-strategies.com/" target="_blank" rel="noopener" style="color:${config.colors.whatsappGreen};text-decoration:none;font-weight:600">WoW-Strategies</a>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes pulseGreen {
                    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                
                #dcWhatsAppBtn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                }
                
                #dcChatWindow::-webkit-scrollbar {
                    width: 5px;
                }
                
                #dcChatWindow::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                #dcChatWindow::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.2);
                    border-radius: 3px;
                }
                
                @media (max-width: 420px) {
                    #dcChatWindow {
                        width: calc(100vw - 20px) !important;
                        right: -10px !important;
                        bottom: 70px !important;
                    }
                    
                    #menuOptions {
                        grid-template-columns: 1fr !important;
                    }
                }
                
                @media print {
                    #dcPuneAIWidget { display: none !important; }
                }
            </style>
        `;
    };
    
    // Initialize widget
    const initWidget = () => {
        const container = document.createElement('div');
        container.innerHTML = createWidget();
        document.body.appendChild(container.firstElementChild);
        
        // Auto show popup after 5 seconds
        popupTimer = setTimeout(() => {
            if (!hasShownPopup) {
                showAIIndicator();
                hasShownPopup = true;
            }
        }, 5000);
        
        // Show AI indicator periodically
        setInterval(() => {
            if (document.getElementById('dcChatWindow').style.display === 'none') {
                showAIIndicator();
            }
        }, 30000);
    };
    
    // Show AI indicator
    const showAIIndicator = () => {
        const indicator = document.getElementById('aiIndicator');
        if (indicator) {
            indicator.style.display = 'block';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 5000);
        }
    };
    
    // Public API
    window.DCPuneAIWidget = {
        toggle: function() {
            const chat = document.getElementById('dcChatWindow');
            const indicator = document.getElementById('aiIndicator');
            const aiDot = document.getElementById('aiDot');
            
            if (chat) {
                const isVisible = chat.style.display === 'block';
                chat.style.display = isVisible ? 'none' : 'block';
                
                if (!isVisible) {
                    if (indicator) indicator.style.display = 'none';
                    if (aiDot) aiDot.style.display = 'none';
                    localStorage.setItem('dcPuneWidgetOpened', 'true');
                }
            }
        },
        
        close: function() {
            const chat = document.getElementById('dcChatWindow');
            if (chat) chat.style.display = 'none';
        },
        
        toggleQR: function() {
            const qr = document.getElementById('qrCodeSection');
            const menu = document.getElementById('menuOptions');
            const btn = document.getElementById('qrToggleBtn');
            
            if (qr && menu) {
                const isQRVisible = qr.style.display === 'block';
                qr.style.display = isQRVisible ? 'none' : 'block';
                menu.style.display = isQRVisible ? 'grid' : 'none';
                if (btn) btn.textContent = isQRVisible ? 'Show QR Code' : 'Hide QR Code';
            }
        },
        
        selectOption: function(message) {
            const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (popupTimer) clearTimeout(popupTimer);
    });
})();
