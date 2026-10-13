import { chromium } from "@playwright/test";
const [,, url, out, w, h, theme, scrollY, scale] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, colorScheme: theme, deviceScaleFactor: +(scale||1), reducedMotion: "reduce" });
await p.goto(url, { waitUntil: "networkidle" });
if (+scrollY) { await p.evaluate(y => window.scrollTo(0, y), +scrollY); await p.waitForTimeout(400); }
await p.screenshot({ path: out });
await b.close();
