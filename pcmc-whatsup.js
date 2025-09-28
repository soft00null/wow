(function() {
    'use strict';
    
    // PCMC Municipal Corporation Configuration
    const config = {
        corporationName: 'PCMC',
        fullName: 'Pimpri Chinchwad Municipal Corporation',
        tagline: 'Digital Governance • Citizen First',
        supportNumber: '918888006666',
        poweredBy: 'WoW-Strategies Private Limited',
        poweredByUrl: 'https://wow-strategies.com/'
    };

    // Minimalistic Modern Styles
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .pcmc-widget {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Floating Action Button */
        .pcmc-fab {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%);
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }

        .pcmc-fab:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(37, 99, 235, 0.4);
        }

        .pcmc-fab-icon {
            width: 32px;
            height: 32px;
            transition: transform 0.3s ease;
        }

        .pcmc-fab.active .pcmc-fab-icon {
            transform: rotate(90deg);
        }

        .pcmc-fab-icon svg {
            width: 100%;
            height: 100%;
            fill: white;
        }

        .pcmc-pulse {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 12px;
            height: 12px;
            background: #10B981;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
            70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        /* Chat Window - Minimal Design */
        .pcmc-chat {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 380px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
            opacity: 0;
            visibility: hidden;
            transform: translateY(16px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            max-height: 600px;
        }

        .pcmc-chat.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        /* Chat Header - Clean & Minimal */
        .pcmc-chat-header {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            padding: 20px;
            border-bottom: 1px solid #f1f5f9;
        }

        .pcmc-header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
        }

        .pcmc-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .pcmc-avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pcmc-avatar svg {
            width: 24px;
            height: 24px;
            fill: white;
        }

        .pcmc-header-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: #0F172A;
            margin-bottom: 2px;
        }

        .pcmc-header-info p {
            font-size: 12px;
            color: #64748B;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .pcmc-status {
            width: 6px;
            height: 6px;
            background: #10B981;
            border-radius: 50%;
            display: inline-block;
        }

        .pcmc-close {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }

        .pcmc-close:hover {
            background: #f1f5f9;
        }

        .pcmc-close svg {
            width: 20px;
            height: 20px;
            fill: #64748B;
        }

        /* Language Bar - Subtle */
        .pcmc-lang-bar {
            display: flex;
            gap: 8px;
            padding: 0 2px;
        }

        .pcmc-lang {
            flex: 1;
            padding: 6px;
            background: transparent;
            border: none;
            font-size: 11px;
            color: #94A3B8;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
            font-weight: 500;
        }

        .pcmc-lang.active {
            background: #2563EB;
            color: white;
        }

        /* Chat Body */
        .pcmc-chat-body {
            flex: 1;
            padding: 24px 20px;
            overflow-y: auto;
            background: #FAFBFC;
        }

        .pcmc-chat-body::-webkit-scrollbar {
            width: 4px;
        }

        .pcmc-chat-body::-webkit-scrollbar-track {
            background: transparent;
        }

        .pcmc-chat-body::-webkit-scrollbar-thumb {
            background: #E2E8F0;
            border-radius: 4px;
        }

        /* Welcome Message */
        .pcmc-welcome {
            text-align: center;
            padding: 20px 0;
        }

        .pcmc-welcome h4 {
            font-size: 18px;
            font-weight: 600;
            color: #0F172A;
            margin-bottom: 8px;
        }

        .pcmc-welcome p {
            font-size: 13px;
            color: #64748B;
            line-height: 1.5;
        }

        /* Service Cards - Clean Grid */
        .pcmc-services {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 24px;
        }

        .pcmc-service {
            background: white;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
        }

        .pcmc-service::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #0EA5E9, #2563EB);
            transform: scaleX(0);
            transition: transform 0.3s;
        }

        .pcmc-service:hover {
            border-color: #CBD5E1;
            background: #F8FAFC;
            transform: translateY(-2px);
        }

        .pcmc-service:hover::before {
            transform: scaleX(1);
        }

        .pcmc-service-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }

        .pcmc-service-title {
            font-size: 13px;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 4px;
        }

        .pcmc-service-desc {
            font-size: 11px;
            color: #64748B;
            line-height: 1.3;
        }

        /* Quick Actions - Pills */
        .pcmc-quick-actions {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #F1F5F9;
        }

        .pcmc-actions-title {
            font-size: 11px;
            font-weight: 600;
            color: #94A3B8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }

        .pcmc-action-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .pcmc-pill {
            padding: 8px 14px;
            background: white;
            border: 1px solid #E2E8F0;
            border-radius: 20px;
            font-size: 12px;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        }

        .pcmc-pill:hover {
            background: #2563EB;
            color: white;
            border-color: #2563EB;
            transform: translateY(-1px);
        }

        /* Message Styles */
        .pcmc-message {
            display: flex;
            gap: 10px;
            margin-bottom: 16px;
            animation: fadeInUp 0.3s ease;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .pcmc-message.user {
            flex-direction: row-reverse;
        }

        .pcmc-msg-avatar {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            background: #F1F5F9;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .pcmc-message.user .pcmc-msg-avatar {
            background: #E0E7FF;
        }

        .pcmc-msg-avatar svg {
            width: 16px;
            height: 16px;
            fill: #64748B;
        }

        .pcmc-msg-content {
            max-width: 70%;
            background: white;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
            color: #334155;
            border: 1px solid #F1F5F9;
        }

        .pcmc-message.user .pcmc-msg-content {
            background: #2563EB;
            color: white;
            border: none;
        }

        /* Chat Input - Clean Design */
        .pcmc-chat-footer {
            padding: 16px;
            background: white;
            border-top: 1px solid #F1F5F9;
        }

        .pcmc-input-group {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        }

        .pcmc-input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            font-size: 13px;
            outline: none;
            transition: all 0.2s;
            background: #F8FAFC;
        }

        .pcmc-input:focus {
            background: white;
            border-color: #2563EB;
        }

        .pcmc-input::placeholder {
            color: #94A3B8;
        }

        .pcmc-send {
            width: 36px;
            height: 36px;
            background: #2563EB;
            border: none;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .pcmc-send:hover {
            background: #1D4ED8;
            transform: scale(1.05);
        }

        .pcmc-send svg {
            width: 18px;
            height: 18px;
            fill: white;
        }

        /* Footer Info */
        .pcmc-footer-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            color: #94A3B8;
        }

        .pcmc-secure {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .pcmc-secure svg {
            width: 12px;
            height: 12px;
            fill: #10B981;
        }

        .pcmc-powered a {
            color: #2563EB;
            text-decoration: none;
            font-weight: 500;
        }

        /* Typing Indicator */
        .pcmc-typing {
            display: flex;
            gap: 3px;
            padding: 10px 14px;
            background: white;
            border-radius: 12px;
            width: fit-content;
            border: 1px solid #F1F5F9;
        }

        .pcmc-typing span {
            width: 6px;
            height: 6px;
            background: #94A3B8;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }

        .pcmc-typing span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .pcmc-typing span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-8px);
            }
        }

        /* Responsive Design */
        @media (max-width: 420px) {
            .pcmc-widget {
                bottom: 16px;
                right: 16px;
            }

            .pcmc-chat {
                width: calc(100vw - 32px);
                max-height: calc(100vh - 120px);
            }

            .pcmc-services {
                grid-template-columns: 1fr;
            }

            .pcmc-fab {
                width: 56px;
                height: 56px;
            }
        }

        /* Smooth Scrollbar */
        .pcmc-chat-body {
            scrollbar-width: thin;
            scrollbar-color: #E2E8F0 transparent;
        }
    `;

    // SVG Icons
    const icons = {
        chat: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.98l-.28-.14-2.92.77.79-2.89-.18-.29C4.36 14.73 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>`,
        close: `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
        send: `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
        bot: `<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 010 2h-1v1a3 3 0 01-3 3h-1v1a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1H6a3 3 0 01-3-3v-1H2a1 1 0 110-2h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A1.5 1.5 0 006 14.5 1.5 1.5 0 007.5 16 1.5 1.5 0 009 14.5 1.5 1.5 0 007.5 13m9 0a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z"/></svg>`,
        user: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        lock: `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>`,
        gov: `<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.25 6 2.25v4.78z"/></svg>`
    };

    // Service definitions
    const services = [
        { id: 'info', icon: '📋', title: 'Information', desc: 'City services & info' },
        { id: 'property', icon: '🏠', title: 'My Properties', desc: 'Tax & registration' },
        { id: 'grievance', icon: '📝', title: 'Grievance', desc: 'Lodge complaints' },
        { id: 'schemes', icon: '🎯', title: 'Schemes', desc: 'Govt. benefits' },
        { id: 'cfc', icon: '🏛️', title: 'CFC Services', desc: 'Certificates & docs' },
        { id: 'health', icon: '🏥', title: 'Health', desc: 'Medical services' }
    ];

    const quickActions = [
        'Property Tax',
        'Birth Certificate', 
        'Water Bill',
        'Track Application',
        'Emergency'
    ];

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create widget HTML
    function createWidget() {
        const widget = document.createElement('div');
        widget.className = 'pcmc-widget';
        widget.innerHTML = `
            <!-- Chat Window -->
            <div class="pcmc-chat">
                <!-- Header -->
                <div class="pcmc-chat-header">
                    <div class="pcmc-header-top">
                        <div class="pcmc-header-left">
                            <div class="pcmc-avatar">${icons.gov}</div>
                            <div class="pcmc-header-info">
                                <h3>PCMC Assistant</h3>
                                <p><span class="pcmc-status"></span> Online</p>
                            </div>
                        </div>
                        <button class="pcmc-close">${icons.close}</button>
                    </div>
                    <div class="pcmc-lang-bar">
                        <button class="pcmc-lang active" data-lang="en">English</button>
                        <button class="pcmc-lang" data-lang="hi">हिंदी</button>
                        <button class="pcmc-lang" data-lang="mr">मराठी</button>
                    </div>
                </div>

                <!-- Body -->
                <div class="pcmc-chat-body">
                    <div class="pcmc-welcome">
                        <h4>Welcome to PCMC Services</h4>
                        <p>How can I assist you today? Select a service below or type your query.</p>
                    </div>

                    <div class="pcmc-services">
                        ${services.map(s => `
                            <div class="pcmc-service" data-service="${s.id}">
                                <div class="pcmc-service-icon">${s.icon}</div>
                                <div class="pcmc-service-title">${s.title}</div>
                                <div class="pcmc-service-desc">${s.desc}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="pcmc-quick-actions">
                        <div class="pcmc-actions-title">Quick Actions</div>
                        <div class="pcmc-action-pills">
                            ${quickActions.map(action => `
                                <button class="pcmc-pill" data-action="${action}">${action}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="pcmc-chat-footer">
                    <div class="pcmc-input-group">
                        <input type="text" class="pcmc-input" placeholder="Type your message...">
                        <button class="pcmc-send">${icons.send}</button>
                    </div>
                    <div class="pcmc-footer-info">
                        <div class="pcmc-secure">
                            ${icons.lock}
                            <span>Secure</span>
                        </div>
                        <div class="pcmc-powered">
                            Powered by <a href="${config.poweredByUrl}" target="_blank">${config.poweredBy}</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Floating Action Button -->
            <div class="pcmc-fab">
                <div class="pcmc-fab-icon">${icons.chat}</div>
                <span class="pcmc-pulse"></span>
            </div>
        `;
        return widget;
    }

    // Message handling
    function addMessage(content, isUser = false) {
        const body = document.querySelector('.pcmc-chat-body');
        const welcome = body.querySelector('.pcmc-welcome');
        const servicesGrid = body.querySelector('.pcmc-services');
        const quickActions = body.querySelector('.pcmc-quick-actions');
        
        // Hide welcome content after first message
        if (welcome) {
            welcome.style.display = 'none';
            servicesGrid.style.display = 'none';
            quickActions.style.display = 'none';
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = `pcmc-message ${isUser ? 'user' : ''}`;
        msgDiv.innerHTML = `
            <div class="pcmc-msg-avatar">${isUser ? icons.user : icons.bot}</div>
            <div class="pcmc-msg-content">${content}</div>
        `;
        
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const body = document.querySelector('.pcmc-chat-body');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'pcmc-message';
        typingDiv.innerHTML = `
            <div class="pcmc-msg-avatar">${icons.bot}</div>
            <div class="pcmc-typing">
                <span></span><span></span><span></span>
            </div>
        `;
        body.appendChild(typingDiv);
        body.scrollTop = body.scrollHeight;
        return typingDiv;
    }

    // Handle service selection
    function handleService(serviceId) {
        const service = services.find(s => s.id === serviceId);
        if (service) {
            addMessage(`Tell me about ${service.title}`, true);
            
            const typing = showTyping();
            setTimeout(() => {
                typing.remove();
                
                const responses = {
                    'info': 'PCMC provides various citizen services including water supply, property tax, building permissions, and more. What specific information do you need?',
                    'property': 'You can pay property tax, view property details, and manage property transfers online. Would you like to check your property tax status?',
                    'grievance': 'You can register complaints for water supply, roads, streetlights, garbage collection, etc. What issue would you like to report?',
                    'schemes': 'Various government schemes are available for housing, education, and welfare. Which category interests you?',
                    'cfc': 'Citizen Facilitation Center offers birth/death certificates, domicile certificates, and other documents. Which certificate do you need?',
                    'health': 'PCMC operates multiple hospitals and health centers. Do you need information about hospitals, vaccinations, or health camps?'
                };
                
                addMessage(responses[serviceId] || 'How can I help you with this service?');
            }, 1500);
        }
    }

    // WhatsApp redirect
    function redirectToWhatsApp(message) {
        const url = `https://wa.me/${config.supportNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Initialize
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        const widget = createWidget();
        document.body.appendChild(widget);

        // Elements
        const fab = widget.querySelector('.pcmc-fab');
        const chat = widget.querySelector('.pcmc-chat');
        const closeBtn = widget.querySelector('.pcmc-close');
        const input = widget.querySelector('.pcmc-input');
        const sendBtn = widget.querySelector('.pcmc-send');
        const serviceCards = widget.querySelectorAll('.pcmc-service');
        const pills = widget.querySelectorAll('.pcmc-pill');
        const langBtns = widget.querySelectorAll('.pcmc-lang');

        let isOpen = false;

        // Toggle chat
        fab.addEventListener('click', () => {
            isOpen = !isOpen;
            chat.classList.toggle('active');
            fab.classList.toggle('active');
            if (isOpen) input.focus();
        });

        // Close chat
        closeBtn.addEventListener('click', () => {
            chat.classList.remove('active');
            fab.classList.remove('active');
            isOpen = false;
        });

        // Service cards
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                handleService(card.dataset.service);
            });
        });

        // Quick action pills
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const action = pill.dataset.action;
                addMessage(action, true);
                
                const typing = showTyping();
                setTimeout(() => {
                    typing.remove();
                    
                    if (action === 'Emergency') {
                        addMessage('Emergency Contacts:<br>🚓 Police: 100<br>🚒 Fire: 101<br>🚑 Ambulance: 108');
                    } else {
                        addMessage(`I'll help you with "${action}". Connecting you to our WhatsApp support...`);
                        setTimeout(() => {
                            redirectToWhatsApp(`Hi, I need help with: ${action}`);
                        }, 2000);
                    }
                }, 1500);
            });
        });

        // Language selection
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Send message
        function handleSend() {
            const message = input.value.trim();
            if (message) {
                addMessage(message, true);
                input.value = '';
                
                const typing = showTyping();
                setTimeout(() => {
                    typing.remove();
                    addMessage('Thank you for your query. For detailed assistance, connecting you to WhatsApp support...');
                    setTimeout(() => {
                        redirectToWhatsApp(message);
                    }, 2000);
                }, 1500);
            }
        }

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Auto-show for first-time visitors
        if (!sessionStorage.getItem('pcmc_chat_shown')) {
            setTimeout(() => {
                if (!isOpen) {
                    fab.click();
                    sessionStorage.setItem('pcmc_chat_shown', 'true');
                }
            }, 3000);
        }

        console.log('✅ PCMC Chat Widget initialized');
    }

    // Start
    init();
})();
