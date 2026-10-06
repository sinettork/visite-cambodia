const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  "/?lang=en",
  "/explore?lang=en",
  "/regions/kampong-chhnang?lang=en",
  "/destinations/angkor-wat?lang=en",
  "/tools?lang=en",
  "/itineraries?lang=en",
  "/events?lang=en",
  "/map?lang=en",
  "/food?lang=en",
  "/discover?lang=en",
  "/laws?lang=en",
  "/saved?lang=en",
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
  const url = new URL(route, base);
  const response = await fetch(url);
  const body = await response.text();
  const hasNextError = /Application error|Unhandled Runtime Error|NEXT_HTTP_ERROR_FALLBACK/.test(body);
  const ok = response.status >= 200 && response.status < 400 && !hasNextError;
  console.log(`${ok ? "PASS" : "FAIL"} ${response.status} ${route}`);
  if (!ok) {
    failed = true;
    console.log(body.slice(0, 500));
  }
}

if (failed) process.exit(1);
console.log(`Verified ${routes.length} routes`);
