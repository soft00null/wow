/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dc-pune-integrate.js
 * Version: 4.0.0 - Professional Government Edition
 * Date: 2025-09-27
 * Author: soft00null
 * URL: https://wow-strategies.com/dc-pune-integrate.js
 * 
 * WordPress Compatible with Enhanced UI/UX
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCPuneWidget) {
        console.warn('DC Pune Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        message: 'Hi! I need assistance from Divisional Commissioner Pune.',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=',
        position: 'bottom-right',
        autoShow: true,
        autoPopupDelay: 3000,
        primaryColor: '#25D366',
        secondaryColor: '#075E54',
        governmentColor: '#FF9933',
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
                
                // Government office hours: Mon-Fri 10:00-17:30, Sat 10:00-14:00
                if (day === 0) return false; // Sunday closed
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1730;
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400;
                
                return false;
            } catch (error) {
                return true;
            }
        },
        
        generateQRCode: (phoneNumber, message) => {
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            return `${config.qrCodeUrl}${encodeURIComponent(whatsappUrl)}`;
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const isOfficeOpen = utils.isOfficeHours();
        const statusText = isOfficeOpen ? 'Available' : 'After Hours';
        const statusColor = isOfficeOpen ? '#4CAF50' : '#FF9800';
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
        const qrCodeImage = utils.generateQRCode(config.phoneNumber, config.message);
        
        const widgetHTML = `
            <div class="dc-widget" id="dcWidget">
                <!-- Main Button -->
                <div class="dc-button" id="dcButton">
                    <div class="dc-button-inner">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                        <span class="dc-button-text">AI Assistant</span>
                    </div>
                    <div class="dc-badge-ai">AI</div>
                    <div class="dc-pulse-ring"></div>
                </div>
                
                <!-- Notification Bubble -->
                <div class="dc-notification" id="dcNotification">
                    <div class="dc-notification-close" onclick="DCPuneWidget.closeNotification()">×</div>
                    <div class="dc-notification-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="${config.secondaryColor}">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                    </div>
                    <div class="dc-notification-content">
                        <div class="dc-notification-title">Divisional Commissioner Pune</div>
                        <div class="dc-notification-message">
                            👋 Hello! I'm your AI Assistant. Need help with government services? Click to chat!
                        </div>
                    </div>
                </div>
                
                <!-- Main Modal -->
                <div class="dc-modal" id="dcModal">
                    <div class="dc-modal-inner">
                        <!-- Header -->
                        <div class="dc-modal-header">
                            <div class="dc-modal-header-content">
                                <div class="dc-modal-logo">
                                    <div class="dc-ashoka-chakra">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                            <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-width="2"/>
                                            <circle cx="12" cy="12" r="2" fill="white"/>
                                            <g transform="translate(12,12)">
                                                ${Array.from({length: 24}, (_, i) => `
                                                    <line x1="0" y1="-3" x2="0" y2="-8" stroke="white" stroke-width="1" transform="rotate(${i * 15})"/>
                                                `).join('')}
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div class="dc-modal-title-group">
                                    <h3 class="dc-modal-title">Divisional Commissioner Pune</h3>
                                    <div class="dc-modal-subtitle">AI-Powered Government Assistant</div>
                                    <div class="dc-modal-status">
                                        <span class="dc-status-indicator" style="background: ${statusColor}"></span>
                                        <span class="dc-status-text">${statusText}</span>
                                    </div>
                                </div>
                            </div>
                            <button class="dc-modal-close" onclick="DCPuneWidget.close()">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Body -->
                        <div class="dc-modal-body">
                            <!-- AI Features Section -->
                            <div class="dc-ai-features">
                                <div class="dc-ai-feature">
                                    <div class="dc-ai-icon">🤖</div>
                                    <div class="dc-ai-text">24/7 AI Support</div>
                                </div>
                                <div class="dc-ai-feature">
                                    <div class="dc-ai-icon">🌐</div>
                                    <div class="dc-ai-text">Multi-language</div>
                                </div>
                                <div class="dc-ai-feature">
                                    <div class="dc-ai-icon">⚡</div>
                                    <div class="dc-ai-text">Instant Response</div>
                                </div>
                            </div>
                            
                            <!-- Quick Actions -->
                            <div class="dc-quick-actions">
                                <h4 class="dc-section-title">Quick Services</h4>
                                <div class="dc-action-grid">
                                    <button class="dc-action-btn" onclick="DCPuneWidget.sendMessage('I need information about certificates')">
                                        <span class="dc-action-icon">📜</span>
                                        <span class="dc-action-label">Certificates</span>
                                    </button>
                                    <button class="dc-action-btn" onclick="DCPuneWidget.sendMessage('I want to register a complaint')">
                                        <span class="dc-action-icon">📝</span>
                                        <span class="dc-action-label">Complaints</span>
                                    </button>
                                    <button class="dc-action-btn" onclick="DCPuneWidget.sendMessage('I need help with land records')">
                                        <span class="dc-action-icon">🏘️</span>
                                        <span class="dc-action-label">Land Records</span>
                                    </button>
                                    <button class="dc-action-btn" onclick="DCPuneWidget.sendMessage('I want to track my application')">
                                        <span class="dc-action-icon">📍</span>
                                        <span class="dc-action-label">Track Status</span>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Chat Options -->
                            <div class="dc-chat-options">
                                <a href="${whatsappUrl}" target="_blank" class="dc-chat-option dc-mobile-chat">
                                    <div class="dc-chat-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="${config.primaryColor}">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                        </svg>
                                    </div>
                                    <div class="dc-chat-info">
                                        <div class="dc-chat-title">Chat on Mobile</div>
                                        <div class="dc-chat-desc">Open WhatsApp on your phone</div>
                                    </div>
                                    <div class="dc-chat-arrow">→</div>
                                </a>
                                
                                <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(config.message)}" target="_blank" class="dc-chat-option dc-web-chat">
                                    <div class="dc-chat-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="${config.primaryColor}">
                                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10z"/>
                                        </svg>
                                    </div>
                                    <div class="dc-chat-info">
                                        <div class="dc-chat-title">WhatsApp Web</div>
                                        <div class="dc-chat-desc">Continue on computer</div>
                                    </div>
                                    <div class="dc-chat-arrow">→</div>
                                </a>
                            </div>
                            
                            <!-- QR Code Section -->
                            <div class="dc-qr-section">
                                <h4 class="dc-section-title">Scan QR Code</h4>
                                <div class="dc-qr-container">
                                    <img src="${qrCodeImage}" alt="WhatsApp QR Code" class="dc-qr-image"/>
                                    <div class="dc-qr-instructions">
                                        <div class="dc-qr-step">1. Open WhatsApp</div>
                                        <div class="dc-qr-step">2. Tap Menu or Settings</div>
                                        <div class="dc-qr-step">3. Select Web/Desktop</div>
                                        <div class="dc-qr-step">4. Scan this code</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div class="dc-modal-footer">
                            <a href="${config.poweredBy.url}" target="_blank" class="dc-powered-by">
                                ⚡ ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Base Styles */
                .dc-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                
                .dc-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                }
                
                /* Main Button */
                .dc-button {
                    width: 68px;
                    height: 68px;
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 8px 25px rgba(37,211,102,0.3);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: visible;
                    animation: dcButtonEntrance 0.6s ease-out;
                }
                
                .dc-button:hover {
                    transform: scale(1.08);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2), 0 12px 35px rgba(37,211,102,0.4);
                }
                
                .dc-button-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                
                .dc-button-text {
                    display: none;
                }
                
                .dc-badge-ai {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: linear-gradient(135deg, #FF6B6B, #FF3838);
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    font-size: 10px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                    animation: dcPulse 2s infinite;
                }
                
                .dc-pulse-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid ${config.primaryColor};
                    animation: dcRipple 2s infinite;
                }
                
                /* Notification Bubble */
                .dc-notification {
                    position: absolute;
                    bottom: 85px;
                    right: 0;
                    background: white;
                    border-radius: 12px;
                    padding: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    width: 280px;
                    display: none;
                    animation: dcSlideInRight 0.4s ease-out;
                }
                
                .dc-notification.show {
                    display: flex;
                    gap: 12px;
                }
                
                .dc-notification-close {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 20px;
                    height: 20px;
                    background: #f0f0f0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 14px;
                    color: #666;
                }
                
                .dc-notification-avatar {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, ${config.governmentColor}, #138808);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dc-notification-avatar svg {
                    fill: white;
                }
                
                .dc-notification-content {
                    flex: 1;
                    padding-right: 20px;
                }
                
                .dc-notification-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 4px;
                }
                
                .dc-notification-message {
                    font-size: 13px;
                    color: #666;
                    line-height: 1.4;
                }
                
                /* Modal */
                .dc-modal {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 999998;
                    padding: 20px;
                    transition: background 0.3s ease;
                }
                
                .dc-modal.show {
                    display: flex;
                    background: rgba(0, 0, 0, 0.6);
                }
                
                .dc-modal-inner {
                    background: white;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 450px;
                    max-height: 90vh;
                    overflow: hidden;
                    transform: scale(0.9) translateY(20px);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                
                .dc-modal.show .dc-modal-inner {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
                
                /* Modal Header */
                .dc-modal-header {
                    background: linear-gradient(135deg, ${config.secondaryColor}, ${config.primaryColor});
                    color: white;
                    padding: 24px;
                    position: relative;
                }
                
                .dc-modal-header-content {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                }
                
                .dc-modal-logo {
                    flex-shrink: 0;
                    width: 50px;
                    height: 50px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dc-modal-title-group {
                    flex: 1;
                }
                
                .dc-modal-title {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                
                .dc-modal-subtitle {
                    font-size: 13px;
                    opacity: 0.9;
                    margin-bottom: 8px;
                }
                
                .dc-modal-status {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                }
                
                .dc-status-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: dcBlink 2s infinite;
                }
                
                .dc-modal-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .dc-modal-close:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.1);
                }
                
                /* Modal Body */
                .dc-modal-body {
                    padding: 24px;
                    overflow-y: auto;
                    max-height: calc(90vh - 200px);
                }
                
                /* AI Features */
                .dc-ai-features {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                    padding: 16px;
                    background: linear-gradient(135deg, #f0f9ff, #e6f7ff);
                    border-radius: 12px;
                    border: 1px solid #91d5ff;
                }
                
                .dc-ai-feature {
                    flex: 1;
                    text-align: center;
                }
                
                .dc-ai-icon {
                    font-size: 24px;
                    margin-bottom: 4px;
                }
                
                .dc-ai-text {
                    font-size: 11px;
                    color: #1890ff;
                    font-weight: 600;
                }
                
                /* Section Title */
                .dc-section-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 12px;
                }
                
                /* Quick Actions */
                .dc-quick-actions {
                    margin-bottom: 24px;
                }
                
                .dc-action-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }
                
                .dc-action-btn {
                    background: #f8f9fa;
                    border: 2px solid #e9ecef;
                    border-radius: 12px;
                    padding: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .dc-action-btn:hover {
                    background: #e9ecef;
                    border-color: ${config.primaryColor};
                    transform: translateY(-2px);
                }
                
                .dc-action-icon {
                    font-size: 20px;
                }
                
                .dc-action-label {
                    font-size: 13px;
                    color: #333;
                    font-weight: 500;
                }
                
                /* Chat Options */
                .dc-chat-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 24px;
                }
                
                .dc-chat-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    background: #f8f9fa;
                    border: 2px solid #e9ecef;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .dc-chat-option:hover {
                    background: #e8f5e9;
                    border-color: ${config.primaryColor};
                    transform: translateX(4px);
                }
                
                .dc-chat-icon {
                    width: 40px;
                    height: 40px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dc-chat-info {
                    flex: 1;
                }
                
                .dc-chat-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 2px;
                }
                
                .dc-chat-desc {
                    font-size: 12px;
                    color: #666;
                }
                
                .dc-chat-arrow {
                    color: #999;
                    font-size: 20px;
                }
                
                /* QR Section */
                .dc-qr-section {
                    background: #f8f9fa;
                    border-radius: 12px;
                    padding: 16px;
                }
                
                .dc-qr-container {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }
                
                .dc-qr-image {
                    width: 120px;
                    height: 120px;
                    border-radius: 8px;
                    border: 2px solid #e9ecef;
                }
                
                .dc-qr-instructions {
                    flex: 1;
                }
                
                .dc-qr-step {
                    font-size: 12px;
                    color: #666;
                    padding: 4px 0;
                }
                
                /* Footer */
                .dc-modal-footer {
                    padding: 16px;
                    background: #f8f9fa;
                    border-top: 1px solid #e9ecef;
                    text-align: center;
                }
                
                .dc-powered-by {
                    font-size: 12px;
                    color: #666;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .dc-powered-by:hover {
                    color: ${config.primaryColor};
                }
                
                /* Animations */
                @keyframes dcButtonEntrance {
                    0% { transform: scale(0) rotate(180deg); opacity: 0; }
                    50% { transform: scale(1.2) rotate(360deg); }
                    100% { transform: scale(1) rotate(360deg); opacity: 1; }
                }
                
                @keyframes dcPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes dcRipple {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                }
                
                @keyframes dcSlideInRight {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes dcBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                /* Responsive */
                @media (max-width: 480px) {
                    .dc-modal-inner {
                        max-width: 100%;
                        max-height: 100vh;
                        border-radius: 0;
                    }
                    
                    .dc-notification {
                        width: calc(100vw - 100px);
                    }
                    
                    .dc-action-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .dc-qr-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
                
                /* Print styles */
                @media print {
                    .dc-widget {
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
            let container = document.getElementById('dc-pune-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dc-pune-widget';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Setup event listeners
            const button = document.getElementById('dcButton');
            const modal = document.getElementById('dcModal');
            const notification = document.getElementById('dcNotification');
            
            // Button click
            button.addEventListener('click', () => {
                DCPuneWidget.toggle();
            });
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    DCPuneWidget.close();
                }
            });
            
            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    DCPuneWidget.close();
                }
            });
            
            // Auto show notification
            if (config.autoShow) {
                setTimeout(() => {
                    notification.classList.add('show');
                    
                    // Auto hide after 10 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 10000);
                }, config.autoPopupDelay);
            }
            
            console.log('✅ DC Pune Widget v4.0.0 initialized successfully!');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DC Pune Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneWidget = {
        version: '4.0.0',
        config: config,
        
        open: () => {
            const modal = document.getElementById('dcModal');
            if (modal) {
                modal.classList.add('show');
                document.getElementById('dcNotification').classList.remove('show');
            }
        },
        
        close: () => {
            const modal = document.getElementById('dcModal');
            if (modal) {
                modal.classList.remove('show');
            }
        },
        
        toggle: () => {
            const modal = document.getElementById('dcModal');
            if (modal) {
                if (modal.classList.contains('show')) {
                    DCPuneWidget.close();
                } else {
                    DCPuneWidget.open();
                }
            }
        },
        
        closeNotification: () => {
            const notification = document.getElementById('dcNotification');
            if (notification) {
                notification.classList.remove('show');
            }
        },
        
        sendMessage: (message) => {
            const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
