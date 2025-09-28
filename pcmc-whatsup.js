(function () {
  // robust self-initializing PCMC widget using Shadow DOM
  const DEFAULTS = {
    phone: "", // optional: "919xxxxxxxxx"
    qr: "https://wow-strategies.com/assets/pcmc-qr.png",
    showHintOnLoad: true,
    hintDurationMs: 6500,
    themeColor: "#6C63FF",
    floatLabel: "AI",
    openOnLoad: false
  };

  function safeMerge(defaults, override) {
    const out = {};
    for (const k in defaults) out[k] = defaults[k];
    if (override && typeof override === "object") {
      for (const k in override) out[k] = override[k];
    }
    return out;
  }

  const config = safeMerge(DEFAULTS, window.PCMC_WHATSUP_CONFIG);

  function init() {
    try {
      // If already initialized, skip
      if (window.__pcmc_whatsup_inited) return;
      window.__pcmc_whatsup_inited = true;

      // Host element
      const host = document.createElement("div");
      host.setAttribute("id", "pcmc-whatsup-host-" + Date.now());
      // Append the host to body
      (document.body || document.documentElement).appendChild(host);

      // Create Shadow Root to isolate styles
      const shadow = host.attachShadow({ mode: "open" });

      // Template markup (inside shadow)
      const tpl = document.createElement("template");
      tpl.innerHTML = `
        <style>
          :host {
            position: fixed;
            bottom: 22px;
            right: 22px;
            z-index: 9999999;
            --pcmc-accent: ${config.themeColor};
            font-family: "Segoe UI", Roboto, Arial, sans-serif;
            -webkit-font-smoothing:antialiased;
            -moz-osx-font-smoothing:grayscale;
            transition: transform .25s ease, opacity .25s ease;
          }

          .widget {
            width: 360px;
            max-width: calc(100vw - 40px);
            background: rgba(255,255,255,0.96);
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(2,6,23,0.18);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            will-change: transform, opacity;
            transform-origin: bottom right;
          }

          .header {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:12px;
            padding:12px 14px;
            background: linear-gradient(90deg,var(--pcmc-accent), rgba(0,0,0,0.04));
            color: #fff;
          }
          .title {
            display:flex;
            align-items:center;
            gap:10px;
            font-weight:600;
            font-size:15px;
          }
          .title .icon {
            width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.18);
            display:flex;align-items:center;justify-content:center;font-weight:700;
            box-shadow: inset 0 -1px 0 rgba(255,255,255,0.06);
          }
          .close-btn {
            background:transparent;border:0;color:rgba(255,255,255,0.95);font-size:18px;cursor:pointer;padding:6px;border-radius:8px;
          }

          .hint {
            padding:14px 14px 8px 14px;
            color:#222;
            font-size:14px;
            line-height:1.25;
          }

          .options {
            display:flex;
            flex-direction:column;
            gap:10px;
            padding:12px 14px 14px 14px;
          }
          .opt-btn {
            display:flex;
            align-items:center;
            gap:10px;
            padding:11px 12px;
            border-radius:10px;
            border:1px solid rgba(30,40,60,0.06);
            background: rgba(250,250,250,0.9);
            font-size:14px;
            cursor:pointer;
            transition: transform .12s ease, box-shadow .12s ease;
            text-align:left;
          }
          .opt-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(35,45,60,0.06); }

          .footer {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:10px;
            padding:10px 14px;
            border-top:1px solid rgba(10,10,10,0.03);
            font-size:12px;color:#666;
            background:transparent;
          }

          .qr-box { display:flex; align-items:center; gap:10px; }
          .qr-thumb { width:96px; height:96px; border-radius:8px; object-fit:cover; border:1px solid rgba(0,0,0,0.06); display:block; }
          .qr-hidden { display:none; }

          /* float button */
          .float-wrap { position: absolute; bottom: -28px; right: 12px; }
          .float-btn {
            width:58px;height:58px;border-radius:50%;background:var(--pcmc-accent);display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;box-shadow:0 10px 22px rgba(92,63,255,0.18);cursor:pointer;border:4px solid rgba(255,255,255,0.85);
            font-size:14px;
          }

          /* small bubble hint (when collapsed) */
          .mini-bubble {
            position: fixed;
            right: 22px;
            bottom: 22px;
            display:none;
            gap:10px;
            align-items:center;
            background: rgba(255,255,255,0.95);
            padding:10px 12px;border-radius:14px;box-shadow:0 8px 28px rgba(2,6,23,0.12);
            z-index:9999998;
            font-size:13px;
          }
          .mini-bubble.show { display:flex; }

          /* responsive */
          @media (max-width:420px) {
            .widget { width: 92vw; }
            .qr-thumb { width:72px; height:72px; }
            .float-btn { width:52px;height:52px;font-size:13px; }
          }
        </style>

        <div class="widget" part="widget" role="dialog" aria-label="PCMC AI Assistant">
          <div class="header">
            <div class="title">
              <div class="icon" aria-hidden>🤖</div>
              <div>
                <div style="font-size:13px;opacity:0.95">PCMC AI Assistant</div>
                <div style="font-size:11px;opacity:0.86">24x7 • Quick help</div>
              </div>
            </div>
            <button class="close-btn" title="Close" aria-label="Close">✕</button>
          </div>

          <div class="hint" id="pcmc-hint">
            👋 Hi — I'm the PCMC AI Assistant. I can help with Information, My Properties, Grievance filing, Schemes, CFC and more. Tap a button to continue.
          </div>

          <div class="options">
            <button class="opt-btn" data-action="information">ℹ️  Information</button>
            <button class="opt-btn" data-action="my_properties">🏠  My Properties</button>
            <button class="opt-btn" data-action="grievance">📝  Grievance</button>
            <button class="opt-btn" data-action="schemes">📑  Schemes</button>
            <button class="opt-btn" data-action="cfc">🏢  CFC</button>
          </div>

          <div class="footer">
            <div>
              <button class="opt-btn" id="pcmc-toggle-qr" style="padding:8px 10px; font-size:13px; border-radius:8px;">📲 Show QR</button>
            </div>
            <div style="text-align:right; min-width:120px;">
              <div style="font-size:11px;color:#444">Powered by WoW-Strategies</div>
            </div>
          </div>

          <div class="qr-box qr-hidden" id="pcmc-qr-area" style="padding:12px; border-top:1px solid rgba(0,0,0,0.02);">
            <img class="qr-thumb" id="pcmc-qr-img" alt="PCMC QR" src="${config.qr}">
            <div style="font-size:12px;color:#333">Scan to start on your phone</div>
          </div>

          <div class="float-wrap">
            <div class="float-btn" id="pcmc-float">${config.floatLabel || 'AI'}</div>
          </div>
        </div>

        <div class="mini-bubble" id="pcmc-mini-bubble" role="status" aria-live="polite" style="display:none;">
          <div style="font-size:15px">🤖 PCMC AI</div>
          <div style="font-size:13px;color:#333">Hi — tap to chat or use menu on the panel.</div>
        </div>
      `;

      shadow.appendChild(tpl.content.cloneNode(true));

      // Element refs
      const root = shadow;
      const widgetEl = root.querySelector(".widget");
      const floatBtn = root.getElementById("pcmc-float");
      const closeBtn = root.querySelector(".close-btn");
      const qrToggle = root.getElementById("pcmc-toggle-qr");
      const qrArea = root.getElementById("pcmc-qr-area");
      const qrImg = root.getElementById("pcmc-qr-img");
      const miniBubble = root.getElementById("pcmc-mini-bubble");

      // Ensure qr image as set
      if (config.qr) qrImg.src = config.qr;

      // Open / close helpers
      function openPanel() {
        widgetEl.style.transform = "translateY(0)";
        widgetEl.style.opacity = "1";
        widgetEl.style.display = "flex";
        // hide mini bubble
        miniBubble.classList.remove("show");
      }
      function closePanel() {
        // keep the widget visible element but hide via transform (safe)
        widgetEl.style.transform = "translateY(6px) scale(.995)";
        widgetEl.style.opacity = "0";
        widgetEl.style.display = "none";
      }

      // default show (the widget is visible when script creates it)
      if (config.openOnLoad) {
        openPanel();
      } else {
        // keep panel shown (widget has its content visible). If you want collapse behavior (only float visible),
        // we will keep visible but you can override by calling window.PCMC_WHATSUP.close()
        openPanel();
      }

      // Close handlers
      closeBtn.addEventListener("click", () => {
        closePanel();
        // show mini bubble after close (small helpful bubble to reopen)
        setTimeout(() => miniBubble.classList.add("show"), 120);
      });

      // Float button toggles
      floatBtn.addEventListener("click", () => {
        openPanel();
      });

      // QR toggle
      let qrOpen = false;
      qrToggle.addEventListener("click", () => {
        qrOpen = !qrOpen;
        qrArea.classList.toggle("qr-hidden", !qrOpen);
        qrToggle.textContent = qrOpen ? "❌ Hide QR" : "📲 Show QR";
      });

      // Options click -> dispatch event and call global callback if present
      root.querySelectorAll(".opt-btn[data-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const action = btn.getAttribute("data-action");
          const detail = { action, label: btn.textContent.trim(), timestamp: Date.now() };

          // 1) If global callback provided
          try {
            if (window.PCMC_WHATSUP && typeof window.PCMC_WHATSUP.onAction === "function") {
              window.PCMC_WHATSUP.onAction(detail);
            }
          } catch (err) {
            // swallow
            console.warn("pcmc widget onAction handler error:", err);
          }

          // 2) Emit a DOM event for host page listeners
          try {
            const ev = new CustomEvent("pcmc_widget_action", { detail });
            window.dispatchEvent(ev);
          } catch (err) { /* ignore */ }

          // 3) default helpful behavior: open WhatsApp if phone is configured
          if (config.phone && config.phone.length > 6) {
            const msg = encodeURIComponent(`${detail.label} - I need help with ${detail.action}`);
            const url = `https://wa.me/${config.phone}?text=${msg}`;
            window.open(url, "_blank");
          } else {
            // otherwise simply collapse the widget after click and log
            widgetEl.style.opacity = "0.98";
            console.log("PCMC widget action:", detail);
          }
        });
      });

      // Hint on load (temporary bubble)
      if (config.showHintOnLoad) {
        setTimeout(() => {
          // show the hint bubble briefly
          miniBubble.classList.add("show");
          setTimeout(() => miniBubble.classList.remove("show"), config.hintDurationMs || 6500);
        }, 800);
      }

      // keyboard ESC to close
      document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
          try { miniBubble.classList.remove("show"); } catch {}
          try { closePanel(); } catch {}
        }
      });

      // Expose API for integrators
      window.PCMC_WHATSUP = window.PCMC_WHATSUP || {};
      window.PCMC_WHATSUP.open = openPanel;
      window.PCMC_WHATSUP.close = closePanel;
      window.PCMC_WHATSUP.toggleQR = () => { qrToggle.click(); };
      window.PCMC_WHATSUP.config = Object.assign({}, config);
      window.PCMC_WHATSUP.onAction = window.PCMC_WHATSUP.onAction || null;

      // small accessibility: announcer
      const live = document.createElement("div");
      live.setAttribute("aria-hidden", "true");
      live.style.width = "1px"; live.style.height = "1px"; live.style.opacity = "0"; live.style.position = "absolute";
      shadow.appendChild(live);
    } catch (err) {
      // If Shadow DOM is blocked we still fallback to simple appended widget
      console.error("PCMC widget init error:", err);
      // Do not throw - fail silently for production
    }
  } // init

  // Wait for DOM ready (works if script loaded in head or body)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
