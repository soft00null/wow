/**
 * Pune Zilla Panchayat WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 1.0.0
 * Simple & Clean Implementation
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ZPPWidget) {
        console.warn('ZPP Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '912026134806',
        message: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे. / Hello! I need information about Pune Zilla Panchayat services.',
        qrApiUrl: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        position: 'bottom-right',
        autoShow: true,
        showNotification: true,
        
        // Pune ZP Theme Colors
        primaryColor: '#FF6B35',    // ZP Orange
        secondaryColor: '#2E8B57',  // Government Green
        accentColor: '#1565C0'      // Blue
    };

    // Get current IST time and check office hours
    function isOfficeOpen() {
        try {
            const now = new Date();
            const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
            const day = istTime.getDay(); // 0=Sunday, 1=Monday, etc.
            const hour = istTime.getHours();
            
            // Monday to Friday: 10 AM - 6 PM
            if (day >= 1 && day <= 5) {
                return hour >= 10 && hour < 18;
            }
            // Saturday: 10 AM - 2 PM
            if (day === 6) {
                return hour >= 10 && hour < 14;
            }
            // Sunday: Closed
            return false;
        } catch (error) {
            return true; // Default to open if check fails
        }
    }

    // Create widget HTML
    const officeStatus = isOfficeOpen();
    const statusText = officeStatus ? 'सक्रिय / Online' : 'बंद / Offline';
    const statusColor = officeStatus ? '#4CAF50' : '#FF9800';
    
    const widgetHTML = `
        <div class="zpp-widget" style="position:fixed;${config.position.includes('bottom')?'bottom':'top'}:20px;${config.position.includes('right')?'right':'left'}:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
            <div class="zpp-button" onclick="toggleZPPModal()" style="width:64px;height:64px;background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 24px rgba(255,107,53,0.4);transition:all 0.3s ease;position:relative;border:none;outline:none;">
                <div style="font-size:28px;color:white;transition:transform 0.3s ease;">💬</div>
                ${config.showNotification ? `<div style="position:absolute;top:-6px;right:-6px;background:#FF3333;color:white;border-radius:50%;width:22px;height:22px;font-size:10px;font-weight:bold;display:flex;align-items:center;justify-content:center;animation:zppPulse 2s infinite;border:2px solid white;">AI</div>` : ''}
            </div>
            <div class="zpp-modal" id="zppModal" style="position:absolute;${config.position.includes('bottom')?'bottom':'top'}:80px;${config.position.includes('right')?'right':'left'}:0;width:380px;max-width:calc(100vw - 40px);background:white;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.3);transform:translateY(20px) scale(0.9);opacity:0;visibility:hidden;transition:all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);overflow:hidden;border:1px solid rgba(255,107,53,0.2)">
                
                <!-- Header -->
                <div style="background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});color:white;padding:24px;position:relative;overflow:hidden;">
                    <div style="position:absolute;top:20px;right:20px;background:${statusColor};color:white;padding:4px 8px;border-radius:12px;font-size:10px;font-weight:600;text-transform:uppercase;">${statusText}</div>
                    <div style="position:relative;z-index:1;">
                        <div style="font-size:20px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:10px;">
                            🤖 पुणे जिप AI सहाय्यक
                        </div>
                        <div style="font-size:14px;opacity:0.95;line-height:1.5;">
                            पुणे जिल्हा परिषद | Pune Zilla Panchayat<br>
                            सेवा • पारदर्शकता • जबाबदारी
                        </div>
                    </div>
                    <button onclick="toggleZPPModal()" style="position:absolute;top:50%;right:60px;transform:translateY(-50%);background:rgba(255,255,255,0.2);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;">×</button>
                </div>
                
                <!-- Body -->
                <div style="padding:24px;background:#fafbfc;">
                    <!-- Chat Options -->
                    <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px;">
                        <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:16px;padding:20px;background:white;border:2px solid #e1e5e9;border-radius:16px;text-decoration:none;color:#2c3e50;transition:all 0.3s ease;position:relative;overflow:hidden;" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#fff8f5';this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 32px rgba(255,107,53,0.15)'" onmouseout="this.style.borderColor='#e1e5e9';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                            <div style="font-size:32px;width:48px;text-align:center;color:${config.primaryColor};flex-shrink:0;">📱</div>
                            <div>
                                <div style="font-size:16px;font-weight:600;color:#2c3e50;margin-bottom:4px;">मोबाइल चॅट | Mobile Chat</div>
                                <div style="font-size:13px;color:#6c757d;line-height:1.4;">तुमच्या स्मार्टफोनवर AI चॅटबॉटशी संवाد साधा</div>
                            </div>
                        </a>
                        
                        <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:16px;padding:20px;background:white;border:2px solid #e1e5e9;border-radius:16px;text-decoration:none;color:#2c3e50;transition:all 0.3s ease;position:relative;overflow:hidden;" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#fff8f5';this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 32px rgba(255,107,53,0.15)'" onmouseout="this.style.borderColor='#e1e5e9';this.style.background='white';this.style.transform='translateY(0)';this.style.boxShadow='none'">
                            <div style="font-size:32px;width:48px;text-align:center;color:${config.primaryColor};flex-shrink:0;">💻</div>
                            <div>
                                <div style="font-size:16px;font-weight:600;color:#2c3e50;margin-bottom:4px;">वेब चॅट | Web Chat</div>
                                <div style="font-size:13px;color:#6c757d;line-height:1.4;">संगणकावर WhatsApp Web द्वारे चॅट करा</div>
                            </div>
                        </a>
                    </div>
                    
                    <!-- QR Code Section -->
                    <div style="background:white;border-radius:20px;padding:24px;text-align:center;border:2px solid #e1e5e9;">
                        <div style="font-size:16px;font-weight:600;color:#2c3e50;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:8px;">
                            📱 QR कोड स्कॅन करा | Scan QR Code
                        </div>
                        <div style="display:inline-block;padding:16px;background:#f8f9fa;border-radius:20px;transition:transform 0.3s ease;border:3px dashed #dee2e6;" onmouseover="this.style.transform='scale(1.05)';this.style.borderColor='${config.primaryColor}';this.style.background='#fff8f5'" onmouseout="this.style.transform='scale(1)';this.style.borderColor='#dee2e6';this.style.background='#f8f9fa'">
                            <img src="${config.qrApiUrl}${encodeURIComponent('https://wa.me/' + config.phoneNumber + '?text=' + config.message)}" alt="Pune ZP WhatsApp QR Code" style="width:140px;height:140px;border-radius:12px;display:block;" loading="lazy" onerror="this.style.display='none';">
                        </div>
                        <div style="font-size:12px;color:#6c757d;margin-top:16px;line-height:1.5;max-width:280px;margin-left:auto;margin-right:auto;">
                            <strong>स्कॅन करण्याचे टप्पे:</strong><br>
                            WhatsApp उघडा → मेनू → QR स्कॅन करा<br>
                            <em>Open WhatsApp → Menu → Scan QR Code</em>
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="padding:20px 24px;background:#f1f3f4;border-top:1px solid #e1e5e9;text-align:center;font-size:12px;color:#6c757d;line-height:1.4;">
                    <strong style="color:#2c3e50;">🕒 कार्यालयीन वेळ | Office Hours:</strong><br>
                    सोम-शुक्र 10:00 AM - 6:00 PM, शनि 10:00 AM - 2:00 PM<br>
                    Mon-Fri 10:00 AM - 6:00 PM, Sat 10:00 AM - 2:00 PM
                </div>
            </div>
        </div>
        
        <style>
            @keyframes zppPulse { 
                0%, 100% { transform: scale(1); opacity: 1; } 
                50% { transform: scale(1.2); opacity: 0.8; } 
            }
            
            .zpp-button:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 8px 32px rgba(255,107,53,0.6) !important;
            }
            
            .zpp-button:active {
                transform: scale(0.95) !important;
            }
            
            @media (max-width: 480px) { 
                .zpp-widget {
                    ${config.position.includes('right') ? 'right' : 'left'}: 16px !important;
                    bottom: 16px !important;
                }
                .zpp-modal {
                    width: calc(100vw - 32px) !important;
                    ${config.position.includes('right') ? 'right' : 'left'}: -8px !important;
                }
                .zpp-button {
                    width: 56px !important;
                    height: 56px !important;
                }
                .zpp-button div {
                    font-size: 24px !important;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .zpp-button, .zpp-modal, * {
                    transition: none !important;
                    animation: none !important;
                }
            }
            
            @media print {
                .zpp-widget {
                    display: none !important;
                }
            }
        </style>
    `;

    // Create container and insert widget
    let container = document.getElementById('whatsapp-chat-widget');
    if (!container) {
        container = document.createElement('div');
        container.id = 'whatsapp-chat-widget';
        document.body.appendChild(container);
    }
    container.innerHTML = widgetHTML;

    // Toggle function
    window.toggleZPPModal = function() {
        const modal = document.getElementById('zppModal');
        const isActive = modal.style.opacity === '1';
        
        if (isActive) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            modal.style.transform = 'translateY(20px) scale(0.9)';
        } else {
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            modal.style.transform = 'translateY(0) scale(1)';
        }
        
        // Analytics tracking
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', isActive ? 'zpp_modal_closed' : 'zpp_modal_opened', {
                    event_category: 'ZPP_WhatsApp_Widget',
                    event_label: 'user_interaction'
                });
            }
        } catch (e) {}
    };

    // Click outside to close
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('zppModal');
        const widget = document.querySelector('.zpp-widget');
        
        if (modal && widget && !widget.contains(e.target) && modal.style.opacity === '1') {
            toggleZPPModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity === '1') {
                toggleZPPModal();
            }
        }
    });

    // Auto-show animation for first-time visitors
    if (config.autoShow) {
        const hasSeenWidget = localStorage.getItem('zpp_widget_seen') || sessionStorage.getItem('zpp_widget_seen');
        
        if (!hasSeenWidget) {
            setTimeout(() => {
                const button = document.querySelector('.zpp-button');
                if (button) {
                    button.style.animation = 'zppPulse 1.5s ease-in-out 3';
                    try {
                        localStorage.setItem('zpp_widget_seen', 'true');
                    } catch (e) {
                        sessionStorage.setItem('zpp_widget_seen', 'true');
                    }
                }
            }, 3000);
        }
    }

    // Track chat link clicks
    document.querySelectorAll('a[href*="wa.me"], a[href*="web.whatsapp.com"]').forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.href.includes('web.whatsapp.com') ? 'web_chat' : 'mobile_chat';
            try {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'zpp_chat_started', {
                        event_category: 'ZPP_WhatsApp_Widget',
                        event_label: linkType,
                        custom_parameter_1: officeStatus ? 'office_open' : 'office_closed'
                    });
                }
            } catch (e) {}
        });
    });

    // Expose public API
    window.ZPPWidget = {
        show: function() { 
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity !== '1') toggleZPPModal();
        },
        hide: function() { 
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity === '1') toggleZPPModal();
        },
        toggle: toggleZPPModal,
        config: config,
        version: '1.0.0'
    };

    console.log('🚀 Pune ZP WhatsApp Widget v1.0.0 loaded successfully!');

})();
