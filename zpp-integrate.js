/**
 * Pune Zilla Panchayat AI WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 3.3.0 - WhatsApp Colors
 * Date: 2025-06-24
 * Author: soft00null
 * URL: https://wow-strategies.com/zpp-integrate.js
 * 
 * Simple, Elegant, Minimalistic yet Powerful
 * Powered by WoW-Strategies Private Limited
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
        message: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे. / Hello! I need information about Pune Zilla Parishad services.',
        qrApiUrl: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        position: 'bottom-right',
        autoShow: true,
        showNotification: true,
        primaryColor: '#25D366',      // WhatsApp Green
        secondaryColor: '#128C7E',    // WhatsApp Dark Green
        poweredBy: {
            text: 'Powered by WoW-Strategies Pvt. Ltd.',
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
                const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
                const hour = now.getHours();
                const minute = now.getMinutes();
                const currentTime = hour * 100 + minute;
                
                // Office hours: Mon-Fri 10:00-18:00, Sat 10:00-14:00
                if (day === 0) return false; // Sunday closed
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1800; // Mon-Fri
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400; // Saturday
                
                return false;
            } catch (error) {
                return true; // Default to open if check fails
            }
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const statusText = isOfficeOpen ? 'Online' : 'Offline';
        const statusColor = isOfficeOpen ? '#4CAF50' : '#FF9800';
        
        const widgetHTML = `
            <div class="zpp-widget" style="position:fixed;${config.position.includes('bottom')?'bottom':'top'}:20px;${config.position.includes('right')?'right':'left'}:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                <div class="zpp-button" onclick="toggleZPPModal()" style="width:64px;height:64px;background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 25px rgba(37,211,102,0.4);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/></svg>
                    ${config.showNotification ? `<div style="position:absolute;top:-6px;right:-6px;background:#FF3333;color:white;border-radius:50%;width:22px;height:22px;font-size:11px;font-weight:bold;display:flex;align-items:center;justify-content:center;animation:zppPulse 2s infinite;border:2px solid white">AI</div>` : ''}
                </div>
                
                <div class="zpp-modal" id="zppModal" style="position:absolute;${config.position.includes('bottom')?'bottom':'top'}:80px;${config.position.includes('right')?'right':'left'}:0;width:380px;max-width:calc(100vw - 30px);background:white;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.25);transform:translateY(20px) scale(0.9);opacity:0;visibility:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);overflow:hidden;border:1px solid rgba(0,0,0,0.05)">
                    
                    <!-- Header -->
                    <div style="background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});color:white;padding:24px;position:relative;overflow:hidden">
                        <div style="position:absolute;top:16px;right:16px;background:${statusColor};color:white;padding:4px 10px;border-radius:12px;font-size:10px;font-weight:600;text-transform:uppercase">${statusText}</div>
                        <div style="font-size:20px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:10px">
                            🤖 पुणे जिप AI सहाय्यक
                        </div>
                        <div style="font-size:14px;opacity:0.95;line-height:1.4">
                            पुणे जिल्हा परिषद | Pune Zilla Parishad<br>
                            <small>सेवा • पारदर्शकता • जबाबदारी</small>
                        </div>
                        <button onclick="toggleZPPModal()" style="position:absolute;top:50%;right:50px;transform:translateY(-50%);background:rgba(255,255,255,0.2);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                    </div>
                    
                    <!-- Body -->
                    <div style="padding:24px">
                        <!-- Chat Options -->
                        <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px">
                            <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:16px;padding:18px;background:#f8f9fa;border:2px solid #e9ecef;border-radius:16px;text-decoration:none;color:#2c3e50;transition:all 0.3s ease;position:relative;overflow:hidden" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#f0f9f4';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#e9ecef';this.style.background='#f8f9fa';this.style.transform='translateY(0)'">
                                <div style="font-size:28px;color:${config.primaryColor};width:44px;text-align:center">📱</div>
                                <div>
                                    <div style="font-size:16px;font-weight:600;margin-bottom:3px;color:#2c3e50">मोबाइल चॅट | Mobile Chat</div>
                                    <div style="font-size:13px;color:#6c757d">तुमच्या स्मार्टफोनवर AI चॅटबॉटशी संवाद साधा</div>
                                </div>
                            </a>
                            
                            <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:16px;padding:18px;background:#f8f9fa;border:2px solid #e9ecef;border-radius:16px;text-decoration:none;color:#2c3e50;transition:all 0.3s ease;position:relative;overflow:hidden" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#f0f9f4';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#e9ecef';this.style.background='#f8f9fa';this.style.transform='translateY(0)'">
                                <div style="font-size:28px;color:${config.primaryColor};width:44px;text-align:center">💻</div>
                                <div>
                                    <div style="font-size:16px;font-weight:600;margin-bottom:3px;color:#2c3e50">वेब चॅट | Web Chat</div>
                                    <div style="font-size:13px;color:#6c757d">संगणकावर WhatsApp Web द्वारे चॅट करा</div>
                                </div>
                            </a>
                        </div>
                        
                        <!-- QR Code Section -->
                        <div style="background:white;border:2px solid #e9ecef;border-radius:20px;padding:24px;text-align:center">
                            <div style="font-size:16px;font-weight:600;color:#2c3e50;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:8px">
                                📱 QR कोड स्कॅन करा | Scan QR Code
                            </div>
                            <div style="display:inline-block;padding:16px;background:#f8f9fa;border-radius:16px;border:3px dashed #dee2e6;transition:all 0.3s ease" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#f0f9f4';this.style.transform='scale(1.02)'" onmouseout="this.style.borderColor='#dee2e6';this.style.background='#f8f9fa';this.style.transform='scale(1)'">
                                <img src="${config.qrApiUrl}${encodeURIComponent('https://wa.me/' + config.phoneNumber + '?text=' + config.message)}" alt="Pune ZP WhatsApp QR Code" style="width:150px;height:150px;border-radius:12px;display:block" loading="lazy" onerror="this.style.display='none'">
                            </div>
                            <div style="font-size:12px;color:#6c757d;margin-top:16px;line-height:1.4;max-width:280px;margin-left:auto;margin-right:auto">
                                <strong>स्कॅन करण्याचे टप्पे:</strong><br>
                                WhatsApp उघडा → मेनू → QR स्कॅन करा<br>
                                <em>Open WhatsApp → Menu → Scan QR Code</em>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer with Powered By -->
                    <div style="padding:16px 24px;background:#f8f9fa;border-top:1px solid #e9ecef;text-align:center;font-size:12px;color:#6c757d">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:#6c757d;text-decoration:none;transition:color 0.3s ease;display:inline-flex;align-items:center;gap:6px" onmouseover="this.style.color='${config.primaryColor}'" onmouseout="this.style.color='#6c757d'">
                            ⚡ ${config.poweredBy.text}
                        </a>
                    </div>
                    
                </div>
            </div>
            
            <style>
                @keyframes zppPulse { 
                    0%, 100% { transform: scale(1); opacity: 1; } 
                    50% { transform: scale(1.2); opacity: 0.8; } 
                }
                @media (max-width: 480px) { 
                    .zpp-modal { 
                        width: calc(100vw - 20px) !important; 
                        ${config.position.includes('right') ? 'right' : 'left'}: -10px !important;
                    }
                    .zpp-button {
                        width: 56px !important;
                        height: 56px !important;
                    }
                    .zpp-button svg {
                        width: 26px !important;
                        height: 26px !important;
                    }
                }
                @media print { 
                    .zpp-widget { 
                        display: none !important; 
                    } 
                }
                @media (prefers-reduced-motion: reduce) {
                    .zpp-button, .zpp-modal, * {
                        transition: none !important;
                        animation: none !important;
                    }
                }
            </style>
        `;
        
        return widgetHTML;
    };
    
    // Initialize widget
    const initWidget = () => {
        try {
            // Create container if doesn't exist
            let container = document.getElementById('zpp-whatsapp-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'zpp-whatsapp-widget';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Auto-show animation
            if (config.autoShow) {
                setTimeout(() => {
                    const button = document.querySelector('.zpp-button');
                    if (button) {
                        button.style.animation = 'zppPulse 1.5s ease-in-out 3';
                        
                        // Store that user has seen the widget
                        try {
                            localStorage.setItem('zpp_widget_seen', 'true');
                        } catch (e) {
                            // Silent fail for localStorage
                        }
                    }
                }, 5000);
            }
            
            console.log('🚀 ZPP WhatsApp Widget v3.3.0 loaded successfully!');
            console.log('📱 Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ ZPP Widget initialization failed:', error);
        }
    };
    
    // Toggle modal function
    window.toggleZPPModal = function() {
        try {
            const modal = document.getElementById('zppModal');
            if (!modal) return;
            
            const isActive = modal.style.opacity === '1';
            
            if (isActive) {
                modal.style.opacity = '0';
                modal.style.visibility = 'hidden';
                modal.style.transform = 'translateY(20px) scale(0.9)';
            } else {
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modal.style.transform = 'translateY(0) scale(1)';
                
                // Hide notification badge
                const badge = document.querySelector('.zpp-button div[style*="animation"]');
                if (badge) {
                    badge.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Modal toggle failed:', error);
        }
    };
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        try {
            const modal = document.getElementById('zppModal');
            const button = document.querySelector('.zpp-button');
            
            if (modal && button && 
                !modal.contains(e.target) && 
                !button.contains(e.target) && 
                modal.style.opacity === '1') {
                toggleZPPModal();
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        try {
            if (e.key === 'Escape') {
                const modal = document.getElementById('zppModal');
                if (modal && modal.style.opacity === '1') {
                    toggleZPPModal();
                }
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Public API
    window.ZPPWidget = {
        version: '3.3.0',
        config: config,
        show: () => {
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity !== '1') {
                toggleZPPModal();
            }
        },
        hide: () => {
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity === '1') {
                toggleZPPModal();
            }
        },
        toggle: () => toggleZPPModal()
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
