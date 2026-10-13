// Renders resume/resume.html to a text-based A4 PDF.
// Usage: node resume/build.mjs [outPath]
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const out = process.argv[2] ?? "public/aniket-tyagi-resume.pdf";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(new URL("./resume.html", import.meta.url).href);
await page.pdf({ path: out, format: "A4", preferCSSPageSize: true, printBackground: true });
await browser.close();
console.log("wrote", out, fileURLToPath(import.meta.url) && "");
