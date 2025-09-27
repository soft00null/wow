/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget-perfect.js
 * Version: 8.0.0 - Pixel-Perfect Government AI Assistant
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dcp-widget.js
 * 
 * Exact UI Match with Full Transparency
 */

(function() {
    'use strict';
    
    if (window.DCPWidget) {
        console.warn('DCP Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi',
        organization: {
            title: 'विभागीय आयुक्त पुणे',
            subtitle: 'Divisional Commissioner Pune',
            greeting: "🏛️💜 Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, documents, and queries. How can I support you today?"
        },
        colors: {
            // Exact colors from reference
            purple: '#6B5CF6',
            purpleBorder: '#8B7CF6',
            purpleHover: '#F5F3FF',
            white: '#FFFFFF',
            text: '#2C2C2C',
            textLight: '#6B7280',
            transparent: 'rgba(242, 242, 247, 0.72)',
            glassBg: 'rgba(255, 255, 255, 0.65)',
            shadow: 'rgba(0, 0, 0, 0.12)',
            shadowLight: 'rgba(0, 0, 0, 0.06)'
        }
    };
    
    const createWidget = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        
        const widgetHTML = `
            <!-- Widget Container -->
            <div id="dcp-widget-root" style="position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif">
                
                <!-- Purple Circle Button (Exact Match) -->
                <button id="dcp-main-btn" onclick="DCPWidget.toggle()" style="width:64px;height:64px;background:${config.colors.purple};border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px ${config.colors.shadow};border:none;outline:none;position:relative;transition:all 0.3s ease">
                    <!-- WhatsApp Icon -->
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.473.641 4.796 1.765 6.817L2.013 29.5l6.869-1.801A13.905 13.905 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.081 19.349c-.318.895-1.572 1.63-2.205 1.734-.586.095-1.336.136-2.155-.135-.495-.164-1.13-.382-1.947-.749-3.425-1.54-5.652-4.914-5.822-5.141-.165-.227-1.387-1.845-1.387-3.518 0-1.673.876-2.495 1.187-2.835.311-.34.681-.425.906-.425h.652c.208 0 .489-.079.766.585.285.683.969 2.367 1.054 2.541.085.173.142.375.028.602-.114.232-.171.375-.34.58-.17.204-.358.456-.51.613-.17.17-.346.353-.149.693.198.335.881 1.454 1.892 2.354 1.302 1.158 2.402 1.518 2.742 1.689.34.17.54.142.737-.085.203-.232.82-.956 1.04-1.284.22-.329.439-.273.737-.165.302.114 1.908.9 2.235 1.063.328.165.547.248.632.379.085.131.085.766-.198 1.505z"/>
                    </svg>
                    <!-- AI Badge (Red dot) -->
                    <span style="position:absolute;top:0;right:0;width:20px;height:20px;background:#FF3B30;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:white">AI</span>
                </button>
                
                <!-- Chat Popup (Exact Match to Reference) -->
                <div id="dcp-chat-popup" style="position:absolute;bottom:80px;right:0;width:360px;background:${config.colors.transparent};backdrop-filter:blur(30px) saturate(120%);-webkit-backdrop-filter:blur(30px) saturate(120%);border-radius:18px;box-shadow:0 10px 40px ${config.colors.shadow};opacity:0;visibility:hidden;transform:scale(0.9) translateY(10px);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);pointer-events:none;overflow:hidden;border:0.5px solid rgba(255,255,255,0.18)">
                    
                    <!-- Close Button -->
                    <button onclick="DCPWidget.toggle()" style="position:absolute;top:12px;right:12px;width:28px;height:28px;background:rgba(0,0,0,0.06);backdrop-filter:blur(20px);border-radius:50%;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:all 0.2s" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='rgba(0,0,0,0.06)'">
                        <span style="font-size:18px;color:#6B7280;font-weight:300">×</span>
                    </button>
                    
                    <!-- Content Container -->
                    <div style="padding:20px">
                        <!-- Welcome Message (White bubble like reference) -->
                        <div style="background:white;border-radius:18px 18px 4px 18px;padding:16px;margin-bottom:20px;box-shadow:0 2px 12px ${config.colors.shadowLight}">
                            <div style="font-size:14px;color:${config.colors.text};line-height:1.6">
                                ${config.organization.greeting}
                            </div>
                        </div>
                        
                        <!-- Menu Buttons Container (Exact match to reference) -->
                        <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-end">
                            
                            <!-- Administrative Button -->
                            <button onclick="DCPWidget.send('I need help with Administrative services')" style="padding:12px 24px;background:white;border:1.5px solid ${config.colors.purpleBorder};border-radius:24px;color:${config.colors.purple};font-size:15px;font-weight:500;cursor:pointer;transition:all 0.2s;outline:none;white-space:nowrap;box-shadow:0 2px 8px ${config.colors.shadowLight}" onmouseover="this.style.background='${config.colors.purpleHover}';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                                Administrative
                            </button>
                            
                            <!-- Departments Button -->
                            <button onclick="DCPWidget.send('Show me government departments')" style="padding:12px 24px;background:white;border:1.5px solid ${config.colors.purpleBorder};border-radius:24px;color:${config.colors.purple};font-size:15px;font-weight:500;cursor:pointer;transition:all 0.2s;outline:none;white-space:nowrap;box-shadow:0 2px 8px ${config.colors.shadowLight}" onmouseover="this.style.background='${config.colors.purpleHover}';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                                Departments
                            </button>
                            
                            <!-- Schemes Button -->
                            <button onclick="DCPWidget.send('Tell me about government schemes')" style="padding:12px 24px;background:white;border:1.5px solid ${config.colors.purpleBorder};border-radius:24px;color:${config.colors.purple};font-size:15px;font-weight:500;cursor:pointer;transition:all 0.2s;outline:none;white-space:nowrap;box-shadow:0 2px 8px ${config.colors.shadowLight}" onmouseover="this.style.background='${config.colors.purpleHover}';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                                Schemes
                            </button>
                            
                            <!-- Contact Button -->
                            <button onclick="DCPWidget.send('I need contact information')" style="padding:12px 24px;background:white;border:1.5px solid ${config.colors.purpleBorder};border-radius:24px;color:${config.colors.purple};font-size:15px;font-weight:500;cursor:pointer;transition:all 0.2s;outline:none;white-space:nowrap;box-shadow:0 2px 8px ${config.colors.shadowLight}" onmouseover="this.style.background='${config.colors.purpleHover}';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='white';this.style.transform='translateY(0)'">
                                Contact
                            </button>
                        </div>
                        
                        <!-- Show QR Link -->
                        <div style="text-align:center;margin-top:20px">
                            <button onclick="DCPWidget.toggleQR()" id="qr-toggle" style="color:${config.colors.purple};background:none;border:none;font-size:13px;font-weight:500;cursor:pointer;padding:8px;text-decoration:none;transition:all 0.2s" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                                Hide QR
                            </button>
                        </div>
                        
                        <!-- QR Code Section -->
                        <div id="qr-section" style="margin-top:16px;padding:20px;background:white;border-radius:16px;text-align:center;box-shadow:0 2px 12px ${config.colors.shadowLight}">
                            <div style="font-size:13px;font-weight:600;color:${config.colors.purple};margin-bottom:12px;text-transform:uppercase;letter-spacing:0.8px">
                                SCAN TO START
                            </div>
                            <div style="display:inline-block;padding:12px;background:white;border:1px solid #E5E7EB;border-radius:12px">
                                <div id="qr-code" style="width:160px;height:160px;background:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDwhLS0gU2ltcGxpZmllZCBRUiBwYXR0ZXJuIC0tPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI1Q0Y2Ii8+CiAgPHJlY3QgeD0iMTEwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI1Q0Y2Ii8+CiAgPHJlY3QgeD0iMTAiIHk9IjExMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI1Q0Y2Ii8+CiAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCB4PSIxMjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmZmZmYiLz4KICA8IS0tIENlbnRlciBwYXR0ZXJuIC0tPgogIDxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI1Q0Y2Ii8+CiAgPHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCB4PSI3NSIgeT0iNzUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzZCNUNGNiIvPgo8L3N2Zz4=') center/cover"></div>
                            </div>
                            <div style="font-size:12px;color:${config.colors.textLight};margin-top:12px">
                                Open on your phone
                            </div>
                        </div>
                        
                        <!-- Powered By -->
                        <div style="text-align:center;margin-top:16px;padding-top:16px;border-top:1px solid rgba(0,0,0,0.06)">
                            <a href="https://wow-strategies.com" target="_blank" style="color:${config.colors.textLight};font-size:11px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;transition:color 0.2s" onmouseover="this.style.color='${config.colors.purple}'" onmouseout="this.style.color='${config.colors.textLight}'">
                                Powered by WoW-Strategies Private Limited ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Styles -->
            <style>
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                #dcp-main-btn {
                    animation: fadeInUp 0.5s ease;
                }
                
                #dcp-main-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(107, 92, 246, 0.3);
                }
                
                #dcp-chat-popup.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: scale(1) translateY(0) !important;
                    pointer-events: auto !important;
                }
                
                @media (max-width: 480px) {
                    #dcp-chat-popup {
                        width: calc(100vw - 40px) !important;
                        right: -10px !important;
                    }
                }
                
                @media print {
                    #dcp-widget-root {
                        display: none !important;
                    }
                }
            </style>
        `;
        
        return widgetHTML;
    };
    
    // Initialize
    const init = () => {
        let container = document.getElementById('dcp-widget-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'dcp-widget-container';
            document.body.appendChild(container);
        }
        container.innerHTML = createWidget();
        
        // Auto show popup after delay
        setTimeout(() => {
            const popup = document.getElementById('dcp-chat-popup');
            if (popup && !sessionStorage.getItem('dcp_shown')) {
                popup.classList.add('active');
                sessionStorage.setItem('dcp_shown', 'true');
            }
        }, 2000);
    };
    
    // Public API
    window.DCPWidget = {
        toggle: function() {
            const popup = document.getElementById('dcp-chat-popup');
            if (popup) {
                popup.classList.toggle('active');
            }
        },
        
        send: function(message) {
            const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        },
        
        toggleQR: function() {
            const qr = document.getElementById('qr-section');
            const toggle = document.getElementById('qr-toggle');
            if (qr && toggle) {
                if (qr.style.display === 'none') {
                    qr.style.display = 'block';
                    toggle.textContent = 'Hide QR';
                } else {
                    qr.style.display = 'none';
                    toggle.textContent = 'Show QR';
                }
            }
        }
    };
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('dcp-chat-popup');
        const btn = document.getElementById('dcp-main-btn');
        if (popup && btn && !popup.contains(e.target) && !btn.contains(e.target)) {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        }
    });
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
