/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget.js
 * Version: 4.0.0 - Professional Government AI Assistant
 * Date: 2025-09-27
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dcp-widget.js
 * 
 * Professional Government AI Chatbot with Enhanced UX
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
            tagline: 'AI-Powered Citizen Services',
            taglineMarathi: 'AI-संचालित नागरिक सेवा'
        },
        position: 'bottom-right',
        autoShow: true,
        showDelay: 3000,
        colors: {
            primary: '#6366F1',      // Professional purple
            secondary: '#8B5CF6',    // Lighter purple
            success: '#10B981',      // Green
            text: '#1F2937',
            lightBg: '#F9FAFB',
            white: '#FFFFFF',
            gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
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
                
                // Government office hours: Mon-Fri 10:00-17:30
                if (day === 0 || day === 6) return false; // Weekend
                return currentTime >= 1000 && currentTime <= 1730;
            } catch (error) {
                return true;
            }
        },
        
        generateQRCode: (text) => {
            const qrSize = 200;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}&bgcolor=FFFFFF&color=6366F1&margin=2`;
            return qrUrl;
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const statusText = isOfficeOpen ? 'Available' : 'After Hours';
        const statusColor = isOfficeOpen ? config.colors.success : '#F59E0B';
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
        
        const widgetHTML = `
            <!-- Main Container -->
            <div class="dcp-widget" style="position:fixed;bottom:20px;right:20px;z-index:999999;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                
                <!-- Floating Action Button -->
                <button class="dcp-fab" onclick="toggleDCPChat()" style="width:70px;height:70px;background:${config.colors.gradient};border-radius:35px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 30px rgba(99,102,241,0.35);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none;overflow:visible">
                    <div class="dcp-fab-icon" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" style="transition:transform 0.3s ease">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.61 13.61c-.24.67-.94 1.24-1.54 1.4-.39.1-1 .19-2.91-.62-2.43-.99-3.98-3.46-4.1-3.62-.12-.15-1-1.33-1-2.54 0-1.21.63-1.8.85-2.05.23-.24.49-.3.65-.3h.47c.15 0 .36-.06.56.43.24.54.76 1.86.83 2 .07.13.12.3.02.48-.1.19-.15.3-.3.47-.15.16-.31.35-.44.47-.14.13-.29.27-.12.53.17.25.74 1.22 1.58 1.97 1.09.97 2 1.27 2.28 1.41.28.14.45.12.61-.07.17-.2.7-.82.89-1.1.19-.28.38-.23.63-.14.26.1 1.62.77 1.9.91.28.14.47.21.54.33.07.12.07.69-.17 1.36z"/>
                        </svg>
                    </div>
                    <div class="dcp-ai-badge" style="position:absolute;top:-5px;right:-5px;background:#EF4444;color:white;border-radius:12px;padding:3px 8px;font-size:10px;font-weight:700;display:flex;align-items:center;gap:3px;animation:pulseGlow 2s infinite;box-shadow:0 2px 8px rgba(239,68,68,0.4);border:2px solid white">
                        <span style="animation:blink 1.5s infinite">●</span> AI
                    </div>
                </button>
                
                <!-- Chat Window -->
                <div class="dcp-chat" id="dcpChat" style="position:absolute;bottom:90px;right:0;width:420px;max-width:calc(100vw - 40px);background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.15);transform:translateY(20px) scale(0.95);opacity:0;visibility:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);overflow:hidden;display:flex;flex-direction:column">
                    
                    <!-- Header -->
                    <div class="dcp-header" style="background:${config.colors.gradient};padding:20px;position:relative;color:white">
                        <!-- Status Indicator -->
                        <div style="position:absolute;top:20px;right:60px;background:${statusColor};padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:4px">
                            <span style="width:6px;height:6px;background:white;border-radius:50%;display:inline-block;animation:${isOfficeOpen ? 'pulse' : 'none'} 2s infinite"></span>
                            ${statusText}
                        </div>
                        
                        <!-- Close Button -->
                        <button onclick="toggleDCPChat()" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">✕</button>
                        
                        <!-- Title -->
                        <div style="display:flex;align-items:center;gap:12px">
                            <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px">
                                🤖
                            </div>
                            <div>
                                <div style="font-size:18px;font-weight:700;margin-bottom:2px">
                                    ${config.organization.nameMarathi}
                                </div>
                                <div style="font-size:13px;opacity:0.9">
                                    ${config.organization.name} • AI Assistant
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Welcome Message -->
                    <div class="dcp-welcome" style="padding:20px;background:${config.colors.lightBg};border-bottom:1px solid #E5E7EB">
                        <div style="background:white;border-radius:16px;padding:16px;position:relative;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                            <div style="position:absolute;top:16px;left:16px;width:8px;height:8px;background:${config.colors.success};border-radius:50%;animation:pulse 2s infinite"></div>
                            <div style="margin-left:24px">
                                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                                    <span style="font-size:20px">👋</span>
                                    <span style="font-weight:600;color:${config.colors.text}">नमस्कार! Hello!</span>
                                </div>
                                <div style="font-size:14px;color:#6B7280;line-height:1.6">
                                    I'm your AI assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, information, and queries. How can I assist you today?
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="dcp-actions" style="padding:20px;display:flex;flex-direction:column;gap:12px">
                        <div style="font-size:14px;font-weight:600;color:#6B7280;margin-bottom:4px">Quick Actions</div>
                        
                        <!-- Service Information -->
                        <button onclick="sendQuickMessage('I need information about government services')" style="display:flex;align-items:center;gap:12px;padding:14px;background:white;border:2px solid #E5E7EB;border-radius:12px;cursor:pointer;transition:all 0.3s ease;text-align:left;width:100%;outline:none" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F3F4F6'" onmouseout="this.style.borderColor='#E5E7EB';this.style.background='white'">
                            <div style="width:40px;height:40px;background:${config.colors.gradient};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                                <span style="font-size:20px">📋</span>
                            </div>
                            <div style="flex:1">
                                <div style="font-size:15px;font-weight:600;color:${config.colors.text};margin-bottom:2px">Government Services</div>
                                <div style="font-size:12px;color:#6B7280">Get information about services</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="${config.colors.primary}" style="flex-shrink:0">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        
                        <!-- Document Status -->
                        <button onclick="sendQuickMessage('I want to check document or application status')" style="display:flex;align-items:center;gap:12px;padding:14px;background:white;border:2px solid #E5E7EB;border-radius:12px;cursor:pointer;transition:all 0.3s ease;text-align:left;width:100%;outline:none" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F3F4F6'" onmouseout="this.style.borderColor='#E5E7EB';this.style.background='white'">
                            <div style="width:40px;height:40px;background:${config.colors.gradient};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                                <span style="font-size:20px">📄</span>
                            </div>
                            <div style="flex:1">
                                <div style="font-size:15px;font-weight:600;color:${config.colors.text};margin-bottom:2px">Document Status</div>
                                <div style="font-size:12px;color:#6B7280">Track applications & documents</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="${config.colors.primary}" style="flex-shrink:0">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        
                        <!-- General Query -->
                        <button onclick="sendQuickMessage('I have a general query')" style="display:flex;align-items:center;gap:12px;padding:14px;background:white;border:2px solid #E5E7EB;border-radius:12px;cursor:pointer;transition:all 0.3s ease;text-align:left;width:100%;outline:none" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F3F4F6'" onmouseout="this.style.borderColor='#E5E7EB';this.style.background='white'">
                            <div style="width:40px;height:40px;background:${config.colors.gradient};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                                <span style="font-size:20px">💬</span>
                            </div>
                            <div style="flex:1">
                                <div style="font-size:15px;font-weight:600;color:${config.colors.text};margin-bottom:2px">General Queries</div>
                                <div style="font-size:12px;color:#6B7280">Ask any question</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="${config.colors.primary}" style="flex-shrink:0">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- QR Code Section (Initially Hidden) -->
                    <div class="dcp-qr-section" id="dcpQRSection" style="padding:20px;background:white;border-top:1px solid #E5E7EB;display:none">
                        <div style="text-align:center">
                            <div style="font-size:14px;font-weight:600;color:${config.colors.text};margin-bottom:16px">
                                SCAN TO START • स्कॅन करा
                            </div>
                            <div id="dcp-qr-container" style="display:inline-block;padding:16px;background:white;border:2px solid #E5E7EB;border-radius:16px">
                                <img src="${utils.generateQRCode(whatsappUrl)}" alt="QR Code" style="width:180px;height:180px;display:block">
                            </div>
                            <div style="font-size:12px;color:#6B7280;margin-top:12px;line-height:1.5">
                                Open WhatsApp → Tap Menu → Scan QR Code
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chat Options -->
                    <div style="padding:20px;padding-top:0">
                        <div style="display:flex;gap:8px">
                            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;background:${config.colors.gradient};color:white;border-radius:12px;text-decoration:none;font-weight:600;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(99,102,241,0.25)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(99,102,241,0.35)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(99,102,241,0.25)'">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Start Chat
                            </a>
                            <button onclick="toggleQRCode()" style="width:50px;height:50px;background:white;border:2px solid #E5E7EB;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;flex-shrink:0" onmouseover="this.style.borderColor='${config.colors.primary}';this.style.background='#F3F4F6'" onmouseout="this.style.borderColor='#E5E7EB';this.style.background='white'">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="${config.colors.primary}">
                                    <path d="M3 3h6v6H3V3m8 0h10v2H11V3m0 8h10v2H11v-2m0 8h10v2H11v-2M3 11h6v10H3V11m2 2v6h2v-6H5M5 5v2h2V5H5z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding:16px;background:${config.colors.lightBg};border-top:1px solid #E5E7EB;text-align:center">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:#6B7280;text-decoration:none;font-size:12px;transition:color 0.3s ease;display:inline-flex;align-items:center;gap:6px" onmouseover="this.style.color='${config.colors.primary}'" onmouseout="this.style.color='#6B7280'">
                            <span style="font-size:14px">⚡</span>
                            Powered by ${config.poweredBy.text}
                        </a>
                    </div>
                </div>
                
                <!-- Welcome Tooltip (Shows once) -->
                <div class="dcp-tooltip" id="dcpTooltip" style="position:absolute;bottom:90px;right:10px;background:${config.colors.text};color:white;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:500;opacity:0;visibility:hidden;transition:all 0.4s ease;white-space:nowrap;box-shadow:0 4px 15px rgba(0,0,0,0.2);max-width:250px">
                    <div style="position:absolute;bottom:-6px;right:30px;width:12px;height:12px;background:${config.colors.text};transform:rotate(45deg)"></div>
                    👋 Need help? Click here to chat with AI Assistant
                </div>
            </div>
            
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                @keyframes pulseGlow {
                    0%, 100% { transform: scale(1); box-shadow: 0 2px 8px rgba(239,68,68,0.4); }
                    50% { transform: scale(1.05); box-shadow: 0 4px 12px rgba(239,68,68,0.6); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
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
                
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                .dcp-fab {
                    animation: bounceIn 0.6s ease;
                }
                
                .dcp-fab:hover {
                    transform: scale(1.1) !important;
                    box-shadow: 0 12px 40px rgba(99,102,241,0.45) !important;
                }
                
                .dcp-fab:hover svg {
                    transform: rotate(10deg) !important;
                }
                
                .dcp-chat.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) scale(1) !important;
                }
                
                @media (max-width: 480px) {
                    .dcp-chat {
                        width: calc(100vw - 20px) !important;
                        right: -10px !important;
                        bottom: 80px !important;
                    }
                    
                    .dcp-fab {
                        width: 60px !important;
                        height: 60px !important;
                    }
                    
                    .dcp-fab svg {
                        width: 28px !important;
                        height: 28px !important;
                    }
                }
                
                @media print {
                    .dcp-widget {
                        display: none !important;
                    }
                }
                
                /* Smooth scrollbar for chat area */
                .dcp-chat::-webkit-scrollbar {
                    width: 6px;
                }
                
                .dcp-chat::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .dcp-chat::-webkit-scrollbar-thumb {
                    background: #CBD5E1;
                    border-radius: 3px;
                }
                
                .dcp-chat::-webkit-scrollbar-thumb:hover {
                    background: #94A3B8;
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
            
            // Auto-show tooltip after delay
            if (config.autoShow) {
                setTimeout(() => {
                    const hasShown = localStorage.getItem('dcp_tooltip_shown');
                    if (!hasShown) {
                        showTooltip();
                        localStorage.setItem('dcp_tooltip_shown', 'true');
                    }
                }, config.showDelay);
            }
            
            // Animate FAB on load
            setTimeout(() => {
                const fab = document.querySelector('.dcp-fab');
                if (fab) {
                    fab.style.animation = 'pulseGlow 2s ease-in-out 3';
                }
            }, 1000);
            
            console.log('🚀 DCP WhatsApp Widget v4.0.0 initialized');
            console.log('🤖 AI-Powered Government Chatbot Ready');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DCP Widget initialization failed:', error);
        }
    };
    
    // Toggle chat window
    window.toggleDCPChat = function() {
        try {
            const chat = document.getElementById('dcpChat');
            const tooltip = document.getElementById('dcpTooltip');
            if (!chat) return;
            
            chat.classList.toggle('active');
            
            // Hide tooltip when chat opens
            if (chat.classList.contains('active') && tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
            
            // Hide AI badge when chat is open
            const badge = document.querySelector('.dcp-ai-badge');
            if (badge) {
                badge.style.display = chat.classList.contains('active') ? 'none' : 'flex';
            }
        } catch (error) {
            console.error('Toggle chat failed:', error);
        }
    };
    
    // Show tooltip
    function showTooltip() {
        const tooltip = document.getElementById('dcpTooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }, 8000);
        }
    }
    
    // Toggle QR code visibility
    window.toggleQRCode = function() {
        const qrSection = document.getElementById('dcpQRSection');
        if (qrSection) {
            qrSection.style.display = qrSection.style.display === 'none' ? 'block' : 'none';
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
            const fab = document.querySelector('.dcp-fab');
            
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
        version: '4.0.0',
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
        showTooltip: () => showTooltip()
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
