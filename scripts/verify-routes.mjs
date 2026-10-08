const base = process.env.BASE_URL || "http://127.0.0.1:4321";
const routes = [
  "/",
  "/en",
  "/km",
  "/en/explore",
  "/km/explore",
  "/en/regions/siem-reap",
  "/en/destinations/angkor-wat",
  "/en/tools",
  "/en/itineraries",
  "/en/events",
  "/en/map",
  "/en/food",
  "/en/discover",
  "/en/laws",
  "/en/saved",
  "/explore?lang=en",
  "/destinations/angkor-wat?lang=en"
];

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(base);
      if (response.status < 500) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server did not become ready at ${base}`);
}

await waitForServer();

let failed = false;
for (const route of routes) {
  const response = await fetch(new URL(route, base), { redirect: "manual" });
  const location = response.headers.get("location") ?? "";
  const ok = response.status >= 200 && response.status < 400;
  console.log(`${ok ? "PASS" : "FAIL"} ${response.status} ${route}${location ? ` → ${location}` : ""}`);
  if (!ok) failed = true;
}

if (failed) process.exit(1);
console.log(`Verified ${routes.length} Astro routes`);
