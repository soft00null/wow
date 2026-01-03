/**
 * Thane Municipal Corporation (TMC) 311 Chat Widget
 * File: tmc-311-chat-widget.js
 * Version: 3.0.0
 * Date: 2026-01-03
 * Brand: WhatsUp.city
 *
 * Powered by WoW-Strategies Private Limited
 */

(function () {
  "use strict";

  if (window.TMC311Widget) {
    console.warn("TMC 311 Widget already initialized");
    return;
  }

  const config = {
    phoneNumber: "15558830019",
    defaultMessage: "Hi",
    logoUrl: "https://wow-strategies.com/tmc.png",

    // WhatsApp link (single source of truth)
    get waLink() {
      return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
    },

    // QR (stunning card + glow around the image; the image itself is generated)
    // Note: using a hosted QR generator for convenience
    get qrCodeUrl() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(this.waLink)}&margin=12`;
    },

    poweredBy: {
      text: "Powered by WoW-Strategies Private Limited",
      url: "https://wow-strategies.com/",
    },

    colors: {
      // Modern civic + WhatsApp aligned palette
      brand1: "#00C853", // green
      brand2: "#00BFA5", // teal
      ink: "#0B1B14",
      sub: "#4B5B54",
      paper: "#FFFFFF",
      soft: "#F4F7F6",
      line: "rgba(15, 23, 42, 0.08)",
      glow: "rgba(0, 200, 83, 0.30)",
      danger: "#FF3B30",
    },
  };

  // ✅ Only 311-style municipal grievances (no payments, no water/property tax)
  // Focused, universal categories commonly found in urban grievance systems.
  const menuOptions = [
    {
      id: "roads",
      label: "Roads & Potholes",
      icon: "🕳️",
      message:
        "I want to report a road issue (pothole/damaged road). Please guide me to submit location and photos.",
    },
    {
      id: "garbage",
      label: "Garbage & Waste",
      icon: "🗑️",
      message:
        "I want to report garbage not collected / overflowing bin. Please record my complaint with location and photo.",
    },
    {
      id: "streetlight",
      label: "Streetlights",
      icon: "💡",
      message:
        "I want to report a streetlight issue (not working/flickering). Please take location details.",
    },
    {
      id: "drainage",
      label: "Drainage / Sewer",
      icon: "🕳️",
      message:
        "I want to report drainage/sewer issue (overflow/blockage). Please guide me to share location and photo/video.",
    },
    {
      id: "encroachment",
      label: "Encroachment",
      icon: "🚧",
      message:
        "I want to report an encroachment / illegal obstruction. Please record complaint with location and photo.",
    },
    {
      id: "stray",
      label: "Stray Animals",
      icon: "🐕",
      message:
        "I want to report an issue related to stray animals. Please guide me to share location and details.",
    },
    {
      id: "tree",
      label: "Tree / Branch Hazard",
      icon: "🌳",
      message:
        "I want to report a fallen tree / dangerous branch. Please take my location and photo.",
    },
    {
      id: "other",
      label: "Other Civic Issue",
      icon: "📝",
      message:
        "I want to report another civic issue. Please ask details and take my location.",
    },
  ];

  const createWidget = () => {
    return `
      <div class="tmc311-widget" id="tmc311Widget" role="region" aria-label="TMC 311 WhatsApp Chat Widget">
        <!-- Floating Action Button -->
        <button class="tmc311-fab" id="tmc311Fab" aria-label="Open TMC 311 WhatsApp widget">
          <span class="tmc311-fab-ring" aria-hidden="true"></span>
          <span class="tmc311-fab-inner" aria-hidden="true">
            <!-- WhatsApp Icon -->
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path fill="white" d="M12.04 0C5.42 0 .07 5.35.07 11.97c0 2.12.56 4.2 1.63 6.03L0 24l6.14-1.62a11.94 11.94 0 0 0 5.9 1.5h.01c6.62 0 11.97-5.35 11.97-11.97C24 5.35 18.66 0 12.04 0Zm0 21.87h-.01a9.98 9.98 0 0 1-5.08-1.39l-.36-.21-3.64.96.97-3.55-.23-.36a9.94 9.94 0 0 1-1.53-5.34C2.16 6.44 6.52 2.09 12.04 2.09c2.67 0 5.18 1.04 7.06 2.92a9.93 9.93 0 0 1 2.91 7.06c0 5.52-4.35 9.8-9.97 9.8Zm5.79-7.31c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.51-.16-.72.16-.21.32-.83 1.03-1.02 1.24-.19.21-.38.24-.7.08-.32-.16-1.34-.49-2.56-1.57-.95-.83-1.58-1.85-1.77-2.17-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.63-.53-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67s1.15 3.07 1.31 3.28c.16.21 2.26 3.45 5.48 4.84.77.33 1.36.52 1.83.67.77.25 1.47.22 2.02.13.62-.09 1.9-.78 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"/>
            </svg>
          </span>
          <span class="tmc311-fab-badge" aria-hidden="true">311</span>
        </button>

        <!-- Panel -->
        <section class="tmc311-panel" id="tmc311Panel" aria-hidden="true">
          <header class="tmc311-header">
            <div class="tmc311-brand">
              <div class="tmc311-logo">
                <img src="${config.logoUrl}" alt="TMC Logo" />
              </div>
              <div class="tmc311-title">
                <div class="tmc311-title-top">Thane Municipal Corporation</div>
                <div class="tmc311-title-sub">311 Grievance Assistant • WhatsApp</div>
              </div>
            </div>

            <button class="tmc311-close" id="tmc311Close" aria-label="Close widget">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
              </svg>
            </button>
          </header>

          <div class="tmc311-body">
            <!-- Stunning QR Card -->
            <div class="tmc311-qrCard" role="group" aria-label="Scan QR to open WhatsApp chat">
              <div class="tmc311-qrGlow" aria-hidden="true"></div>

              <div class="tmc311-qrTop">
                <div class="tmc311-qrTitle">Scan & Chat on WhatsApp</div>
                <div class="tmc311-qrHint">Fastest way to lodge a 311 complaint (photo, voice, location)</div>
              </div>

              <a class="tmc311-qrLink" href="${config.waLink}" target="_blank" rel="noopener" aria-label="Open WhatsApp chat in a new tab">
                <div class="tmc311-qrFrame">
                  <img class="tmc311-qrImg" src="${config.qrCodeUrl}" alt="WhatsApp QR Code for TMC 311" loading="lazy" />
                  <div class="tmc311-qrOverlay" aria-hidden="true">
                    <div class="tmc311-qrDot"></div>
                    <div class="tmc311-qrDot"></div>
                    <div class="tmc311-qrDot"></div>
                  </div>
                </div>
              </a>

              <div class="tmc311-qrActions">
                <button class="tmc311-btn tmc311-btnPrimary" id="tmc311StartBtn" type="button">
                  Start on WhatsApp
                </button>
                <button class="tmc311-btn tmc311-btnGhost" id="tmc311CopyBtn" type="button" aria-label="Copy WhatsApp chat link">
                  Copy Link
                </button>
              </div>

              <div class="tmc311-qrFooter">
                Tip: Share a photo/video + location for quickest resolution.
              </div>
            </div>

            <!-- Services -->
            <div class="tmc311-services">
              <div class="tmc311-servicesHead">
                <div class="tmc311-servicesTitle">311 Services</div>
                <div class="tmc311-servicesSub">Choose a category to open WhatsApp with the right prompt</div>
              </div>

              <div class="tmc311-grid">
                ${menuOptions
                  .map(
                    (o) => `
                    <button class="tmc311-tile" data-message="${o.message}" type="button" aria-label="${o.label}">
                      <div class="tmc311-tileIcon">${o.icon}</div>
                      <div class="tmc311-tileText">
                        <div class="tmc311-tileLabel">${o.label}</div>
                        <div class="tmc311-tileMeta">Tap to report</div>
                      </div>
                      <div class="tmc311-tileArrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </button>
                  `
                  )
                  .join("")}
              </div>

              <div class="tmc311-note">
                <strong>What to send:</strong> location (GPS / landmark), photo/video, and a short description.
              </div>
            </div>
          </div>

          <footer class="tmc311-footer">
            <a class="tmc311-powered" href="${config.poweredBy.url}" target="_blank" rel="noopener">
              ${config.poweredBy.text}
            </a>
          </footer>
        </section>

        <!-- Nudge -->
        <aside class="tmc311-nudge" id="tmc311Nudge" aria-hidden="true">
          <button class="tmc311-nudgeClose" id="tmc311NudgeClose" aria-label="Close notification">×</button>
          <div class="tmc311-nudgeRow">
            <div class="tmc311-nudgeAvatar">
              <img src="${config.logoUrl}" alt="TMC" />
            </div>
            <div class="tmc311-nudgeText">
              <div class="tmc311-nudgeTitle">TMC 311 on WhatsApp</div>
              <div class="tmc311-nudgeSub">Report potholes, garbage, lights & more — in seconds.</div>
            </div>
          </div>
        </aside>
      </div>

      <style>
        .tmc311-widget, .tmc311-widget * { box-sizing: border-box; }
        .tmc311-widget {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 999999;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
          color: ${config.colors.ink};
        }

        /* FAB */
        .tmc311-fab {
          width: 62px;
          height: 62px;
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          position: relative;
          background: transparent;
          padding: 0;
          outline: none;
        }
        .tmc311-fab-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0)) ,
                      linear-gradient(135deg, ${config.colors.brand1}, ${config.colors.brand2});
          box-shadow: 0 18px 45px rgba(2, 132, 93, 0.28);
          transform: translateZ(0);
        }
        .tmc311-fab-inner {
          position: absolute;
          inset: 2px;
          border-radius: 999px;
          background: rgba(0,0,0,0.10);
          display: grid;
          place-items: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tmc311-fab:hover .tmc311-fab-inner { transform: scale(1.03); }

        .tmc311-fab-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: ${config.colors.danger};
          color: white;
          font-weight: 800;
          font-size: 10px;
          padding: 5px 8px;
          border-radius: 999px;
          border: 2px solid white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.18);
        }

        /* Panel */
        .tmc311-panel {
          position: absolute;
          right: 0;
          bottom: 78px;
          width: 392px;
          max-width: calc(100vw - 32px);
          border-radius: 22px;
          overflow: hidden;
          background: ${config.colors.paper};
          box-shadow: 0 30px 80px rgba(2, 6, 23, 0.22);
          border: 1px solid ${config.colors.line};
          opacity: 0;
          visibility: hidden;
          transform: translateY(14px) scale(0.98);
          transform-origin: bottom right;
          transition: all 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tmc311-panel.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        /* Header */
        .tmc311-header {
          padding: 16px 16px;
          color: white;
          background:
            radial-gradient(1200px 400px at 20% 0%, rgba(255,255,255,0.20), rgba(255,255,255,0)) ,
            linear-gradient(135deg, ${config.colors.brand1}, ${config.colors.brand2});
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .tmc311-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .tmc311-logo {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(255,255,255,0.94);
          display: grid;
          place-items: center;
          padding: 6px;
          box-shadow: 0 10px 22px rgba(0,0,0,0.12);
          flex: 0 0 auto;
        }
        .tmc311-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .tmc311-title { min-width: 0; }
        .tmc311-title-top {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tmc311-title-sub {
          font-size: 12px;
          opacity: 0.92;
          margin-top: 2px;
        }

        .tmc311-close {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.12);
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: transform 160ms ease, background 160ms ease;
        }
        .tmc311-close:hover { transform: scale(1.05); background: rgba(255,255,255,0.18); }

        /* Body */
        .tmc311-body {
          padding: 14px;
          background:
            radial-gradient(800px 300px at 15% 0%, rgba(0, 200, 83, 0.12), rgba(255,255,255,0)),
            linear-gradient(180deg, ${config.colors.soft}, ${config.colors.paper});
        }

        /* QR Card */
        .tmc311-qrCard {
          position: relative;
          border-radius: 20px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow: 0 18px 50px rgba(2, 6, 23, 0.10);
          overflow: hidden;
          padding: 16px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .tmc311-qrGlow {
          position: absolute;
          inset: -80px;
          background: radial-gradient(circle at 30% 30%, ${config.colors.glow}, rgba(0,0,0,0));
          filter: blur(12px);
          pointer-events: none;
        }
        .tmc311-qrTop { position: relative; }
        .tmc311-qrTitle {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: -0.01em;
        }
        .tmc311-qrHint {
          margin-top: 4px;
          font-size: 12px;
          color: ${config.colors.sub};
          line-height: 1.35;
        }

        .tmc311-qrLink { display: block; text-decoration: none; margin-top: 14px; position: relative; }
        .tmc311-qrFrame {
          position: relative;
          border-radius: 18px;
          padding: 14px;
          background:
            radial-gradient(1000px 250px at 15% 0%, rgba(255,255,255,0.75), rgba(255,255,255,0.40)),
            linear-gradient(135deg, rgba(0, 200, 83, 0.14), rgba(0, 191, 165, 0.10));
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow:
            0 20px 55px rgba(0,0,0,0.10),
            inset 0 0 0 1px rgba(255,255,255,0.5);
          display: grid;
          place-items: center;
        }
        .tmc311-qrImg {
          width: 220px;
          height: 220px;
          max-width: 100%;
          border-radius: 12px;
          background: white;
          padding: 10px;
          box-shadow: 0 12px 30px rgba(2, 6, 23, 0.12);
        }
        .tmc311-qrOverlay {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          gap: 6px;
          opacity: 0.55;
        }
        .tmc311-qrDot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: rgba(11, 27, 20, 0.55);
        }

        .tmc311-qrActions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 14px;
          position: relative;
        }

        .tmc311-btn {
          border: 0;
          border-radius: 14px;
          padding: 12px 12px;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .tmc311-btn:active { transform: translateY(1px); }

        .tmc311-btnPrimary {
          color: white;
          background: linear-gradient(135deg, ${config.colors.brand1}, ${config.colors.brand2});
          box-shadow: 0 14px 35px rgba(0, 200, 83, 0.22);
        }
        .tmc311-btnPrimary:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 45px rgba(0, 200, 83, 0.28);
        }
        .tmc311-btnGhost {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(15, 23, 42, 0.10);
          color: ${config.colors.ink};
        }
        .tmc311-btnGhost:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px rgba(2, 6, 23, 0.08);
        }

        .tmc311-qrFooter {
          margin-top: 10px;
          font-size: 11px;
          color: ${config.colors.sub};
        }

        /* Services */
        .tmc311-services { margin-top: 14px; }
        .tmc311-servicesHead {
          padding: 10px 4px 10px 4px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
        }
        .tmc311-servicesTitle { font-size: 13px; font-weight: 900; }
        .tmc311-servicesSub { font-size: 11px; color: ${config.colors.sub}; text-align: right; }

        .tmc311-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .tmc311-tile {
          border: 1px solid rgba(15, 23, 42, 0.10);
          background: rgba(255,255,255,0.85);
          border-radius: 18px;
          padding: 12px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 10px;
          align-items: center;
          cursor: pointer;
          text-align: left;
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.06);
        }
        .tmc311-tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 38px rgba(2, 6, 23, 0.10);
          background: rgba(255,255,255,0.95);
        }
        .tmc311-tileIcon {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(0, 200, 83, 0.16), rgba(0, 191, 165, 0.12));
          display: grid;
          place-items: center;
          font-size: 18px;
        }
        .tmc311-tileLabel { font-size: 12px; font-weight: 900; letter-spacing: -0.01em; }
        .tmc311-tileMeta { font-size: 11px; color: ${config.colors.sub}; margin-top: 2px; }
        .tmc311-tileArrow { color: rgba(11, 27, 20, 0.60); }

        .tmc311-note {
          margin-top: 10px;
          font-size: 11px;
          color: ${config.colors.sub};
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px dashed rgba(15, 23, 42, 0.12);
          background: rgba(255,255,255,0.7);
        }

        /* Footer */
        .tmc311-footer {
          padding: 12px 14px 14px;
          background: ${config.colors.paper};
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          text-align: center;
        }
        .tmc311-powered {
          color: rgba(11, 27, 20, 0.70);
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }
        .tmc311-powered:hover { color: ${config.colors.ink}; text-decoration: underline; }

        /* Nudge */
        .tmc311-nudge {
          position: absolute;
          right: 0;
          bottom: 78px;
          width: 320px;
          max-width: calc(100vw - 32px);
          border-radius: 18px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 18px 45px rgba(2, 6, 23, 0.14);
          padding: 12px 12px;
          opacity: 0;
          visibility: hidden;
          transform: translateX(10px);
          transition: all 220ms cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .tmc311-nudge.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
        .tmc311-nudgeClose {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          border: 1px solid rgba(15, 23, 42, 0.10);
          background: rgba(255,255,255,0.9);
          cursor: pointer;
          font-size: 18px;
          line-height: 0;
          color: rgba(11, 27, 20, 0.65);
        }
        .tmc311-nudgeRow {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px;
          align-items: center;
        }
        .tmc311-nudgeAvatar {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: white;
          padding: 6px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.10);
          display: grid;
          place-items: center;
        }
        .tmc311-nudgeAvatar img { width: 100%; height: 100%; object-fit: contain; }
        .tmc311-nudgeTitle { font-size: 12px; font-weight: 900; }
        .tmc311-nudgeSub { font-size: 11px; color: ${config.colors.sub}; margin-top: 2px; line-height: 1.3; }

        /* Mobile */
        @media (max-width: 480px) {
          .tmc311-widget { right: 14px; bottom: 14px; }
          .tmc311-panel { bottom: 76px; }
          .tmc311-qrImg { width: 210px; height: 210px; }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .tmc311-panel, .tmc311-tile, .tmc311-btn, .tmc311-fab-inner, .tmc311-nudge { transition: none !important; }
          .tmc311-fab-ring { box-shadow: 0 18px 45px rgba(2, 132, 93, 0.28) !important; }
        }

        /* Print */
        @media print { .tmc311-widget { display: none !important; } }
      </style>
    `;
  };

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message || config.defaultMessage)}`;
    window.open(url, "_blank", "noopener");
  };

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  };

  const initWidget = () => {
    try {
      let container = document.getElementById("tmc-311-chat-widget-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "tmc-311-chat-widget-container";
        document.body.appendChild(container);
      }

      container.innerHTML = createWidget();

      const fab = document.getElementById("tmc311Fab");
      const panel = document.getElementById("tmc311Panel");
      const close = document.getElementById("tmc311Close");
      const tiles = container.querySelectorAll(".tmc311-tile");
      const nudge = document.getElementById("tmc311Nudge");
      const nudgeClose = document.getElementById("tmc311NudgeClose");
      const startBtn = document.getElementById("tmc311StartBtn");
      const copyBtn = document.getElementById("tmc311CopyBtn");

      const setOpen = (open) => {
        if (open) {
          panel.classList.add("show");
          panel.setAttribute("aria-hidden", "false");
          nudge.classList.remove("show");
          nudge.setAttribute("aria-hidden", "true");
        } else {
          panel.classList.remove("show");
          panel.setAttribute("aria-hidden", "true");
        }
      };

      fab.addEventListener("click", () => setOpen(!panel.classList.contains("show")));
      close.addEventListener("click", () => setOpen(false));

      startBtn.addEventListener("click", () => openWhatsApp(config.defaultMessage));

      copyBtn.addEventListener("click", async () => {
        const ok = await copyToClipboard(config.waLink);
        copyBtn.textContent = ok ? "Copied!" : "Copy failed";
        setTimeout(() => (copyBtn.textContent = "Copy Link"), 1200);
      });

      tiles.forEach((tile) => {
        tile.addEventListener("click", function () {
          const message = this.getAttribute("data-message") || config.defaultMessage;
          openWhatsApp(message);
        });
      });

      // Click outside closes
      document.addEventListener("click", (e) => {
        if (!container.contains(e.target) && panel.classList.contains("show")) setOpen(false);
      });

      // Escape closes
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && panel.classList.contains("show")) setOpen(false);
      });

      // Nudge behavior (delayed)
      const showNudge = () => {
        if (!panel.classList.contains("show")) {
          nudge.classList.add("show");
          nudge.setAttribute("aria-hidden", "false");
          setTimeout(() => {
            nudge.classList.remove("show");
            nudge.setAttribute("aria-hidden", "true");
          }, 10000);
        }
      };
      setTimeout(showNudge, 3500);

      nudgeClose.addEventListener("click", () => {
        nudge.classList.remove("show");
        nudge.setAttribute("aria-hidden", "true");
      });

      console.log("✅ TMC 311 Widget initialized (v3.0.0)");
    } catch (error) {
      console.error("❌ Widget init failed:", error);
    }
  };

  // Public API
  window.TMC311Widget = {
    version: "3.0.0",
    open: () => document.getElementById("tmc311Panel")?.classList.add("show"),
    close: () => document.getElementById("tmc311Panel")?.classList.remove("show"),
    toggle: () => document.getElementById("tmc311Fab")?.click(),
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})();
