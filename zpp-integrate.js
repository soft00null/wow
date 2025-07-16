/**
 * Pune Zilla Panchayat AI WhatsApp Integration Widget
 * File: zpp-integrate.js
 * Version: 4.1.0 - Fixed Analytics & AI-Powered Popups
 * Date: 2025-07-16
 * Author: soft00null
 * URL: https://wow-strategies.com/zpp-integrate.js
 * 
 * Advanced Analytics Collection & Intelligent Popup System
 * Powered by WoW-Strategies Private Limited
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ZPPWidget) {
        console.warn('ZPP Widget already initialized');
        return;
    }
    
    // Configuration
    const config = {
        phoneNumber: '912026134806',
        message: 'नमस्कार! मला पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे. / Hello! I need information about Pune Zilla Panchayat services.',
        qrApiUrl: 'https://bwipjs-api.metafloor.com/?bcid=qrcode&text=',
        position: 'bottom-right',
        autoShow: true,
        showNotification: true,
        primaryColor: '#25D366',
        secondaryColor: '#128C7E',
        poweredBy: {
            text: 'Powered by WoW-Strategies',
            url: 'https://wow-strategies.com/'
        },
        analytics: {
            enabled: true,
            collectIP: true,
            collectBrowser: true,
            collectLocation: true,
            collectBehavior: true,
            popupTriggers: true,
            sessionTracking: true
        }
    };
    
    // Advanced Analytics System
    class AdvancedAnalytics {
        constructor() {
            this.sessionId = this.generateSessionId();
            this.visitorId = this.getOrCreateVisitorId();
            this.startTime = Date.now();
            this.pageViews = [];
            this.interactions = [];
            this.mouseMovements = [];
            this.scrollDepth = 0;
            this.timeSpent = 0;
            this.isReturningVisitor = false;
            this.visitPattern = {};
            this.deviceInfo = {};
            this.locationInfo = {};
            this.behaviorScore = 0;
            this.popupShown = false;
            
            this.init();
        }
        
        init() {
            try {
                this.detectDevice();
                this.detectLocation();
                this.loadVisitorHistory();
                this.trackPageView();
                this.setupEventListeners();
                this.startHeartbeat();
                console.log('📊 Analytics initialized successfully');
            } catch (error) {
                console.error('Analytics initialization failed:', error);
            }
        }
        
        generateSessionId() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        getOrCreateVisitorId() {
            let visitorId = this.getStorageItem('zpp_visitor_id');
            if (!visitorId) {
                visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                this.setStorageItem('zpp_visitor_id', visitorId);
            }
            return visitorId;
        }
        
        getBrowserInfo() {
            try {
                const ua = navigator.userAgent;
                let browser = 'Unknown';
                let version = 'Unknown';
                
                if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
                    browser = 'Chrome';
                    const match = ua.match(/Chrome\/(\d+)/);
                    version = match ? match[1] : 'Unknown';
                } else if (ua.indexOf('Firefox') > -1) {
                    browser = 'Firefox';
                    const match = ua.match(/Firefox\/(\d+)/);
                    version = match ? match[1] : 'Unknown';
                } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
                    browser = 'Safari';
                    const match = ua.match(/Version\/(\d+)/);
                    version = match ? match[1] : 'Unknown';
                } else if (ua.indexOf('Edg') > -1) {
                    browser = 'Edge';
                    const match = ua.match(/Edg\/(\d+)/);
                    version = match ? match[1] : 'Unknown';
                } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
                    browser = 'Opera';
                    const match = ua.match(/(Opera|OPR)\/(\d+)/);
                    version = match ? match[2] : 'Unknown';
                }
                
                return { name: browser, version: version };
            } catch (error) {
                return { name: 'Unknown', version: 'Unknown' };
            }
        }
        
        getOSInfo() {
            try {
                const ua = navigator.userAgent;
                let os = 'Unknown';
                
                if (ua.indexOf('Windows NT 10.0') > -1) os = 'Windows 10';
                else if (ua.indexOf('Windows NT 6.3') > -1) os = 'Windows 8.1';
                else if (ua.indexOf('Windows NT 6.2') > -1) os = 'Windows 8';
                else if (ua.indexOf('Windows NT 6.1') > -1) os = 'Windows 7';
                else if (ua.indexOf('Windows') > -1) os = 'Windows';
                else if (ua.indexOf('Mac OS X') > -1) {
                    const match = ua.match(/Mac OS X (\d+_\d+)/);
                    os = match ? `macOS ${match[1].replace('_', '.')}` : 'macOS';
                } else if (ua.indexOf('Linux') > -1) os = 'Linux';
                else if (ua.indexOf('Android') > -1) {
                    const match = ua.match(/Android (\d+\.\d+)/);
                    os = match ? `Android ${match[1]}` : 'Android';
                } else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
                    const match = ua.match(/OS (\d+_\d+)/);
                    os = match ? `iOS ${match[1].replace('_', '.')}` : 'iOS';
                }
                
                return os;
            } catch (error) {
                return 'Unknown';
            }
        }
        
        detectDevice() {
            try {
                const ua = navigator.userAgent;
                this.deviceInfo = {
                    userAgent: ua,
                    platform: navigator.platform || 'Unknown',
                    language: navigator.language || 'Unknown',
                    languages: navigator.languages || ['Unknown'],
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine,
                    hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
                    maxTouchPoints: navigator.maxTouchPoints || 0,
                    screenWidth: screen.width || 0,
                    screenHeight: screen.height || 0,
                    screenColorDepth: screen.colorDepth || 0,
                    screenPixelDepth: screen.pixelDepth || 0,
                    windowWidth: window.innerWidth || 0,
                    windowHeight: window.innerHeight || 0,
                    timezone: this.getTimezone(),
                    timezoneOffset: new Date().getTimezoneOffset(),
                    deviceMemory: navigator.deviceMemory || 'Unknown',
                    connection: this.getConnectionInfo(),
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
                    isTablet: /iPad|Android(?!.*Mobile)/i.test(ua),
                    isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
                    browser: this.getBrowserInfo(),
                    os: this.getOSInfo(),
                    timestamp: new Date().toISOString()
                };
                
                console.log('📱 Device detected:', this.deviceInfo.browser.name, this.deviceInfo.os);
            } catch (error) {
                console.error('Device detection failed:', error);
                this.deviceInfo = { error: 'Device detection failed' };
            }
        }
        
        getTimezone() {
            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch (error) {
                return 'Unknown';
            }
        }
        
        getConnectionInfo() {
            try {
                if (navigator.connection) {
                    return {
                        effectiveType: navigator.connection.effectiveType || 'Unknown',
                        downlink: navigator.connection.downlink || 'Unknown',
                        rtt: navigator.connection.rtt || 'Unknown',
                        saveData: navigator.connection.saveData || false
                    };
                }
                return 'Unknown';
            } catch (error) {
                return 'Unknown';
            }
        }
        
        async detectLocation() {
            try {
                console.log('🌍 Detecting location...');
                
                // IP-based location detection
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();
                
                this.locationInfo = {
                    ip: ipData.ip || 'Unknown',
                    city: ipData.city || 'Unknown',
                    region: ipData.region || 'Unknown',
                    country: ipData.country_name || 'Unknown',
                    countryCode: ipData.country_code || 'Unknown',
                    latitude: ipData.latitude || 0,
                    longitude: ipData.longitude || 0,
                    timezone: ipData.timezone || 'Unknown',
                    isp: ipData.org || 'Unknown',
                    asn: ipData.asn || 'Unknown',
                    currency: ipData.currency || 'Unknown',
                    languages: ipData.languages || 'Unknown',
                    timestamp: new Date().toISOString()
                };
                
                console.log('📍 Location detected:', this.locationInfo.city, this.locationInfo.country);
                
                // Try to get more precise location if user allows
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            this.locationInfo.preciseLatitude = position.coords.latitude;
                            this.locationInfo.preciseLongitude = position.coords.longitude;
                            this.locationInfo.accuracy = position.coords.accuracy;
                            console.log('📍 Precise location obtained');
                        },
                        (error) => {
                            this.locationInfo.geolocationError = error.message;
                            console.log('📍 Precise location denied');
                        },
                        { timeout: 5000 }
                    );
                }
                
            } catch (error) {
                console.error('Location detection failed:', error);
                this.locationInfo = { error: 'Location detection failed' };
            }
        }
        
        loadVisitorHistory() {
            try {
                const history = this.getStorageItem('zpp_visitor_history');
                if (history) {
                    this.visitPattern = JSON.parse(history);
                    this.isReturningVisitor = true;
                    this.visitPattern.totalVisits = (this.visitPattern.totalVisits || 0) + 1;
                    this.visitPattern.lastVisit = this.visitPattern.currentVisit || Date.now();
                    this.visitPattern.currentVisit = Date.now();
                    console.log('👤 Returning visitor - Visit #' + this.visitPattern.totalVisits);
                } else {
                    this.visitPattern = {
                        totalVisits: 1,
                        firstVisit: Date.now(),
                        currentVisit: Date.now(),
                        pages: [],
                        interactions: [],
                        timeSpentTotal: 0,
                        averageSessionTime: 0,
                        bounceRate: 0,
                        preferredLanguage: navigator.language,
                        mostActiveHours: [],
                        behaviorPatterns: {}
                    };
                    console.log('👤 New visitor detected');
                }
            } catch (error) {
                console.error('Visitor history loading failed:', error);
                this.visitPattern = { totalVisits: 1, firstVisit: Date.now() };
            }
        }
        
        trackPageView() {
            try {
                const pageData = {
                    url: window.location.href,
                    title: document.title,
                    referrer: document.referrer,
                    timestamp: Date.now(),
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight,
                    scrollTop: window.pageYOffset,
                    documentHeight: document.documentElement.scrollHeight
                };
                
                this.pageViews.push(pageData);
                if (this.visitPattern.pages) {
                    this.visitPattern.pages.push(pageData);
                }
                this.saveVisitorHistory();
                console.log('📄 Page view tracked:', pageData.title);
            } catch (error) {
                console.error('Page view tracking failed:', error);
            }
        }
        
        setupEventListeners() {
            try {
                // Mouse movement tracking (throttled)
                let mouseTimer;
                document.addEventListener('mousemove', (e) => {
                    clearTimeout(mouseTimer);
                    mouseTimer = setTimeout(() => {
                        this.mouseMovements.push({
                            x: e.clientX,
                            y: e.clientY,
                            timestamp: Date.now()
                        });
                        
                        // Keep only last 50 movements for performance
                        if (this.mouseMovements.length > 50) {
                            this.mouseMovements = this.mouseMovements.slice(-50);
                        }
                    }, 200);
                });
                
                // Scroll depth tracking
                window.addEventListener('scroll', () => {
                    try {
                        const scrollPercent = Math.round(
                            (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                        );
                        this.scrollDepth = Math.max(this.scrollDepth, scrollPercent || 0);
                    } catch (error) {
                        // Silent fail
                    }
                });
                
                // Click tracking
                document.addEventListener('click', (e) => {
                    try {
                        this.interactions.push({
                            type: 'click',
                            element: e.target.tagName,
                            className: e.target.className,
                            id: e.target.id,
                            text: e.target.textContent?.substring(0, 50) || '',
                            x: e.clientX,
                            y: e.clientY,
                            timestamp: Date.now()
                        });
                    } catch (error) {
                        // Silent fail
                    }
                });
                
                // Window focus/blur tracking
                window.addEventListener('focus', () => {
                    this.interactions.push({
                        type: 'focus',
                        timestamp: Date.now()
                    });
                });
                
                window.addEventListener('blur', () => {
                    this.interactions.push({
                        type: 'blur',
                        timestamp: Date.now()
                    });
                });
                
                // Page visibility tracking
                document.addEventListener('visibilitychange', () => {
                    this.interactions.push({
                        type: 'visibility',
                        hidden: document.hidden,
                        timestamp: Date.now()
                    });
                });
                
                // Before unload tracking
                window.addEventListener('beforeunload', () => {
                    this.endSession();
                });
                
                console.log('👂 Event listeners setup complete');
            } catch (error) {
                console.error('Event listeners setup failed:', error);
            }
        }
        
        startHeartbeat() {
            try {
                setInterval(() => {
                    this.timeSpent = Date.now() - this.startTime;
                    this.calculateBehaviorScore();
                    this.saveVisitorHistory();
                }, 15000); // Every 15 seconds
                
                console.log('💓 Heartbeat started');
            } catch (error) {
                console.error('Heartbeat setup failed:', error);
            }
        }
        
        calculateBehaviorScore() {
            try {
                let score = 0;
                
                // Time spent score (max 30 points)
                score += Math.min(this.timeSpent / 1000 / 60, 30); // 1 point per minute, max 30
                
                // Scroll depth score (max 20 points)
                score += (this.scrollDepth / 100) * 20;
                
                // Interaction score (max 25 points)
                score += Math.min(this.interactions.length, 25);
                
                // Return visitor bonus (max 15 points)
                if (this.isReturningVisitor) {
                    score += Math.min(this.visitPattern.totalVisits || 1, 15);
                }
                
                // Page views score (max 10 points)
                score += Math.min(this.pageViews.length * 2, 10);
                
                this.behaviorScore = Math.round(score);
            } catch (error) {
                console.error('Behavior score calculation failed:', error);
                this.behaviorScore = 0;
            }
        }
        
        shouldShowPopup() {
            try {
                if (this.popupShown) return false;
                
                const now = Date.now();
                const timeOnPage = now - this.startTime;
                const lastPopup = this.getStorageItem('zpp_last_popup');
                const popupCount = parseInt(this.getStorageItem('zpp_popup_count') || '0');
                
                // Rules for showing popup
                const rules = [
                    // First time visitor after 30 seconds
                    !this.isReturningVisitor && timeOnPage > 30000,
                    
                    // Returning visitor with high engagement
                    this.isReturningVisitor && this.behaviorScore > 40 && timeOnPage > 15000,
                    
                    // User spent significant time scrolling
                    this.scrollDepth > 30 && timeOnPage > 20000,
                    
                    // High interaction user
                    this.interactions.length > 5 && timeOnPage > 25000,
                    
                    // User from India
                    this.locationInfo.countryCode === 'IN' && timeOnPage > 20000,
                    
                    // Mobile user (different timing)
                    this.deviceInfo.isMobile && timeOnPage > 15000 && this.scrollDepth > 20
                ];
                
                // Don't show if shown recently
                if (lastPopup && (now - parseInt(lastPopup)) < 300000) { // 5 minutes
                    return false;
                }
                
                // Don't show too many times
                if (popupCount > 2) {
                    return false;
                }
                
                return rules.some(rule => rule);
            } catch (error) {
                console.error('Popup decision failed:', error);
                return false;
            }
        }
        
        getPersonalizedMessage() {
            try {
                const messages = {
                    newVisitor: 'नमस्कार! पुणे जिल्हा परिषदेच्या सेवांबद्दल माहिती हवी आहे का? / Hello! Need information about Pune Zilla Panchayat services?',
                    returningVisitor: 'पुन्हा स्वागत! आम्ही तुमच्या मदतीसाठी येथे आहोत. / Welcome back! We\'re here to help you again.',
                    highEngagement: 'मला वाटते तुम्हाला आमच्या सेवांमध्ये रस आहे. चला गप्पा मारूया! / I see you\'re interested in our services. Let\'s chat!',
                    mobileUser: 'मोबाइलवरून भेट दिल्याबद्दल धन्यवाद! काही प्रश्न आहेत का? / Thanks for visiting on mobile! Any questions?',
                    localUser: 'पुणे येथून भेट दिल्याबद्दल धन्यवाद! स्थानिक सेवांबद्दल विचारा. / Thanks for visiting from Pune! Ask about local services.',
                    default: config.message
                };
                
                if (!this.isReturningVisitor) return messages.newVisitor;
                if (this.behaviorScore > 60) return messages.highEngagement;
                if (this.deviceInfo.isMobile) return messages.mobileUser;
                if (this.locationInfo.city?.toLowerCase().includes('pune')) return messages.localUser;
                if (this.isReturningVisitor) return messages.returningVisitor;
                
                return messages.default;
            } catch (error) {
                console.error('Message personalization failed:', error);
                return config.message;
            }
        }
        
        triggerIntelligentPopup() {
            try {
                if (this.shouldShowPopup()) {
                    const message = this.getPersonalizedMessage();
                    
                    // Update popup tracking
                    const popupCount = parseInt(this.getStorageItem('zpp_popup_count') || '0') + 1;
                    this.setStorageItem('zpp_popup_count', popupCount.toString());
                    this.setStorageItem('zpp_last_popup', Date.now().toString());
                    this.popupShown = true;
                    
                    // Show popup with personalized message
                    this.showPersonalizedPopup(message);
                    
                    // Track popup event
                    this.trackEvent('intelligent_popup_shown', {
                        message: message,
                        behaviorScore: this.behaviorScore,
                        timeOnPage: Date.now() - this.startTime,
                        visitNumber: this.visitPattern.totalVisits
                    });
                    
                    console.log('🎯 Intelligent popup triggered:', message.substring(0, 50) + '...');
                }
            } catch (error) {
                console.error('Intelligent popup trigger failed:', error);
            }
        }
        
        showPersonalizedPopup(message) {
            try {
                // Show the main widget first
                if (typeof window.toggleZPPModal === 'function') {
                    window.toggleZPPModal();
                }
                
                // Add a personalized message notification
                const notification = document.createElement('div');
                notification.id = 'zpp-notification';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                    z-index: 1000001;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    max-width: 320px;
                    animation: slideInRight 0.4s ease-out;
                    border: 2px solid rgba(255,255,255,0.2);
                `;
                
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="font-size: 20px;">🤖</div>
                        <div style="font-weight: 600;">AI Assistant</div>
                        <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: none; border: none; color: white; cursor: pointer; font-size: 18px; padding: 4px; border-radius: 4px; opacity: 0.8;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">×</button>
                    </div>
                    <div style="font-size: 13px; opacity: 0.95; line-height: 1.4;">${message}</div>
                `;
                
                // Add animation styles
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
                
                document.body.appendChild(notification);
                
                // Remove notification after 12 seconds
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.style.animation = 'slideInRight 0.4s ease-out reverse';
                        setTimeout(() => notification.remove(), 400);
                    }
                }, 12000);
                
            } catch (error) {
                console.error('Personalized popup display failed:', error);
            }
        }
        
        trackEvent(eventName, data) {
            try {
                const eventData = {
                    event: eventName,
                    timestamp: Date.now(),
                    sessionId: this.sessionId,
                    visitorId: this.visitorId,
                    data: data || {},
                    page: window.location.href,
                    device: this.deviceInfo,
                    location: this.locationInfo,
                    behaviorScore: this.behaviorScore,
                    timeSpent: this.timeSpent,
                    scrollDepth: this.scrollDepth,
                    interactions: this.interactions.length,
                    isReturningVisitor: this.isReturningVisitor
                };
                
                // Send to analytics endpoint
                this.sendAnalytics(eventData);
                
                // Log to console for debugging
                console.log('📊 ZPP Analytics Event:', eventName, data);
                
            } catch (error) {
                console.error('Event tracking failed:', error);
            }
        }
        
        async sendAnalytics(data) {
            try {
                // Replace with your actual analytics endpoint
                const response = await fetch('https://your-analytics-endpoint.com/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    throw new Error('Analytics request failed');
                }
            } catch (error) {
                // Store failed requests for retry
                const failedRequests = JSON.parse(this.getStorageItem('zpp_failed_analytics') || '[]');
                failedRequests.push(data);
                this.setStorageItem('zpp_failed_analytics', JSON.stringify(failedRequests.slice(-10))); // Keep last 10
            }
        }
        
        endSession() {
            try {
                this.timeSpent = Date.now() - this.startTime;
                if (this.visitPattern.timeSpentTotal !== undefined) {
                    this.visitPattern.timeSpentTotal += this.timeSpent;
                    this.visitPattern.averageSessionTime = this.visitPattern.timeSpentTotal / this.visitPattern.totalVisits;
                }
                
                this.trackEvent('session_end', {
                    timeSpent: this.timeSpent,
                    pageViews: this.pageViews.length,
                    interactions: this.interactions.length,
                    scrollDepth: this.scrollDepth,
                    behaviorScore: this.behaviorScore
                });
                
                this.saveVisitorHistory();
                console.log('📊 Session ended - Duration:', Math.round(this.timeSpent / 1000), 'seconds');
            } catch (error) {
                console.error('Session end tracking failed:', error);
            }
        }
        
        saveVisitorHistory() {
            try {
                this.setStorageItem('zpp_visitor_history', JSON.stringify(this.visitPattern));
            } catch (error) {
                console.error('Visitor history save failed:', error);
            }
        }
        
        getStorageItem(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                return null;
            }
        }
        
        setStorageItem(key, value) {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
    
    // Initialize Analytics
    let analytics;
    try {
        analytics = new AdvancedAnalytics();
    } catch (error) {
        console.error('Analytics initialization failed:', error);
        analytics = { 
            trackEvent: () => {},
            getPersonalizedMessage: () => config.message,
            behaviorScore: 0,
            isReturningVisitor: false,
            visitPattern: { totalVisits: 1 }
        };
    }
    
    // Start intelligent popup monitoring
    setTimeout(() => {
        const popupInterval = setInterval(() => {
            try {
                if (analytics.triggerIntelligentPopup) {
                    analytics.triggerIntelligentPopup();
                }
            } catch (error) {
                console.error('Popup trigger failed:', error);
            }
        }, 8000); // Check every 8 seconds
        
        // Clear interval after 10 minutes
        setTimeout(() => clearInterval(popupInterval), 600000);
    }, 15000); // Start after 15 seconds
    
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
                if (day >= 1 && day <= 5) return currentTime >= 1000 && currentTime <= 1800;
                if (day === 6) return currentTime >= 1000 && currentTime <= 1400;
                
                return false;
            } catch (error) {
                return true;
            }
        }
    };
    
    // Create widget HTML
    const createWidget = () => {
        try {
            const isOfficeOpen = utils.isOfficeHours();
            const statusText = isOfficeOpen ? 'Online' : 'Offline';
            const statusColor = isOfficeOpen ? '#4CAF50' : '#FF9800';
            
            const widgetHTML = `
                <div class="zpp-widget" style="position:fixed;${config.position.includes('bottom')?'bottom':'top'}:20px;${config.position.includes('right')?'right':'left'}:20px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                    <div class="zpp-button" onclick="toggleZPPModal()" style="width:64px;height:64px;background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 25px rgba(37,211,102,0.4);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;border:none;outline:none" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/></svg>
                        ${config.showNotification ? `<div style="position:absolute;top:-6px;right:-6px;background:#FF3333;color:white;border-radius:50%;width:22px;height:22px;font-size:11px;font-weight:bold;display:flex;align-items:center;justify-content:center;animation:zppPulse 2s infinite;border:2px solid white">AI</div>` : ''}
                    </div>
                    
                    <div class="zpp-modal" id="zppModal" style="position:absolute;${config.position.includes('bottom')?'bottom':'top'}:80px;${config.position.includes('right')?'right':'left'}:0;width:380px;max-width:calc(100vw - 30px);background:white;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.25);transform:translateY(20px) scale(0.9);opacity:0;visibility:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);overflow:hidden;border:1px solid rgba(0,0,0,0.05)">
                        
                        <!-- Header -->
                        <div style="background:linear-gradient(135deg,${config.primaryColor},${config.secondaryColor});color:white;padding:24px;position:relative;overflow:hidden">
                            <div style="position:absolute;top:16px;right:16px;background:${statusColor};color:white;padding:4px 10px;border-radius:12px;font-size:10px;font-weight:600;text-transform:uppercase">${statusText}</div>
                            <div style="font-size:20px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:10px">
                                🤖 पुणे जिप AI सहाय्यक
                            </div>
                            <div style="font-size:14px;opacity:0.95;line-height:1.4">
                                पुणे जिल्हा परिषद | Pune Zilla Panchayat<br>
                                <small>सेवा • पारदर्शकता • जबाबदारी</small>
                            </div>
                            <button onclick="toggleZPPModal()" style="position:absolute;top:50%;right:50px;transform:translateY(-50%);background:rgba(255,255,255,0.2);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                        </div>
                        
                        <!-- Body -->
                        <div style="padding:24px">
                            <!-- Chat Options -->
                            <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px">
                                <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(analytics.getPersonalizedMessage())}" target="_blank" rel="noopener noreferrer" onclick="if(window.ZPPWidget && window.ZPPWidget.analytics) window.ZPPWidget.analytics.trackEvent('chat_mobile_clicked', {})" style="display:flex;align-items:center;gap:16px;padding:18px;background:#f8f9fa;border:2px solid #e9ecef;border-radius:16px;text-decoration:none;color:#2c3e50;transition:all 0.3s ease;position:relative;overflow:hidden" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#f0f9f4';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#e9ecef';this.style.background='#f8f9fa';this.style.transform='translateY(0)'">
                                    <div style="font-size:28px;color:${config.primaryColor};width:44px;text-align:center">📱</div>
                                    <div>
                                        <div style="font-size:16px;font-weight:600;margin-bottom:3px;color:#2c3e50">मोबाइल चॅट | Mobile Chat</div>
                                        <div style="font-size:13px;color:#6c757d">तुमच्या स्मार्टफोनवर AI चॅटबॉटशी संवाद साधा</div>
                                    </div>
                                </a>
                                
                                <a href="https://web.whatsapp.com/send?phone=${config.phoneNumber}&text=${encodeURIComponent(analytics.getPersonalizedMessage())}" target="_blank" rel="noopener noreferrer" onclick="if(window.ZPPWidget && window.ZPPWidget.analytics) window.ZPPWidget.analytics.trackEvent('chat_web_clicked', {})" style="display:flex;align-items:center;gap:16px;padding:18px;background:#f8f9fa;border:2px solid #e9ecef;border-radius:16px;text-decoration:none;color:#2c3e50;transition:all 0.3s ease;position:relative;overflow:hidden" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#f0f9f4';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#e9ecef';this.style.background='#f8f9fa';this.style.transform='translateY(0)'">
                                    <div style="font-size:28px;color:${config.primaryColor};width:44px;text-align:center">💻</div>
                                    <div>
                                        <div style="font-size:16px;font-weight:600;margin-bottom:3px;color:#2c3e50">वेब चॅट | Web Chat</div>
                                        <div style="font-size:13px;color:#6c757d">संगणकावर WhatsApp Web द्वारे चॅट करा</div>
                                    </div>
                                </a>
                            </div>
                            
                            <!-- QR Code Section -->
                            <div style="background:white;border:2px solid #e9ecef;border-radius:20px;padding:24px;text-align:center">
                                <div style="font-size:16px;font-weight:600;color:#2c3e50;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:8px">
                                    📱 QR कोड स्कॅन करा | Scan QR Code
                                </div>
                                <div style="display:inline-block;padding:16px;background:#f8f9fa;border-radius:16px;border:3px dashed #dee2e6;transition:all 0.3s ease" onmouseover="this.style.borderColor='${config.primaryColor}';this.style.background='#f0f9f4';this.style.transform='scale(1.02)'" onmouseout="this.style.borderColor='#dee2e6';this.style.background='#f8f9fa';this.style.transform='scale(1)'">
                                    <img src="${config.qrApiUrl}${encodeURIComponent('https://wa.me/' + config.phoneNumber + '?text=' + analytics.getPersonalizedMessage())}" alt="Pune ZP WhatsApp QR Code" style="width:150px;height:150px;border-radius:12px;display:block" loading="lazy" onerror="this.style.display='none'">
                                </div>
                                <div style="font-size:12px;color:#6c757d;margin-top:16px;line-height:1.4;max-width:280px;margin-left:auto;margin-right:auto">
                                    <strong>स्कॅन करण्याचे टप्पे:</strong><br>
                                    WhatsApp उघडा → मेनू → QR स्कॅन करा<br>
                                    <em>Open WhatsApp → Menu → Scan QR Code</em>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer with Analytics Info -->
                        <div style="padding:16px 24px;background:#f8f9fa;border-top:1px solid #e9ecef;text-align:center;font-size:11px;color:#6c757d">
                            <div style="margin-bottom:8px">
                                Visitor: ${analytics.isReturningVisitor ? 'Returning' : 'New'} | 
                                Score: ${analytics.behaviorScore} | 
                                Visit #${analytics.visitPattern.totalVisits}
                            </div>
                            <a href="${config.poweredBy.url}" target="_blank" rel="noopener noreferrer" style="color:#6c757d;text-decoration:none;transition:color 0.3s ease;display:inline-flex;align-items:center;gap:6px" onmouseover="this.style.color='${config.primaryColor}'" onmouseout="this.style.color='#6c757d'">
                                ⚡ ${config.poweredBy.text}
                            </a>
                        </div>
                        
                    </div>
                </div>
                
                <style>
                    @keyframes zppPulse { 
                        0%, 100% { transform: scale(1); opacity: 1; } 
                        50% { transform: scale(1.2); opacity: 0.8; } 
                    }
                    @media (max-width: 480px) { 
                        .zpp-modal { 
                            width: calc(100vw - 20px) !important; 
                            ${config.position.includes('right') ? 'right' : 'left'}: -10px !important;
                        }
                        .zpp-button {
                            width: 56px !important;
                            height: 56px !important;
                        }
                        .zpp-button svg {
                            width: 26px !important;
                            height: 26px !important;
                        }
                    }
                    @media print { 
                        .zpp-widget { 
                            display: none !important; 
                        } 
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .zpp-button, .zpp-modal, * {
                            transition: none !important;
                            animation: none !important;
                        }
                    }
                </style>
            `;
            
            return widgetHTML;
        } catch (error) {
            console.error('Widget HTML creation failed:', error);
            return '<div>Widget loading failed</div>';
        }
    };
    
    // Initialize widget
    const initWidget = () => {
        try {
            let container = document.getElementById('zpp-whatsapp-widget');
            if (!container) {
                container = document.createElement('div');
                container.id = 'zpp-whatsapp-widget';
                document.body.appendChild(container);
            }
            
            container.innerHTML = createWidget();
            
            console.log('🚀 ZPP WhatsApp Widget v4.1.0 loaded successfully!');
            console.log('📊 Advanced Analytics & AI-Powered Popups enabled');
            console.log('📱 Powered by WoW-Strategies Private Limited');
            
        } catch (error) {
            console.error('❌ ZPP Widget initialization failed:', error);
        }
    };
    
    // Toggle modal function
    window.toggleZPPModal = function() {
        try {
            const modal = document.getElementById('zppModal');
            if (!modal) return;
            
            const isActive = modal.style.opacity === '1';
            
            if (isActive) {
                modal.style.opacity = '0';
                modal.style.visibility = 'hidden';
                modal.style.transform = 'translateY(20px) scale(0.9)';
                if (analytics.trackEvent) analytics.trackEvent('modal_closed', {});
            } else {
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modal.style.transform = 'translateY(0) scale(1)';
                if (analytics.trackEvent) analytics.trackEvent('modal_opened', {});
                
                const badge = document.querySelector('.zpp-button div[style*="animation"]');
                if (badge) {
                    badge.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Modal toggle failed:', error);
        }
    };
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        try {
            const modal = document.getElementById('zppModal');
            const button = document.querySelector('.zpp-button');
            
            if (modal && button && 
                !modal.contains(e.target) && 
                !button.contains(e.target) && 
                modal.style.opacity === '1') {
                toggleZPPModal();
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        try {
            if (e.key === 'Escape') {
                const modal = document.getElementById('zppModal');
                if (modal && modal.style.opacity === '1') {
                    toggleZPPModal();
                }
            }
        } catch (error) {
            // Silent fail
        }
    });
    
    // Public API
    window.ZPPWidget = {
        version: '4.1.0',
        config: config,
        analytics: analytics,
        show: () => {
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity !== '1') {
                toggleZPPModal();
            }
        },
        hide: () => {
            const modal = document.getElementById('zppModal');
            if (modal && modal.style.opacity === '1') {
                toggleZPPModal();
            }
        },
        toggle: () => toggleZPPModal(),
        getAnalytics: () => analytics,
        getVisitorData: () => {
            try {
                return {
                    visitorId: analytics.visitorId,
                    sessionId: analytics.sessionId,
                    isReturningVisitor: analytics.isReturningVisitor,
                    behaviorScore: analytics.behaviorScore,
                    visitPattern: analytics.visitPattern,
                    deviceInfo: analytics.deviceInfo,
                    locationInfo: analytics.locationInfo,
                    timeSpent: analytics.timeSpent,
                    scrollDepth: analytics.scrollDepth,
                    interactions: analytics.interactions ? analytics.interactions.length : 0,
                    pageViews: analytics.pageViews ? analytics.pageViews.length : 0
                };
            } catch (error) {
                console.error('Get visitor data failed:', error);
                return { error: 'Data retrieval failed' };
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
})();
