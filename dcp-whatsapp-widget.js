/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: divisional-commissioner-whatsapp-widget.js
 * Version: 4.0.0 - Professional Government UI
 * Date: 2025-09-27
 * Author: WoW-Strategies Team
 * URL: https://wow-strategies.com/divisional-commissioner-whatsapp-widget.js
 * 
 * Professional Government ChatBot Widget
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DivCommWidget) {
        console.warn('Divisional Commissioner Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        message: 'Hi! I need assistance with government services from Divisional Commissioner Pune office.',
        position: 'bottom-right',
        autoShow: true,
        showNotification: true,
        primaryColor: '#4A90E2',      // Professional Blue
        secondaryColor: '#2E5BBA',    // Darker Blue
        accentColor: '#FF6B6B',       // Notification Red
        backgroundColor: '#FFFFFF',    // Clean White
        textColor: '#2C3E50',         // Professional Dark
        mutedColor: '#7F8C8D',        // Muted Gray
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
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
                
                // Government office hours: Mon-Fri 10:00-18:00, Sat 10:00-14:00
                if (day === 0) return false; // Sunday closed
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1800; // Mon-Fri
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400; // Saturday
                
                return false;
            } catch (error) {
                return true; // Default to open if check fails
            }
        },
        
        generateQRCode: (text, size = 200) => {
            // Simple QR code generator using Google Charts API
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=4A90E2&bgcolor=FFFFFF&format=png&ecc=M`;
            return qrUrl;
        },
        
        createQRCodeElement: (whatsappUrl) => {
            const qrContainer = document.createElement('div');
            qrContainer.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                border: 2px solid rgba(74, 144, 226, 0.1);
                margin: 15px 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            // QR Code Title
            const title = document.createElement('div');
            title.style.cssText = `
                font-size: 14px;
                font-weight: 600;
                color: ${config.primaryColor};
                margin-bottom: 15px;
                text-align: center;
                letter-spacing: 0.5px;
            `;
            title.textContent = 'SCAN TO START';
            qrContainer.appendChild(title);
            
            // QR Code Image
            const img = document.createElement('img');
            img.src = utils.generateQRCode(whatsappUrl, 180);
            img.style.cssText = `
                width: 180px;
                height: 180px;
                border-radius: 12px;
                border: 3px solid ${config.primaryColor};
                transition: all 0.3s ease;
                background: white;
            `;
            img.alt = 'Divisional Commissioner Pune WhatsApp QR Code';
            
            img.onload = () => {
                console.log('✅ QR Code loaded successfully');
            };
            
            img.onerror = () => {
                console.warn('❌ QR Code failed to load');
                img.style.display = 'none';
                const fallbackText = document.createElement('div');
                fallbackText.style.cssText = `
                    padding: 40px;
                    text-align: center;
                    color: ${config.mutedColor};
                    font-size: 14px;
                `;
                fallbackText.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 15px;">📱</div>
                    <div>QR Code unavailable</div>
                    <a href="${whatsappUrl}" target="_blank" style="color: ${config.primaryColor}; text-decoration: none; font-weight: 600;">
                        Click here to chat directly
                    </a>
                `;
                qrContainer.appendChild(fallbackText);
            };
            
            qrContainer.appendChild(img);
            
            // Instructions
            const instructions = document.createElement('div');
            instructions.style.cssText = `
                font-size: 12px;
                color: ${config.mutedColor};
                text-align: center;
                margin-top: 15px;
                line-height: 1.4;
            `;
            instructions.textContent = 'Open on your phone';
            qrContainer.appendChild(instructions);
            
            // Hover effects
            qrContainer.addEventListener('mouseenter', () => {
                qrContainer.style.transform = 'scale(1.02)';
                qrContainer.style.borderColor = config.primaryColor;
            });
            
            qrContainer.addEventListener('mouseleave', () => {
                qrContainer.style.transform = 'scale(1)';
                qrContainer.style.borderColor = 'rgba(74, 144, 226, 0.1)';
            });
            
            return qrContainer;
        }
    };
    
    // Service options for government chatbot
    const serviceOptions = [
        {
            icon: '📋',
            title: 'Government Services',
            description: 'Information about government schemes and services',
            action: 'services'
        },
        {
            icon: '📄',
            title: 'Document Verification',
            description: 'Document verification and certificate services',
            action: 'documents'
        },
        {
            icon: '🏛️',
            title: 'Office Information',
            description: 'Office locations, timings, and contact details',
            action: 'office'
        },
        {
            icon: '❓',
            title: 'General Inquiry',
            description: 'General questions and support',
            action: 'inquiry'
        }
    ];
    
    // Create service option buttons
    const createServiceOptions = () => {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
        
        return serviceOptions.map(option => `
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" 
               class="service-option" 
               data-action="${option.action}"
               style="
                   display: flex;
                   align-items: center;
                   gap: 15px;
                   padding: 16px 20px;
                   background: rgba(255, 255, 255, 0.8);
                   backdrop-filter: blur(10px);
                   border: 2px solid rgba(74, 144, 226, 0.1);
                   border-radius: 50px;
                   text-decoration: none;
                   color: ${config.textColor};
                   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                   margin-bottom: 12px;
                   position: relative;
                   overflow: hidden;
               "
               onmouseover="
                   this.style.borderColor='${config.primaryColor}';
                   this.style.background='rgba(74, 144, 226, 0.05)';
                   this.style.transform='translateX(5px)';
               "
               onmouseout="
                   this.style.borderColor='rgba(74, 144, 226, 0.1)';
                   this.style.background='rgba(255, 255, 255, 0.8)';
                   this.style.transform='translateX(0)';
               ">
                <div style="
                    font-size: 24px;
                    width: 40px;
                    text-align: center;
                    flex-shrink: 0;
                ">${option.icon}</div>
                <div style="flex: 1;">
                    <div style="
                        font-size: 15px;
                        font-weight: 600;
                        color: ${config.textColor};
                        margin-bottom: 2px;
                    ">${option.title}</div>
                    <div style="
                        font-size: 12px;
                        color: ${config.mutedColor};
                        line-height: 1.3;
                    ">${option.description}</div>
                </div>
                <div style="
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: ${config.primaryColor};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 16px;
                    flex-shrink: 0;
                ">→</div>
            </a>
        `).join('');
    };
    
    // Create widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const statusText = isOfficeOpen ? 'Online' : 'Offline';
        const statusColor = isOfficeOpen ? '#10B981' : '#F59E0B';
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
        
        const widgetHTML = `
            <div class="divcomm-widget" style="
                position: fixed;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 20px;
                ${config.position.includes('right') ? 'right' : 'left'}: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <!-- Float Button -->
                <div class="divcomm-button" onclick="toggleDivCommModal()" style="
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 8px 32px rgba(74, 144, 226, 0.3);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    border: none;
                    outline: none;
                    backdrop-filter: blur(10px);
                " 
                onmouseover="
                    this.style.transform='scale(1.1) rotate(5deg)';
                    this.style.boxShadow='0 12px 40px rgba(74, 144, 226, 0.4)';
                " 
                onmouseout="
                    this.style.transform='scale(1) rotate(0deg)';
                    this.style.boxShadow='0 8px 32px rgba(74, 144, 226, 0.3)';
                ">
                    <!-- AI Icon -->
                    <div style="
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            <circle cx="9" cy="9" r="1.5"/>
                            <circle cx="15" cy="9" r="1.5"/>
                            <path d="M8.5 13.5h7"/>
                        </svg>
                    </div>
                    
                    <!-- AI Badge -->
                    ${config.showNotification ? `
                        <div style="
                            position: absolute;
                            top: -8px;
                            right: -8px;
                            background: ${config.accentColor};
                            color: white;
                            border-radius: 50%;
                            width: 26px;
                            height: 26px;
                            font-size: 12px;
                            font-weight: 700;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            animation: divCommPulse 2s infinite;
                            border: 3px solid white;
                            box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
                        ">AI</div>
                    ` : ''}
                </div>
                
                <!-- Modal -->
                <div class="divcomm-modal" id="divCommModal" style="
                    position: absolute;
                    ${config.position.includes('bottom') ? 'bottom' : 'top'}: 85px;
                    ${config.position.includes('right') ? 'right' : 'left'}: 0;
                    width: 420px;
                    max-width: calc(100vw - 30px);
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 28px;
                    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
                    transform: translateY(20px) scale(0.9);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                ">
                    
                    <!-- Header -->
                    <div style="
                        background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                        color: white;
                        padding: 28px 24px 24px;
                        position: relative;
                        overflow: hidden;
                    ">
                        <!-- Status Badge -->
                        <div style="
                            position: absolute;
                            top: 20px;
                            right: 20px;
                            background: ${statusColor};
                            color: white;
                            padding: 6px 12px;
                            border-radius: 20px;
                            font-size: 11px;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                        ">
                            <div style="
                                width: 8px;
                                height: 8px;
                                background: white;
                                border-radius: 50%;
                                ${isOfficeOpen ? 'animation: divCommBlink 2s infinite;' : ''}
                            "></div>
                            ${statusText}
                        </div>
                        
                        <!-- Close Button -->
                        <button onclick="toggleDivCommModal()" style="
                            position: absolute;
                            top: 20px;
                            right: 70px;
                            background: rgba(255, 255, 255, 0.2);
                            border: none;
                            color: white;
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            cursor: pointer;
                            font-size: 18px;
                            transition: all 0.3s ease;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        " 
                        onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                        onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                        
                        <!-- AI Avatar & Title -->
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 16px;
                            margin-bottom: 16px;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                background: rgba(255, 255, 255, 0.2);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 24px;
                                backdrop-filter: blur(10px);
                                border: 2px solid rgba(255, 255, 255, 0.3);
                            ">🤖</div>
                            <div>
                                <div style="
                                    font-size: 20px;
                                    font-weight: 700;
                                    margin-bottom: 4px;
                                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                ">Divisional Commissioner AI</div>
                                <div style="
                                    font-size: 14px;
                                    opacity: 0.9;
                                    font-weight: 500;
                                ">Pune Division • Government of Maharashtra</div>
                            </div>
                        </div>
                        
                        <!-- Welcome Message -->
                        <div style="
                            background: rgba(255, 255, 255, 0.15);
                            padding: 16px;
                            border-radius: 16px;
                            font-size: 14px;
                            line-height: 1.5;
                            backdrop-filter: blur(10px);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        ">
                            <div style="margin-bottom: 8px;">
                                <strong>🙏 नमस्कार! Welcome to Divisional Commissioner Pune AI Assistant</strong>
                            </div>
                            <div style="opacity: 0.9;">
                                I'm here 24/7 to help with government services, document verification, 
                                office information, and general inquiries. How can I assist you today?
                            </div>
                        </div>
                    </div>
                    
                    <!-- Body -->
                    <div style="padding: 24px;">
                        <!-- Service Options -->
                        <div style="margin-bottom: 24px;">
                            <div style="
                                font-size: 16px;
                                font-weight: 600;
                                color: ${config.textColor};
                                margin-bottom: 16px;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <span style="
                                    width: 4px;
                                    height: 20px;
                                    background: ${config.primaryColor};
                                    border-radius: 2px;
                                "></span>
                                Select Service Category
                            </div>
                            
                            <div style="display: flex; flex-direction: column;">
                                ${createServiceOptions()}
                            </div>
                        </div>
                        
                        <!-- QR Code Section -->
                        <div style="
                            text-align: center;
                            position: relative;
                        ">
                            <button onclick="toggleQRCode()" style="
                                background: transparent;
                                border: 2px solid ${config.primaryColor};
                                color: ${config.primaryColor};
                                padding: 12px 24px;
                                border-radius: 25px;
                                font-size: 14px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                margin-bottom: 16px;
                            " 
                            onmouseover="
                                this.style.background='${config.primaryColor}';
                                this.style.color='white';
                            " 
                            onmouseout="
                                this.style.background='transparent';
                                this.style.color='${config.primaryColor}';
                            ">
                                <span id="qr-toggle-text">Show QR Code</span>
                            </button>
                            
                            <div id="qr-code-container" style="
                                display: none;
                                opacity: 0;
                                transition: all 0.3s ease;
                            "></div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="
                        padding: 20px 24px;
                        background: rgba(248, 250, 252, 0.8);
                        backdrop-filter: blur(10px);
                        border-top: 1px solid rgba(0, 0, 0, 0.05);
                        text-align: center;
                    ">
                        <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="
                            color: ${config.mutedColor};
                            text-decoration: none;
                            font-size: 12px;
                            transition: color 0.3s ease;
                            display: inline-flex;
                            align-items: center;
                            gap: 6px;
                        " 
                        onmouseover="this.style.color='${config.primaryColor}'" 
                        onmouseout="this.style.color='${config.mutedColor}'">
                            <span style="font-size: 14px;">⚡</span>
                            ${config.poweredBy.text}
                        </a>
                    </div>
                    
                </div>
            </div>
            
            <style>
                @keyframes divCommPulse { 
                    0%, 100% { transform: scale(1); opacity: 1; } 
                    50% { transform: scale(1.15); opacity: 0.8; } 
                }
                
                @keyframes divCommBlink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0.3; }
                }
                
                @keyframes divCommFadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .service-option:nth-child(1) { animation-delay: 0.1s; }
                .service-option:nth-child(2) { animation-delay: 0.2s; }
                .service-option:nth-child(3) { animation-delay: 0.3s; }
                .service-option:nth-child(4) { animation-delay: 0.4s; }
                
                @media (max-width: 480px) { 
                    .divcomm-modal { 
                        width: calc(100vw - 20px) !important; 
                        ${config.position.includes('right') ? 'right' : 'left'}: -15px !important;
                    }
                    .divcomm-button {
                        width: 60px !important;
                        height: 60px !important;
                    }
                    .divcomm-button svg {
                        width: 28px !important;
                        height: 28px !important;
                    }
                }
                
                @media print { 
                    .divcomm-widget { 
                        display: none !important; 
                    } 
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .divcomm-button, .divcomm-modal, * {
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
            let container = document.getElementById('divisional-commissioner-whatsapp-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'divisional-commissioner-whatsapp-widget';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Auto-show animation on first visit
            if (config.autoShow) {
                setTimeout(() => {
                    const button = document.querySelector('.divcomm-button');
                    if (button && !localStorage.getItem('divcomm_widget_seen')) {
                        button.style.animation = 'divCommPulse 2s ease-in-out 4';
                        
                        // Auto-open modal after 3 seconds for first-time visitors
                        setTimeout(() => {
                            toggleDivCommModal();
                        }, 3000);
                        
                        // Mark as seen
                        try {
                            localStorage.setItem('divcomm_widget_seen', 'true');
                        } catch (e) {
                            // Silent fail for localStorage
                        }
                    }
                }, 2000);
            }
            
            console.log('🚀 Divisional Commissioner WhatsApp Widget v4.0.0 loaded successfully!');
            console.log('🏛️ Government Professional UI Active');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Divisional Commissioner Widget initialization failed:', error);
        }
    };
    
    // Toggle modal function
    window.toggleDivCommModal = function() {
        try {
            const modal = document.getElementById('divCommModal');
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
                const badge = document.querySelector('.divcomm-button div[style*="animation"]');
                if (badge) {
                    badge.style.display = 'none';
                }
                
                // Animate service options
                const serviceOptions = document.querySelectorAll('.service-option');
                serviceOptions.forEach((option, index) => {
                    option.style.animation = `divCommFadeInUp 0.6s ease forwards ${index * 0.1}s`;
                });
            }
        } catch (error) {
            console.error('Modal toggle failed:', error);
        }
    };
    
    // Toggle QR Code function
    window.toggleQRCode = function() {
        try {
            const container = document.getElementById('qr-code-container');
            const toggleText = document.getElementById('qr-toggle-text');
            
            if (!container || !toggleText) return;
            
            const isVisible = container.style.display === 'block';
            
            if (isVisible) {
                container.style.opacity = '0';
                setTimeout(() => {
                    container.style.display = 'none';
                    toggleText.textContent = 'Show QR Code';
                }, 300);
            } else {
                // Create QR code if not exists
                if (container.children.length === 0) {
                    const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
                    const qrElement = utils.createQRCodeElement(whatsappUrl);
                    container.appendChild(qrElement);
                }
                
                container.style.display = 'block';
                setTimeout(() => {
                    container.style.opacity = '1';
                    toggleText.textContent = 'Hide QR Code';
                }, 10);
            }
        } catch (error) {
            console.error('QR toggle failed:', error);
        }
    };
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        try {
            const modal = document.getElementById('divCommModal');
            const button = document.querySelector('.divcomm-button');
            
            if (modal && button && 
                !modal.contains(e.target) && 
                !button.contains(e.target) && 
                modal.style.opacity === '1') {
                toggleDivCommModal();
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        try {
            if (e.key === 'Escape') {
                const modal = document.getElementById('divCommModal');
                if (modal && modal.style.opacity === '1') {
                    toggleDivCommModal();
                }
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Public API
    window.DivCommWidget = {
        version: '4.0.0',
        config: config,
        show: () => {
            const modal = document.getElementById('divCommModal');
            if (modal && modal.style.opacity !== '1') {
                toggleDivCommModal();
            }
        },
        hide: () => {
            const modal = document.getElementById('divCommModal');
            if (modal && modal.style.opacity === '1') {
                toggleDivCommModal();
            }
        },
        toggle: () => toggleDivCommModal(),
        showQR: () => {
            const container = document.getElementById('qr-code-container');
            if (container && container.style.display !== 'block') {
                toggleQRCode();
            }
        },
        hideQR: () => {
            const container = document.getElementById('qr-code-container');
            if (container && container.style.display === 'block') {
                toggleQRCode();
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
