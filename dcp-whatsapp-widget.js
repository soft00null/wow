/**
 * Divisional Commissioner Pune AI WhatsApp Integration Widget
 * File: dcp-whatsapp-widget.js
 * Version: 8.0.0 - Production Ready
 * Author: WoW-Strategies Private Limited
 * URL: https://wow-strategies.com/dcp-whatsapp-widget.js
 * 
 * Exact UI Match with Full Transparency
 */

(function() {
    'use strict';
    
    if (window.DCPWidget) return;
    
    const config = {
        phoneNumber: '919226556203',
        defaultMessage: 'Hi',
        organization: {
            name: 'Divisional Commissioner Pune',
            nameMarathi: 'विभागीय आयुक्त पुणे',
            greeting: "Hi! I'm your AI Assistant for Divisional Commissioner Pune. I'm here 24/7 to help with government services, documents, and queries. How can I support you today?"
        }
    };
    
    // Create and inject styles
    const styles = `
        .dcp-widget-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .dcp-float-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 12px rgba(0,0,0,0.15);
            border: none;
            z-index: 999998;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .dcp-float-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 20px rgba(37,211,102,0.35);
        }
        
        .dcp-float-btn svg {
            width: 28px;
            height: 28px;
        }
        
        .dcp-ai-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            background: #FF3B30;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            font-weight: 700;
            border: 2px solid white;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .dcp-chat-window {
            position: fixed;
            bottom: 95px;
            right: 24px;
            width: 360px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            opacity: 0;
            visibility: hidden;
            transform: scale(0.95) translateY(20px);
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            z-index: 999999;
            overflow: hidden;
        }
        
        .dcp-chat-window.active {
            opacity: 1;
            visibility: visible;
            transform: scale(1) translateY(0);
        }
        
        .dcp-chat-header {
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            padding: 16px;
            color: white;
            position: relative;
        }
        
        .dcp-close-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 24px;
            height: 24px;
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .dcp-close-btn:hover {
            opacity: 1;
        }
        
        .dcp-header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .dcp-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        
        .dcp-header-text {
            flex: 1;
        }
        
        .dcp-header-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 2px;
        }
        
        .dcp-header-status {
            font-size: 12px;
            opacity: 0.9;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .dcp-status-dot {
            width: 6px;
            height: 6px;
            background: #4FCE5D;
            border-radius: 50%;
            animation: blink 2s infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .dcp-chat-body {
            padding: 12px;
            background: transparent;
        }
        
        .dcp-message {
            background: white;
            border-radius: 12px 12px 4px 12px;
            padding: 12px;
            margin-bottom: 12px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        
        .dcp-message-text {
            font-size: 13px;
            color: #303030;
            line-height: 1.5;
        }
        
        .dcp-emoji-row {
            margin-bottom: 8px;
        }
        
        .dcp-menu-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 0 12px 12px;
        }
        
        .dcp-menu-btn {
            padding: 10px 18px;
            background: white;
            border: 1.5px solid #7C4DFF;
            border-radius: 24px;
            color: #6A5ACD;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        
        .dcp-menu-btn:hover {
            background: #F5F3FF;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(124,77,255,0.15);
        }
        
        .dcp-qr-toggle {
            text-align: center;
            padding: 8px;
            background: rgba(248,249,250,0.6);
            border-top: 1px solid rgba(0,0,0,0.06);
        }
        
        .dcp-qr-toggle button {
            background: none;
            border: none;
            color: #6A5ACD;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            padding: 4px 12px;
            transition: all 0.2s;
        }
        
        .dcp-qr-toggle button:hover {
            text-decoration: underline;
        }
        
        .dcp-qr-section {
            display: none;
            padding: 16px;
            background: white;
            text-align: center;
            border-top: 1px solid rgba(0,0,0,0.06);
        }
        
        .dcp-qr-section.active {
            display: block;
        }
        
        .dcp-qr-title {
            font-size: 12px;
            font-weight: 600;
            color: #6A5ACD;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .dcp-qr-code {
            display: inline-block;
            padding: 10px;
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            margin-bottom: 8px;
        }
        
        .dcp-qr-code img {
            width: 150px;
            height: 150px;
            display: block;
        }
        
        .dcp-qr-text {
            font-size: 11px;
            color: #667781;
        }
        
        .dcp-footer {
            padding: 10px;
            background: rgba(248,249,250,0.8);
            text-align: center;
            border-radius: 0 0 16px 16px;
        }
        
        .dcp-footer a {
            color: #667781;
            font-size: 11px;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .dcp-footer a:hover {
            color: #6A5ACD;
        }
        
        @media (max-width: 480px) {
            .dcp-chat-window {
                width: calc(100vw - 32px);
                right: 16px;
                bottom: 85px;
            }
            
            .dcp-float-btn {
                width: 54px;
                height: 54px;
            }
        }
    `;
    
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Create widget HTML
    const createWidget = () => {
        const container = document.createElement('div');
        container.className = 'dcp-widget-container';
        container.innerHTML = `
            <!-- Floating WhatsApp Button -->
            <button class="dcp-float-btn" onclick="DCPWidget.toggle()">
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div class="dcp-ai-badge">AI</div>
            </button>
            
            <!-- Chat Window -->
            <div class="dcp-chat-window" id="dcpChatWindow">
                <!-- Header -->
                <div class="dcp-chat-header">
                    <button class="dcp-close-btn" onclick="DCPWidget.close()">×</button>
                    <div class="dcp-header-content">
                        <div class="dcp-avatar">🏛️</div>
                        <div class="dcp-header-text">
                            <div class="dcp-header-title">${config.organization.nameMarathi}</div>
                            <div class="dcp-header-status">
                                <span class="dcp-status-dot"></span>
                                AI Assistant Active
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Chat Body -->
                <div class="dcp-chat-body">
                    <div class="dcp-message">
                        <div class="dcp-emoji-row">🏛️💜</div>
                        <div class="dcp-message-text">${config.organization.greeting}</div>
                    </div>
                </div>
                
                <!-- Menu Buttons -->
                <div class="dcp-menu-buttons">
                    <button class="dcp-menu-btn" onclick="DCPWidget.sendMessage('Administrative Services')">Administrative</button>
                    <button class="dcp-menu-btn" onclick="DCPWidget.sendMessage('Government Departments')">Departments</button>
                    <button class="dcp-menu-btn" onclick="DCPWidget.sendMessage('Government Schemes')">Schemes</button>
                    <button class="dcp-menu-btn" onclick="DCPWidget.sendMessage('Document Status')">Documents</button>
                    <button class="dcp-menu-btn" onclick="DCPWidget.sendMessage('Contact Information')">Contact</button>
                    <button class="dcp-menu-btn" onclick="DCPWidget.sendMessage('General Help')">Get Help</button>
                </div>
                
                <!-- QR Toggle -->
                <div class="dcp-qr-toggle">
                    <button onclick="DCPWidget.toggleQR()">Show QR</button>
                </div>
                
                <!-- QR Section -->
                <div class="dcp-qr-section" id="dcpQRSection">
                    <div class="dcp-qr-title">SCAN TO START</div>
                    <div class="dcp-qr-code">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://wa.me/' + config.phoneNumber + '?text=' + config.defaultMessage)}&bgcolor=FFFFFF&color=6A5ACD" alt="QR Code">
                    </div>
                    <div class="dcp-qr-text">Open on your phone</div>
                </div>
                
                <!-- Footer -->
                <div class="dcp-footer">
                    <a href="https://wow-strategies.com" target="_blank">Powered by WoW-Strategies Private Limited ↗</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
    };
    
    // Widget API
    window.DCPWidget = {
        toggle: function() {
            const chat = document.getElementById('dcpChatWindow');
            if (chat) {
                chat.classList.toggle('active');
                const badge = document.querySelector('.dcp-ai-badge');
                if (badge) {
                    badge.style.display = chat.classList.contains('active') ? 'none' : 'flex';
                }
            }
        },
        
        open: function() {
            const chat = document.getElementById('dcpChatWindow');
            if (chat && !chat.classList.contains('active')) {
                chat.classList.add('active');
                const badge = document.querySelector('.dcp-ai-badge');
                if (badge) badge.style.display = 'none';
            }
        },
        
        close: function() {
            const chat = document.getElementById('dcpChatWindow');
            if (chat && chat.classList.contains('active')) {
                chat.classList.remove('active');
                const badge = document.querySelector('.dcp-ai-badge');
                if (badge) badge.style.display = 'flex';
            }
        },
        
        toggleQR: function() {
            const qr = document.getElementById('dcpQRSection');
            const btn = event.target;
            if (qr) {
                qr.classList.toggle('active');
                btn.textContent = qr.classList.contains('active') ? 'Hide QR' : 'Show QR';
            }
        },
        
        sendMessage: function(text) {
            const message = text || config.defaultMessage;
            const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = url;
            } else {
                window.open(url, '_blank');
            }
        }
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
    
    // Auto-show notification
    setTimeout(() => {
        const chat = document.getElementById('dcpChatWindow');
        if (chat && !sessionStorage.getItem('dcp_shown')) {
            chat.classList.add('active');
            sessionStorage.setItem('dcp_shown', '1');
            setTimeout(() => {
                chat.classList.remove('active');
            }, 5000);
        }
    }, 2000);
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        const chat = document.getElementById('dcpChatWindow');
        const btn = document.querySelector('.dcp-float-btn');
        if (chat && btn && !chat.contains(e.target) && !btn.contains(e.target)) {
            if (chat.classList.contains('active')) {
                DCPWidget.close();
            }
        }
    });
    
    console.log('✅ DCP WhatsApp Widget Loaded - v8.0.0');
})();
