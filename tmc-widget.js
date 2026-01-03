/**
 * Thane Municipal Corporation (TMC) 311 Chat Widget
 * File: tmc-311-chat-widget.js
 * Version: 3.0.0
 * Date: 2026-01-03
 * Brand: WhatsUp.city
 * 
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    if (window.TMC311Widget) {
        console.warn('TMC 311 Widget already initialized');
        return;
    }
    
    const config = {
        phoneNumber: '15558830019',
        defaultMessage: 'Hi',
        logoUrl: 'https://wow-strategies.com/tmc.png',
        poweredBy: {
            text: 'Powered by WoW-Strategies Private Limited',
            url: 'https://wow-strategies.com/'
        },
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://wa.me/15558830019?text=Hi',
        colors: {
            primary: '#0b5d5a',
            secondary: '#1ba579',
            accent: '#19c37d',
            background: '#0f172a',
            panel: '#111827',
            glass: 'rgba(255,255,255,0.08)',
            border: 'rgba(255,255,255,0.08)',
            text: '#e5e7eb',
            subtext: '#94a3b8',
            white: '#ffffff',
            badge: '#ef4444',
            glow: 'rgba(25,195,125,0.55)'
        }
    };
    
    // Core 311 grievance actions only
    const menuOptions = [
        { id: 'pothole', label: 'Pothole / Road', icon: '🕳️', message: 'I want to report a pothole or road damage' },
        { id: 'garbage', label: 'Garbage / Cleanliness', icon: '🗑️', message: 'I want to report garbage accumulation or missed pickup' },
        { id: 'streetlight', label: 'Streetlight Outage', icon: '💡', message: 'Streetlight is not working' },
        { id: 'drainage', label: 'Drainage / Flooding', icon: '🌊', message: 'Drainage issue or local flooding' },
        { id: 'encroachment', label: 'Encroachment', icon: '🚧', message: 'Report an encroachment on public property' },
        { id: 'park', label: 'Parks / Trees', icon: '🌳', message: 'Issue in parks or trees blocking roads' }
    ];
    
    const createWidget = () => {
        return `
            <div class="tmc-widget" id="tmcWidget">
                <!-- Floating Action Button -->
                <button class="tmc-fab" id="tmcFab" aria-label="Open TMC 311 Chat">
                    <div class="tmc-fab-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                        </svg>
                    </div>
                    <div class="tmc-fab-badge">311</div>
                </button>
                
                <!-- Chat Interface -->
                <div class="tmc-chat" id="tmcChat">
                    <!-- Header -->
                    <div class="tmc-header">
                        <div class="tmc-header-avatar">
                            <div class="tmc-avatar-circle">
                                <img src="${config.logoUrl}" alt="TMC Logo" class="tmc-avatar-img">
                            </div>
                            <div class="tmc-status-dot"></div>
                        </div>
                        <div class="tmc-header-info">
                            <div class="tmc-header-title">Thane Municipal Corporation</div>
                            <div class="tmc-header-subtitle">Official 311 AI Assistant</div>
                        </div>
                        <button class="tmc-close" aria-label="Close chat">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Content Area -->
                    <div class="tmc-content">
                        <!-- QR Code Section -->
                        <div class="tmc-qr-section">
                            <div class="tmc-qr-frame">
                                <div class="tmc-qr-glow"></div>
                                <div class="tmc-qr-container">
                                    <img src="${config.qrCodeUrl}" alt="Scan to Chat on WhatsApp" class="tmc-qr-image">
                                </div>
                                <div class="tmc-qr-label">Scan to start WhatsApp 311 chat</div>
                            </div>
                        </div>

                        <!-- Chat Bubbles -->
                        <div class="tmc-messages">
                            <div class="tmc-message-bubble">
                                <div class="tmc-message-text">
                                    🙏 <strong>Namaskar!</strong> I’m your TMC 311 assistant.<br>
                                    Report urban grievances in <strong>22 Indian languages</strong> with photos, voice notes, or location.
                                </div>
                            </div>
                            
                            <!-- Menu Grid -->
                            <div class="tmc-menu-grid">
                                ${menuOptions.map(option => `
                                    <button class="tmc-menu-item" data-message="${option.message}">
                                        <div class="tmc-menu-icon-wrap">${option.icon}</div>
                                        <span class="tmc-menu-label">${option.label}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="tmc-footer">
                        <button class="tmc-action-btn" onclick="window.open('https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.defaultMessage)}', '_blank')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                            </svg>
                            <span>Start WhatsApp Chat</span>
                        </button>
                        <div class="tmc-powered">
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener">
                                ${config.poweredBy.text}
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Notification Popup -->
                <div class="tmc-notification" id="tmcNotification">
                    <button class="tmc-notification-close" aria-label="Close notification">×</button>
                    <div class="tmc-notification-content">
                        <div class="tmc-notification-icon">
                            <img src="${config.logoUrl}" alt="TMC" style="width:100%; height:100%; border-radius:50%; object-fit:contain;">
                        </div>
                        <div class="tmc-notification-text">
                            <strong>TMC 311</strong><br>
                            Report city issues in seconds.
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Reset & Base */
                .tmc-widget * {
                    margin: 0; padding: 0; box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                }
                .tmc-widget { position: fixed; bottom: 24px; right: 24px; z-index: 999999; }
                
                /* FAB */
                .tmc-fab {
                    width: 62px; height: 62px;
                    background: linear-gradient(145deg, ${config.colors.accent}, ${config.colors.secondary});
                    border: none; border-radius: 50%; cursor: pointer;
                    box-shadow: 0 10px 30px ${config.colors.glow};
                    display: flex; align-items: center; justify-content: center;
                    position: relative; overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .tmc-fab:hover { transform: translateY(-1px) scale(1.05); box-shadow: 0 12px 36px ${config.colors.glow}; }
                .tmc-fab::after {
                    content:''; position:absolute; inset:0; border-radius:50%;
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 50%);
                }
                .tmc-fab-badge {
                    position: absolute; top: -4px; right: -4px;
                    background: ${config.colors.badge}; color: white;
                    font-size: 11px; font-weight: 800;
                    padding: 4px 8px; border-radius: 12px; border: 2px solid white;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
                
                /* Chat Window */
                .tmc-chat {
                    position: absolute; bottom: 88px; right: 0;
                    width: 400px; max-height: 760px;
                    background: ${config.colors.panel};
                    border: 1px solid ${config.colors.border};
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
                    display: flex; flex-direction: column; overflow: hidden;
                    opacity: 0; visibility: hidden; transform: translateY(18px) scale(0.97);
                    transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
                }
                .tmc-chat.show { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
                
                /* Header */
                .tmc-header {
                    background: linear-gradient(145deg, ${config.colors.primary}, ${config.colors.secondary});
                    padding: 18px 20px; display: flex; align-items: center; gap: 12px; color: white;
                    box-shadow: inset 0 -1px 0 rgba(255,255,255,0.08);
                }
                .tmc-avatar-circle {
                    width: 46px; height: 46px; background: ${config.colors.glass};
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255,255,255,0.25); overflow: hidden; padding: 4px;
                }
                .tmc-avatar-img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }
                .tmc-header-title { font-size: 16px; font-weight: 700; letter-spacing: -0.01em; }
                .tmc-header-subtitle { font-size: 13px; opacity: 0.9; }
                .tmc-close {
                    background: rgba(255,255,255,0.12); border: none; width: 32px; height: 32px;
                    border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;
                    transition: background 0.2s ease;
                }
                .tmc-close:hover { background: rgba(255,255,255,0.22); }
                
                /* Content */
                .tmc-content {
                    flex: 1; overflow-y: auto; background: radial-gradient(circle at 20% 20%, rgba(25,195,125,0.08), transparent 45%), ${config.colors.background};
                    display: flex; flex-direction: column;
                }
                
                /* QR Section */
                .tmc-qr-section { padding: 20px; display: flex; justify-content: center; }
                .tmc-qr-frame {
                    position: relative; padding: 18px; border-radius: 18px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
                    border: 1px solid ${config.colors.border};
                    box-shadow: 0 12px 40px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.03);
                }
                .tmc-qr-glow {
                    position: absolute; inset: 12px; border-radius: 14px;
                    background: radial-gradient(circle, rgba(25,195,125,0.18), transparent 70%);
                    filter: blur(12px); z-index: 0;
                }
                .tmc-qr-container {
                    position: relative; z-index: 1; width: 200px; height: 200px;
                    padding: 10px; border-radius: 14px;
                    background: ${config.colors.panel};
                    border: 1px solid ${config.colors.border};
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
                }
                .tmc-qr-image { width: 100%; height: 100%; object-fit: contain; border-radius: 10px; }
                .tmc-qr-label {
                    margin-top: 12px; text-align: center; font-size: 13px; color: ${config.colors.subtext};
                    letter-spacing: 0.01em; font-weight: 600;
                }
                
                /* Messages */
                .tmc-messages { padding: 18px 18px 24px; display: flex; flex-direction: column; gap: 16px; }
                .tmc-message-bubble {
                    background: ${config.colors.glass};
                    border: 1px solid ${config.colors.border};
                    padding: 14px 16px; border-radius: 14px;
                    color: ${config.colors.text}; font-size: 14px; line-height: 1.5;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
                    backdrop-filter: blur(6px);
                }
                
                /* Menu Grid */
                .tmc-menu-grid {
                    display: grid; grid-template-columns: repeat(2, minmax(0,1fr));
                    gap: 12px;
                }
                .tmc-menu-item {
                    background: ${config.colors.glass};
                    border: 1px solid ${config.colors.border};
                    border-radius: 14px; padding: 14px 12px;
                    color: ${config.colors.text}; cursor: pointer;
                    display: flex; flex-direction: column; align-items: center; gap: 8px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.18);
                    backdrop-filter: blur(6px);
                }
                .tmc-menu-item:hover {
                    transform: translateY(-2px);
                    border-color: rgba(25,195,125,0.35);
                    box-shadow: 0 12px 28px rgba(0,0,0,0.24);
                }
                .tmc-menu-icon-wrap { font-size: 22px; }
                .tmc-menu-label { font-size: 13px; font-weight: 700; letter-spacing: -0.01em; text-align: center; }
                
                /* Footer */
                .tmc-footer {
                    padding: 14px 18px 18px;
                    background: ${config.colors.panel};
                    border-top: 1px solid ${config.colors.border};
                    box-shadow: 0 -6px 18px rgba(0,0,0,0.28);
                }
                .tmc-action-btn {
                    width: 100%; padding: 14px;
                    border: none; border-radius: 16px;
                    font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    color: white; background: linear-gradient(145deg, ${config.colors.accent}, ${config.colors.secondary});
                    cursor: pointer; box-shadow: 0 10px 30px ${config.colors.glow};
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                }
                .tmc-action-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 34px ${config.colors.glow}; }
                .tmc-powered { margin-top: 10px; text-align: center; font-size: 11px; color: ${config.colors.subtext}; }
                .tmc-powered a { color: inherit; text-decoration: none; font-weight: 600; }
                .tmc-powered a:hover { color: ${config.colors.text}; }
                
                /* Notification */
                .tmc-notification {
                    position: absolute; bottom: 88px; right: 0;
                    background: ${config.colors.panel};
                    border: 1px solid ${config.colors.border};
                    border-radius: 14px; padding: 14px;
                    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
                    width: 280px; opacity: 0; visibility: hidden; transform: translateX(18px);
                    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
                }
                .tmc-notification.show { opacity: 1; visibility: visible; transform: translateX(0); }
                .tmc-notification-close {
                    position: absolute; top: 8px; right: 8px;
                    background: none; border: none; color: ${config.colors.subtext};
                    font-size: 18px; cursor: pointer;
                }
                .tmc-notification-content { display: flex; align-items: center; gap: 12px; color: ${config.colors.text}; }
                .tmc-notification-icon {
                    width: 44px; height: 44px; border-radius: 50%;
                    overflow: hidden; border: 1px solid ${config.colors.border};
                    background: ${config.colors.glass};
                }
                
                /* Mobile */
                @media (max-width: 480px) {
                    .tmc-widget { bottom: 16px; right: 16px; }
                    .tmc-chat { width: calc(100vw - 28px); height: calc(100vh - 120px); bottom: 84px; }
                    .tmc-content { height: auto; }
                }
                
                @media print { .tmc-widget { display: none !important; } }
            </style>
        `;
    };
    
    const initWidget = () => {
        try {
            let container = document.getElementById('tmc-chat-widget-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'tmc-chat-widget-container';
                document.body.appendChild(container);
            }
            container.innerHTML = createWidget();
            
            const fab = document.getElementById('tmcFab');
            const chat = document.getElementById('tmcChat');
            const closeBtn = chat.querySelector('.tmc-close');
            const notification = document.getElementById('tmcNotification');
            const notificationClose = notification.querySelector('.tmc-notification-close');
            const menuItems = document.querySelectorAll('.tmc-menu-item');
            
            const toggleChat = () => {
                const isOpen = chat.classList.contains('show');
                if (isOpen) chat.classList.remove('show');
                else { chat.classList.add('show'); notification.classList.remove('show'); }
            };
            
            fab.addEventListener('click', toggleChat);
            closeBtn.addEventListener('click', () => chat.classList.remove('show'));
            notificationClose.addEventListener('click', () => notification.classList.remove('show'));
            
            setTimeout(() => {
                if (!chat.classList.contains('show')) {
                    notification.classList.add('show');
                    setTimeout(() => notification.classList.remove('show'), 9000);
                }
            }, 5000);
            
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                });
            });
            
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target) && chat.classList.contains('show')) {
                    chat.classList.remove('show');
                }
            });
            
            console.log('✅ TMC 311 Widget initialized (v3.0.0)');
        } catch (error) {
            console.error('❌ Widget init failed:', error);
        }
    };
    
    window.TMC311Widget = {
        open: () => document.getElementById('tmcChat')?.classList.add('show'),
        close: () => document.getElementById('tmcChat')?.classList.remove('show'),
        toggle: () => document.getElementById('tmcFab')?.click()
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
