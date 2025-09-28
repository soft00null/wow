(function() {
    'use strict';
    
    // Configuration
    const config = {
        phoneNumber: '918888006666',
        defaultMessage: 'Hi, I need assistance with',
        poweredByText: 'Powered By WoW-Strategies Private Limited',
        poweredByUrl: 'https://wow-strategies.com/',
        businessHours: {
            start: 9,
            end: 18,
            timezone: 'Asia/Kolkata'
        }
    };

    // Create styles
    const styles = `
        .pcmc-whatsapp-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .pcmc-whatsapp-button {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            position: relative;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
        }

        .pcmc-whatsapp-button:hover {
            transform: scale(1.1);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .pcmc-whatsapp-button svg {
            width: 32px;
            height: 32px;
            fill: white;
        }

        .pcmc-status-indicator {
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: #4FCE5D;
            border: 2px solid white;
            border-radius: 50%;
            animation: blink 2s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        .pcmc-whatsapp-popup {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 360px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }

        .pcmc-whatsapp-popup.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .pcmc-popup-header {
            background: linear-gradient(135deg, #075E54 0%, #128C7E 100%);
            color: white;
            padding: 20px;
            position: relative;
        }

        .pcmc-popup-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s;
        }

        .pcmc-popup-close:hover {
            opacity: 1;
        }

        .pcmc-popup-close svg {
            width: 24px;
            height: 24px;
            fill: white;
        }

        .pcmc-popup-profile {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .pcmc-popup-avatar {
            width: 50px;
            height: 50px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .pcmc-popup-info h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .pcmc-popup-info p {
            margin: 4px 0 0;
            font-size: 13px;
            opacity: 0.9;
        }

        .pcmc-popup-body {
            padding: 20px;
            background: #f0f2f5;
        }

        .pcmc-welcome-message {
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            position: relative;
            font-size: 14px;
            line-height: 1.5;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .pcmc-welcome-message:before {
            content: '';
            position: absolute;
            top: 0;
            left: -8px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 8px 10px 0;
            border-color: transparent white transparent transparent;
        }

        .pcmc-quick-replies {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }

        .pcmc-quick-reply-btn {
            background: white;
            border: 1px solid #e4e6eb;
            padding: 10px 16px;
            border-radius: 20px;
            font-size: 14px;
            color: #128C7E;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }

        .pcmc-quick-reply-btn:hover {
            background: #128C7E;
            color: white;
            transform: translateX(5px);
        }

        .pcmc-input-group {
            display: flex;
            gap: 10px;
            align-items: stretch;
        }

        .pcmc-message-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #e4e6eb;
            border-radius: 24px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }

        .pcmc-message-input:focus {
            border-color: #128C7E;
        }

        .pcmc-send-btn {
            background: #128C7E;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .pcmc-send-btn:hover {
            background: #075E54;
            transform: scale(1.05);
        }

        .pcmc-send-btn svg {
            width: 16px;
            height: 16px;
            fill: white;
        }

        .pcmc-popup-footer {
            padding: 10px 20px;
            background: #f8f9fa;
            border-top: 1px solid #e4e6eb;
            text-align: center;
            font-size: 11px;
            color: #65676b;
        }

        .pcmc-popup-footer a {
            color: #128C7E;
            text-decoration: none;
            font-weight: 600;
        }

        .pcmc-popup-footer a:hover {
            text-decoration: underline;
        }

        .pcmc-tooltip {
            position: absolute;
            right: 80px;
            bottom: 25px;
            background: #075E54;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 13px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .pcmc-tooltip.show {
            opacity: 1;
            visibility: visible;
        }

        .pcmc-tooltip:after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6px 0 6px 6px;
            border-color: transparent transparent transparent #075E54;
        }

        @media (max-width: 480px) {
            .pcmc-whatsapp-widget {
                bottom: 10px;
                right: 10px;
            }

            .pcmc-whatsapp-popup {
                width: calc(100vw - 20px);
                right: -10px;
                bottom: 70px;
            }
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // WhatsApp SVG Icon
    const whatsappIcon = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.002 0h-.004C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378l-1.994 5.944 6.15-1.966C9.732 30.95 12.75 32 16.002 32 24.826 32 32 24.824 32 16S24.826 0 16.002 0zm9.194 22.844c-.386 1.088-1.912 1.992-3.124 2.256-.832.176-1.916.316-5.568-1.196-4.664-1.93-7.676-6.676-7.908-6.982-.226-.306-1.876-2.498-1.876-4.766s1.19-3.38 1.612-3.842c.422-.462.918-.578 1.228-.578.31 0 .62.004.89.016.286.012.67-.108 1.048.8.386.926 1.31 3.2 1.426 3.432.116.232.194.502.04.808-.156.31-.232.5-.464.77-.232.27-.488.602-.696.808-.232.23-.472.482-.204.946.27.462 1.196 1.97 2.566 3.19 1.764 1.57 3.252 2.06 3.714 2.292.462.232.732.194.998-.116.27-.31 1.156-1.35 1.464-1.814.31-.464.62-.386 1.044-.232.426.156 2.694 1.27 3.156 1.502.462.232.77.348.886.532.116.186.116 1.088-.27 2.176z"/>
    </svg>`;

    // Close Icon SVG
    const closeIcon = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>`;

    // Send Icon SVG
    const sendIcon = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>`;

    // Check if within business hours
    function isBusinessHours() {
        const now = new Date();
        const hours = now.getHours();
        return hours >= config.businessHours.start && hours < config.businessHours.end;
    }

    // Create widget HTML
    function createWidget() {
        const widget = document.createElement('div');
        widget.className = 'pcmc-whatsapp-widget';
        widget.innerHTML = `
            <div class="pcmc-tooltip">Need help? Chat with us!</div>
            <div class="pcmc-whatsapp-popup">
                <div class="pcmc-popup-header">
                    <div class="pcmc-popup-close">${closeIcon}</div>
                    <div class="pcmc-popup-profile">
                        <div class="pcmc-popup-avatar">🏥</div>
                        <div class="pcmc-popup-info">
                            <h3>PCMC Support</h3>
                            <p>${isBusinessHours() ? '🟢 Online - Typically replies instantly' : '🟡 Away - We\'ll respond soon'}</p>
                        </div>
                    </div>
                </div>
                <div class="pcmc-popup-body">
                    <div class="pcmc-welcome-message">
                        👋 Welcome! I'm your PCMC AI Assistant. How can I help you today?
                    </div>
                    <div class="pcmc-quick-replies">
                        <button class="pcmc-quick-reply-btn" data-message="I need information about services">📋 Services Information</button>
                        <button class="pcmc-quick-reply-btn" data-message="I want to book an appointment">📅 Book Appointment</button>
                        <button class="pcmc-quick-reply-btn" data-message="I have a medical query">🏥 Medical Query</button>
                        <button class="pcmc-quick-reply-btn" data-message="I need emergency assistance">🚨 Emergency Help</button>
                    </div>
                    <div class="pcmc-input-group">
                        <input type="text" class="pcmc-message-input" placeholder="Type your message...">
                        <button class="pcmc-send-btn">
                            Send ${sendIcon}
                        </button>
                    </div>
                </div>
                <div class="pcmc-popup-footer">
                    <a href="${config.poweredByUrl}" target="_blank" rel="noopener noreferrer">${config.poweredByText}</a>
                </div>
            </div>
            <div class="pcmc-whatsapp-button">
                ${whatsappIcon}
                <span class="pcmc-status-indicator"></span>
            </div>
        `;
        return widget;
    }

    // Initialize widget
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        const widget = createWidget();
        document.body.appendChild(widget);

        const button = widget.querySelector('.pcmc-whatsapp-button');
        const popup = widget.querySelector('.pcmc-whatsapp-popup');
        const closeBtn = widget.querySelector('.pcmc-popup-close');
        const tooltip = widget.querySelector('.pcmc-tooltip');
        const messageInput = widget.querySelector('.pcmc-message-input');
        const sendBtn = widget.querySelector('.pcmc-send-btn');
        const quickReplyBtns = widget.querySelectorAll('.pcmc-quick-reply-btn');

        let isPopupOpen = false;

        // Toggle popup
        button.addEventListener('click', function() {
            isPopupOpen = !isPopupOpen;
            if (isPopupOpen) {
                popup.classList.add('active');
                tooltip.classList.remove('show');
                messageInput.focus();
                
                // Track analytics event
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_widget_open', {
                        'event_category': 'engagement',
                        'event_label': 'PCMC WhatsApp Widget'
                    });
                }
            } else {
                popup.classList.remove('active');
            }
        });

        // Close popup
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            popup.classList.remove('active');
            isPopupOpen = false;
        });

        // Send message function
        function sendMessage(message) {
            if (!message.trim()) return;
            
            const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Track analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_message_sent', {
                    'event_category': 'engagement',
                    'event_label': 'PCMC WhatsApp Widget',
                    'value': message.substring(0, 50)
                });
            }
            
            // Reset input and close popup
            messageInput.value = '';
            setTimeout(() => {
                popup.classList.remove('active');
                isPopupOpen = false;
            }, 500);
        }

        // Send button click
        sendBtn.addEventListener('click', function() {
            sendMessage(messageInput.value);
        });

        // Enter key to send
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(messageInput.value);
            }
        });

        // Quick reply buttons
        quickReplyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const message = this.getAttribute('data-message');
                sendMessage(message);
            });
        });

        // Show tooltip after delay
        setTimeout(() => {
            if (!isPopupOpen) {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 5000);
            }
        }, 3000);

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isPopupOpen) {
                popup.classList.remove('active');
                isPopupOpen = false;
            }
        });

        // Close popup when clicking outside
        document.addEventListener('click', function(e) {
            if (isPopupOpen && !widget.contains(e.target)) {
                popup.classList.remove('active');
                isPopupOpen = false;
            }
        });

        // Accessibility improvements
        button.setAttribute('aria-label', 'Open WhatsApp chat');
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        
        // Keyboard navigation for button
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });

        // Auto-show popup for first-time visitors
        if (!localStorage.getItem('pcmc_whatsapp_shown')) {
            setTimeout(() => {
                if (!isPopupOpen) {
                    button.click();
                    localStorage.setItem('pcmc_whatsapp_shown', 'true');
                }
            }, 5000);
        }

        // Update online status every minute
        setInterval(() => {
            const statusElement = widget.querySelector('.pcmc-popup-info p');
            if (statusElement) {
                statusElement.innerHTML = isBusinessHours() 
                    ? '🟢 Online - Typically replies instantly' 
                    : '🟡 Away - We\'ll respond soon';
            }
        }, 60000);

        console.log('PCMC WhatsApp Widget initialized successfully!');
    }

    // Initialize
    init();
})();
