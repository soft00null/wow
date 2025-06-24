/**
 * Pune Zilla Panchayat AI WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 3.1.0
 * Date: 2025-06-24
 * Author: soft00null
 * URL: https://wow-strategies.com/zpp-integrate.js
 * 
 * Optimized for Government Website Integration
 * Features: AI Chatbot, QR Code, Bilingual Support, Analytics
 * Fixed: Date formatting and performance measurement issues
 */

// Performance monitoring start
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('zpp-widget-start');
}

(function(window, document, undefined) {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ZPPWidget) {
        console.warn('ZPP Widget already initialized');
        return;
    }
    
    // Configuration Object
    const ZPP_CONFIG = {
        // Core Settings
        version: '3.1.0',
        widget_id: 'zpp_widget_' + Date.now(),
        
        // WhatsApp Configuration
        phone: '912026134806',
        message: {
            marathi: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे.',
            english: 'Hello! I need information about Pune Zilla Panchayat services.',
            combined: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे. / Hello! I need information about Pune Zilla Panchayat services.'
        },
        
        // UI Configuration
        theme: {
            primary: '#FF6B35',      // ZP Orange
            secondary: '#2E8B57',    // Government Green
            accent: '#1565C0',       // Blue
            success: '#4CAF50',      // Green
            warning: '#FF9800',      // Amber
            error: '#F44336'         // Red
        },
        
        // Widget Settings
        position: 'bottom-right',
        size: 'medium',
        language: 'bilingual',
        auto_show: true,
        show_badge: true,
        working_hours: true,
        
        // QR Code API
        qr_api: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        
        // Working Hours (IST)
        office_hours: {
            timezone: 'Asia/Kolkata',
            monday: { start: '10:00', end: '18:00' },
            tuesday: { start: '10:00', end: '18:00' },
            wednesday: { start: '10:00', end: '18:00' },
            thursday: { start: '10:00', end: '18:00' },
            friday: { start: '10:00', end: '18:00' },
            saturday: { start: '10:00', end: '14:00' },
            sunday: { closed: true }
        },
        
        // Analytics
        analytics: {
            enabled: true,
            ga4: true,
            custom: true
        }
    };
    
    // Utility Functions
    const Utils = {
        // Generate unique ID
        uid: () => 'zpp_' + Math.random().toString(36).substr(2, 9),
        
        // Get current IST time
        getISTTime: () => {
            try {
                const now = new Date();
                return new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
            } catch (error) {
                console.warn('Timezone conversion failed, using local time:', error);
                return new Date();
            }
        },
        
        // Get day of week (fixed the error)
        getDayOfWeek: (date) => {
            try {
                // Use getDay() method instead of toLocaleDateString with weekday option
                const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                return days[date.getDay()];
            } catch (error) {
                console.warn('Day of week calculation failed:', error);
                return 'monday'; // Default fallback
            }
        },
        
        // Check if office is open
        isOfficeOpen: () => {
            try {
                if (!ZPP_CONFIG.working_hours) return true;
                
                const now = Utils.getISTTime();
                const day = Utils.getDayOfWeek(now);
                const currentTime = now.getHours() * 100 + now.getMinutes();
                
                const schedule = ZPP_CONFIG.office_hours[day];
                if (!schedule || schedule.closed) return false;
                
                const startTime = parseInt(schedule.start.replace(':', ''));
                const endTime = parseInt(schedule.end.replace(':', ''));
                
                return currentTime >= startTime && currentTime <= endTime;
            } catch (error) {
                console.warn('Office hours check failed:', error);
                return true; // Default to open if check fails
            }
        },
        
        // Format time for display
        formatTime: (time24) => {
            try {
                const [hours, minutes] = time24.split(':');
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                return `${hour12}:${minutes} ${ampm}`;
            } catch (error) {
                console.warn('Time formatting failed:', error);
                return time24; // Return original format if conversion fails
            }
        },
        
        // Analytics tracking with error handling
        track: (event, data = {}) => {
            try {
                if (!ZPP_CONFIG.analytics.enabled) return;
                
                // Google Analytics 4
                if (typeof gtag !== 'undefined' && ZPP_CONFIG.analytics.ga4) {
                    gtag('event', event, {
                        event_category: 'ZPP_WhatsApp_Widget',
                        event_label: data.label || 'interaction',
                        custom_parameter_1: data.extra,
                        page_title: document.title,
                        page_location: window.location.href
                    });
                }
                
                // Custom analytics endpoint (if available)
                if (ZPP_CONFIG.analytics.custom && window.dataLayer) {
                    window.dataLayer.push({
                        event: 'zpp_widget_interaction',
                        widget_event: event,
                        widget_data: data,
                        timestamp: new Date().toISOString()
                    });
                }
                
                // Console logging for debugging
                console.log(`📊 ZPP Widget: ${event}`, data);
                
            } catch (error) {
                console.warn('Analytics tracking failed:', error);
            }
        },
        
        // Device detection
        isMobile: () => {
            try {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            } catch (error) {
                return false;
            }
        },
        
        // Create element helper
        createElement: (tag, className, innerHTML) => {
            try {
                const el = document.createElement(tag);
                if (className) el.className = className;
                if (innerHTML) el.innerHTML = innerHTML;
                return el;
            } catch (error) {
                console.error('Element creation failed:', error);
                return null;
            }
        },
        
        // Safe localStorage operations
        getStorageItem: (key) => {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                console.warn('localStorage read failed:', error);
                return null;
            }
        },
        
        setStorageItem: (key, value) => {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (error) {
                console.warn('localStorage write failed:', error);
                return false;
            }
        }
    };
    
    // Main Widget Class
    class ZPPWhatsAppWidget {
        constructor() {
            this.isOpen = false;
            this.isOfficeOpen = Utils.isOfficeOpen();
            this.widgetId = Utils.uid();
            this.initialized = false;
            
            // Initialize widget
            this.init();
        }
        
        init() {
            try {
                // Wait for DOM to be ready
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => this.setup());
                } else {
                    this.setup();
                }
            } catch (error) {
                console.error('Widget initialization failed:', error);
            }
        }
        
        setup() {
            try {
                this.injectStyles();
                this.createWidget();
                this.bindEvents();
                this.setupAutoShow();
                this.initialized = true;
                
                Utils.track('widget_initialized', {
                    label: 'startup',
                    extra: {
                        version: ZPP_CONFIG.version,
                        office_open: this.isOfficeOpen,
                        device: Utils.isMobile() ? 'mobile' : 'desktop',
                        timestamp: new Date().toISOString()
                    }
                });
                
            } catch (error) {
                console.error('Widget setup failed:', error);
            }
        }
        
        injectStyles() {
            try {
                const styleId = 'zpp-widget-styles';
                if (document.getElementById(styleId)) return;
                
                const css = `
                    /* ZPP WhatsApp Widget Styles */
                    .zpp-widget * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    }
                    
                    .zpp-widget {
                        position: fixed;
                        ${ZPP_CONFIG.position.includes('bottom') ? 'bottom' : 'top'}: 24px;
                        ${ZPP_CONFIG.position.includes('right') ? 'right' : 'left'}: 24px;
                        z-index: 2147483647;
                        font-size: 14px;
                        line-height: 1.4;
                    }
                    
                    .zpp-btn {
                        width: 64px;
                        height: 64px;
                        background: linear-gradient(135deg, ${ZPP_CONFIG.theme.primary} 0%, ${ZPP_CONFIG.theme.secondary} 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        position: relative;
                        overflow: hidden;
                        border: none;
                        outline: none;
                    }
                    
                    .zpp-btn:hover {
                        transform: scale(1.1);
                        box-shadow: 0 12px 48px rgba(255, 107, 53, 0.4);
                    }
                    
                    .zpp-btn:active {
                        transform: scale(0.95);
                    }
                    
                    .zpp-btn::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .zpp-btn:hover::before {
                        opacity: 1;
                    }
                    
                    .zpp-icon {
                        font-size: 28px;
                        color: white;
                        transition: transform 0.3s ease;
                        z-index: 1;
                    }
                    
                    .zpp-btn:hover .zpp-icon {
                        transform: rotate(15deg) scale(1.1);
                    }
                    
                    .zpp-badge {
                        position: absolute;
                        top: -6px;
                        right: -6px;
                        background: ${ZPP_CONFIG.theme.error};
                        color: white;
                        border-radius: 50%;
                        width: 22px;
                        height: 22px;
                        font-size: 10px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: zpp-pulse 2s infinite;
                        border: 2px solid white;
                        box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
                    }
                    
                    @keyframes zpp-pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.2); opacity: 0.8; }
                    }
                    
                    .zpp-modal {
                        position: absolute;
                        ${ZPP_CONFIG.position.includes('bottom') ? 'bottom' : 'top'}: 80px;
                        ${ZPP_CONFIG.position.includes('right') ? 'right' : 'left'}: 0;
                        width: 400px;
                        max-width: calc(100vw - 32px);
                        background: white;
                        border-radius: 24px;
                        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
                        transform: translateY(16px) scale(0.9);
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        overflow: hidden;
                        border: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    
                    .zpp-modal.active {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                        visibility: visible;
                    }
                    
                    .zpp-header {
                        background: linear-gradient(135deg, ${ZPP_CONFIG.theme.primary} 0%, ${ZPP_CONFIG.theme.secondary} 100%);
                        color: white;
                        padding: 24px;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .zpp-header::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                        background-size: 24px 24px;
                        animation: zpp-float 20s linear infinite;
                    }
                    
                    @keyframes zpp-float {
                        0% { transform: translate(0, 0); }
                        100% { transform: translate(-24px, -24px); }
                    }
                    
                    .zpp-header-content {
                        position: relative;
                        z-index: 1;
                    }
                    
                    .zpp-title {
                        font-size: 20px;
                        font-weight: 700;
                        margin-bottom: 8px;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .zpp-subtitle {
                        font-size: 14px;
                        opacity: 0.95;
                        line-height: 1.5;
                    }
                    
                    .zpp-status {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: ${this.isOfficeOpen ? ZPP_CONFIG.theme.success : ZPP_CONFIG.theme.warning};
                        color: white;
                        padding: 6px 12px;
                        border-radius: 16px;
                        font-size: 11px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .zpp-close {
                        position: absolute;
                        top: 50%;
                        right: 60px;
                        transform: translateY(-50%);
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
                        outline: none;
                    }
                    
                    .zpp-close:hover {
                        background: rgba(255, 255, 255, 0.3);
                        transform: translateY(-50%) rotate(90deg);
                    }
                    
                    .zpp-body {
                        padding: 24px;
                        background: #fafbfc;
                    }
                    
                    .zpp-options {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        margin-bottom: 24px;
                    }
                    
                    .zpp-option {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        padding: 20px;
                        background: white;
                        border: 2px solid #e1e5e9;
                        border-radius: 16px;
                        text-decoration: none;
                        color: #2c3e50;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .zpp-option::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.05), transparent);
                        transition: left 0.6s ease;
                    }
                    
                    .zpp-option:hover {
                        border-color: ${ZPP_CONFIG.theme.primary};
                        background: #fff8f5;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 32px rgba(255, 107, 53, 0.15);
                    }
                    
                    .zpp-option:hover::before {
                        left: 100%;
                    }
                    
                    .zpp-option-icon {
                        font-size: 32px;
                        width: 48px;
                        text-align: center;
                        color: ${ZPP_CONFIG.theme.primary};
                        flex-shrink: 0;
                    }
                    
                    .zpp-option-content h3 {
                        font-size: 16px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 4px;
                    }
                    
                    .zpp-option-content p {
                        font-size: 13px;
                        color: #6c757d;
                        line-height: 1.4;
                        margin: 0;
                    }
                    
                    .zpp-qr-section {
                        background: white;
                        border-radius: 20px;
                        padding: 24px;
                        text-align: center;
                        border: 2px solid #e1e5e9;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .zpp-qr-section::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(45deg, transparent 49%, rgba(255, 107, 53, 0.02) 50%, transparent 51%);
                        pointer-events: none;
                    }
                    
                    .zpp-qr-title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    }
                    
                    .zpp-qr-container {
                        display: inline-block;
                        padding: 16px;
                        background: #f8f9fa;
                        border-radius: 20px;
                        transition: transform 0.3s ease;
                        border: 3px dashed #dee2e6;
                        position: relative;
                    }
                    
                    .zpp-qr-container:hover {
                        transform: scale(1.05);
                        border-color: ${ZPP_CONFIG.theme.primary};
                        background: #fff8f5;
                    }
                    
                    .zpp-qr-code {
                        width: 160px;
                        height: 160px;
                        border-radius: 12px;
                        display: block;
                        transition: all 0.3s ease;
                    }
                    
                    .zpp-qr-code:hover {
                        transform: scale(1.02);
                    }
                    
                    .zpp-qr-instructions {
                        font-size: 12px;
                        color: #6c757d;
                        margin-top: 16px;
                        line-height: 1.5;
                        max-width: 280px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    
                    .zpp-footer {
                        padding: 20px 24px;
                        background: #f1f3f4;
                        border-top: 1px solid #e1e5e9;
                        text-align: center;
                        font-size: 12px;
                        color: #6c757d;
                        line-height: 1.4;
                    }
                    
                    .zpp-footer strong {
                        color: #2c3e50;
                    }
                    
                    /* Responsive Design */
                    @media (max-width: 480px) {
                        .zpp-widget {
                            ${ZPP_CONFIG.position.includes('right') ? 'right' : 'left'}: 16px;
                            bottom: 16px;
                        }
                        
                        .zpp-modal {
                            width: calc(100vw - 32px);
                            ${ZPP_CONFIG.position.includes('right') ? 'right' : 'left'}: -8px;
                        }
                        
                        .zpp-btn {
                            width: 56px;
                            height: 56px;
                        }
                        
                        .zpp-icon {
                            font-size: 24px;
                        }
                        
                        .zpp-qr-code {
                            width: 140px;
                            height: 140px;
                        }
                        
                        .zpp-header,
                        .zpp-body {
                            padding: 20px;
                        }
                        
                        .zpp-option {
                            padding: 16px;
                        }
                        
                        .zpp-qr-section {
                            padding: 20px;
                        }
                    }
                    
                    /* High contrast mode support */
                    @media (prefers-contrast: high) {
                        .zpp-modal {
                            border: 2px solid #000;
                        }
                        
                        .zpp-option {
                            border: 2px solid #000;
                        }
                    }
                    
                    /* Reduced motion support */
                    @media (prefers-reduced-motion: reduce) {
                        .zpp-btn,
                        .zpp-modal,
                        .zpp-option,
                        .zpp-qr-container {
                            transition: none !important;
                        }
                        
                        .zpp-badge {
                            animation: none !important;
                        }
                        
                        .zpp-header::before {
                            animation: none !important;
                        }
                    }
                    
                    /* Print styles */
                    @media print {
                        .zpp-widget {
                            display: none !important;
                        }
                    }
                    
                    /* Dark mode support */
                    @media (prefers-color-scheme: dark) {
                        .zpp-modal {
                            background: #2d3748;
                            border-color: #4a5568;
                        }
                        
                        .zpp-body {
                            background: #374151;
                        }
                        
                        .zpp-option {
                            background: #4a5568;
                            border-color: #6b7280;
                            color: #f7fafc;
                        }
                        
                        .zpp-option:hover {
                            background: #5a6470;
                        }
                        
                        .zpp-qr-section {
                            background: #4a5568;
                            border-color: #6b7280;
                        }
                        
                        .zpp-footer {
                            background: #374151;
                            border-color: #4a5568;
                            color: #d1d5db;
                        }
                        
                        .zpp-qr-title {
                            color: #f7fafc;
                        }
                    }
                `;
                
                const style = Utils.createElement('style', null, css);
                if (style) {
                    style.id = styleId;
                    document.head.appendChild(style);
                }
                
            } catch (error) {
                console.error('Style injection failed:', error);
            }
        }
        
        createWidget() {
            try {
                const workingStatus = this.isOfficeOpen ? 
                    'सक्रिय / Active' : 
                    'बंद / Closed';
                
                const whatsappUrl = `https://wa.me/${ZPP_CONFIG.phone}?text=${encodeURIComponent(ZPP_CONFIG.message.combined)}`;
                const webWhatsappUrl = `https://web.whatsapp.com/send?phone=${ZPP_CONFIG.phone}&text=${encodeURIComponent(ZPP_CONFIG.message.combined)}`;
                const qrCodeUrl = `${ZPP_CONFIG.qr_api}${encodeURIComponent(whatsappUrl)}`;
                
                const workingHoursText = this.getWorkingHoursText();
                
                const widgetHTML = `
                    <div class="zpp-widget" id="${this.widgetId}">
                        <button class="zpp-btn" id="zpp-btn" aria-label="Open WhatsApp Chat">
                            <div class="zpp-icon">💬</div>
                            ${ZPP_CONFIG.show_badge ? '<div class="zpp-badge">AI</div>' : ''}
                        </button>
                        
                        <div class="zpp-modal" id="zpp-modal" role="dialog" aria-labelledby="zpp-title" aria-modal="true">
                            <div class="zpp-header">
                                <div class="zpp-status">${workingStatus}</div>
                                <div class="zpp-header-content">
                                    <div class="zpp-title" id="zpp-title">
                                        🤖 पुणे जिप AI सहाय्यक
                                    </div>
                                    <div class="zpp-subtitle">
                                        पुणे जिल्हा परिषद | Pune Zilla Panchayat<br>
                                        सेवा • पारदर्शकता • जबाबदारी
                                    </div>
                                </div>
                                <button class="zpp-close" id="zpp-close" aria-label="Close dialog">×</button>
                            </div>
                            
                            <div class="zpp-body">
                                <div class="zpp-options">
                                    <a href="${whatsappUrl}" class="zpp-option" target="_blank" rel="noopener noreferrer" aria-label="Start mobile chat">
                                        <div class="zpp-option-icon">📱</div>
                                        <div class="zpp-option-content">
                                            <h3>मोबाइल चॅट | Mobile Chat</h3>
                                            <p>तुमच्या स्मार्टफोनवर AI चॅटबॉटशी संवाद साधा</p>
                                        </div>
                                    </a>
                                    
                                    <a href="${webWhatsappUrl}" class="zpp-option" target="_blank" rel="noopener noreferrer" aria-label="Start web chat">
                                        <div class="zpp-option-icon">💻</div>
                                        <div class="zpp-option-content">
                                            <h3>वेब चॅट | Web Chat</h3>
                                            <p>संगणकावर WhatsApp Web द्वारे चॅट करा</p>
                                        </div>
                                    </a>
                                </div>
                                
                                <div class="zpp-qr-section">
                                    <div class="zpp-qr-title">
                                        📱 QR कोड स्कॅन करा | Scan QR Code
                                    </div>
                                    <div class="zpp-qr-container">
                                        <img src="${qrCodeUrl}" 
                                             alt="Pune ZP WhatsApp QR Code" 
                                             class="zpp-qr-code"
                                             loading="lazy"
                                             onerror="this.style.display='none';">
                                    </div>
                                    <div class="zpp-qr-instructions">
                                        <strong>स्कॅन करण्याचे टप्पे:</strong><br>
                                        WhatsApp उघडा → मेनू → QR स्कॅन करा<br>
                                        <em>Open WhatsApp → Menu → Scan QR Code</em>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="zpp-footer">
                                <strong>🕒 कार्यालयीन वेळ | Office Hours:</strong><br>
                                ${workingHoursText}
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.insertAdjacentHTML('beforeend', widgetHTML);
                
            } catch (error) {
                console.error('Widget creation failed:', error);
            }
        }
        
        getWorkingHoursText() {
            try {
                const hours = ZPP_CONFIG.office_hours;
                const weekdayHours = `${Utils.formatTime(hours.monday.start)} - ${Utils.formatTime(hours.monday.end)}`;
                const saturdayHours = `${Utils.formatTime(hours.saturday.start)} - ${Utils.formatTime(hours.saturday.end)}`;
                
                return `सोम-शुक्र ${weekdayHours}, शनि ${saturdayHours}<br>Mon-Fri ${weekdayHours}, Sat ${saturdayHours}`;
            } catch (error) {
                console.warn('Working hours text generation failed:', error);
                return 'सोम-शुक्र 10:00 AM - 6:00 PM, शनि 10:00 AM - 2:00 PM';
            }
        }
        
        bindEvents() {
            try {
                const button = document.getElementById('zpp-btn');
                const modal = document.getElementById('zpp-modal');
                const closeBtn = document.getElementById('zpp-close');
                
                if (!button || !modal || !closeBtn) {
                    console.warn('Widget elements not found, retrying...');
                    setTimeout(() => this.bindEvents(), 500);
                    return;
                }
                
                // Button click event
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleModal();
                });
                
                // Close button event
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeModal();
                });
                
                // Click outside to close
                document.addEventListener('click', (e) => {
                    if (!modal.contains(e.target) && !button.contains(e.target)) {
                        this.closeModal();
                    }
                });
                
                // Escape key to close
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen) {
                        this.closeModal();
                    }
                });
                
                // Track option clicks
                modal.querySelectorAll('.zpp-option').forEach(option => {
                    option.addEventListener('click', (e) => {
                        const linkType = option.href.includes('web.whatsapp.com') ? 'web_chat' : 'mobile_chat';
                        Utils.track('chat_option_clicked', {
                            label: linkType,
                            extra: {
                                office_open: this.isOfficeOpen,
                                timestamp: new Date().toISOString()
                            }
                        });
                    });
                });
                
                // Handle page visibility changes
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden && this.isOpen) {
                        this.closeModal();
                    }
                });
                
                // Handle window resize
                window.addEventListener('resize', this.handleResize.bind(this));
                
            } catch (error) {
                console.error('Event binding failed:', error);
            }
        }
        
        toggleModal() {
            if (this.isOpen) {
                this.closeModal();
            } else {
                this.openModal();
            }
        }
        
        openModal() {
            try {
                const modal = document.getElementById('zpp-modal');
                const button = document.getElementById('zpp-btn');
                const badge = button?.querySelector('.zpp-badge');
                
                if (!modal || !button) return;
                
                modal.classList.add('active');
                button.style.transform = 'scale(0.9)';
                this.isOpen = true;
                
                // Hide notification badge
                if (badge) {
                    badge.style.display = 'none';
                }
                
                // Focus management for accessibility
                modal.focus();
                
                Utils.track('modal_opened', {
                    label: 'user_interaction',
                    extra: {
                        office_open: this.isOfficeOpen,
                        device: Utils.isMobile() ? 'mobile' : 'desktop'
                    }
                });
                
            } catch (error) {
                console.error('Modal opening failed:', error);
            }
        }
        
        closeModal() {
            try {
                const modal = document.getElementById('zpp-modal');
                const button = document.getElementById('zpp-btn');
                
                if (!modal || !button) return;
                
                modal.classList.remove('active');
                button.style.transform = 'scale(1)';
                this.isOpen = false;
                
                Utils.track('modal_closed', {
                    label: 'user_interaction'
                });
                
            } catch (error) {
                console.error('Modal closing failed:', error);
            }
        }
        
        handleResize() {
            try {
                if (Utils.isMobile()) {
                    const modal = document.getElementById('zpp-modal');
                    if (modal) {
                        modal.style.width = `${window.innerWidth - 32}px`;
                    }
                }
            } catch (error) {
                console.warn('Resize handling failed:', error);
            }
        }
        
        setupAutoShow() {
            try {
                if (!ZPP_CONFIG.auto_show) return;
                
                // Check if user has seen the widget before
                const hasSeenWidget = Utils.getStorageItem('zpp_widget_seen');
                
                if (!hasSeenWidget) {
                    setTimeout(() => {
                        const button = document.getElementById('zpp-btn');
                        if (button && !this.isOpen) {
                            button.style.animation = 'zpp-pulse 1.5s ease-in-out 3';
                            Utils.setStorageItem('zpp_widget_seen', 'true');
                            
                            Utils.track('auto_show_triggered', {
                                label: 'first_visit',
                                extra: { timestamp: new Date().toISOString() }
                            });
                        }
                    }, 5000);
                }
                
            } catch (error) {
                console.warn('Auto-show setup failed:', error);
            }
        }
        
        // Public API methods
        show() { 
            try { 
                this.openModal(); 
            } catch (error) { 
                console.error('Show method failed:', error); 
            } 
        }
        
        hide() { 
            try { 
                this.closeModal(); 
            } catch (error) { 
                console.error('Hide method failed:', error); 
            } 
        }
        
        toggle() { 
            try { 
                this.toggleModal(); 
            } catch (error) { 
                console.error('Toggle method failed:', error); 
            } 
        }
        
        destroy() {
            try {
                const widget = document.getElementById(this.widgetId);
                const styles = document.getElementById('zpp-widget-styles');
                if (widget) widget.remove();
                if (styles) styles.remove();
                this.initialized = false;
                Utils.track('widget_destroyed', { label: 'cleanup' });
            } catch (error) {
                console.error('Destroy method failed:', error);
            }
        }
    }
    
    // Initialize widget with error handling
    function initializeZPPWidget() {
        try {
            const widget = new ZPPWhatsAppWidget();
            
            // Expose public API
            window.ZPPWidget = {
                instance: widget,
                show: () => widget.show(),
                hide: () => widget.hide(),
                toggle: () => widget.toggle(),
                destroy: () => widget.destroy(),
                config: ZPP_CONFIG,
                version: ZPP_CONFIG.version,
                isInitialized: () => widget.initialized
            };
            
            console.log(`🚀 ZPP WhatsApp Widget v${ZPP_CONFIG.version} loaded successfully!`);
            console.log('📱 Ready for Pune Zilla Panchayat integration');
            
        } catch (error) {
            console.error('❌ ZPP Widget initialization failed:', error);
            
            // Fallback: Create a simple widget
            try {
                const fallbackWidget = document.createElement('div');
                fallbackWidget.innerHTML = `
                    <div style="position:fixed;bottom:24px;right:24px;z-index:2147483647;">
                        <a href="https://wa.me/912026134806?text=Hello%20Pune%20ZP" 
                           target="_blank" 
                           style="display:flex;align-items:center;justify-content:center;width:64px;height:64px;background:#25D366;border-radius:50%;color:white;text-decoration:none;font-size:28px;box-shadow:0 4px 16px rgba(37,211,102,0.3);">
                           💬
                        </a>
                    </div>
                `;
                document.body.appendChild(fallbackWidget);
                console.log('🔄 Fallback widget created');
            } catch (fallbackError) {
                console.error('❌ Fallback widget creation failed:', fallbackError);
            }
        }
    }
    
    // Auto-initialize when script loads
    initializeZPPWidget();
    
})(window, document);

// Performance monitoring end
if (typeof performance !== 'undefined' && performance.mark) {
    try {
        performance.mark('zpp-widget-end');
        performance.measure('zpp-widget-load-time', 'zpp-widget-start', 'zpp-widget-end');
        console.log('⚡ Widget performance measured successfully');
    } catch (perfError) {
        console.warn('Performance measurement failed:', perfError);
    }
}
