/**
 * Pune Zilla Panchayat WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 2.0.0
 * Elegant & Minimalistic Design
 * Author: soft00null
 * Date: 2025-06-24
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ZPPWidget) return;
    
    // Elegant Configuration
    const config = {
        phoneNumber: '912026134806',
        message: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे. / Hello! I need information about Pune Zilla Panchayat services.',
        qrApiUrl: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        position: 'bottom-right',
        autoShow: false,
        showBadge: true,
        
        // Elegant Color Palette
        colors: {
            primary: '#FF6B35',
            secondary: '#2E8B57', 
            accent: '#1A73E8',
            text: '#1F2937',
            textLight: '#6B7280',
            background: '#FFFFFF',
            surface: '#F9FAFB',
            border: '#E5E7EB',
            success: '#10B981',
            warning: '#F59E0B'
        }
    };

    // Office hours check (IST)
    function getOfficeStatus() {
        try {
            const now = new Date();
            const ist = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
            const day = ist.getDay();
            const hour = ist.getHours();
            const minute = ist.getMinutes();
            const time = hour * 100 + minute;
            
            if (day >= 1 && day <= 5 && time >= 1000 && time < 1800) return { open: true, text: 'Online' };
            if (day === 6 && time >= 1000 && time < 1400) return { open: true, text: 'Online' };
            return { open: false, text: 'Offline' };
        } catch {
            return { open: true, text: 'Online' };
        }
    }

    const officeStatus = getOfficeStatus();
    
    // Elegant Widget HTML
    const widgetHTML = `
        <div class="zpp-widget">
            <!-- Floating Action Button -->
            <button class="zpp-fab" onclick="toggleZPPModal()" aria-label="Open WhatsApp Chat">
                <div class="zpp-fab-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                    </svg>
                </div>
                ${config.showBadge ? '<div class="zpp-badge">AI</div>' : ''}
            </button>

            <!-- Modal Dialog -->
            <div class="zpp-modal" id="zppModal">
                <div class="zpp-backdrop" onclick="toggleZPPModal()"></div>
                <div class="zpp-dialog">
                    
                    <!-- Header -->
                    <div class="zpp-header">
                        <div class="zpp-status ${officeStatus.open ? 'online' : 'offline'}">
                            <div class="zpp-status-dot"></div>
                            <span>${officeStatus.text}</span>
                        </div>
                        <button class="zpp-close" onclick="toggleZPPModal()" aria-label="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="zpp-content">
                        <div class="zpp-intro">
                            <div class="zpp-avatar">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 8V7L18.5 9.5C17.9 8.9 17.1 8.5 16.2 8.5H7.8C6.9 8.5 6.1 8.9 5.5 9.5L3 7V8C3 8.6 3.4 9 4 9H5L6.5 17.5C6.6 18.1 7.1 18.5 7.8 18.5H16.2C16.9 18.5 17.4 18.1 17.5 17.5L19 9H20C20.6 9 21 8.6 21 8Z"/>
                                </svg>
                            </div>
                            <div class="zpp-intro-text">
                                <h2>पुणे जिप सहाय्यक</h2>
                                <p>Pune Zilla Panchayat AI Assistant</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="zpp-actions">
                            <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="zpp-action-btn primary">
                                <div class="zpp-btn-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H18C19.1 4 20 4.9 20 6V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V6C4 4.9 4.9 4 6 4H7M6 8V20H18V8H6M8 10H10V12H8V10M12 10H14V12H12V10M16 10H18V12H16V10M8 14H10V16H8V14M12 14H14V16H12V14M16 14H18V16H16V14Z"/>
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
                               class="zpp-action-btn secondary">
                                <div class="zpp-btn-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                    </svg>
                                </div>
                                <div class="zpp-btn-text">
                                    <span>वेब चॅट</span>
                                    <small>Web Chat</small>
                                </div>
                            </a>
                        </div>

                        <!-- QR Code Section -->
                        <div class="zpp-divider">
                            <span>किंवा / OR</span>
                        </div>

                        <div class="zpp-qr-section">
                            <div class="zpp-qr-header">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
                            </div>
                            <p class="zpp-qr-hint">WhatsApp उघडा → ⋯ मेनू → QR स्कॅन</p>
                        </div>

                        <!-- Office Hours -->
                        <div class="zpp-footer">
                            <div class="zpp-hours">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                                </svg>
                                <div>
                                    <span>सोम-शुक्र 10:00-18:00, शनि 10:00-14:00</span>
                                    <small>Mon-Fri 10AM-6PM, Sat 10AM-2PM</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .zpp-widget {
                position: fixed;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 24px;
                ${config.position.includes('right') ? 'right' : 'left'}: 24px;
                z-index: 2147483647;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                --primary: ${config.colors.primary};
                --secondary: ${config.colors.secondary};
                --accent: ${config.colors.accent};
                --text: ${config.colors.text};
                --text-light: ${config.colors.textLight};
                --background: ${config.colors.background};
                --surface: ${config.colors.surface};
                --border: ${config.colors.border};
                --success: ${config.colors.success};
                --warning: ${config.colors.warning};
            }

            /* Floating Action Button */
            .zpp-fab {
                width: 56px;
                height: 56px;
                background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                border: none;
                border-radius: 50%;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                outline: none;
            }

            .zpp-fab:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(0, 0, 0, 0.1);
            }

            .zpp-fab:active {
                transform: scale(0.95);
            }

            .zpp-fab-icon {
                color: white;
                transition: transform 0.2s ease;
            }

            .zpp-fab:hover .zpp-fab-icon {
                transform: scale(1.1);
            }

            .zpp-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: #FF4444;
                color: white;
                font-size: 10px;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 10px;
                border: 2px solid var(--background);
                min-width: 16px;
                text-align: center;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.05); }
            }

            /* Modal */
            .zpp-modal {
                position: absolute;
                ${config.position.includes('bottom') ? 'bottom' : 'top'}: 72px;
                ${config.position.includes('right') ? 'right' : 'left'}: 0;
                width: 360px;
                max-width: calc(100vw - 48px);
                opacity: 0;
                visibility: hidden;
                transform: translateY(12px);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
            }

            .zpp-modal.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
            }

            .zpp-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(2px);
                z-index: -1;
            }

            .zpp-dialog {
                background: var(--background);
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
                border: 1px solid var(--border);
                overflow: hidden;
                position: relative;
            }

            /* Header */
            .zpp-header {
                padding: 20px 20px 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .zpp-status {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                font-weight: 500;
                color: var(--text-light);
                background: var(--surface);
                padding: 6px 12px;
                border-radius: 20px;
                border: 1px solid var(--border);
            }

            .zpp-status.online {
                color: var(--success);
                background: rgba(16, 185, 129, 0.1);
                border-color: rgba(16, 185, 129, 0.2);
            }

            .zpp-status.offline {
                color: var(--warning);
                background: rgba(245, 158, 11, 0.1);
                border-color: rgba(245, 158, 11, 0.2);
            }

            .zpp-status-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: currentColor;
            }

            .zpp-close {
                width: 32px;
                height: 32px;
                border: none;
                background: var(--surface);
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-light);
                transition: all 0.2s ease;
                outline: none;
            }

            .zpp-close:hover {
                background: var(--border);
                color: var(--text);
            }

            /* Content */
            .zpp-content {
                padding: 20px;
            }

            .zpp-intro {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 24px;
            }

            .zpp-avatar {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                flex-shrink: 0;
            }

            .zpp-intro-text h2 {
                margin: 0 0 4px 0;
                font-size: 18px;
                font-weight: 600;
                color: var(--text);
                line-height: 1.2;
            }

            .zpp-intro-text p {
                margin: 0;
                font-size: 14px;
                color: var(--text-light);
                line-height: 1.2;
            }

            /* Action Buttons */
            .zpp-actions {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-bottom: 24px;
            }

            .zpp-action-btn {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 16px;
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 12px;
                text-decoration: none;
                color: var(--text);
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }

            .zpp-action-btn:hover {
                background: var(--background);
                border-color: var(--primary);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            .zpp-action-btn.primary {
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                border-color: var(--primary);
                color: white;
            }

            .zpp-action-btn.primary:hover {
                background: linear-gradient(135deg, var(--secondary), var(--primary));
                border-color: var(--secondary);
                color: white;
            }

            .zpp-btn-icon {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .zpp-action-btn:not(.primary) .zpp-btn-icon {
                background: var(--surface);
                color: var(--primary);
            }

            .zpp-btn-text span {
                display: block;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.2;
                margin-bottom: 2px;
            }

            .zpp-btn-text small {
                display: block;
                font-size: 12px;
                opacity: 0.7;
                line-height: 1.2;
            }

            /* Divider */
            .zpp-divider {
                display: flex;
                align-items: center;
                text-align: center;
                margin: 24px 0;
                color: var(--text-light);
                font-size: 12px;
            }

            .zpp-divider::before,
            .zpp-divider::after {
                content: '';
                flex: 1;
                height: 1px;
                background: var(--border);
            }

            .zpp-divider span {
                padding: 0 16px;
                background: var(--background);
            }

            /* QR Section */
            .zpp-qr-section {
                text-align: center;
            }

            .zpp-qr-header {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 500;
                color: var(--text);
                margin-bottom: 16px;
            }

            .zpp-qr-container {
                display: inline-block;
                padding: 12px;
                background: var(--surface);
                border: 2px dashed var(--border);
                border-radius: 12px;
                transition: all 0.2s ease;
            }

            .zpp-qr-container:hover {
                border-color: var(--primary);
                background: rgba(255, 107, 53, 0.05);
            }

            .zpp-qr-code {
                width: 120px;
                height: 120px;
                border-radius: 8px;
                display: block;
            }

            .zpp-qr-hint {
                margin: 12px 0 0 0;
                font-size: 12px;
                color: var(--text-light);
                line-height: 1.4;
            }

            /* Footer */
            .zpp-footer {
                margin-top: 24px;
                padding-top: 16px;
                border-top: 1px solid var(--border);
            }

            .zpp-hours {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                font-size: 12px;
                color: var(--text-light);
            }

            .zpp-hours svg {
                margin-top: 1px;
                flex-shrink: 0;
            }

            .zpp-hours span {
                display: block;
                margin-bottom: 2px;
                color: var(--text);
            }

            .zpp-hours small {
                display: block;
                opacity: 0.8;
            }

            /* Responsive */
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
                    width: 48px;
                    height: 48px;
                }

                .zpp-content {
                    padding: 16px;
                }

                .zpp-qr-code {
                    width: 100px;
                    height: 100px;
                }
            }

            /* Accessibility & Motion */
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

            /* Focus states */
            .zpp-fab:focus-visible,
            .zpp-close:focus-visible,
            .zpp-action-btn:focus-visible {
                outline: 2px solid var(--accent);
                outline-offset: 2px;
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

    // Toggle function
    window.toggleZPPModal = function() {
        const modal = document.getElementById('zppModal');
        const isActive = modal.classList.contains('active');
        
        if (isActive) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Analytics
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', isActive ? 'zpp_modal_closed' : 'zpp_modal_opened', {
                    event_category: 'ZPP_WhatsApp_Widget',
                    event_label: 'user_interaction'
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
                    gtag('event', 'zpp_chat_started', {
                        event_category: 'ZPP_WhatsApp_Widget',
                        event_label: linkType
                    });
                }
            } catch (e) {}
        });
    });

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
        version: '2.0.0'
    };

    console.log('🚀 Pune ZP WhatsApp Widget v2.0.0 - Elegant & Minimalistic');

})();
