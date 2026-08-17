const baseUrl = (process.argv[2] ?? "http://localhost:8080").replace(/\/$/, "");

const routes = [
  "/",
  "/home-1",
  "/comparison",
  "/comparison/square",
  "/comparison/toast",
  "/comparison/lightspeed",
  "/comparison/spoton",
  "/comparison/touchbistro",
  "/comparison/revel",
  "/comparison/micros",
];

let failed = false;

for (const route of routes) {
  try {
    const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.text();
    const isHtml = contentType.toLowerCase().includes("text/html");
    const isPlaceholder = body.includes("Preview assets prepared") || body.includes("application is served by Next.js");
    const hasHomepageContent = route !== "/" || (body.includes("Beyond") && body.includes("Newsletter"));
    const valid = response.ok && isHtml && !isPlaceholder && hasHomepageContent;
    console.log(`${valid ? "PASS" : "FAIL"} ${route} ${response.status} ${contentType}`);
    if (!valid) failed = true;
  } catch (error) {
    console.error(`FAIL ${route} ${error instanceof Error ? error.message : String(error)}`);
    failed = true;
  }
}

if (failed) process.exit(1);