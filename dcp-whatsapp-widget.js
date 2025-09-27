/**
 * Divisional Commissioner Pune Healthcare AI WhatsApp Integration Widget
 * File: dc-pune-healthcare-widget.js
 * Version: 5.0.0 - Healthcare Professional Edition
 * Date: 2025-09-27
 * Author: soft00null
 * URL: https://wow-strategies.com/dc-pune-healthcare-widget.js
 * 
 * Healthcare-Inspired UI with WhatsApp Integration
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCHealthWidget) {
        console.warn('DC Health Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        message: 'Hi! I need assistance from Divisional Commissioner Pune.',
        position: 'bottom-right',
        autoShow: true,
        autoPopupDelay: 3000,
        colors: {
            whatsappGreen: '#25D366',
            whatsappDarkGreen: '#075E54',
            whatsappLight: '#DCF8C6',
            whatsappTeal: '#34B7F1',
            primaryBlue: '#4A90E2',
            successGreen: '#52C41A',
            warningOrange: '#FA8C16',
            errorRed: '#F5222D',
            background: '#F0F2F5',
            cardBg: '#FFFFFF',
            textPrimary: '#1C1E21',
            textSecondary: '#65676B'
        },
        menuItems: [
            {
                id: 'about',
                icon: 'ℹ️',
                title: 'About',
                description: 'Learn about our services',
                message: 'I want to know about Divisional Commissioner Pune services'
            },
            {
                id: 'services',
                icon: '🏛️',
                title: 'Services',
                description: 'Government services & certificates',
                message: 'I need information about government services'
            },
            {
                id: 'schemes',
                icon: '📋',
                title: 'Schemes',
                description: 'Government schemes & benefits',
                message: 'Tell me about government schemes and benefits'
            },
            {
                id: 'contact',
                icon: '📞',
                title: 'Contact',
                description: 'Get in touch with us',
                message: 'I need contact information and office details'
            }
        ],
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
                const day = now.getDay();
                const hour = now.getHours();
                const minute = now.getMinutes();
                const currentTime = hour * 100 + minute;
                
                if (day === 0) return false; // Sunday
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1730; // Mon-Fri
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400; // Saturday
                
                return false;
            } catch (error) {
                return true;
            }
        },
        
        generateQRCode: (phoneNumber, message) => {
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(whatsappUrl)}`;
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const statusText = isOfficeOpen ? 'Online' : 'Offline';
        const statusColor = isOfficeOpen ? config.colors.successGreen : config.colors.warningOrange;
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
        const qrCodeImage = utils.generateQRCode(config.phoneNumber, config.message);
        
        const widgetHTML = `
            <div class="dch-widget" id="dchWidget">
                <!-- Floating Button -->
                <div class="dch-button" id="dchButton">
                    <div class="dch-button-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="dch-button-badge">AI</div>
                    <div class="dch-button-pulse"></div>
                </div>
                
                <!-- Popup Notification -->
                <div class="dch-popup" id="dchPopup">
                    <div class="dch-popup-close" onclick="DCHealthWidget.closePopup()">×</div>
                    <div class="dch-popup-header">
                        <div class="dch-popup-avatar">💬</div>
                        <div class="dch-popup-info">
                            <div class="dch-popup-title">Divisional Commissioner Pune</div>
                            <div class="dch-popup-subtitle">AI Care Assistant • 24/7</div>
                        </div>
                    </div>
                    <div class="dch-popup-body">
                        Hi! I'm your AI Assistant for Saijyot Hospital. I'm here 24/7 to help with symptoms, finding the right doctor, booking appointments or anything you need. How can I support you today?
                    </div>
                    <div class="dch-popup-actions">
                        <button class="dch-popup-btn-primary" onclick="DCHealthWidget.open()">
                            Check Symptoms
                        </button>
                        <button class="dch-popup-btn-secondary" onclick="DCHealthWidget.open()">
                            Find Doctors
                        </button>
                    </div>
                </div>
                
                <!-- Main Chat Window -->
                <div class="dch-chat" id="dchChat">
                    <div class="dch-chat-inner">
                        <!-- Header -->
                        <div class="dch-chat-header">
                            <div class="dch-header-left">
                                <div class="dch-header-avatar">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                    </svg>
                                    <span class="dch-status-dot" style="background: ${statusColor}"></span>
                                </div>
                                <div class="dch-header-info">
                                    <div class="dch-header-title">DC Pune AI Assistant</div>
                                    <div class="dch-header-status">
                                        <span class="dch-status-text">${statusText}</span>
                                        <span class="dch-status-separator">•</span>
                                        <span class="dch-status-response">Typically replies instantly</span>
                                    </div>
                                </div>
                            </div>
                            <button class="dch-header-close" onclick="DCHealthWidget.close()">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="${config.colors.textSecondary}">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- AI Banner -->
                        <div class="dch-ai-banner">
                            <div class="dch-ai-icon">🤖</div>
                            <div class="dch-ai-text">
                                <strong>AI-Powered Assistant</strong>
                                <div>Get instant help with government services</div>
                            </div>
                        </div>
                        
                        <!-- Menu Grid -->
                        <div class="dch-menu-section">
                            <div class="dch-menu-title">How can I help you today?</div>
                            <div class="dch-menu-grid">
                                ${config.menuItems.map(item => `
                                    <div class="dch-menu-card" onclick="DCHealthWidget.selectMenu('${item.id}', '${item.message}')">
                                        <div class="dch-menu-icon">${item.icon}</div>
                                        <div class="dch-menu-content">
                                            <div class="dch-menu-heading">${item.title}</div>
                                            <div class="dch-menu-desc">${item.description}</div>
                                        </div>
                                        <div class="dch-menu-arrow">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="${config.colors.textSecondary}">
                                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                                            </svg>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="dch-quick-section">
                            <div class="dch-quick-title">Quick Actions</div>
                            <div class="dch-quick-chips">
                                <button class="dch-chip" onclick="DCHealthWidget.sendMessage('Apply for certificate')">
                                    📜 Certificates
                                </button>
                                <button class="dch-chip" onclick="DCHealthWidget.sendMessage('Track application status')">
                                    📍 Track Status
                                </button>
                                <button class="dch-chip" onclick="DCHealthWidget.sendMessage('Register complaint')">
                                    📝 Complaints
                                </button>
                                <button class="dch-chip" onclick="DCHealthWidget.sendMessage('Emergency services')">
                                    🚨 Emergency
                                </button>
                            </div>
                        </div>
                        
                        <!-- Chat Options -->
                        <div class="dch-options-section">
                            <a href="${whatsappUrl}" target="_blank" class="dch-option-card dch-whatsapp-mobile">
                                <div class="dch-option-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="${config.colors.whatsappGreen}">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                    </svg>
                                </div>
                                <div class="dch-option-content">
                                    <div class="dch-option-title">WhatsApp Mobile</div>
                                    <div class="dch-option-desc">Continue on your phone</div>
                                </div>
                                <div class="dch-option-badge">Recommended</div>
                            </a>
                            
                            <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" target="_blank" class="dch-option-card dch-whatsapp-web">
                                <div class="dch-option-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="${config.colors.whatsappGreen}">
                                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10z"/>
                                    </svg>
                                </div>
                                <div class="dch-option-content">
                                    <div class="dch-option-title">WhatsApp Web</div>
                                    <div class="dch-option-desc">Chat from your computer</div>
                                </div>
                            </a>
                        </div>
                        
                        <!-- QR Code Section -->
                        <div class="dch-qr-section">
                            <div class="dch-qr-header">
                                <span class="dch-qr-title">Scan to Start</span>
                                <button class="dch-qr-toggle" onclick="DCHealthWidget.toggleQR()">
                                    Show QR
                                </button>
                            </div>
                            <div class="dch-qr-content" id="dchQRContent" style="display: none;">
                                <img src="${qrCodeImage}" alt="WhatsApp QR Code" class="dch-qr-image"/>
                                <div class="dch-qr-steps">
                                    <div class="dch-qr-step">1. Open WhatsApp on your phone</div>
                                    <div class="dch-qr-step">2. Tap Menu or Settings and select Web/Desktop</div>
                                    <div class="dch-qr-step">3. Point your phone at this screen</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div class="dch-footer">
                            <a href="${config.poweredBy.url}" target="_blank" class="dch-powered">
                                ⚡ ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Reset and Base */
                .dch-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                }
                
                .dch-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                }
                
                /* Floating Button */
                .dch-button {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${config.colors.whatsappGreen}, ${config.colors.whatsappDarkGreen});
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dch-button:hover {
                    transform: scale(1.08);
                    box-shadow: 0 4px 20px rgba(37,211,102,0.4);
                }
                
                .dch-button-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: ${config.colors.errorRed};
                    color: white;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    font-size: 9px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                }
                
                .dch-button-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: ${config.colors.whatsappGreen};
                    opacity: 0.6;
                    animation: dchPulse 2s infinite;
                    pointer-events: none;
                }
                
                /* Popup Notification */
                .dch-popup {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    width: 320px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
                    display: none;
                    animation: dchSlideUp 0.4s ease-out;
                    border: 1px solid rgba(0,0,0,0.08);
                }
                
                .dch-popup.show {
                    display: block;
                }
                
                .dch-popup-close {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 24px;
                    height: 24px;
                    background: ${config.colors.background};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: ${config.colors.textSecondary};
                    font-size: 16px;
                }
                
                .dch-popup-header {
                    padding: 16px;
                    display: flex;
                    gap: 12px;
                    border-bottom: 1px solid ${config.colors.background};
                }
                
                .dch-popup-avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, ${config.colors.whatsappGreen}, ${config.colors.whatsappDarkGreen});
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }
                
                .dch-popup-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: ${config.colors.textPrimary};
                }
                
                .dch-popup-subtitle {
                    font-size: 12px;
                    color: ${config.colors.textSecondary};
                    margin-top: 2px;
                }
                
                .dch-popup-body {
                    padding: 16px;
                    font-size: 14px;
                    line-height: 1.5;
                    color: ${config.colors.textPrimary};
                }
                
                .dch-popup-actions {
                    padding: 0 16px 16px;
                    display: flex;
                    gap: 8px;
                }
                
                .dch-popup-btn-primary,
                .dch-popup-btn-secondary {
                    flex: 1;
                    padding: 10px;
                    border-radius: 20px;
                    border: none;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .dch-popup-btn-primary {
                    background: ${config.colors.primaryBlue};
                    color: white;
                }
                
                .dch-popup-btn-primary:hover {
                    background: #3A7BC8;
                }
                
                .dch-popup-btn-secondary {
                    background: transparent;
                    color: ${config.colors.primaryBlue};
                    border: 1px solid ${config.colors.primaryBlue};
                }
                
                .dch-popup-btn-secondary:hover {
                    background: ${config.colors.background};
                }
                
                /* Main Chat Window */
                .dch-chat {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 999998;
                    padding: 20px;
                    transition: background 0.3s ease;
                }
                
                .dch-chat.show {
                    display: flex;
                    background: rgba(0,0,0,0.5);
                }
                
                .dch-chat-inner {
                    background: white;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 440px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    transform: scale(0.95) translateY(20px);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                
                .dch-chat.show .dch-chat-inner {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
                
                /* Chat Header */
                .dch-chat-header {
                    background: ${config.colors.whatsappDarkGreen};
                    color: white;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .dch-header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .dch-header-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                .dch-status-dot {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: 2px solid ${config.colors.whatsappDarkGreen};
                }
                
                .dch-header-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                
                .dch-header-status {
                    font-size: 12px;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .dch-status-separator {
                    opacity: 0.5;
                }
                
                .dch-header-close {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }
                
                .dch-header-close:hover {
                    background: rgba(255,255,255,0.1);
                }
                
                .dch-header-close svg {
                    fill: white;
                }
                
                /* AI Banner */
                .dch-ai-banner {
                    background: linear-gradient(135deg, ${config.colors.whatsappLight}, #C8E6C9);
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 1px solid rgba(0,0,0,0.08);
                }
                
                .dch-ai-icon {
                    font-size: 24px;
                }
                
                .dch-ai-text {
                    font-size: 13px;
                    color: ${config.colors.textPrimary};
                    line-height: 1.4;
                }
                
                .dch-ai-text strong {
                    display: block;
                    margin-bottom: 2px;
                }
                
                /* Menu Section */
                .dch-menu-section {
                    padding: 20px 16px;
                    overflow-y: auto;
                    flex: 1;
                }
                
                .dch-menu-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: ${config.colors.textPrimary};
                    margin-bottom: 16px;
                }
                
                .dch-menu-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .dch-menu-card {
                    background: ${config.colors.background};
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 12px;
                    padding: 14px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .dch-menu-card:hover {
                    background: white;
                    border-color: ${config.colors.whatsappGreen};
                    transform: translateX(4px);
                    box-shadow: 0 2px 8px rgba(37,211,102,0.15);
                }
                
                .dch-menu-icon {
                    font-size: 28px;
                    width: 40px;
                    text-align: center;
                }
                
                .dch-menu-content {
                    flex: 1;
                }
                
                .dch-menu-heading {
                    font-size: 14px;
                    font-weight: 600;
                    color: ${config.colors.textPrimary};
                    margin-bottom: 2px;
                }
                
                .dch-menu-desc {
                    font-size: 12px;
                    color: ${config.colors.textSecondary};
                }
                
                .dch-menu-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Quick Actions */
                .dch-quick-section {
                    padding: 0 16px 16px;
                }
                
                .dch-quick-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: ${config.colors.textSecondary};
                    margin-bottom: 10px;
                }
                
                .dch-quick-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .dch-chip {
                    background: white;
                    border: 1px solid rgba(0,0,0,0.12);
                    border-radius: 20px;
                    padding: 8px 14px;
                    font-size: 12px;
                    color: ${config.colors.textPrimary};
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                
                .dch-chip:hover {
                    background: ${config.colors.whatsappLight};
                    border-color: ${config.colors.whatsappGreen};
                }
                
                /* Chat Options */
                .dch-options-section {
                    padding: 0 16px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .dch-option-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: white;
                    border: 2px solid ${config.colors.whatsappGreen};
                    border-radius: 12px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .dch-option-card:hover {
                    background: ${config.colors.whatsappLight};
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(37,211,102,0.2);
                }
                
                .dch-option-icon {
                    width: 40px;
                    height: 40px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .dch-option-content {
                    flex: 1;
                }
                
                .dch-option-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: ${config.colors.textPrimary};
                    margin-bottom: 2px;
                }
                
                .dch-option-desc {
                    font-size: 12px;
                    color: ${config.colors.textSecondary};
                }
                
                .dch-option-badge {
                    position: absolute;
                    top: -6px;
                    right: 12px;
                    background: ${config.colors.successGreen};
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 600;
                }
                
                /* QR Section */
                .dch-qr-section {
                    padding: 0 16px 16px;
                }
                
                .dch-qr-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }
                
                .dch-qr-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: ${config.colors.textSecondary};
                }
                
                .dch-qr-toggle {
                    background: transparent;
                    border: 1px solid ${config.colors.whatsappGreen};
                    color: ${config.colors.whatsappGreen};
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .dch-qr-toggle:hover {
                    background: ${config.colors.whatsappGreen};
                    color: white;
                }
                
                .dch-qr-content {
                    background: ${config.colors.background};
                    border-radius: 12px;
                    padding: 16px;
                    text-align: center;
                }
                
                .dch-qr-image {
                    width: 150px;
                    height: 150px;
                    margin: 0 auto 12px;
                    border-radius: 8px;
                }
                
                .dch-qr-steps {
                    font-size: 11px;
                    color: ${config.colors.textSecondary};
                    line-height: 1.6;
                }
                
                .dch-qr-step {
                    margin-bottom: 4px;
                }
                
                /* Footer */
                .dch-footer {
                    padding: 12px;
                    background: ${config.colors.background};
                    border-top: 1px solid rgba(0,0,0,0.08);
                    text-align: center;
                }
                
                .dch-powered {
                    font-size: 11px;
                    color: ${config.colors.textSecondary};
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .dch-powered:hover {
                    color: ${config.colors.whatsappGreen};
                }
                
                /* Animations */
                @keyframes dchPulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.3); opacity: 0; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                
                @keyframes dchSlideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                /* Responsive */
                @media (max-width: 480px) {
                    .dch-popup {
                        width: calc(100vw - 40px);
                        right: -10px;
                    }
                    
                    .dch-chat-inner {
                        max-width: 100%;
                        max-height: 100vh;
                        border-radius: 0;
                    }
                    
                    .dch-quick-chips {
                        gap: 6px;
                    }
                    
                    .dch-chip {
                        padding: 6px 10px;
                        font-size: 11px;
                    }
                }
                
                @media print {
                    .dch-widget {
                        display: none !important;
                    }
                }
            </style>
        `;
        
        return widgetHTML;
    };
    
    // Initialize widget
    const initWidget = () => {
        try {
            // Create container
            let container = document.getElementById('dc-health-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dc-health-widget';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Setup event listeners
            const button = document.getElementById('dchButton');
            const chat = document.getElementById('dchChat');
            const popup = document.getElementById('dchPopup');
            
            // Button click
            button.addEventListener('click', () => {
                DCHealthWidget.toggle();
            });
            
            // Click outside to close
            chat.addEventListener('click', (e) => {
                if (e.target === chat) {
                    DCHealthWidget.close();
                }
            });
            
            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && chat.classList.contains('show')) {
                    DCHealthWidget.close();
                }
            });
            
            // Show popup notification after delay
            if (config.autoShow) {
                setTimeout(() => {
                    popup.classList.add('show');
                    
                    // Auto hide after 12 seconds
                    setTimeout(() => {
                        popup.classList.remove('show');
                    }, 12000);
                }, config.autoPopupDelay);
            }
            
            console.log('✅ DC Health Widget v5.0.0 initialized!');
            console.log('🏥 Healthcare-inspired UI loaded');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCHealthWidget = {
        version: '5.0.0',
        config: config,
        
        open: () => {
            const chat = document.getElementById('dchChat');
            if (chat) {
                chat.classList.add('show');
                document.getElementById('dchPopup').classList.remove('show');
            }
        },
        
        close: () => {
            const chat = document.getElementById('dchChat');
            if (chat) {
                chat.classList.remove('show');
            }
        },
        
        toggle: () => {
            const chat = document.getElementById('dchChat');
            if (chat) {
                if (chat.classList.contains('show')) {
                    DCHealthWidget.close();
                } else {
                    DCHealthWidget.open();
                }
            }
        },
        
        closePopup: () => {
            const popup = document.getElementById('dchPopup');
            if (popup) {
                popup.classList.remove('show');
            }
        },
        
        selectMenu: (menuId, message) => {
            const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        },
        
        sendMessage: (message) => {
            const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        },
        
        toggleQR: () => {
            const qrContent = document.getElementById('dchQRContent');
            const toggle = document.querySelector('.dch-qr-toggle');
            if (qrContent) {
                if (qrContent.style.display === 'none') {
                    qrContent.style.display = 'block';
                    toggle.textContent = 'Hide QR';
                } else {
                    qrContent.style.display = 'none';
                    toggle.textContent = 'Show QR';
                }
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
