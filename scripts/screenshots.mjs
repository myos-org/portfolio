// Visual QA: full-page screenshots across viewports and themes.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "screenshots";
const widths = [320, 390, 768, 1024, 1440, 1920];
const pages = ["/", "/work/klyro", "/work/lifesnail", "/work/alpide-erp"];
const only = process.env.ONLY?.split(",");

const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
  for (const width of widths) {
    if (only && !only.includes(String(width))) continue;
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const path of pages) {
      await page.goto(base + path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) console.log(`OVERFLOW ${overflow}px at ${width} ${path} ${theme}`);
      const name = `${theme}-${width}-${path === "/" ? "home" : path.split("/").pop()}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    }
    await ctx.close();
  }
}
await browser.close();
console.log("done");
