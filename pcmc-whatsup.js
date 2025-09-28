(function () {
  // Create widget container
  const widget = document.createElement("div");
  widget.id = "pcmc-ai-widget";
  widget.innerHTML = `
    <div class="pcmc-ai-box">
      <div class="pcmc-ai-header">
        <span class="pcmc-ai-icon">🤖</span>
        <span class="pcmc-ai-title">PCMC AI Assistant</span>
        <button id="pcmc-close-btn">×</button>
      </div>
      <div class="pcmc-ai-hint">
        👋 Hi! I’m your AI Care Assistant for PCMC.  
        Available 24/7 to help with information, properties, grievances, schemes, and more.  
        How can I assist you today?
      </div>
      <div class="pcmc-ai-options">
        <button class="pcmc-btn">ℹ️ Information</button>
        <button class="pcmc-btn">🏠 My Properties</button>
        <button class="pcmc-btn">📝 Grievance</button>
        <button class="pcmc-btn">📑 Schemes</button>
        <button class="pcmc-btn">🏢 CFC</button>
      </div>
      <div class="pcmc-ai-footer">
        <button id="toggle-qr" class="pcmc-qr-btn">📲 Show QR</button>
        <div id="pcmc-qr" class="pcmc-qr hidden">
          <img src="https://wow-strategies.com/assets/pcmc-qr.png" alt="PCMC QR Code" />
        </div>
        <span class="pcmc-powered">Powered by WoW-Strategies Pvt. Ltd.</span>
      </div>
    </div>
    <div id="pcmc-float-btn">💬</div>
  `;

  document.body.appendChild(widget);

  // CSS Styling
  const style = document.createElement("style");
  style.innerHTML = `
    #pcmc-ai-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-family: 'Segoe UI', sans-serif;
      z-index: 9999;
    }
    .pcmc-ai-box {
      width: 320px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.15);
      overflow: hidden;
      display: none;
      flex-direction: column;
      animation: fadeIn 0.3s ease-in-out;
    }
    .pcmc-ai-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #004aad;
      color: #fff;
      padding: 10px 15px;
      font-size: 15px;
      font-weight: 600;
    }
    .pcmc-ai-icon {
      margin-right: 5px;
    }
    #pcmc-close-btn {
      border: none;
      background: transparent;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
    .pcmc-ai-hint {
      font-size: 14px;
      padding: 15px;
      color: #333;
      border-bottom: 1px solid #eee;
    }
    .pcmc-ai-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 15px;
    }
    .pcmc-btn {
      background: #f5f5f5;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .pcmc-btn:hover {
      background: #e0ebff;
    }
    .pcmc-ai-footer {
      text-align: center;
      padding: 10px 15px;
      border-top: 1px solid #eee;
    }
    .pcmc-qr-btn {
      background: #004aad;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 13px;
      cursor: pointer;
    }
    .pcmc-qr {
      margin-top: 10px;
    }
    .pcmc-qr.hidden {
      display: none;
    }
    .pcmc-qr img {
      width: 120px;
      height: auto;
      border-radius: 8px;
    }
    .pcmc-powered {
      display: block;
      margin-top: 6px;
      font-size: 11px;
      color: #999;
    }
    #pcmc-float-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 55px;
      height: 55px;
      background: #004aad;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(0,0,0,0.2);
    }
    @keyframes fadeIn {
      from {opacity: 0; transform: translateY(20px);}
      to {opacity: 1; transform: translateY(0);}
    }
  `;
  document.head.appendChild(style);

  // JS Interactivity
  const floatBtn = document.getElementById("pcmc-float-btn");
  const box = widget.querySelector(".pcmc-ai-box");
  const closeBtn = document.getElementById("pcmc-close-btn");
  const qrBtn = document.getElementById("toggle-qr");
  const qrBox = document.getElementById("pcmc-qr");

  floatBtn.onclick = () => {
    box.style.display = "flex";
    floatBtn.style.display = "none";
  };
  closeBtn.onclick = () => {
    box.style.display = "none";
    floatBtn.style.display = "flex";
  };
  qrBtn.onclick = () => {
    qrBox.classList.toggle("hidden");
    qrBtn.textContent = qrBox.classList.contains("hidden") ? "📲 Show QR" : "❌ Hide QR";
  };
})();
