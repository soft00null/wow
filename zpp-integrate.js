/**
 * Pune Zilla Panchayat WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 3.0.0
 * WhatsApp-Aligned Professional UI with AI Highlights
 * Author: soft00null
 * Date: 2025-06-24
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ZPPWidget) return;
    
    // WhatsApp-Aligned Configuration
    const config = {
        phoneNumber: '912026134806',
        message: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या AI सहाय्यकाची मदत हवी आहे. / Hello! I need help from Pune Zilla Panchayat AI Assistant.',
        qrApiUrl: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        position: 'bottom-right',
        
        // WhatsApp Brand Colors
        colors: {
            whatsappGreen: '#25D366',
            whatsappDark: '#128C7E', 
            whatsappLight: '#DCF8C6',
            aiBlue: '#0084FF',
            aiPurple: '#6C5CE7',
            aiGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            background: '#FFFFFF',
            surface: '#F7F8FA',
            border: '#E4E6EA',
            text: '#1C1E21',
            textSecondary: '#65676B',
            shadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
            shadowHover: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }
    };

    // Enhanced office status with IST
    function getEnhancedStatus() {
        try {
            const now = new Date();
            const ist = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
            const day = ist.getDay();
            const hour = ist.getHours();
            const minute = ist.getMinutes();
            const time = hour * 100 + minute;
            
            const timeStr = ist.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            
            let status = { online: false, text: 'Offline', time: timeStr, message: 'We\'ll respond when back online' };
            
            if (day >= 1 && day <= 5 && time >= 1000 && time < 1800) {
                status = { online: true, text: 'Online', time: timeStr, message: 'AI Assistant is ready to help' };
            } else if (day === 6 && time >= 1000 && time < 1400) {
                status = { online: true, text: 'Online', time: timeStr, message: 'AI Assistant is ready to help' };
            }
            
            return status;
        } catch {
            return { online: true, text: 'Online', time: '12:00 PM', message: 'AI Assistant is ready to help' };
        }
    }

    const status = getEnhancedStatus();
    
    // WhatsApp-Style Professional Widget
    const widgetHTML = `
        <div class="zpp-whatsapp-widget">
            <!-- WhatsApp-Style FAB with AI Glow -->
            <div class="zpp-fab-container">
                <button class="zpp-whatsapp-fab" onclick="toggleZPPChat()" aria-label="Open WhatsApp AI Assistant">
                    <div class="zpp-fab-bg"></div>
                    <div class="zpp-fab-content">
                        <svg class="zpp-whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="zpp-ai-badge">
                        <div class="zpp-ai-pulse"></div>
                        <span>AI</span>
                    </div>
                </button>
                
                <!-- AI Notification Tooltip -->
                <div class="zpp-ai-tooltip">
                    <div class="zpp-tooltip-content">
                        <div class="zpp-ai-sparkle">✨</div>
                        <span>AI Assistant Ready</span>
                    </div>
                </div>
            </div>

            <!-- WhatsApp-Style Chat Interface -->
            <div class="zpp-chat-modal" id="zppChatModal">
                <div class="zpp-modal-backdrop" onclick="toggleZPPChat()"></div>
                
                <div class="zpp-chat-container">
                    <!-- WhatsApp-Style Header -->
                    <div class="zpp-chat-header">
                        <div class="zpp-header-left">
                            <div class="zpp-avatar-container">
                                <div class="zpp-avatar">
                                    <div class="zpp-avatar-bg"></div>
                                    <svg class="zpp-govt-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 1L21 6V8H3V6L12 1M5 10H19V12H5V10M5 14H19V16H5V14M5 18H19V20H5V18M12 3.2L7.5 6H16.5L12 3.2Z"/>
                                    </svg>
                                    <div class="zpp-ai-ring"></div>
                                </div>
                                <div class="zpp-status-indicator ${status.online ? 'online' : 'offline'}"></div>
                            </div>
                            
                            <div class="zpp-header-info">
                                <div class="zpp-chat-title">
                                    <h3>पुणे जिप AI Assistant</h3>
                                    <div class="zpp-ai-verified">
                                        <svg viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 0L9.4 2.6L12 4L9.4 5.4L8 8L6.6 5.4L4 4L6.6 2.6L8 0Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="zpp-chat-status">
                                    <span class="zpp-status-text">${status.text} • ${status.time}</span>
                                    <span class="zpp-status-message">${status.message}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button class="zpp-close-btn" onclick="toggleZPPChat()" aria-label="Close chat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Chat Body -->
                    <div class="zpp-chat-body">
                        <!-- AI Welcome Message -->
                        <div class="zpp-message-container">
                            <div class="zpp-message incoming">
                                <div class="zpp-message-bubble">
                                    <div class="zpp-ai-header">
                                        <div class="zpp-ai-icon">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 8V7L18.5 9.5C17.9 8.9 17.1 8.5 16.2 8.5H7.8C6.9 8.5 6.1 8.9 5.5 9.5L3 7V8C3 8.6 3.4 9 4 9H5L6.5 17.5C6.6 18.1 7.1 18.5 7.8 18.5H16.2C16.9 18.5 17.4 18.1 17.5 17.5L19 9H20C20.6 9 21 8.6 21 8Z"/>
                                            </svg>
                                        </div>
                                        <span class="zpp-ai-label">AI Assistant</span>
                                    </div>
                                    <p><strong>नमस्कार! 🙏</strong></p>
                                    <p>मी पुणे जिल्हा परिषदेचा AI सहाय्यक आहे. मी तुम्हाला खालील गोष्टींमध्ये मदत करू शकतो:</p>
                                    <div class="zpp-ai-features">
                                        <div class="zpp-feature">• सरकारी योजना माहिती</div>
                                        <div class="zpp-feature">• प्रमाणपत्र अर्ज प्रक्रिया</div>
                                        <div class="zpp-feature">• कार्यालयीन सेवा माहिती</div>
                                        <div class="zpp-feature">• तक्रार नोंदणी</div>
                                    </div>
                                    <p><em>Hello! I'm Pune ZP's AI Assistant. Ready to help with government services, certificates, and more!</em></p>
                                </div>
                                <div class="zpp-message-time">Just now</div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="zpp-action-section">
                            <div class="zpp-section-title">Choose your preferred way to chat:</div>
                            
                            <div class="zpp-action-buttons">
                                <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="zpp-action-card primary">
                                    <div class="zpp-card-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H18C19.1 4 20 4.9 20 6V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V6C4 4.9 4.9 4 6 4H7M6 8V20H18V8H6Z"/>
                                        </svg>
                                    </div>
                                    <div class="zpp-card-content">
                                        <div class="zpp-card-title">मोबाइल चॅट</div>
                                        <div class="zpp-card-subtitle">Mobile Chat</div>
                                        <div class="zpp-card-description">Start AI conversation on your phone</div>
                                    </div>
                                    <div class="zpp-card-arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                        </svg>
                                    </div>
                                </a>
                                
                                <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="zpp-action-card secondary">
                                    <div class="zpp-card-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                        </svg>
                                    </div>
                                    <div class="zpp-card-content">
                                        <div class="zpp-card-title">वेब चॅट</div>
                                        <div class="zpp-card-subtitle">Web Chat</div>
                                        <div class="zpp-card-description">Continue on WhatsApp Web</div>
                                    </div>
                                    <div class="zpp-card-arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                        </svg>
                                    </div>
                                </a>
                            </div>

                            <!-- QR Code Section -->
                            <div class="zpp-qr-section">
                                <div class="zpp-qr-header">
                                    <div class="zpp-qr-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M5,15H7V17H5V15M12,15H14V17H12V15M17,15H19V17H17V15M9,17H11V19H9V17M3,3H11V11H3V3M5,5V9H9V5H5M13,3H21V11H13V3M15,5V9H19V5H15M3,13H11V21H3V13M5,15V19H9V15H5Z"/>
                                        </svg>
                                    </div>
                                    <div class="zpp-qr-text">
                                        <span class="zpp-qr-title">QR कोड स्कॅन करा</span>
                                        <span class="zpp-qr-subtitle">Scan QR Code to chat</span>
                                    </div>
                                </div>
                                
                                <div class="zpp-qr-container">
                                    <div class="zpp-qr-frame">
                                        <img src="${config.qrApiUrl}${encodeURIComponent('https://wa.me/' + config.phoneNumber + '?text=' + config.message)}" 
                                             alt="WhatsApp QR Code" 
                                             class="zpp-qr-image"
                                             loading="lazy"
                                             onerror="this.parentElement.innerHTML='<div class=zpp-qr-error>QR Code temporarily unavailable</div>'">
                                        <div class="zpp-qr-overlay">
                                            <div class="zpp-qr-corners">
                                                <div class="zpp-corner tl"></div>
                                                <div class="zpp-corner tr"></div>
                                                <div class="zpp-corner bl"></div>
                                                <div class="zpp-corner br"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="zpp-qr-instructions">
                                        <div class="zpp-instruction-step">
                                            <span class="zpp-step-number">1</span>
                                            <span>WhatsApp उघडा</span>
                                        </div>
                                        <div class="zpp-instruction-step">
                                            <span class="zpp-step-number">2</span>
                                            <span>⋯ मेनू → QR स्कॅन</span>
                                        </div>
                                        <div class="zpp-instruction-step">
                                            <span class="zpp-step-number">3</span>
                                            <span>कॅमेरा येथे दाखवा</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="zpp-chat-footer">
                        <div class="zpp-footer-info">
                            <div class="zpp-office-hours">
                                <svg class="zpp-clock-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                                </svg>
                                <div class="zpp-hours-text">
                                    <span>सोम-शुक्र 10:00-18:00, शनि 10:00-14:00</span>
                                    <small>Mon-Fri 10AM-6PM, Sat 10AM-2PM</small>
                                </div>
                            </div>
                            <div class="zpp-powered-by">
                                <span>Powered by</span>
                                <div class="zpp-ai-logo">
                                    <div class="zpp-ai-sparkles">✨</div>
                                    <span>AI Technology</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            /* WhatsApp-Aligned Professional Styles */
            .zpp-whatsapp-widget {
                position: fixed;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 20px;
                ${config.position.includes('right') ? 'right' : 'left'}: 20px;
                z-index: 2147483647;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
                --wa-green: ${config.colors.whatsappGreen};
                --wa-dark: ${config.colors.whatsappDark};
                --wa-light: ${config.colors.whatsappLight};
                --ai-blue: ${config.colors.aiBlue};
                --ai-purple: ${config.colors.aiPurple};
                --bg: ${config.colors.background};
                --surface: ${config.colors.surface};
                --border: ${config.colors.border};
                --text: ${config.colors.text};
                --text-secondary: ${config.colors.textSecondary};
                --shadow: ${config.colors.shadow};
                --shadow-hover: ${config.colors.shadowHover};
            }

            /* Enhanced FAB with AI Glow */
            .zpp-fab-container {
                position: relative;
            }

            .zpp-whatsapp-fab {
                width: 60px;
                height: 60px;
                background: var(--wa-green);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                box-shadow: var(--shadow);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .zpp-fab-bg {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-dark) 100%);
                border-radius: 50%;
                transition: all 0.3s ease;
            }

            .zpp-whatsapp-fab:hover .zpp-fab-bg {
                background: linear-gradient(135deg, var(--wa-dark) 0%, var(--wa-green) 100%);
                transform: scale(1.05);
            }

            .zpp-whatsapp-fab:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-hover);
            }

            .zpp-whatsapp-fab:active {
                transform: translateY(0) scale(0.95);
            }

            .zpp-fab-content {
                position: relative;
                z-index: 2;
            }

            .zpp-whatsapp-icon {
                width: 28px;
                height: 28px;
                color: white;
                transition: transform 0.3s ease;
            }

            .zpp-whatsapp-fab:hover .zpp-whatsapp-icon {
                transform: scale(1.1) rotate(5deg);
            }

            /* AI Badge with Advanced Animation */
            .zpp-ai-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: linear-gradient(135deg, var(--ai-blue), var(--ai-purple));
                color: white;
                font-size: 9px;
                font-weight: 700;
                padding: 4px 6px;
                border-radius: 12px;
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0, 132, 255, 0.3);
                animation: aiPulse 2s infinite;
                position: relative;
                overflow: hidden;
            }

            .zpp-ai-pulse {
                position: absolute;
                inset: -2px;
                background: linear-gradient(135deg, var(--ai-blue), var(--ai-purple));
                border-radius: 12px;
                opacity: 0.6;
                animation: aiRing 2s infinite;
            }

            @keyframes aiPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); box-shadow: 0 4px 16px rgba(0, 132, 255, 0.4); }
            }

            @keyframes aiRing {
                0% { transform: scale(1); opacity: 0.6; }
                100% { transform: scale(1.5); opacity: 0; }
            }

            /* AI Tooltip */
            .zpp-ai-tooltip {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: var(--text);
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                pointer-events: none;
                box-shadow: var(--shadow);
            }

            .zpp-ai-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                right: 20px;
                border: 5px solid transparent;
                border-top-color: var(--text);
            }

            .zpp-fab-container:hover .zpp-ai-tooltip {
                opacity: 1;
                transform: translateY(0);
            }

            .zpp-tooltip-content {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .zpp-ai-sparkle {
                animation: sparkle 1.5s infinite;
            }

            @keyframes sparkle {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.2) rotate(180deg); }
            }

            /* WhatsApp-Style Chat Modal */
            .zpp-chat-modal {
                position: absolute;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 80px;
                ${config.position.includes('right') ? 'right' : 'left'}: 0;
                width: 380px;
                max-width: calc(100vw - 40px);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
            }

            .zpp-chat-modal.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }

            .zpp-modal-backdrop {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(4px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .zpp-chat-modal.active .zpp-modal-backdrop {
                opacity: 1;
            }

            .zpp-chat-container {
                position: relative;
                background: var(--bg);
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                border: 1px solid var(--border);
            }

            /* WhatsApp-Style Header */
            .zpp-chat-header {
                background: var(--wa-green);
                color: white;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                overflow: hidden;
            }

            .zpp-chat-header::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
                animation: shimmer 3s infinite;
            }

            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            .zpp-header-left {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
                position: relative;
                z-index: 2;
            }

            .zpp-avatar-container {
                position: relative;
            }

            .zpp-avatar {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }

            .zpp-avatar-bg {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
                border-radius: 50%;
            }

            .zpp-govt-icon {
                width: 24px;
                height: 24px;
                color: white;
                position: relative;
                z-index: 2;
            }

            .zpp-ai-ring {
                position: absolute;
                inset: -2px;
                border: 2px solid rgba(0, 132, 255, 0.6);
                border-radius: 50%;
                animation: aiRotate 3s linear infinite;
            }

            @keyframes aiRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .zpp-status-indicator {
                position: absolute;
                bottom: 2px;
                right: 2px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
            }

            .zpp-status-indicator.online {
                background: #4CAF50;
                box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
                animation: onlinePulse 2s infinite;
            }

            .zpp-status-indicator.offline {
                background: #FF9800;
            }

            @keyframes onlinePulse {
                0%, 100% { box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3); }
                50% { box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.6); }
            }

            .zpp-header-info {
                flex: 1;
                min-width: 0;
            }

            .zpp-chat-title {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 2px;
            }

            .zpp-chat-title h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: white;
                truncate: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .zpp-ai-verified {
                width: 16px;
                height: 16px;
                color: var(--ai-blue);
                animation: verifiedPulse 2s infinite;
            }

            @keyframes verifiedPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); filter: brightness(1.2); }
            }

            .zpp-chat-status {
                display: flex;
                flex-direction: column;
                gap: 1px;
            }

            .zpp-status-text {
                font-size: 13px;
                opacity: 0.9;
                font-weight: 500;
            }

            .zpp-status-message {
                font-size: 11px;
                opacity: 0.7;
                font-style: italic;
            }

            .zpp-close-btn {
                width: 36px;
                height: 36px;
                border: none;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                transition: all 0.2s ease;
                outline: none;
                position: relative;
                z-index: 2;
            }

            .zpp-close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }

            .zpp-close-btn svg {
                width: 18px;
                height: 18px;
            }

            /* Chat Body */
            .zpp-chat-body {
                background: #F0F2F5;
                min-height: 300px;
                max-height: 400px;
                overflow-y: auto;
                padding: 16px;
                position: relative;
            }

            .zpp-chat-body::before {
                content: '';
                position: absolute;
                inset: 0;
                background: 
                    radial-gradient(circle at 20% 20%, rgba(37, 211, 102, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(0, 132, 255, 0.03) 0%, transparent 50%);
                pointer-events: none;
            }

            /* AI Message Bubble */
            .zpp-message-container {
                margin-bottom: 16px;
                position: relative;
                z-index: 1;
            }

            .zpp-message.incoming {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .zpp-message-bubble {
                background: white;
                border-radius: 18px 18px 18px 4px;
                padding: 12px 16px;
                max-width: 85%;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(0, 0, 0, 0.05);
                position: relative;
                animation: messageSlideIn 0.3s ease-out;
            }

            @keyframes messageSlideIn {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
            }

            .zpp-ai-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 1px solid #F0F2F5;
            }

            .zpp-ai-icon {
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, var(--ai-blue), var(--ai-purple));
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .zpp-ai-icon svg {
                width: 12px;
                height: 12px;
            }

            .zpp-ai-label {
                font-size: 12px;
                font-weight: 600;
                color: var(--ai-blue);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .zpp-message-bubble p {
                margin: 0 0 8px 0;
                font-size: 14px;
                line-height: 1.4;
                color: var(--text);
            }

            .zpp-message-bubble p:last-of-type {
                margin-bottom: 0;
            }

            .zpp-ai-features {
                background: #F8F9FA;
                border-radius: 8px;
                padding: 12px;
                margin: 8px 0;
                border-left: 3px solid var(--ai-blue);
            }

            .zpp-feature {
                font-size: 13px;
                color: var(--text-secondary);
                margin-bottom: 4px;
                padding-left: 4px;
            }

            .zpp-feature:last-child {
                margin-bottom: 0;
            }

            .zpp-message-time {
                font-size: 11px;
                color: var(--text-secondary);
                margin-top: 4px;
                margin-left: 8px;
            }

            /* Action Section */
            .zpp-action-section {
                margin-top: 20px;
                padding-top: 16px;
                border-top: 1px solid rgba(0, 0, 0, 0.05);
            }

            .zpp-section-title {
                font-size: 13px;
                font-weight: 600;
                color: var(--text-secondary);
                margin-bottom: 12px;
                text-align: center;
            }

            .zpp-action-buttons {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-bottom: 20px;
            }

            .zpp-action-card {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 16px;
                background: white;
                border: 1px solid var(--border);
                border-radius: 12px;
                text-decoration: none;
                color: var(--text);
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }

            .zpp-action-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.05), transparent);
                transform: translateX(-100%);
                transition: transform 0.6s ease;
            }

            .zpp-action-card:hover::before {
                transform: translateX(100%);
            }

            .zpp-action-card:hover {
                border-color: var(--wa-green);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.15);
            }

            .zpp-action-card.primary {
                background: linear-gradient(135deg, var(--wa-green) 0%, var(--wa-dark) 100%);
                border-color: var(--wa-green);
                color: white;
            }

            .zpp-action-card.primary:hover {
                background: linear-gradient(135deg, var(--wa-dark) 0%, var(--wa-green) 100%);
                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
            }

            .zpp-card-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.1);
                flex-shrink: 0;
            }

            .zpp-action-card:not(.primary) .zpp-card-icon {
                background: var(--surface);
                color: var(--wa-green);
            }

            .zpp-card-icon svg {
                width: 20px;
                height: 20px;
            }

            .zpp-card-content {
                flex: 1;
                min-width: 0;
            }

            .zpp-card-title {
                font-size: 15px;
                font-weight: 600;
                margin-bottom: 2px;
                line-height: 1.2;
            }

            .zpp-card-subtitle {
                font-size: 13px;
                opacity: 0.8;
                margin-bottom: 2px;
                line-height: 1.2;
            }

            .zpp-card-description {
                font-size: 12px;
                opacity: 0.7;
                line-height: 1.2;
            }

            .zpp-card-arrow {
                width: 20px;
                height: 20px;
                opacity: 0.6;
                transition: all 0.2s ease;
            }

            .zpp-action-card:hover .zpp-card-arrow {
                opacity: 1;
                transform: translate(2px, -2px);
            }

            .zpp-card-arrow svg {
                width: 16px;
                height: 16px;
            }

            /* Enhanced QR Section */
            .zpp-qr-section {
                background: white;
                border-radius: 12px;
                padding: 16px;
                border: 1px solid var(--border);
                position: relative;
                overflow: hidden;
            }

            .zpp-qr-section::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(45deg, transparent 49%, rgba(37, 211, 102, 0.02) 50%, transparent 51%);
                pointer-events: none;
            }

            .zpp-qr-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 16px;
                position: relative;
                z-index: 1;
            }

            .zpp-qr-icon {
                width: 24px;
                height: 24px;
                color: var(--wa-green);
            }

            .zpp-qr-text {
                flex: 1;
            }

            .zpp-qr-title {
                font-size: 14px;
                font-weight: 600;
                color: var(--text);
                display: block;
                margin-bottom: 2px;
            }

            .zpp-qr-subtitle {
                font-size: 12px;
                color: var(--text-secondary);
                display: block;
            }

            .zpp-qr-container {
                text-align: center;
                position: relative;
                z-index: 1;
            }

            .zpp-qr-frame {
                display: inline-block;
                padding: 12px;
                background: #F8F9FA;
                border: 2px dashed var(--border);
                border-radius: 12px;
                transition: all 0.3s ease;
                position: relative;
                margin-bottom: 12px;
            }

            .zpp-qr-frame:hover {
                border-color: var(--wa-green);
                background: rgba(37, 211, 102, 0.05);
                transform: scale(1.02);
            }

            .zpp-qr-image {
                width: 120px;
                height: 120px;
                border-radius: 8px;
                display: block;
            }

            .zpp-qr-overlay {
                position: absolute;
                inset: 12px;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .zpp-qr-frame:hover .zpp-qr-overlay {
                opacity: 1;
            }

            .zpp-qr-corners {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .zpp-corner {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid var(--wa-green);
            }

            .zpp-corner.tl {
                top: 0;
                left: 0;
                border-right: none;
                border-bottom: none;
            }

            .zpp-corner.tr {
                top: 0;
                right: 0;
                border-left: none;
                border-bottom: none;
            }

            .zpp-corner.bl {
                bottom: 0;
                left: 0;
                border-right: none;
                border-top: none;
            }

            .zpp-corner.br {
                bottom: 0;
                right: 0;
                border-left: none;
                border-top: none;
            }

            .zpp-qr-instructions {
                display: flex;
                justify-content: space-between;
                gap: 8px;
                margin-top: 8px;
            }

            .zpp-instruction-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                flex: 1;
                text-align: center;
            }

            .zpp-step-number {
                width: 20px;
                height: 20px;
                background: var(--wa-green);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: 600;
            }

            .zpp-instruction-step span:last-child {
                font-size: 10px;
                color: var(--text-secondary);
                line-height: 1.2;
            }

            /* Chat Footer */
            .zpp-chat-footer {
                background: var(--surface);
                padding: 16px 20px;
                border-top: 1px solid var(--border);
            }

            .zpp-footer-info {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .zpp-office-hours {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .zpp-clock-icon {
                width: 16px;
                height: 16px;
                color: var(--text-secondary);
                flex-shrink: 0;
            }

            .zpp-hours-text {
                flex: 1;
            }

            .zpp-hours-text span {
                font-size: 12px;
                color: var(--text);
                font-weight: 500;
                display: block;
                margin-bottom: 2px;
            }

            .zpp-hours-text small {
                font-size: 11px;
                color: var(--text-secondary);
                display: block;
            }

            .zpp-powered-by {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                font-size: 11px;
                color: var(--text-secondary);
            }

            .zpp-ai-logo {
                display: flex;
                align-items: center;
                gap: 4px;
                color: var(--ai-blue);
                font-weight: 600;
            }

            .zpp-ai-sparkles {
                animation: sparkle 2s infinite;
            }

            /* Responsive Design */
            @media (max-width: 480px) {
                .zpp-whatsapp-widget {
                    ${config.position.includes('right') ? 'right' : 'left'}: 16px;
                    bottom: 16px;
                }

                .zpp-chat-modal {
                    width: calc(100vw - 32px);
                    ${config.position.includes('right') ? 'right' : 'left'}: -8px;
                }

                .zpp-whatsapp-fab {
                    width: 56px;
                    height: 56px;
                }

                .zpp-whatsapp-icon {
                    width: 24px;
                    height: 24px;
                }

                .zpp-chat-body {
                    padding: 12px;
                    max-height: 350px;
                }

                .zpp-qr-image {
                    width: 100px;
                    height: 100px;
                }

                .zpp-action-card {
                    padding: 12px;
                }

                .zpp-card-title {
                    font-size: 14px;
                }
            }

            /* Accessibility & Performance */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation: none !important;
                    transition: none !important;
                }
            }

            @media print {
                .zpp-whatsapp-widget {
                    display: none !important;
                }
            }

            .zpp-whatsapp-fab:focus-visible,
            .zpp-close-btn:focus-visible,
            .zpp-action-card:focus-visible {
                outline: 2px solid var(--ai-blue);
                outline-offset: 2px;
            }

            /* Custom scrollbar for chat body */
            .zpp-chat-body::-webkit-scrollbar {
                width: 6px;
            }

            .zpp-chat-body::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.05);
                border-radius: 3px;
            }

            .zpp-chat-body::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 3px;
            }

            .zpp-chat-body::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 0, 0, 0.3);
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

    // Enhanced toggle function
    window.toggleZPPChat = function() {
        const modal = document.getElementById('zppChatModal');
        const isActive = modal.classList.contains('active');
        
        if (isActive) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Enhanced analytics
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', isActive ? 'zpp_ai_chat_closed' : 'zpp_ai_chat_opened', {
                    event_category: 'ZPP_AI_WhatsApp_Widget',
                    event_label: isActive ? 'chat_close' : 'chat_open',
                    custom_parameter_1: status.online ? 'office_open' : 'office_closed',
                    custom_parameter_2: 'ai_assistant_v3'
                });
            }
        } catch (e) {}
    };

    // Enhanced event listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('zppChatModal');
            if (modal && modal.classList.contains('active')) {
                toggleZPPChat();
            }
        }
    });

    // Track enhanced chat interactions
    document.querySelectorAll('a[href*="wa.me"], a[href*="web.whatsapp.com"]').forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.href.includes('web.whatsapp.com') ? 'web_chat' : 'mobile_chat';
            try {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'zpp_ai_chat_started', {
                        event_category: 'ZPP_AI_WhatsApp_Widget',
                        event_label: linkType,
                        custom_parameter_1: 'ai_assistant_interaction',
                        custom_parameter_2: status.online ? 'office_hours' : 'after_hours',
                        value: 1
                    });
                }
            } catch (e) {}
        });
    });

    // Auto-show for new users with AI emphasis
    setTimeout(() => {
        const hasSeenAI = localStorage.getItem('zpp_ai_widget_seen') || sessionStorage.getItem('zpp_ai_widget_seen');
        
        if (!hasSeenAI) {
            const tooltip = document.querySelector('.zpp-ai-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateY(10px)';
                }, 3000);
                
                try {
                    localStorage.setItem('zpp_ai_widget_seen', 'true');
                } catch (e) {
                    sessionStorage.setItem('zpp_ai_widget_seen', 'true');
                }
            }
        }
    }, 2000);

    // Enhanced Public API
    window.ZPPWidget = {
        show: function() { 
            const modal = document.getElementById('zppChatModal');
            if (modal && !modal.classList.contains('active')) toggleZPPChat();
        },
        hide: function() { 
            const modal = document.getElementById('zppChatModal');
            if (modal && modal.classList.contains('active')) toggleZPPChat();
        },
        toggle: toggleZPPChat,
        getStatus: () => status,
        config: config,
        version: '3.0.0',
        type: 'AI_WhatsApp_Professional'
    };

    console.log('🚀 Pune ZP AI WhatsApp Widget v3.0.0 - Professional WhatsApp-Aligned UI');
    console.log('✨ Features: AI Assistant, Real-time Status, Professional Design');

})();
