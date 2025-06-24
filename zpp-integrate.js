/**
 * Pune Zilla Panchayat AI WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 3.0.0
 * WhatsApp-Aligned UI with AI Highlights
 * Author: soft00null
 * Date: 2025-06-24 06:27:11 UTC
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ZPPWidget) return;
    
    // Premium Configuration
    const config = {
        phoneNumber: '912026134806',
        message: 'Hello!',
        qrApiUrl: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        position: 'bottom-right',
        
        // WhatsApp-Inspired Colors
        colors: {
            whatsapp: '#25D366',
            whatsappDark: '#128C7E', 
            whatsappLight: '#DCF8C6',
            ai: '#667EEA',
            aiGlow: 'rgba(102, 126, 234, 0.3)',
            pune: '#FF6B35',
            puneSecondary: '#2E8B57',
            dark: '#111B21',
            darkSecondary: '#202C33',
            light: '#F0F2F5',
            white: '#FFFFFF',
            text: '#54656F',
            textDark: '#111B21',
            border: '#E9EDEF',
            online: '#00A884',
            offline: '#8696A0'
        }
    };

    // Smart office hours check (IST)
    function getOfficeStatus() {
        try {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const ist = new Date(utc + (5.5 * 3600000)); // IST = UTC + 5:30
            
            const day = ist.getDay();
            const hour = ist.getHours();
            const minute = ist.getMinutes();
            const time = hour * 100 + minute;
            
            // Mon-Fri: 10:00-18:00, Sat: 10:00-14:00
            if (day >= 1 && day <= 5 && time >= 1000 && time < 1800) {
                return { online: true, text: 'सक्रिय', subtext: 'Active Now' };
            }
            if (day === 6 && time >= 1000 && time < 1400) {
                return { online: true, text: 'सक्रिय', subtext: 'Active Now' };
            }
            
            // Calculate next online time
            let nextDay = day === 0 ? 1 : day === 6 ? 1 : day + 1;
            let nextTime = nextDay === 6 ? '10:00 AM' : '10:00 AM';
            let dayName = ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'][nextDay];
            
            return { 
                online: false, 
                text: 'ऑफलाइन', 
                subtext: `${dayName} ${nextTime} ला सक्रिय होईल`
            };
        } catch {
            return { online: true, text: 'सक्रिय', subtext: 'Active Now' };
        }
    }

    const status = getOfficeStatus();
    
    // Premium WhatsApp-Aligned Widget
    const widgetHTML = `
        <div class="zpp-widget">
            <!-- AI-Powered FAB -->
            <div class="zpp-fab-container">
                <button class="zpp-fab" onclick="toggleZPPModal()" aria-label="Open AI WhatsApp Assistant">
                    <div class="zpp-fab-bg"></div>
                    <div class="zpp-fab-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="zpp-ai-badge">
                        <span>AI</span>
                        <div class="zpp-ai-pulse"></div>
                    </div>
                </button>
                <div class="zpp-fab-tooltip">पुणे जिप AI सहाय्यक</div>
            </div>

            <!-- WhatsApp-Style Modal -->
            <div class="zpp-modal" id="zppModal">
                <div class="zpp-backdrop" onclick="toggleZPPModal()"></div>
                <div class="zpp-chat-container">
                    
                    <!-- WhatsApp-Style Header -->
                    <div class="zpp-chat-header">
                        <div class="zpp-header-avatar">
                            <div class="zpp-avatar-bg">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"/>
                                </svg>
                            </div>
                            <div class="zpp-status-indicator ${status.online ? 'online' : 'offline'}"></div>
                        </div>
                        <div class="zpp-header-info">
                            <h3>पुणे जिप AI सहाय्यक</h3>
                            <p class="zpp-status-text">
                                <span class="zpp-status-dot ${status.online ? 'online' : 'offline'}"></span>
                                ${status.text} • ${status.subtext}
                            </p>
                        </div>
                        <button class="zpp-close-btn" onclick="toggleZPPModal()" aria-label="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Chat Messages Area -->
                    <div class="zpp-chat-body">
                        
                        <!-- AI Welcome Message -->
                        <div class="zpp-message zpp-message-ai">
                            <div class="zpp-message-content">
                                <div class="zpp-ai-indicator">
                                    <div class="zpp-ai-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,6H13V9H16V11H13V14H11V11H8V9H11V6Z"/>
                                        </svg>
                                    </div>
                                    <span>AI सहाय्यक</span>
                                </div>
                                <p>नमस्कार! 🙏 मी पुणे जिल्हा परिषदेचा AI सहाय्यक आहे.</p>
                                <p><strong>मी तुम्हाला यामध्ये मदत करू शकतो:</strong></p>
                                <ul>
                                    <li>🏛️ सरकारी योजना आणि सेवा</li>
                                    <li>📋 प्रमाणपत्र आणि अर्ज</li>
                                    <li>💡 नागरी सुविधा</li>
                                    <li>📞 संपर्क माहिती</li>
                                </ul>
                                <div class="zpp-message-time">आत्ताच • AI द्वारे</div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="zpp-quick-actions">
                            <h4>त्वरित संपर्क साधा:</h4>
                            <div class="zpp-action-buttons">
                                <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="zpp-action-btn zpp-primary">
                                    <div class="zpp-btn-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                        </svg>
                                    </div>
                                    <div class="zpp-btn-text">
                                        <span>मोबाइल चॅट</span>
                                        <small>Mobile Chat</small>
                                    </div>
                                </a>

                                <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="zpp-action-btn zpp-secondary">
                                    <div class="zpp-btn-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                        </svg>
                                    </div>
                                    <div class="zpp-btn-text">
                                        <span>वेब चॅट</span>
                                        <small>Web Chat</small>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <!-- QR Code Section -->
                        <div class="zpp-qr-section">
                            <div class="zpp-qr-header">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M5,15H7V17H5V15M12,15H14V17H12V15M17,15H19V17H17V15M9,17H11V19H9V17M3,3H11V11H3V3M5,5V9H9V5H5M13,3H21V11H13V3M15,5V9H19V5H15M3,13H11V21H3V13M5,15V19H9V15H5Z"/>
                                </svg>
                                <span>QR कोड स्कॅन करा</span>
                            </div>
                            <div class="zpp-qr-container">
                                <img src="${config.qrApiUrl}${encodeURIComponent('https://wa.me/' + config.phoneNumber + '?text=' + config.message)}" 
                                     alt="WhatsApp QR Code" 
                                     class="zpp-qr-code"
                                     loading="lazy"
                                     onerror="this.parentElement.style.display='none'">
                                <div class="zpp-qr-overlay">
                                    <div class="zpp-qr-logo">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p class="zpp-qr-hint">WhatsApp उघडा → ⋯ मेनू → QR स्कॅन करा</p>
                        </div>
                    </div>

                    <!-- Footer with Branding -->
                    <div class="zpp-chat-footer">
                        <div class="zpp-office-hours">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                            </svg>
                            <span>सोम-शुक्र 10:00-18:00, शनि 10:00-14:00</span>
                        </div>
                        <div class="zpp-powered-by">
                            <span>Powered by</span>
                            <a href="https://wow-strategies.com/" target="_blank" rel="noopener noreferrer">
                                <strong>WoW-Strategies</strong> Private Limited
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .zpp-widget {
                position: fixed;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 20px;
                ${config.position.includes('right') ? 'right' : 'left'}: 20px;
                z-index: 2147483647;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            }

            /* AI-Powered FAB */
            .zpp-fab-container {
                position: relative;
            }

            .zpp-fab {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, ${config.colors.whatsapp} 0%, ${config.colors.whatsappDark} 100%);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                outline: none;
                overflow: hidden;
            }

            .zpp-fab::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                transform: translateX(-100%);
                transition: transform 0.6s;
            }

            .zpp-fab:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
            }

            .zpp-fab:hover::before {
                transform: translateX(100%);
            }

            .zpp-fab:active {
                transform: scale(0.95);
            }

            .zpp-fab-bg {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: linear-gradient(135deg, ${config.colors.whatsapp}, ${config.colors.whatsappDark});
                animation: fabPulse 3s ease-in-out infinite;
            }

            @keyframes fabPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }

            .zpp-fab-icon {
                color: white;
                z-index: 2;
                transition: transform 0.3s ease;
            }

            .zpp-fab:hover .zpp-fab-icon {
                transform: rotate(15deg) scale(1.1);
            }

            .zpp-ai-badge {
                position: absolute;
                top: -6px;
                right: -6px;
                background: linear-gradient(135deg, ${config.colors.ai}, #764BA2);
                color: white;
                font-size: 10px;
                font-weight: 700;
                padding: 4px 6px;
                border-radius: 12px;
                border: 2px solid white;
                box-shadow: 0 2px 12px ${config.colors.aiGlow};
                z-index: 3;
                position: relative;
                overflow: hidden;
            }

            .zpp-ai-pulse {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, ${config.colors.ai}, transparent);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: aiPulse 2s ease-out infinite;
            }

            @keyframes aiPulse {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }

            .zpp-fab-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-8px);
                background: ${config.colors.dark};
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                pointer-events: none;
            }

            .zpp-fab-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 4px solid transparent;
                border-top-color: ${config.colors.dark};
            }

            .zpp-fab-container:hover .zpp-fab-tooltip {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(-12px);
            }

            /* WhatsApp-Style Modal */
            .zpp-modal {
                position: absolute;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 80px;
                ${config.position.includes('right') ? 'right' : 'left'}: 0;
                width: 380px;
                max-width: calc(100vw - 40px);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.9);
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: none;
            }

            .zpp-modal.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }

            .zpp-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(4px);
                z-index: -1;
            }

            .zpp-chat-container {
                background: ${config.colors.white};
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                border: 1px solid ${config.colors.border};
            }

            /* WhatsApp-Style Header */
            .zpp-chat-header {
                background: ${config.colors.whatsapp};
                color: white;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
            }

            .zpp-header-avatar {
                position: relative;
                flex-shrink: 0;
            }

            .zpp-avatar-bg {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
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
                background: ${config.colors.online};
                animation: statusPulse 2s ease-in-out infinite;
            }

            .zpp-status-indicator.offline {
                background: ${config.colors.offline};
            }

            @keyframes statusPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }

            .zpp-header-info {
                flex: 1;
                min-width: 0;
            }

            .zpp-header-info h3 {
                margin: 0 0 2px 0;
                font-size: 16px;
                font-weight: 600;
                color: white;
                line-height: 1.2;
            }

            .zpp-status-text {
                margin: 0;
                font-size: 13px;
                opacity: 0.9;
                display: flex;
                align-items: center;
                gap: 6px;
                line-height: 1.2;
            }

            .zpp-status-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .zpp-status-dot.online {
                background: ${config.colors.online};
                animation: dotPulse 2s ease-in-out infinite;
            }

            .zpp-status-dot.offline {
                background: ${config.colors.offline};
            }

            @keyframes dotPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }

            .zpp-close-btn {
                width: 32px;
                height: 32px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                outline: none;
                flex-shrink: 0;
            }

            .zpp-close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }

            /* Chat Body */
            .zpp-chat-body {
                background: #E5DDD5;
                background-image: 
                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 40px 40px;
                padding: 20px;
                max-height: 400px;
                overflow-y: auto;
            }

            /* AI Message */
            .zpp-message {
                margin-bottom: 16px;
            }

            .zpp-message-ai .zpp-message-content {
                background: ${config.colors.white};
                padding: 12px 16px;
                border-radius: 8px 8px 8px 2px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                position: relative;
                max-width: 85%;
            }

            .zpp-ai-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 8px;
                color: ${config.colors.ai};
                font-size: 12px;
                font-weight: 600;
            }

            .zpp-ai-icon {
                width: 16px;
                height: 16px;
                background: linear-gradient(135deg, ${config.colors.ai}, #764BA2);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .zpp-message-content p {
                margin: 0 0 8px 0;
                font-size: 14px;
                line-height: 1.4;
                color: ${config.colors.textDark};
            }

            .zpp-message-content p:last-of-type {
                margin-bottom: 0;
            }

            .zpp-message-content ul {
                margin: 8px 0;
                padding-left: 20px;
            }

            .zpp-message-content li {
                margin: 4px 0;
                font-size: 14px;
                line-height: 1.4;
                color: ${config.colors.textDark};
            }

            .zpp-message-time {
                font-size: 11px;
                color: ${config.colors.text};
                margin-top: 8px;
                text-align: right;
            }

            /* Quick Actions */
            .zpp-quick-actions {
                margin-top: 16px;
            }

            .zpp-quick-actions h4 {
                margin: 0 0 12px 0;
                font-size: 14px;
                color: ${config.colors.textDark};
                font-weight: 600;
            }

            .zpp-action-buttons {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .zpp-action-btn {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                background: ${config.colors.white};
                border: 1px solid ${config.colors.border};
                border-radius: 8px;
                text-decoration: none;
                color: ${config.colors.textDark};
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }

            .zpp-action-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.1), transparent);
                transition: left 0.5s ease;
            }

            .zpp-action-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                border-color: ${config.colors.whatsapp};
            }

            .zpp-action-btn:hover::before {
                left: 100%;
            }

            .zpp-action-btn.zpp-primary {
                background: ${config.colors.whatsapp};
                color: white;
                border-color: ${config.colors.whatsapp};
            }

            .zpp-action-btn.zpp-primary:hover {
                background: ${config.colors.whatsappDark};
                border-color: ${config.colors.whatsappDark};
            }

            .zpp-btn-icon {
                width: 36px;
                height: 36px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .zpp-action-btn:not(.zpp-primary) .zpp-btn-icon {
                background: ${config.colors.light};
                color: ${config.colors.whatsapp};
            }

            .zpp-btn-text span {
                display: block;
                font-size: 14px;
                font-weight: 600;
                line-height: 1.2;
                margin-bottom: 2px;
            }

            .zpp-btn-text small {
                font-size: 12px;
                opacity: 0.8;
                line-height: 1.2;
            }

            /* QR Code Section */
            .zpp-qr-section {
                background: ${config.colors.white};
                border-radius: 8px;
                padding: 16px;
                text-align: center;
                margin-top: 16px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }

            .zpp-qr-header {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 600;
                color: ${config.colors.textDark};
                margin-bottom: 12px;
            }

            .zpp-qr-container {
                position: relative;
                display: inline-block;
                padding: 8px;
                background: ${config.colors.light};
                border-radius: 12px;
                border: 2px dashed ${config.colors.border};
                transition: all 0.3s ease;
            }

            .zpp-qr-container:hover {
                border-color: ${config.colors.whatsapp};
                background: ${config.colors.whatsappLight};
                transform: scale(1.02);
            }

            .zpp-qr-code {
                width: 100px;
                height: 100px;
                border-radius: 8px;
                display: block;
            }

            .zpp-qr-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 24px;
                height: 24px;
                background: ${config.colors.whatsapp};
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .zpp-qr-hint {
                margin: 8px 0 0 0;
                font-size: 12px;
                color: ${config.colors.text};
                line-height: 1.3;
            }

            /* Footer */
            .zpp-chat-footer {
                background: ${config.colors.light};
                padding: 12px 20px;
                border-top: 1px solid ${config.colors.border};
            }

            .zpp-office-hours {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                color: ${config.colors.text};
                margin-bottom: 8px;
            }

            .zpp-powered-by {
                font-size: 11px;
                color: ${config.colors.text};
                text-align: center;
            }

            .zpp-powered-by a {
                color: ${config.colors.pune};
                text-decoration: none;
                margin-left: 4px;
                transition: color 0.2s ease;
            }

            .zpp-powered-by a:hover {
                color: ${config.colors.puneSecondary};
                text-decoration: underline;
            }

            /* Responsive Design */
            @media (max-width: 480px) {
                .zpp-widget {
                    ${config.position.includes('right') ? 'right' : 'left'}: 16px;
                    bottom: 16px;
                }

                .zpp-modal {
                    width: calc(100vw - 32px);
                    ${config.position.includes('right') ? 'right' : 'left'}: -8px;
                }

                .zpp-fab {
                    width: 56px;
                    height: 56px;
                }

                .zpp-chat-body {
                    padding: 16px;
                }

                .zpp-qr-code {
                    width: 80px;
                    height: 80px;
                }
            }

            /* Accessibility & Reduced Motion */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation: none !important;
                    transition: none !important;
                }
            }

            @media print {
                .zpp-widget {
                    display: none !important;
                }
            }

            /* Focus States */
            .zpp-fab:focus-visible,
            .zpp-close-btn:focus-visible,
            .zpp-action-btn:focus-visible {
                outline: 2px solid ${config.colors.ai};
                outline-offset: 2px;
            }

            /* Scrollbar Styling */
            .zpp-chat-body::-webkit-scrollbar {
                width: 6px;
            }

            .zpp-chat-body::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 3px;
            }

            .zpp-chat-body::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 3px;
            }

            .zpp-chat-body::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 0, 0, 0.5);
            }
        </style>
    `;

    // Insert widget
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
        const isActive = modal.classList.contains('active');
        
        modal.classList.toggle('active');
        
        // Prevent body scroll when modal is open
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Analytics
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', isActive ? 'zpp_modal_closed' : 'zpp_modal_opened', {
                    event_category: 'ZPP_AI_WhatsApp_Widget',
                    event_label: 'user_interaction',
                    custom_parameter_1: status.online ? 'office_open' : 'office_closed'
                });
            }
        } catch (e) {}
    };

    // Event listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('zppModal');
            if (modal && modal.classList.contains('active')) {
                toggleZPPModal();
            }
        }
    });

    // Track chat clicks
    document.querySelectorAll('a[href*="wa.me"], a[href*="web.whatsapp.com"]').forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.href.includes('web.whatsapp.com') ? 'web_chat' : 'mobile_chat';
            try {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'zpp_ai_chat_started', {
                        event_category: 'ZPP_AI_WhatsApp_Widget',
                        event_label: linkType,
                        custom_parameter_1: status.online ? 'office_open' : 'office_closed',
                        custom_parameter_2: 'ai_powered'
                    });
                }
            } catch (e) {}
        });
    });

    // Track WoW-Strategies link
    document.querySelector('a[href*="wow-strategies.com"]')?.addEventListener('click', function() {
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'wow_strategies_link_clicked', {
                    event_category: 'ZPP_AI_WhatsApp_Widget',
                    event_label: 'powered_by_link'
                });
            }
        } catch (e) {}
    });

    // Auto-show for first-time visitors (disabled by default for professional use)
    if (config.autoShow) {
        const hasSeenWidget = localStorage.getItem('zpp_ai_widget_seen');
        if (!hasSeenWidget) {
            setTimeout(() => {
                const fab = document.querySelector('.zpp-fab');
                if (fab) {
                    fab.style.animation = 'fabPulse 2s ease-in-out 3';
                    localStorage.setItem('zpp_ai_widget_seen', 'true');
                }
            }, 3000);
        }
    }

    // Public API
    window.ZPPWidget = {
        show: function() { 
            const modal = document.getElementById('zppModal');
            if (modal && !modal.classList.contains('active')) toggleZPPModal();
        },
        hide: function() { 
            const modal = document.getElementById('zppModal');
            if (modal && modal.classList.contains('active')) toggleZPPModal();
        },
        toggle: toggleZPPModal,
        config: config,
        version: '3.0.0',
        status: status
    };

    console.log('🚀 Pune ZP AI WhatsApp Widget v3.0.0 - WhatsApp-Aligned with AI Highlights');
    console.log('💫 Powered by WoW-Strategies Private Limited');

})();
