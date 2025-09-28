(function() {
    'use strict';
    
    // Configuration for PCMC Municipal Corporation
    const config = {
        phoneNumber: '918888006666',
        corporationName: 'Pimpri Chinchwad Municipal Corporation',
        shortName: 'PCMC',
        tagline: 'Digital Governance at Your Service',
        poweredBy: 'WoW-Strategies Private Limited',
        poweredByUrl: 'https://wow-strategies.com/',
        workingHours: {
            start: 9,
            end: 18,
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    };

    // Comprehensive styles for government theme
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .pcmc-ai-widget {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        .pcmc-ai-launcher {
            position: relative;
            width: 72px;
            height: 72px;
            background: linear-gradient(145deg, #1e3a8a 0%, #3b82f6 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(30, 58, 138, 0.3);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            animation: float 3s ease-in-out infinite;
            overflow: hidden;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .pcmc-ai-launcher:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 48px rgba(30, 58, 138, 0.4);
        }

        .pcmc-ai-launcher::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(45deg, #60a5fa, #3b82f6, #1e3a8a);
            border-radius: 50%;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s;
            animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .pcmc-ai-launcher:hover::before {
            opacity: 1;
        }

        .pcmc-ai-launcher-icon {
            width: 36px;
            height: 36px;
            position: relative;
            z-index: 2;
        }

        .pcmc-ai-launcher-icon svg {
            width: 100%;
            height: 100%;
            fill: white;
        }

        .pcmc-status-dot {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 16px;
            height: 16px;
            background: #10b981;
            border: 3px solid white;
            border-radius: 50%;
            animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.8;
            }
        }

        .pcmc-notification-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #ef4444;
            color: white;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 12px;
            border: 2px solid white;
            animation: shake 2s infinite;
        }

        @keyframes shake {
            0%, 90%, 100% { transform: rotate(0deg); }
            92% { transform: rotate(-5deg); }
            94%, 96%, 98% { transform: rotate(5deg); }
            95%, 97%, 99% { transform: rotate(-5deg); }
        }

        .pcmc-ai-chatbox {
            position: absolute;
            bottom: 96px;
            right: 0;
            width: 420px;
            height: 600px;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            opacity: 0;
            visibility: hidden;
            transform: scale(0.8) translateY(20px);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .pcmc-ai-chatbox.active {
            opacity: 1;
            visibility: visible;
            transform: scale(1) translateY(0);
        }

        .pcmc-chat-header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            padding: 24px;
            position: relative;
            overflow: hidden;
        }

        .pcmc-chat-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="80" r="2" fill="white" opacity="0.1"/><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="20" cy="80" r="2" fill="white" opacity="0.1"/></svg>') repeat;
            opacity: 0.3;
        }

        .pcmc-header-content {
            position: relative;
            z-index: 1;
        }

        .pcmc-header-top {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 16px;
        }

        .pcmc-header-info {
            flex: 1;
        }

        .pcmc-header-logo {
            width: 48px;
            height: 48px;
            background: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pcmc-header-logo svg {
            width: 28px;
            height: 28px;
            fill: #1e3a8a;
        }

        .pcmc-header-title {
            color: white;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .pcmc-header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            margin-bottom: 8px;
        }

        .pcmc-header-status {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.95);
            font-size: 12px;
        }

        .pcmc-status-indicator {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            animation: blink 2s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        .pcmc-header-actions {
            display: flex;
            gap: 8px;
        }

        .pcmc-header-btn {
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            backdrop-filter: blur(10px);
        }

        .pcmc-header-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }

        .pcmc-header-btn svg {
            width: 18px;
            height: 18px;
            fill: white;
        }

        .pcmc-language-selector {
            display: flex;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }

        .pcmc-lang-btn {
            padding: 4px 8px;
            background: transparent;
            color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .pcmc-lang-btn.active,
        .pcmc-lang-btn:hover {
            background: white;
            color: #1e3a8a;
            border-color: white;
        }

        .pcmc-chat-body {
            flex: 1;
            background: linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%);
            overflow-y: auto;
            padding: 20px;
            scroll-behavior: smooth;
        }

        .pcmc-chat-body::-webkit-scrollbar {
            width: 6px;
        }

        .pcmc-chat-body::-webkit-scrollbar-track {
            background: transparent;
        }

        .pcmc-chat-body::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }

        .pcmc-welcome-section {
            text-align: center;
            padding: 24px;
            animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .pcmc-bot-avatar {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
            border-radius: 50%;
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .pcmc-bot-avatar svg {
            width: 36px;
            height: 36px;
            fill: white;
        }

        .pcmc-welcome-title {
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 8px;
        }

        .pcmc-welcome-subtitle {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 24px;
            line-height: 1.5;
        }

        .pcmc-services-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 20px;
        }

        .pcmc-service-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .pcmc-service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #1e3a8a);
            transform: scaleX(0);
            transition: transform 0.3s;
        }

        .pcmc-service-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            border-color: #3b82f6;
        }

        .pcmc-service-card:hover::before {
            transform: scaleX(1);
        }

        .pcmc-service-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            font-size: 20px;
        }

        .pcmc-service-title {
            font-size: 14px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 4px;
        }

        .pcmc-service-desc {
            font-size: 11px;
            color: #64748b;
            line-height: 1.4;
        }

        .pcmc-quick-actions {
            background: white;
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 20px;
            border: 1px solid #e2e8f0;
        }

        .pcmc-quick-actions-title {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }

        .pcmc-action-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .pcmc-action-chip {
            padding: 8px 16px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            font-size: 13px;
            color: #475569;
            cursor: pointer;
            transition: all 0.3s;
            white-space: nowrap;
        }

        .pcmc-action-chip:hover {
            background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
            color: white;
            border-color: transparent;
            transform: scale(1.05);
        }

        .pcmc-message {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
            animation: messageSlide 0.3s ease-out;
        }

        @keyframes messageSlide {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .pcmc-message.user {
            flex-direction: row-reverse;
        }

        .pcmc-message.user .pcmc-message-content {
            background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
            color: white;
        }

        .pcmc-message-avatar {
            width: 32px;
            height: 32px;
            background: #e2e8f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .pcmc-message.bot .pcmc-message-avatar {
            background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
        }

        .pcmc-message-avatar svg {
            width: 18px;
            height: 18px;
            fill: #64748b;
        }

        .pcmc-message.bot .pcmc-message-avatar svg {
            fill: white;
        }

        .pcmc-message-content {
            max-width: 70%;
            background: white;
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.5;
            color: #1e293b;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .pcmc-typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: white;
            border-radius: 16px;
            width: fit-content;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .pcmc-typing-dot {
            width: 8px;
            height: 8px;
            background: #64748b;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }

        .pcmc-typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .pcmc-typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.5;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }

        .pcmc-chat-footer {
            padding: 16px;
            background: white;
            border-top: 1px solid #e2e8f0;
        }

        .pcmc-input-wrapper {
            display: flex;
            gap: 12px;
            margin-bottom: 12px;
        }

        .pcmc-chat-input {
            flex: 1;
            padding: 12px 16px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            outline: none;
            transition: all 0.3s;
        }

        .pcmc-chat-input:focus {
            background: white;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .pcmc-input-actions {
            display: flex;
            gap: 8px;
        }

        .pcmc-input-btn {
            width: 40px;
            height: 40px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .pcmc-input-btn:hover {
            background: #3b82f6;
            border-color: #3b82f6;
        }

        .pcmc-input-btn svg {
            width: 20px;
            height: 20px;
            fill: #64748b;
        }

        .pcmc-input-btn:hover svg {
            fill: white;
        }

        .pcmc-send-btn {
            background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
            border-color: transparent;
        }

        .pcmc-send-btn svg {
            fill: white;
        }

        .pcmc-footer-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f1f5f9;
        }

        .pcmc-security-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            color: #94a3b8;
        }

        .pcmc-security-info svg {
            width: 14px;
            height: 14px;
            fill: #10b981;
        }

        .pcmc-powered-by {
            font-size: 10px;
            color: #94a3b8;
        }

        .pcmc-powered-by a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
        }

        .pcmc-powered-by a:hover {
            text-decoration: underline;
        }

        .pcmc-tooltip {
            position: absolute;
            bottom: 96px;
            right: 88px;
            background: #1e293b;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 13px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .pcmc-tooltip.show {
            opacity: 1;
            visibility: visible;
        }

        .pcmc-tooltip::after {
            content: '';
            position: absolute;
            bottom: -6px;
            right: 24px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6px 6px 0 6px;
            border-color: #1e293b transparent transparent transparent;
        }

        @media (max-width: 480px) {
            .pcmc-ai-widget {
                bottom: 16px;
                right: 16px;
            }

            .pcmc-ai-chatbox {
                width: calc(100vw - 32px);
                height: calc(100vh - 120px);
                bottom: 88px;
                right: -16px;
            }

            .pcmc-services-grid {
                grid-template-columns: 1fr;
            }

            .pcmc-ai-launcher {
                width: 60px;
                height: 60px;
            }

            .pcmc-ai-launcher-icon {
                width: 32px;
                height: 32px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                animation: none !important;
                transition: none !important;
            }
        }
    `;

    // Icons
    const icons = {
        bot: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
        close: `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
        minimize: `<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>`,
        send: `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
        attach: `<svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>`,
        mic: `<svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>`,
        user: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        shield: `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
        government: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7v2h20V7L12 2zM4 10v9h3v-5h2v5h2v-5h2v5h2v-5h2v5h3v-9H4zM22 20v2H2v-2h20z"/></svg>`
    };

    // Service categories
    const services = [
        {
            id: 'information',
            icon: '📋',
            title: 'Information',
            description: 'City info & guidelines',
            queries: ['City Information', 'Contact Details', 'Office Timings', 'Department Info']
        },
        {
            id: 'properties',
            icon: '🏠',
            title: 'My Properties',
            description: 'Property tax & records',
            queries: ['Property Tax', 'Property Details', 'Tax Payment', 'Property Transfer']
        },
        {
            id: 'grievance',
            icon: '📝',
            title: 'Grievance',
            description: 'Register complaints',
            queries: ['Register Complaint', 'Track Complaint', 'Complaint Status', 'Emergency Services']
        },
        {
            id: 'schemes',
            icon: '🎯',
            title: 'Schemes',
            description: 'Government schemes',
            queries: ['Housing Schemes', 'Welfare Programs', 'Subsidies', 'Benefits']
        },
        {
            id: 'cfc',
            icon: '🏛️',
            title: 'CFC Services',
            description: 'Citizen facilitation',
            queries: ['Birth Certificate', 'Death Certificate', 'Marriage Registration', 'Documents']
        },
        {
            id: 'water',
            icon: '💧',
            title: 'Water & Sewage',
            description: 'Water connection & bills',
            queries: ['Water Connection', 'Bill Payment', 'New Connection', 'Complaints']
        },
        {
            id: 'building',
            icon: '🏗️',
            title: 'Building Plan',
            description: 'Construction permits',
            queries: ['Building Permission', 'Plan Approval', 'Completion Certificate', 'NOC']
        },
        {
            id: 'health',
            icon: '🏥',
            title: 'Health Services',
            description: 'Medical & health',
            queries: ['Hospitals', 'Vaccination', 'Health Camps', 'Emergency']
        }
    ];

    // Quick actions
    const quickActions = [
        'Pay Property Tax',
        'Track Application',
        'Download Forms',
        'Book Appointment',
        'Emergency Helpline'
    ];

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create widget HTML
    function createWidget() {
        const widget = document.createElement('div');
        widget.className = 'pcmc-ai-widget';
        widget.innerHTML = `
            <div class="pcmc-tooltip">👋 Need help? Click to chat!</div>
            
            <div class="pcmc-ai-chatbox">
                <div class="pcmc-chat-header">
                    <div class="pcmc-header-content">
                        <div class="pcmc-header-top">
                            <div class="pcmc-header-info">
                                <div class="pcmc-header-logo">
                                    ${icons.government}
                                </div>
                                <div class="pcmc-header-title">${config.shortName} AI Assistant</div>
                                <div class="pcmc-header-subtitle">${config.tagline}</div>
                                <div class="pcmc-header-status">
                                    <span class="pcmc-status-indicator"></span>
                                    <span>Online - Instant Response</span>
                                </div>
                            </div>
                            <div class="pcmc-header-actions">
                                <button class="pcmc-header-btn pcmc-minimize-btn">
                                    ${icons.minimize}
                                </button>
                                <button class="pcmc-header-btn pcmc-close-btn">
                                    ${icons.close}
                                </button>
                            </div>
                        </div>
                        <div class="pcmc-language-selector">
                            <button class="pcmc-lang-btn active" data-lang="en">English</button>
                            <button class="pcmc-lang-btn" data-lang="hi">हिंदी</button>
                            <button class="pcmc-lang-btn" data-lang="mr">मराठी</button>
                        </div>
                    </div>
                </div>
                
                <div class="pcmc-chat-body">
                    <div class="pcmc-welcome-section">
                        <div class="pcmc-bot-avatar">
                            ${icons.government}
                        </div>
                        <div class="pcmc-welcome-title">Welcome to PCMC Digital Services</div>
                        <div class="pcmc-welcome-subtitle">
                            I'm your AI assistant for all municipal services. Select a service below or type your query.
                        </div>
                        
                        <div class="pcmc-services-grid">
                            ${services.map(service => `
                                <div class="pcmc-service-card" data-service="${service.id}">
                                    <div class="pcmc-service-icon">${service.icon}</div>
                                    <div class="pcmc-service-title">${service.title}</div>
                                    <div class="pcmc-service-desc">${service.description}</div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="pcmc-quick-actions">
                            <div class="pcmc-quick-actions-title">Quick Actions</div>
                            <div class="pcmc-action-chips">
                                ${quickActions.map(action => `
                                    <button class="pcmc-action-chip" data-action="${action}">
                                        ${action}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="pcmc-chat-footer">
                    <div class="pcmc-input-wrapper">
                        <input type="text" class="pcmc-chat-input" placeholder="Type your message or query...">
                        <div class="pcmc-input-actions">
                            <button class="pcmc-input-btn pcmc-attach-btn">
                                ${icons.attach}
                            </button>
                            <button class="pcmc-input-btn pcmc-mic-btn">
                                ${icons.mic}
                            </button>
                            <button class="pcmc-input-btn pcmc-send-btn">
                                ${icons.send}
                            </button>
                        </div>
                    </div>
                    <div class="pcmc-footer-info">
                        <div class="pcmc-security-info">
                            ${icons.shield}
                            <span>Secure & Encrypted</span>
                        </div>
                        <div class="pcmc-powered-by">
                            Powered by <a href="${config.poweredByUrl}" target="_blank">${config.poweredBy}</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pcmc-ai-launcher">
                <div class="pcmc-ai-launcher-icon">
                    ${icons.government}
                </div>
                <span class="pcmc-status-dot"></span>
                <span class="pcmc-notification-badge">1</span>
            </div>
        `;
        return widget;
    }

    // Message handling
    function addMessage(content, isUser = false) {
        const chatBody = document.querySelector('.pcmc-chat-body');
        const welcomeSection = chatBody.querySelector('.pcmc-welcome-section');
        
        if (welcomeSection) {
            welcomeSection.style.display = 'none';
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `pcmc-message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `
            <div class="pcmc-message-avatar">
                ${isUser ? icons.user : icons.government}
            </div>
            <div class="pcmc-message-content">${content}</div>
        `;
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const chatBody = document.querySelector('.pcmc-chat-body');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'pcmc-message bot';
        typingDiv.innerHTML = `
            <div class="pcmc-message-avatar">${icons.government}</div>
            <div class="pcmc-typing-indicator">
                <span class="pcmc-typing-dot"></span>
                <span class="pcmc-typing-dot"></span>
                <span class="pcmc-typing-dot"></span>
            </div>
        `;
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        return typingDiv;
    }

    // Handle service selection
    function handleServiceSelection(serviceId) {
        const service = services.find(s => s.id === serviceId);
        if (service) {
            addMessage(`I want to know about ${service.title}`, true);
            
            const typing = showTyping();
            setTimeout(() => {
                typing.remove();
                addMessage(`I can help you with ${service.title}. Here are some common queries:`);
                
                setTimeout(() => {
                    const queryOptions = service.queries.map(q => `• ${q}`).join('<br>');
                    addMessage(`${queryOptions}<br><br>Please select an option or type your specific query.`);
                }, 500);
            }, 1500);
        }
    }

    // Send message to WhatsApp
    function sendToWhatsApp(message) {
        const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Initialize widget
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        const widget = createWidget();
        document.body.appendChild(widget);

        // Elements
        const launcher = widget.querySelector('.pcmc-ai-launcher');
        const chatbox = widget.querySelector('.pcmc-ai-chatbox');
        const closeBtn = widget.querySelector('.pcmc-close-btn');
        const minimizeBtn = widget.querySelector('.pcmc-minimize-btn');
        const tooltip = widget.querySelector('.pcmc-tooltip');
        const input = widget.querySelector('.pcmc-chat-input');
        const sendBtn = widget.querySelector('.pcmc-send-btn');
        const serviceCards = widget.querySelectorAll('.pcmc-service-card');
        const actionChips = widget.querySelectorAll('.pcmc-action-chip');
        const langBtns = widget.querySelectorAll('.pcmc-lang-btn');
        const notificationBadge = widget.querySelector('.pcmc-notification-badge');

        let isOpen = false;

        // Toggle chatbox
        launcher.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                chatbox.classList.add('active');
                tooltip.classList.remove('show');
                notificationBadge.style.display = 'none';
                input.focus();
                
                // Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'chatbot_open', {
                        'event_category': 'engagement',
                        'event_label': 'PCMC AI Assistant'
                    });
                }
            } else {
                chatbox.classList.remove('active');
            }
        });

        // Close button
        closeBtn.addEventListener('click', () => {
            chatbox.classList.remove('active');
            isOpen = false;
        });

        // Minimize button
        minimizeBtn.addEventListener('click', () => {
            chatbox.classList.remove('active');
            isOpen = false;
        });

        // Service card clicks
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.dataset.service;
                handleServiceSelection(serviceId);
            });
        });

        // Quick action chips
        actionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const action = chip.dataset.action;
                addMessage(action, true);
                
                const typing = showTyping();
                setTimeout(() => {
                    typing.remove();
                    
                    if (action === 'Emergency Helpline') {
                        addMessage('🚨 Emergency Services:<br><br>📞 Police: 100<br>🚒 Fire: 101<br>🚑 Ambulance: 108<br>📱 PCMC Helpline: 1800-XXX-XXXX');
                    } else {
                        addMessage(`I'll help you with "${action}". This service will redirect you to our WhatsApp support for personalized assistance.`);
                        setTimeout(() => {
                            sendToWhatsApp(`Hi, I need help with: ${action}`);
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
                const lang = btn.dataset.lang;
                
                // Handle language change
                console.log(`Language changed to: ${lang}`);
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
                    addMessage('Thank you for your query. For detailed assistance, I\'m connecting you to our WhatsApp support team.');
                    setTimeout(() => {
                        sendToWhatsApp(message);
                    }, 2000);
                }, 1500);
            }
        }

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });

        // Show tooltip
        setTimeout(() => {
            if (!isOpen) {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 5000);
            }
        }, 3000);

        // First time visitor
        if (!localStorage.getItem('pcmc_ai_visited')) {
            setTimeout(() => {
                if (!isOpen) {
                    launcher.click();
                    localStorage.setItem('pcmc_ai_visited', 'true');
                }
            }, 5000);
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                chatbox.classList.remove('active');
                isOpen = false;
            }
        });

        console.log('✅ PCMC AI Assistant initialized successfully!');
    }

    // Start initialization
    init();
})();
