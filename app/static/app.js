const REFRESH_INTERVAL_MS = 30_000;

function formatTimestamp(unixSeconds) {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

function setText(id, text, loading = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.classList.toggle("loading", loading);
}

function setStatus(healthy) {
  const banner = document.getElementById("status-banner");
  const label = document.getElementById("status-label");
  if (!banner || !label) return;

  banner.classList.toggle("healthy", healthy);
  label.textContent = healthy ? "All systems operational" : "Service degraded";
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.json();
}

async function refresh() {
  setText("version", "Loading…", true);
  setText("hostname", "Loading…", true);
  setText("timestamp", "Loading…", true);

  try {
    const [root, health, debug] = await Promise.all([
      fetchJson("/api"),
      fetchJson("/health"),
      fetchJson("/debug"),
    ]);

    setText("version", root.version ?? "unknown");
    setText("hostname", debug.hostname ?? "unknown");
    setText("timestamp", formatTimestamp(debug.time));
    setStatus(health.status === "ok");
  } catch {
    setText("version", "Unavailable");
    setText("hostname", "Unavailable");
    setText("timestamp", "Unavailable");
    setStatus(false);
  }
}

refresh();
setInterval(refresh, REFRESH_INTERVAL_MS);
