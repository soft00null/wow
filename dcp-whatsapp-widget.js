/**
 * Divisional Commissioner Pune AI Chat Widget
 * File: dc-pune-chat-widget.js
 * Version: 5.0.0 - Professional Healthcare-Style Interface
 * Date: 2025-09-27
 * Author: soft00null
 * URL: https://wow-strategies.com/dc-pune-chat-widget.js
 * 
 * Healthcare-inspired UI with Docgram-style chat interface
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCPuneChatWidget) {
        console.warn('DC Pune Chat Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '919226556203',
        message: 'Hi! I need assistance from Divisional Commissioner Pune.',
        position: 'bottom-right',
        autoShow: true,
        autoPopupDelay: 3000,
        primaryColor: '#4F46E5', // Professional indigo
        secondaryColor: '#6366F1',
        accentColor: '#10B981', // Success green
        governmentColor: '#FF9933',
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        const widgetHTML = `
            <div class="dcw-container" id="dcwContainer">
                <!-- Main Floating Button -->
                <div class="dcw-floating-btn" id="dcwFloatingBtn">
                    <div class="dcw-btn-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                            <circle cx="12" cy="10" r="1"/>
                            <circle cx="8" cy="10" r="1"/>
                            <circle cx="16" cy="10" r="1"/>
                        </svg>
                    </div>
                    <div class="dcw-btn-badge">AI</div>
                    <div class="dcw-btn-pulse"></div>
                </div>
                
                <!-- Chat Bubble Notification -->
                <div class="dcw-chat-bubble" id="dcwChatBubble">
                    <div class="dcw-bubble-close" onclick="DCPuneChatWidget.closeBubble()">×</div>
                    <div class="dcw-bubble-header">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%234F46E5'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="AI Assistant" class="dcw-bubble-avatar">
                        <div class="dcw-bubble-info">
                            <div class="dcw-bubble-name">DC Pune AI Assistant</div>
                            <div class="dcw-bubble-status">
                                <span class="dcw-status-dot"></span>
                                Online 24/7
                            </div>
                        </div>
                    </div>
                    <div class="dcw-bubble-message">
                        👋 Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, certificates, complaints, and more. How can I support you today?
                    </div>
                    <div class="dcw-bubble-actions">
                        <button class="dcw-bubble-btn dcw-btn-primary" onclick="DCPuneChatWidget.open()">
                            Start Chat
                        </button>
                        <button class="dcw-bubble-btn dcw-btn-secondary" onclick="DCPuneChatWidget.closeBubble()">
                            Later
                        </button>
                    </div>
                </div>
                
                <!-- Main Chat Window -->
                <div class="dcw-chat-window" id="dcwChatWindow">
                    <div class="dcw-chat-container">
                        <!-- Chat Header -->
                        <div class="dcw-chat-header">
                            <div class="dcw-header-left">
                                <div class="dcw-header-avatar">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="DC Pune">
                                    <span class="dcw-avatar-status"></span>
                                </div>
                                <div class="dcw-header-info">
                                    <div class="dcw-header-title">Divisional Commissioner Pune</div>
                                    <div class="dcw-header-subtitle">AI Assistant • Available 24/7</div>
                                </div>
                            </div>
                            <div class="dcw-header-actions">
                                <button class="dcw-header-btn" onclick="DCPuneChatWidget.minimize()" title="Minimize">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 13H5v-2h14v2z"/>
                                    </svg>
                                </button>
                                <button class="dcw-header-btn" onclick="DCPuneChatWidget.close()" title="Close">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- AI Capabilities Banner -->
                        <div class="dcw-ai-banner">
                            <div class="dcw-ai-feature">
                                <span class="dcw-ai-icon">🤖</span>
                                <span class="dcw-ai-label">AI Powered</span>
                            </div>
                            <div class="dcw-ai-feature">
                                <span class="dcw-ai-icon">🌐</span>
                                <span class="dcw-ai-label">Multi-language</span>
                            </div>
                            <div class="dcw-ai-feature">
                                <span class="dcw-ai-icon">⚡</span>
                                <span class="dcw-ai-label">Instant Response</span>
                            </div>
                        </div>
                        
                        <!-- Chat Messages Area -->
                        <div class="dcw-chat-messages" id="dcwChatMessages">
                            <div class="dcw-message dcw-message-bot">
                                <div class="dcw-message-avatar">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%234F46E5'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="AI">
                                </div>
                                <div class="dcw-message-content">
                                    <div class="dcw-message-bubble">
                                        <p>Hello! I'm your AI Assistant for Divisional Commissioner Pune. 👋</p>
                                        <p>I can help you with:</p>
                                        <ul>
                                            <li>📜 Certificates and Documents</li>
                                            <li>📝 Complaint Registration</li>
                                            <li>🏘️ Land Records</li>
                                            <li>📍 Application Status Tracking</li>
                                            <li>ℹ️ Government Schemes Information</li>
                                        </ul>
                                        <p>How may I assist you today?</p>
                                    </div>
                                    <div class="dcw-message-time">Just now</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="dcw-quick-actions">
                            <div class="dcw-quick-title">Quick Actions:</div>
                            <div class="dcw-quick-buttons">
                                <button class="dcw-quick-btn" onclick="DCPuneChatWidget.quickAction('Check Symptoms')">
                                    <span class="dcw-quick-icon">📋</span>
                                    <span class="dcw-quick-label">Check Status</span>
                                </button>
                                <button class="dcw-quick-btn" onclick="DCPuneChatWidget.quickAction('Find Doctors')">
                                    <span class="dcw-quick-icon">🏛️</span>
                                    <span class="dcw-quick-label">Find Services</span>
                                </button>
                                <button class="dcw-quick-btn" onclick="DCPuneChatWidget.quickAction('Book Appointment')">
                                    <span class="dcw-quick-icon">📅</span>
                                    <span class="dcw-quick-label">Book Appointment</span>
                                </button>
                                <button class="dcw-quick-btn" onclick="DCPuneChatWidget.quickAction('Get Help')">
                                    <span class="dcw-quick-icon">🆘</span>
                                    <span class="dcw-quick-label">Get Help</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Chat Input -->
                        <div class="dcw-chat-input">
                            <div class="dcw-input-wrapper">
                                <input type="text" id="dcwChatInput" placeholder="Type your message here..." class="dcw-input-field">
                                <button class="dcw-attach-btn" title="Attach file">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                                    </svg>
                                </button>
                                <button class="dcw-send-btn" onclick="DCPuneChatWidget.sendMessage()">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="dcw-input-footer">
                                <a href="${config.poweredBy.url}" target="_blank" class="dcw-powered-link">
                                    ⚡ ${config.poweredBy.text}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Global Styles */
                .dcw-container * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif;
                }
                
                .dcw-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                
                /* Floating Button */
                .dcw-floating-btn {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    border-radius: 30px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: dcwEntrance 0.5s ease-out;
                }
                
                .dcw-floating-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4), 0 12px 32px rgba(0, 0, 0, 0.2);
                }
                
                .dcw-floating-btn.hidden {
                    transform: scale(0);
                    opacity: 0;
                }
                
                .dcw-btn-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: #EF4444;
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
                    animation: dcwPulse 2s infinite;
                }
                
                .dcw-btn-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid ${config.primaryColor};
                    animation: dcwRipple 2s infinite;
                }
                
                /* Chat Bubble */
                .dcw-chat-bubble {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    width: 320px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    display: none;
                    animation: dcwSlideUp 0.3s ease-out;
                    border: 1px solid #E5E7EB;
                }
                
                .dcw-chat-bubble.show {
                    display: block;
                }
                
                .dcw-bubble-close {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 24px;
                    height: 24px;
                    background: #F3F4F6;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #6B7280;
                    font-size: 16px;
                    transition: all 0.2s;
                }
                
                .dcw-bubble-close:hover {
                    background: #E5E7EB;
                    color: #374151;
                }
                
                .dcw-bubble-header {
                    padding: 16px;
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    border-bottom: 1px solid #F3F4F6;
                }
                
                .dcw-bubble-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #EEF2FF;
                    padding: 4px;
                }
                
                .dcw-bubble-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #111827;
                }
                
                .dcw-bubble-status {
                    font-size: 12px;
                    color: #6B7280;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-top: 2px;
                }
                
                .dcw-status-dot {
                    width: 8px;
                    height: 8px;
                    background: ${config.accentColor};
                    border-radius: 50%;
                    animation: dcwBlink 2s infinite;
                }
                
                .dcw-bubble-message {
                    padding: 16px;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #4B5563;
                }
                
                .dcw-bubble-actions {
                    padding: 16px;
                    display: flex;
                    gap: 8px;
                    border-top: 1px solid #F3F4F6;
                }
                
                .dcw-bubble-btn {
                    flex: 1;
                    padding: 10px 16px;
                    border-radius: 8px;
                    border: none;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .dcw-btn-primary {
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    color: white;
                }
                
                .dcw-btn-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
                }
                
                .dcw-btn-secondary {
                    background: #F3F4F6;
                    color: #6B7280;
                }
                
                .dcw-btn-secondary:hover {
                    background: #E5E7EB;
                    color: #4B5563;
                }
                
                /* Chat Window */
                .dcw-chat-window {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 380px;
                    height: 600px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    animation: dcwSlideUp 0.3s ease-out;
                    border: 1px solid #E5E7EB;
                }
                
                .dcw-chat-window.show {
                    display: flex;
                }
                
                .dcw-chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                /* Chat Header */
                .dcw-chat-header {
                    padding: 16px;
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .dcw-header-left {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }
                
                .dcw-header-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    position: relative;
                    padding: 4px;
                }
                
                .dcw-avatar-status {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: ${config.accentColor};
                    border-radius: 50%;
                    border: 2px solid white;
                }
                
                .dcw-header-title {
                    font-size: 15px;
                    font-weight: 600;
                }
                
                .dcw-header-subtitle {
                    font-size: 12px;
                    opacity: 0.9;
                    margin-top: 2px;
                }
                
                .dcw-header-actions {
                    display: flex;
                    gap: 8px;
                }
                
                .dcw-header-btn {
                    width: 32px;
                    height: 32px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .dcw-header-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                /* AI Banner */
                .dcw-ai-banner {
                    padding: 12px;
                    background: linear-gradient(to right, #EEF2FF, #DBEAFE);
                    display: flex;
                    justify-content: space-around;
                    border-bottom: 1px solid #E5E7EB;
                }
                
                .dcw-ai-feature {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #4B5563;
                    font-weight: 500;
                }
                
                .dcw-ai-icon {
                    font-size: 16px;
                }
                
                /* Chat Messages */
                .dcw-chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    background: #FAFAFA;
                }
                
                .dcw-message {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                    animation: dcwFadeIn 0.3s ease-out;
                }
                
                .dcw-message-bot {
                    flex-direction: row;
                }
                
                .dcw-message-user {
                    flex-direction: row-reverse;
                }
                
                .dcw-message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #EEF2FF;
                    flex-shrink: 0;
                    padding: 4px;
                }
                
                .dcw-message-user .dcw-message-avatar {
                    background: #F0FDF4;
                }
                
                .dcw-message-content {
                    max-width: 70%;
                }
                
                .dcw-message-bubble {
                    background: white;
                    padding: 12px 16px;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    font-size: 14px;
                    line-height: 1.5;
                    color: #374151;
                }
                
                .dcw-message-bubble p {
                    margin-bottom: 8px;
                }
                
                .dcw-message-bubble p:last-child {
                    margin-bottom: 0;
                }
                
                .dcw-message-bubble ul {
                    margin: 8px 0;
                    padding-left: 20px;
                }
                
                .dcw-message-bubble li {
                    margin: 4px 0;
                }
                
                .dcw-message-user .dcw-message-bubble {
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    color: white;
                }
                
                .dcw-message-time {
                    font-size: 11px;
                    color: #9CA3AF;
                    margin-top: 4px;
                }
                
                /* Quick Actions */
                .dcw-quick-actions {
                    padding: 12px;
                    background: white;
                    border-top: 1px solid #E5E7EB;
                }
                
                .dcw-quick-title {
                    font-size: 12px;
                    color: #6B7280;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                
                .dcw-quick-buttons {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                }
                
                .dcw-quick-btn {
                    padding: 8px;
                    background: #F3F4F6;
                    border: 1px solid #E5E7EB;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }
                
                .dcw-quick-btn:hover {
                    background: #EEF2FF;
                    border-color: ${config.primaryColor};
                    transform: translateY(-1px);
                }
                
                .dcw-quick-icon {
                    font-size: 20px;
                }
                
                .dcw-quick-label {
                    font-size: 10px;
                    color: #4B5563;
                    text-align: center;
                }
                
                /* Chat Input */
                .dcw-chat-input {
                    padding: 12px;
                    background: white;
                    border-top: 1px solid #E5E7EB;
                }
                
                .dcw-input-wrapper {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    background: #F3F4F6;
                    border-radius: 24px;
                    padding: 4px;
                }
                
                .dcw-input-field {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    padding: 8px 12px;
                    font-size: 14px;
                    color: #374151;
                }
                
                .dcw-input-field::placeholder {
                    color: #9CA3AF;
                }
                
                .dcw-attach-btn,
                .dcw-send-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .dcw-attach-btn {
                    background: transparent;
                    color: #6B7280;
                }
                
                .dcw-attach-btn:hover {
                    background: #E5E7EB;
                }
                
                .dcw-send-btn {
                    background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                    color: white;
                }
                
                .dcw-send-btn:hover {
                    transform: scale(1.1);
                }
                
                .dcw-input-footer {
                    text-align: center;
                    margin-top: 8px;
                }
                
                .dcw-powered-link {
                    font-size: 11px;
                    color: #9CA3AF;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .dcw-powered-link:hover {
                    color: ${config.primaryColor};
                }
                
                /* Animations */
                @keyframes dcwEntrance {
                    0% {
                        transform: scale(0) rotate(180deg);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1) rotate(0);
                        opacity: 1;
                    }
                }
                
                @keyframes dcwPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                
                @keyframes dcwRipple {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                
                @keyframes dcwSlideUp {
                    0% {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes dcwFadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes dcwBlink {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
                
                /* Responsive */
                @media (max-width: 420px) {
                    .dcw-chat-bubble {
                        width: calc(100vw - 40px);
                        right: -10px;
                    }
                    
                    .dcw-chat-window {
                        width: 100vw;
                        height: 100vh;
                        bottom: 0;
                        right: 0;
                        border-radius: 0;
                    }
                    
                    .dcw-quick-buttons {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                /* Scrollbar Styling */
                .dcw-chat-messages::-webkit-scrollbar {
                    width: 6px;
                }
                
                .dcw-chat-messages::-webkit-scrollbar-track {
                    background: #F3F4F6;
                }
                
                .dcw-chat-messages::-webkit-scrollbar-thumb {
                    background: #D1D5DB;
                    border-radius: 3px;
                }
                
                .dcw-chat-messages::-webkit-scrollbar-thumb:hover {
                    background: #9CA3AF;
                }
                
                /* Print */
                @media print {
                    .dcw-container {
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
            let container = document.getElementById('dc-pune-chat-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dc-pune-chat-widget';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Setup event listeners
            const floatingBtn = document.getElementById('dcwFloatingBtn');
            const chatBubble = document.getElementById('dcwChatBubble');
            const chatWindow = document.getElementById('dcwChatWindow');
            const chatInput = document.getElementById('dcwChatInput');
            
            // Floating button click
            floatingBtn.addEventListener('click', () => {
                if (chatWindow.classList.contains('show')) {
                    DCPuneChatWidget.close();
                } else if (chatBubble.classList.contains('show')) {
                    chatBubble.classList.remove('show');
                    DCPuneChatWidget.open();
                } else {
                    DCPuneChatWidget.open();
                }
            });
            
            // Enter key to send message
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    DCPuneChatWidget.sendMessage();
                }
            });
            
            // Auto show notification bubble
            if (config.autoShow) {
                setTimeout(() => {
                    if (!chatWindow.classList.contains('show')) {
                        chatBubble.classList.add('show');
                    }
                }, config.autoPopupDelay);
            }
            
            console.log('✅ DC Pune Chat Widget v5.0.0 initialized successfully!');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DC Pune Chat Widget initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneChatWidget = {
        version: '5.0.0',
        config: config,
        
        open: () => {
            const chatWindow = document.getElementById('dcwChatWindow');
            const chatBubble = document.getElementById('dcwChatBubble');
            const floatingBtn = document.getElementById('dcwFloatingBtn');
            
            chatBubble.classList.remove('show');
            chatWindow.classList.add('show');
            floatingBtn.classList.add('hidden');
        },
        
        close: () => {
            const chatWindow = document.getElementById('dcwChatWindow');
            const floatingBtn = document.getElementById('dcwFloatingBtn');
            
            chatWindow.classList.remove('show');
            floatingBtn.classList.remove('hidden');
        },
        
        minimize: () => {
            DCPuneChatWidget.close();
        },
        
        closeBubble: () => {
            const chatBubble = document.getElementById('dcwChatBubble');
            chatBubble.classList.remove('show');
        },
        
        sendMessage: () => {
            const input = document.getElementById('dcwChatInput');
            const messagesContainer = document.getElementById('dcwChatMessages');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message
            const userMessageHTML = `
                <div class="dcw-message dcw-message-user">
                    <div class="dcw-message-avatar">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E" alt="User">
                    </div>
                    <div class="dcw-message-content">
                        <div class="dcw-message-bubble">${message}</div>
                        <div class="dcw-message-time">Just now</div>
                    </div>
                </div>
            `;
            
            messagesContainer.insertAdjacentHTML('beforeend', userMessageHTML);
            input.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate bot response
            setTimeout(() => {
                const botMessageHTML = `
                    <div class="dcw-message dcw-message-bot">
                        <div class="dcw-message-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%234F46E5'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="AI">
                        </div>
                        <div class="dcw-message-content">
                            <div class="dcw-message-bubble">
                                Thank you for your message. I'm processing your request and will connect you with the right information shortly. For immediate assistance, you can also reach us on WhatsApp.
                            </div>
                            <div class="dcw-message-time">Just now</div>
                        </div>
                    </div>
                `;
                
                messagesContainer.insertAdjacentHTML('beforeend', botMessageHTML);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Open WhatsApp after delay
                setTimeout(() => {
                    const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                }, 1500);
            }, 1000);
        },
        
        quickAction: (action) => {
            const input = document.getElementById('dcwChatInput');
            input.value = action;
            DCPuneChatWidget.sendMessage();
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
