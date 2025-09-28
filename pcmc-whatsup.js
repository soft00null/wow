/**
 * PCMC Municipal Corporation AI Chat Widget
 * File: pcmc-whatsup.js
 * Version: 6.0.0
 * Date: 2025-09-28
 * Author: Team WoW
 * URL: https://wow-strategies.com/pcmc-whatsup.js
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    if (window.PCMCChatWidget) {
        console.warn('PCMC Chat Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hello! I need assistance from PCMC Municipal Corporation.',
        position: 'bottom-right',
        colors: {
            primary: '#2563eb',           // Modern blue
            secondary: '#1e40af',         // Darker blue
            accent: '#f0f9ff',           // Light blue
            background: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
            text: '#1f2937',
            white: '#ffffff',
            gray: '#6b7280',
            lightGray: '#f3f4f6',
            success: '#10b981',
            border: 'rgba(229, 231, 235, 0.8)'
        },
        poweredBy: {
            text: 'Powered by WoW-Strategies Pvt Ltd',
            url: 'https://wow-strategies.com/'
        },
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/919226556203'
    };
    
    const menuOptions = [
        { id: 'info', label: 'Information', icon: 'ℹ️', message: 'I need general information about PCMC services' },
        { id: 'properties', label: 'My Properties', icon: '🏠', message: 'I want to check my property details and tax information' },
        { id: 'grievance', label: 'Grievance', icon: '📝', message: 'I want to file a complaint or grievance with PCMC' },
        { id: 'schemes', label: 'Schemes', icon: '📋', message: 'Tell me about government and municipal schemes available' },
        { id: 'cfc', label: 'CFC', icon: '🏢', message: 'I need information about Common Facilitation Centre services' },
        { id: 'contact', label: 'Contact', icon: '📞', message: 'I need PCMC contact information and office locations' }
    ];
    
    const createWidget = () => {
        return `
            <div class="pcmc-widget" id="pcmcWidget">
                <!-- Hint Popup -->
                <div class="pcmc-hint" id="pcmcHint">
                    <div class="pcmc-hint-content">
                        <div class="pcmc-hint-icon">🤖</div>
                        <div class="pcmc-hint-text">
                            <strong>Hi! I'm PCMC AI Assistant</strong>
                            <div>Click here for instant help</div>
                        </div>
                        <button class="pcmc-hint-close" aria-label="Close hint">×</button>
                    </div>
                </div>

                <!-- Floating Action Button -->
                <button class="pcmc-fab" id="pcmcFab" aria-label="Open PCMC AI Chat">
                    <div class="pcmc-fab-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                    </div>
                    <div class="pcmc-fab-badge">AI</div>
                </button>
                
                <!-- Chat Interface -->
                <div class="pcmc-chat" id="pcmcChat">
                    <!-- Header -->
                    <div class="pcmc-header">
                        <div class="pcmc-header-left">
                            <div class="pcmc-header-avatar">
                                <div class="pcmc-avatar-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                    </svg>
                                </div>
                                <div class="pcmc-status-dot"></div>
                            </div>
                            <div class="pcmc-header-info">
                                <div class="pcmc-header-title">PCMC AI Assistant</div>
                                <div class="pcmc-header-subtitle">Municipal Corporation • Online</div>
                            </div>
                        </div>
                        <div class="pcmc-header-actions">
                            <button class="pcmc-qr-toggle" id="pcmcQrToggle" aria-label="Toggle QR Code" title="Show QR Code">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4z"/>
                                    <rect x="15" y="13" width="2" height="2"/>
                                    <rect x="19" y="13" width="2" height="2"/>
                                    <rect x="15" y="17" width="2" height="2"/>
                                    <rect x="17" y="15" width="2" height="2"/>
                                    <rect x="19" y="17" width="2" height="2"/>
                                    <rect x="21" y="15" width="2" height="2"/>
                                    <rect x="17" y="19" width="2" height="2"/>
                                    <rect x="19" y="21" width="2" height="2"/>
                                    <rect x="21" y="19" width="2" height="2"/>
                                </svg>
                            </button>
                            <button class="pcmc-close" id="pcmcClose" aria-label="Close chat">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- QR Code Section -->
                    <div class="pcmc-qr-section" id="pcmcQrSection">
                        <div class="pcmc-qr-content">
                            <img src="${config.qrCode}" alt="WhatsApp QR Code" class="pcmc-qr-image">
                            <div class="pcmc-qr-text">
                                <div class="pcmc-qr-title">Scan to Chat</div>
                                <div class="pcmc-qr-subtitle">Open WhatsApp on your phone</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Messages Area -->
                    <div class="pcmc-messages" id="pcmcMessages">
                        <!-- Welcome Message -->
                        <div class="pcmc-message pcmc-message-received">
                            <div class="pcmc-message-bubble">
                                <div class="pcmc-message-text">
                                    🙏 Namaste! Welcome to PCMC Municipal Corporation
                                </div>
                                <div class="pcmc-message-time">Just now</div>
                            </div>
                        </div>
                        
                        <div class="pcmc-message pcmc-message-received">
                            <div class="pcmc-message-bubble">
                                <div class="pcmc-message-text">
                                    I'm your AI Assistant. How may I help you today?
                                </div>
                                <div class="pcmc-message-time">Just now</div>
                            </div>
                        </div>
                        
                        <!-- Menu Options -->
                        <div class="pcmc-menu-container">
                            <div class="pcmc-menu-title">Select a Service</div>
                            <div class="pcmc-menu-grid">
                                ${menuOptions.map(option => `
                                    <button class="pcmc-menu-item" data-message="${option.message}" data-id="${option.id}">
                                        <div class="pcmc-menu-icon">${option.icon}</div>
                                        <div class="pcmc-menu-label">${option.label}</div>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="pcmc-footer">
                        <button class="pcmc-whatsapp-btn" id="pcmcWhatsAppBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                            <span>Continue on WhatsApp</span>
                        </button>
                        <div class="pcmc-powered">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Reset & Base */
                .pcmc-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
                }
                
                .pcmc-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 999999;
                    font-size: 14px;
                }
                
                /* Hint Popup */
                .pcmc-hint {
                    position: absolute;
                    bottom: 76px;
                    right: 0;
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    border-radius: 16px;
                    padding: 16px 20px;
                    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
                    max-width: 280px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px) scale(0.9);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .pcmc-hint.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                .pcmc-hint::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    right: 24px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid ${config.colors.secondary};
                }
                
                .pcmc-hint-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: white;
                    position: relative;
                }
                
                .pcmc-hint-icon {
                    font-size: 24px;
                    animation: bounce 2s infinite;
                }
                
                .pcmc-hint-text {
                    flex: 1;
                }
                
                .pcmc-hint-text strong {
                    font-size: 14px;
                    display: block;
                    margin-bottom: 2px;
                }
                
                .pcmc-hint-text div {
                    font-size: 12px;
                    opacity: 0.9;
                }
                
                .pcmc-hint-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 18px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                
                .pcmc-hint-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                /* Floating Action Button */
                .pcmc-fab {
                    width: 56px;
                    height: 56px;
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    border: none;
                    border-radius: 28px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                }
                
                .pcmc-fab:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(37, 99, 235, 0.5);
                }
                
                .pcmc-fab:active {
                    transform: scale(0.95);
                }
                
                .pcmc-fab-badge {
                    position: absolute;
                    top: -3px;
                    right: -3px;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 4px 6px;
                    border-radius: 12px;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                    line-height: 1;
                }
                
                /* Chat Window */
                .pcmc-chat {
                    position: absolute;
                    bottom: 72px;
                    right: 0;
                    width: 380px;
                    height: 600px;
                    background: ${config.colors.background};
                    backdrop-filter: blur(20px);
                    border: 1px solid ${config.colors.border};
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.9);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .pcmc-chat.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                /* Header */
                .pcmc-header {
                    background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                }
                
                .pcmc-header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .pcmc-header-avatar {
                    position: relative;
                }
                
                .pcmc-avatar-circle {
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                }
                
                .pcmc-status-dot {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    background: ${config.colors.success};
                    border: 2px solid white;
                    border-radius: 50%;
                }
                
                .pcmc-header-info {
                    color: white;
                }
                
                .pcmc-header-title {
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                
                .pcmc-header-subtitle {
                    font-size: 12px;
                    opacity: 0.9;
                }
                
                .pcmc-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .pcmc-qr-toggle,
                .pcmc-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    color: white;
                    backdrop-filter: blur(10px);
                }
                
                .pcmc-qr-toggle:hover,
                .pcmc-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }
                
                /* QR Code Section */
                .pcmc-qr-section {
                    background: ${config.colors.white};
                    padding: 20px;
                    border-bottom: 1px solid ${config.colors.border};
                    display: none;
                    animation: slideDown 0.3s ease-out;
                }
                
                .pcmc-qr-section.show {
                    display: block;
                }
                
                .pcmc-qr-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                
                .pcmc-qr-image {
                    width: 80px;
                    height: 80px;
                    border-radius: 12px;
                    border: 2px solid ${config.colors.lightGray};
                }
                
                .pcmc-qr-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: ${config.colors.text};
                    margin-bottom: 4px;
                }
                
                .pcmc-qr-subtitle {
                    font-size: 12px;
                    color: ${config.colors.gray};
                }
                
                /* Messages Area */
                .pcmc-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    background: transparent;
                }
                
                /* Message Bubbles */
                .pcmc-message {
                    margin-bottom: 16px;
                    display: flex;
                    animation: messageSlideIn 0.4s ease-out;
                }
                
                .pcmc-message-received {
                    justify-content: flex-start;
                }
                
                .pcmc-message-bubble {
                    max-width: 80%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    background: ${config.colors.white};
                    border: 1px solid ${config.colors.border};
                    backdrop-filter: blur(10px);
                }
                
                .pcmc-message-received .pcmc-message-bubble {
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                
                .pcmc-message-text {
                    font-size: 14px;
                    line-height: 1.4;
                    color: ${config.colors.text};
                    word-wrap: break-word;
                }
                
                .pcmc-message-time {
                    font-size: 11px;
                    color: ${config.colors.gray};
                    margin-top: 6px;
                }
                
                /* Menu Container */
                .pcmc-menu-container {
                    margin-top: 16px;
                    padding: 20px;
                    background: ${config.colors.white};
                    border: 1px solid ${config.colors.border};
                    border-radius: 16px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                }
                
                .pcmc-menu-title {
                    font-size: 14px;
                    color: ${config.colors.text};
                    margin-bottom: 16px;
                    font-weight: 600;
                    text-center: center;
                }
                
                .pcmc-menu-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }
                
                .pcmc-menu-item {
                    background: ${config.colors.white};
                    border: 1.5px solid ${config.colors.border};
                    padding: 16px 12px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    text-align: center;
                    backdrop-filter: blur(10px);
                    min-height: 80px;
                    justify-content: center;
                }
                
                .pcmc-menu-item:hover {
                    border-color: ${config.colors.primary};
                    background: ${config.colors.accent};
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.15);
                }
                
                .pcmc-menu-icon {
                    font-size: 20px;
                    line-height: 1;
                }
                
                .pcmc-menu-label {
                    font-size: 12px;
                    font-weight: 500;
                    color: ${config.colors.text};
                    line-height: 1.2;
                }
                
                /* Footer */
                .pcmc-footer {
                    padding: 20px;
                    background: ${config.colors.white};
                    border-top: 1px solid ${config.colors.border};
                    backdrop-filter: blur(10px);
                }
                
                .pcmc-whatsapp-btn {
                    width: 100%;
                    padding: 14px;
                    border: none;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: white;
                    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
                }
                
                .pcmc-whatsapp-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
                }
                
                .pcmc-powered {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 11px;
                }
                
                .pcmc-powered a {
                    color: ${config.colors.gray};
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .pcmc-powered a:hover {
                    color: ${config.colors.primary};
                }
                
                /* Animations */
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-5px); }
                    60% { transform: translateY(-3px); }
                }
                
                @keyframes messageSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                    }
                    to {
                        opacity: 1;
                        max-height: 120px;
                    }
                }
                
                /* Responsive Design */
                @media (max-width: 480px) {
                    .pcmc-widget {
                        bottom: 16px;
                        right: 16px;
                    }
                    
                    .pcmc-chat {
                        width: calc(100vw - 32px);
                        height: calc(100vh - 100px);
                        bottom: 68px;
                        right: -8px;
                    }
                    
                    .pcmc-hint {
                        max-width: calc(100vw - 100px);
                        right: -8px;
                    }
                    
                    .pcmc-menu-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }
                    
                    .pcmc-menu-item {
                        padding: 12px 8px;
                        min-height: 70px;
                    }
                    
                    .pcmc-menu-icon {
                        font-size: 18px;
                    }
                    
                    .pcmc-menu-label {
                        font-size: 11px;
                    }
                }
                
                /* Scrollbar Styling */
                .pcmc-messages::-webkit-scrollbar {
                    width: 4px;
                }
                
                .pcmc-messages::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .pcmc-messages::-webkit-scrollbar-thumb {
                    background: ${config.colors.border};
                    border-radius: 2px;
                }
                
                .pcmc-messages::-webkit-scrollbar-thumb:hover {
                    background: ${config.colors.gray};
                }
                
                /* Accessibility */
                .pcmc-widget button:focus {
                    outline: 2px solid ${config.colors.primary};
                    outline-offset: 2px;
                }
                
                /* Print Media */
                @media print {
                    .pcmc-widget {
                        display: none !important;
                    }
                }
                
                /* High Contrast Mode */
                @media (prefers-contrast: high) {
                    .pcmc-chat {
                        border: 2px solid ${config.colors.text};
                    }
                    
                    .pcmc-menu-item {
                        border-width: 2px;
                    }
                }
                
                /* Reduced Motion */
                @media (prefers-reduced-motion: reduce) {
                    .pcmc-widget *,
                    .pcmc-widget *::before,
                    .pcmc-widget *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            // Create container
            let container = document.getElementById('pcmc-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'pcmc-chat-widget-container';
                document.body.appendChild(container);
            }
            
            container.innerHTML = createWidget();
            
            // Get elements
            const fab = document.getElementById('pcmcFab');
            const chat = document.getElementById('pcmcChat');
            const close = document.getElementById('pcmcClose');
            const hint = document.getElementById('pcmcHint');
            const hintClose = hint.querySelector('.pcmc-hint-close');
            const qrToggle = document.getElementById('pcmcQrToggle');
            const qrSection = document.getElementById('pcmcQrSection');
            const whatsappBtn = document.getElementById('pcmcWhatsAppBtn');
            const menuItems = document.querySelectorAll('.pcmc-menu-item');
            
            // FAB click handler
            fab.addEventListener('click', () => {
                const isOpen = chat.classList.contains('show');
                if (isOpen) {
                    chat.classList.remove('show');
                } else {
                    chat.classList.add('show');
                    hint.classList.remove('show');
                }
            });
            
            // Close button handler
            close.addEventListener('click', () => {
                chat.classList.remove('show');
            });
            
            // Hint handlers
            hintClose.addEventListener('click', () => {
                hint.classList.remove('show');
            });
            
            // QR toggle handler
            qrToggle.addEventListener('click', () => {
                qrSection.classList.toggle('show');
            });
            
            // WhatsApp button handler
            whatsappBtn.addEventListener('click', () => {
                const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}`;
                window.open(url, '_blank');
            });
            
            // Menu item handlers
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                });
            });
            
            // Show hint after delay
            setTimeout(() => {
                if (!chat.classList.contains('show')) {
                    hint.classList.add('show');
                    
                    // Auto-hide hint after 10 seconds
                    setTimeout(() => {
                        hint.classList.remove('show');
                    }, 10000);
                }
            }, 2000);
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    if (chat.classList.contains('show')) {
                        chat.classList.remove('show');
                    }
                    if (hint.classList.contains('show')) {
                        hint.classList.remove('show');
                    }
                }
            });
            
            // Escape key handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (chat.classList.contains('show')) {
                        chat.classList.remove('show');
                    }
                    if (hint.classList.contains('show')) {
                        hint.classList.remove('show');
                    }
                }
            });
            
            // Accessibility: Focus management
            fab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fab.click();
                }
            });
            
            console.log('✅ PCMC Chat Widget v6.0.0 initialized successfully');
            console.log('🚀 Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ PCMC Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.PCMCChatWidget = {
        version: '6.0.0',
        open: () => {
            const chat = document.getElementById('pcmcChat');
            const hint = document.getElementById('pcmcHint');
            if (chat) {
                chat.classList.add('show');
                hint?.classList.remove('show');
            }
        },
        close: () => {
            const chat = document.getElementById('pcmcChat');
            if (chat) chat.classList.remove('show');
        },
        toggle: () => {
            const chat = document.getElementById('pcmcChat');
            if (chat) {
                const isOpen = chat.classList.contains('show');
                if (isOpen) {
                    chat.classList.remove('show');
                } else {
                    chat.classList.add('show');
                    document.getElementById('pcmcHint')?.classList.remove('show');
                }
            }
        },
        showHint: () => {
            const hint = document.getElementById('pcmcHint');
            if (hint && !document.getElementById('pcmcChat')?.classList.contains('show')) {
                hint.classList.add('show');
            }
        },
        hideHint: () => {
            document.getElementById('pcmcHint')?.classList.remove('show');
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
