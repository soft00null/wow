/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dc-pune-widget-v5.js
 * Version: 5.0.0 - Enhanced Menu System
 * Date: 2025-09-27
 * Author: soft00null
 * URL: https://wow-strategies.com/dc-pune-widget-v5.js
 * 
 * WordPress Compatible with WhatsApp-Inspired UI
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.DCPuneWidgetV5) {
        console.warn('DC Pune Widget v5 already initialized');
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
        whatsappGreen: '#25D366',
        whatsappDarkGreen: '#075E54',
        whatsappLight: '#DCF8C6',
        whatsappBackground: '#E5DDD5',
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        }
    };
    
    // Menu Items
    const menuItems = {
        about: {
            icon: '🏛️',
            title: 'About',
            subtitle: 'Learn about our office',
            items: [
                { text: 'Office Introduction', message: 'Tell me about Divisional Commissioner Pune office' },
                { text: 'Vision & Mission', message: 'What is the vision and mission?' },
                { text: 'Office Timings', message: 'What are the office timings?' },
                { text: 'Office Address', message: 'What is the office address?' }
            ]
        },
        services: {
            icon: '📋',
            title: 'Services',
            subtitle: 'Government services',
            items: [
                { text: 'Certificates', message: 'I need information about certificates' },
                { text: 'Land Records', message: 'Help with land records' },
                { text: 'Revenue Services', message: 'Revenue department services' },
                { text: 'Public Grievances', message: 'How to file a complaint?' },
                { text: 'RTI Application', message: 'How to apply for RTI?' }
            ]
        },
        schemes: {
            icon: '🎯',
            title: 'Schemes',
            subtitle: 'Government schemes',
            items: [
                { text: 'Social Welfare', message: 'Social welfare schemes' },
                { text: 'Agriculture', message: 'Agricultural schemes' },
                { text: 'Education', message: 'Education schemes' },
                { text: 'Health', message: 'Health schemes' },
                { text: 'Housing', message: 'Housing schemes' }
            ]
        },
        contact: {
            icon: '📞',
            title: 'Contact',
            subtitle: 'Get in touch',
            items: [
                { text: 'Office Phone', message: 'What is the office phone number?' },
                { text: 'Email Address', message: 'What is the email address?' },
                { text: 'Emergency Contact', message: 'Emergency contact numbers' },
                { text: 'Department Contacts', message: 'Department wise contact details' }
            ]
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
                
                if (day === 0) return false;
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1730;
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400;
                
                return false;
            } catch (error) {
                return true;
            }
        },
        
        getGreeting: () => {
            const hour = utils.getCurrentISTTime().getHours();
            if (hour < 12) return 'Good Morning! 🌅';
            if (hour < 17) return 'Good Afternoon! ☀️';
            if (hour < 20) return 'Good Evening! 🌆';
            return 'Good Night! 🌙';
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
        const statusColor = isOfficeOpen ? '#4CAF50' : '#FFA500';
        const greeting = utils.getGreeting();
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
        const qrCodeImage = utils.generateQRCode(config.phoneNumber, config.message);
        
        const widgetHTML = `
            <div class="dcw5-widget" id="dcw5Widget">
                <!-- Main Button -->
                <div class="dcw5-button" id="dcw5Button">
                    <div class="dcw5-button-inner">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="dcw5-badge">AI</div>
                    <div class="dcw5-pulse"></div>
                </div>
                
                <!-- Notification -->
                <div class="dcw5-notification" id="dcw5Notification">
                    <div class="dcw5-notification-header">
                        <div class="dcw5-notification-avatar">
                            <div class="dcw5-avatar-status" style="background: ${statusColor}"></div>
                            🤖
                        </div>
                        <div class="dcw5-notification-info">
                            <div class="dcw5-notification-name">DC Pune AI Assistant</div>
                            <div class="dcw5-notification-status">${statusText}</div>
                        </div>
                        <button class="dcw5-notification-close" onclick="DCPuneWidgetV5.hideNotification()">×</button>
                    </div>
                    <div class="dcw5-notification-body">
                        <div class="dcw5-message-bubble">
                            ${greeting} I'm your AI Assistant for Divisional Commissioner Pune. How can I help you today?
                        </div>
                    </div>
                </div>
                
                <!-- Main Chat Window -->
                <div class="dcw5-chat" id="dcw5Chat">
                    <!-- Chat Header -->
                    <div class="dcw5-chat-header">
                        <button class="dcw5-back-btn" id="dcw5BackBtn" onclick="DCPuneWidgetV5.showMainMenu()">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                            </svg>
                        </button>
                        <div class="dcw5-header-avatar">
                            <img src="https://ui-avatars.com/api/?name=DC+Pune&background=075E54&color=fff&size=40&font-size=0.4&bold=true" alt="DC Pune">
                            <div class="dcw5-avatar-badge" style="background: ${statusColor}"></div>
                        </div>
                        <div class="dcw5-header-info">
                            <div class="dcw5-header-title">Divisional Commissioner Pune</div>
                            <div class="dcw5-header-subtitle">
                                <span class="dcw5-status-dot" style="background: ${statusColor}"></span>
                                ${statusText} • AI Powered
                            </div>
                        </div>
                        <button class="dcw5-close-btn" onclick="DCPuneWidgetV5.close()">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Chat Body -->
                    <div class="dcw5-chat-body" id="dcw5ChatBody">
                        <!-- Welcome Screen -->
                        <div class="dcw5-welcome" id="dcw5Welcome">
                            <div class="dcw5-welcome-message">
                                <div class="dcw5-welcome-avatar">🏛️</div>
                                <h3>Welcome to DC Pune AI Assistant</h3>
                                <p>Get instant help with government services, schemes, and information.</p>
                            </div>
                            
                            <!-- Main Menu -->
                            <div class="dcw5-menu-grid">
                                ${Object.entries(menuItems).map(([key, item]) => `
                                    <div class="dcw5-menu-item" onclick="DCPuneWidgetV5.showSubmenu('${key}')">
                                        <div class="dcw5-menu-icon">${item.icon}</div>
                                        <div class="dcw5-menu-content">
                                            <div class="dcw5-menu-title">${item.title}</div>
                                            <div class="dcw5-menu-subtitle">${item.subtitle}</div>
                                        </div>
                                        <div class="dcw5-menu-arrow">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#999">
                                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                            </svg>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <!-- Quick Actions -->
                            <div class="dcw5-quick-actions">
                                <h4>Quick Actions</h4>
                                <div class="dcw5-action-chips">
                                    <button class="dcw5-chip" onclick="DCPuneWidgetV5.sendMessage('Track application status')">
                                        📍 Track Status
                                    </button>
                                    <button class="dcw5-chip" onclick="DCPuneWidgetV5.sendMessage('Emergency helpline numbers')">
                                        🚨 Emergency
                                    </button>
                                    <button class="dcw5-chip" onclick="DCPuneWidgetV5.sendMessage('Office location and directions')">
                                        🗺️ Directions
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Chat Options -->
                            <div class="dcw5-chat-options">
                                <a href="${whatsappUrl}" target="_blank" class="dcw5-chat-option">
                                    <div class="dcw5-option-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="${config.whatsappGreen}">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                                        </svg>
                                    </div>
                                    <div class="dcw5-option-text">
                                        <div class="dcw5-option-title">Open in WhatsApp</div>
                                        <div class="dcw5-option-desc">Continue on mobile app</div>
                                    </div>
                                </a>
                                
                                <div class="dcw5-qr-section">
                                    <img src="${qrCodeImage}" alt="QR Code" class="dcw5-qr-image">
                                    <div class="dcw5-qr-text">Scan to chat on phone</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Submenu Container -->
                        <div class="dcw5-submenu" id="dcw5Submenu" style="display: none;">
                            <!-- Dynamically populated -->
                        </div>
                    </div>
                    
                    <!-- Chat Footer -->
                    <div class="dcw5-chat-footer">
                        <a href="${config.poweredBy.url}" target="_blank" class="dcw5-powered-by">
                            ⚡ ${config.poweredBy.text}
                        </a>
                    </div>
                </div>
            </div>
            
            <style>
                /* Base Styles */
                .dcw5-widget * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                }
                
                .dcw5-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                }
                
                /* Main Button */
                .dcw5-button {
                    width: 60px;
                    height: 60px;
                    background: ${config.whatsappGreen};
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    position: relative;
                    transition: all 0.3s ease;
                    animation: dcw5Entrance 0.5s ease;
                }
                
                .dcw5-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                }
                
                .dcw5-button-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dcw5-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: #FF5252;
                    color: white;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    font-size: 10px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                }
                
                .dcw5-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid ${config.whatsappGreen};
                    animation: dcw5Pulse 2s infinite;
                }
                
                /* Notification */
                .dcw5-notification {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    background: white;
                    border-radius: 8px;
                    width: 320px;
                    box-shadow: 0 3px 12px rgba(0,0,0,0.15);
                    display: none;
                    animation: dcw5SlideIn 0.3s ease;
                }
                
                .dcw5-notification.show {
                    display: block;
                }
                
                .dcw5-notification-header {
                    padding: 12px;
                    border-bottom: 1px solid #f0f0f0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .dcw5-notification-avatar {
                    width: 40px;
                    height: 40px;
                    background: ${config.whatsappLight};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    position: relative;
                }
                
                .dcw5-avatar-status {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid white;
                }
                
                .dcw5-notification-info {
                    flex: 1;
                }
                
                .dcw5-notification-name {
                    font-weight: 600;
                    color: #333;
                    font-size: 14px;
                }
                
                .dcw5-notification-status {
                    font-size: 12px;
                    color: #999;
                }
                
                .dcw5-notification-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    color: #999;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                }
                
                .dcw5-notification-body {
                    padding: 12px;
                }
                
                .dcw5-message-bubble {
                    background: ${config.whatsappLight};
                    padding: 10px 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #333;
                    position: relative;
                }
                
                .dcw5-message-bubble:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 8px 10px 0;
                    border-color: transparent ${config.whatsappLight} transparent transparent;
                }
                
                /* Chat Window */
                .dcw5-chat {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    width: 380px;
                    height: 600px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.2);
                    display: none;
                    flex-direction: column;
                    animation: dcw5ChatIn 0.3s ease;
                }
                
                .dcw5-chat.show {
                    display: flex;
                }
                
                /* Chat Header */
                .dcw5-chat-header {
                    background: ${config.whatsappDarkGreen};
                    color: white;
                    padding: 16px;
                    border-radius: 12px 12px 0 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .dcw5-back-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0;
                    display: none;
                }
                
                .dcw5-back-btn.show {
                    display: block;
                }
                
                .dcw5-header-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    position: relative;
                    overflow: hidden;
                }
                
                .dcw5-header-avatar img {
                    width: 100%;
                    height: 100%;
                }
                
                .dcw5-avatar-badge {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid ${config.whatsappDarkGreen};
                }
                
                .dcw5-header-info {
                    flex: 1;
                }
                
                .dcw5-header-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                
                .dcw5-header-subtitle {
                    font-size: 13px;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .dcw5-status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: inline-block;
                }
                
                .dcw5-close-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0;
                }
                
                /* Chat Body */
                .dcw5-chat-body {
                    flex: 1;
                    overflow-y: auto;
                    background: ${config.whatsappBackground};
                }
                
                /* Welcome Screen */
                .dcw5-welcome {
                    padding: 20px;
                }
                
                .dcw5-welcome-message {
                    text-align: center;
                    padding: 20px;
                    background: white;
                    border-radius: 12px;
                    margin-bottom: 20px;
                }
                
                .dcw5-welcome-avatar {
                    font-size: 48px;
                    margin-bottom: 12px;
                }
                
                .dcw5-welcome-message h3 {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 8px;
                }
                
                .dcw5-welcome-message p {
                    font-size: 14px;
                    color: #666;
                }
                
                /* Menu Grid */
                .dcw5-menu-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 20px;
                }
                
                .dcw5-menu-item {
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .dcw5-menu-item:hover {
                    background: #f8f9fa;
                    transform: translateX(4px);
                }
                
                .dcw5-menu-icon {
                    font-size: 28px;
                    width: 40px;
                    text-align: center;
                }
                
                .dcw5-menu-content {
                    flex: 1;
                }
                
                .dcw5-menu-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 2px;
                }
                
                .dcw5-menu-subtitle {
                    font-size: 13px;
                    color: #999;
                }
                
                .dcw5-menu-arrow {
                    opacity: 0.5;
                }
                
                /* Quick Actions */
                .dcw5-quick-actions {
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 20px;
                }
                
                .dcw5-quick-actions h4 {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 12px;
                    font-weight: 600;
                }
                
                .dcw5-action-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .dcw5-chip {
                    background: ${config.whatsappLight};
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }
                
                .dcw5-chip:hover {
                    background: ${config.whatsappGreen};
                    color: white;
                    transform: scale(1.05);
                }
                
                /* Chat Options */
                .dcw5-chat-options {
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                }
                
                .dcw5-chat-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    margin-bottom: 16px;
                }
                
                .dcw5-chat-option:hover {
                    background: ${config.whatsappLight};
                }
                
                .dcw5-option-icon {
                    width: 40px;
                    height: 40px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .dcw5-option-text {
                    flex: 1;
                }
                
                .dcw5-option-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                }
                
                .dcw5-option-desc {
                    font-size: 12px;
                    color: #666;
                }
                
                /* QR Section */
                .dcw5-qr-section {
                    text-align: center;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                
                .dcw5-qr-image {
                    width: 120px;
                    height: 120px;
                    margin-bottom: 8px;
                }
                
                .dcw5-qr-text {
                    font-size: 12px;
                    color: #666;
                }
                
                /* Submenu */
                .dcw5-submenu {
                    padding: 20px;
                }
                
                .dcw5-submenu-header {
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 12px;
                    text-align: center;
                }
                
                .dcw5-submenu-icon {
                    font-size: 36px;
                    margin-bottom: 8px;
                }
                
                .dcw5-submenu-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                }
                
                .dcw5-submenu-items {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .dcw5-submenu-item {
                    background: white;
                    border-radius: 8px;
                    padding: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                    color: #333;
                    border: 2px solid transparent;
                }
                
                .dcw5-submenu-item:hover {
                    background: ${config.whatsappLight};
                    border-color: ${config.whatsappGreen};
                    transform: translateX(4px);
                }
                
                /* Footer */
                .dcw5-chat-footer {
                    padding: 12px;
                    background: white;
                    border-top: 1px solid #f0f0f0;
                    border-radius: 0 0 12px 12px;
                    text-align: center;
                }
                
                .dcw5-powered-by {
                    font-size: 11px;
                    color: #999;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                
                .dcw5-powered-by:hover {
                    color: ${config.whatsappGreen};
                }
                
                /* Animations */
                @keyframes dcw5Entrance {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes dcw5Pulse {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
                
                @keyframes dcw5SlideIn {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes dcw5ChatIn {
                    0% { transform: scale(0.9) translateY(20px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                
                /* Responsive */
                @media (max-width: 480px) {
                    .dcw5-chat {
                        width: 100%;
                        height: 100%;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        top: 0;
                        border-radius: 0;
                        max-height: 100vh;
                    }
                    
                    .dcw5-notification {
                        width: calc(100vw - 100px);
                    }
                }
                
                @media print {
                    .dcw5-widget {
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
            let container = document.getElementById('dc-pune-widget-v5');
            if (!container) {
                container = document.createElement('div');
                container.id = 'dc-pune-widget-v5';
                document.body.appendChild(container);
            }
            
            // Insert widget HTML
            container.innerHTML = createWidget();
            
            // Setup event listeners
            const button = document.getElementById('dcw5Button');
            const chat = document.getElementById('dcw5Chat');
            const notification = document.getElementById('dcw5Notification');
            
            // Button click
            button.addEventListener('click', () => {
                DCPuneWidgetV5.toggle();
            });
            
            // Auto show notification
            if (config.autoShow) {
                setTimeout(() => {
                    notification.classList.add('show');
                    
                    // Auto hide after 8 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 8000);
                }, config.autoPopupDelay);
            }
            
            console.log('✅ DC Pune Widget v5.0.0 initialized successfully!');
            console.log('🎨 WhatsApp-inspired UI with menu system');
            console.log('⚡ Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ DC Pune Widget v5 initialization failed:', error);
        }
    };
    
    // Public API
    window.DCPuneWidgetV5 = {
        version: '5.0.0',
        config: config,
        
        open: () => {
            const chat = document.getElementById('dcw5Chat');
            const notification = document.getElementById('dcw5Notification');
            if (chat) {
                chat.classList.add('show');
                notification.classList.remove('show');
            }
        },
        
        close: () => {
            const chat = document.getElementById('dcw5Chat');
            if (chat) {
                chat.classList.remove('show');
            }
        },
        
        toggle: () => {
            const chat = document.getElementById('dcw5Chat');
            if (chat) {
                if (chat.classList.contains('show')) {
                    DCPuneWidgetV5.close();
                } else {
                    DCPuneWidgetV5.open();
                }
            }
        },
        
        hideNotification: () => {
            const notification = document.getElementById('dcw5Notification');
            if (notification) {
                notification.classList.remove('show');
            }
        },
        
        showMainMenu: () => {
            const welcome = document.getElementById('dcw5Welcome');
            const submenu = document.getElementById('dcw5Submenu');
            const backBtn = document.getElementById('dcw5BackBtn');
            
            if (welcome && submenu) {
                welcome.style.display = 'block';
                submenu.style.display = 'none';
                backBtn.classList.remove('show');
            }
        },
        
        showSubmenu: (menuKey) => {
            const menu = menuItems[menuKey];
            if (!menu) return;
            
            const welcome = document.getElementById('dcw5Welcome');
            const submenu = document.getElementById('dcw5Submenu');
            const backBtn = document.getElementById('dcw5BackBtn');
            
            if (welcome && submenu) {
                welcome.style.display = 'none';
                submenu.style.display = 'block';
                backBtn.classList.add('show');
                
                // Populate submenu
                submenu.innerHTML = `
                    <div class="dcw5-submenu-header">
                        <div class="dcw5-submenu-icon">${menu.icon}</div>
                        <div class="dcw5-submenu-title">${menu.title}</div>
                    </div>
                    <div class="dcw5-submenu-items">
                        ${menu.items.map(item => `
                            <div class="dcw5-submenu-item" onclick="DCPuneWidgetV5.sendMessage('${item.message}')">
                                ${item.text}
                            </div>
                        `).join('')}
                    </div>
                `;
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
