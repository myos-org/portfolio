import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 768;

async function openNavTo(page: Page, label: string) {
  if (isMobile(page)) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: label }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label }).click();
  }
}

test.describe("home", () => {
  test("communicates positioning above the fold", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveText("I build the software businesses run on.");
    await expect(h1).toBeInViewport();
    await expect(page.getByText("Software Engineer · Full-stack, ERP & Mobile")).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore my work/ })).toBeInViewport();
  });

  test("hero CTA scrolls to work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Explore my work/ }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.getByRole("heading", { name: /Selected work/ })).toBeInViewport();
  });

  for (const [label, id] of [
    ["Work", "work"],
    ["Experience", "experience"],
    ["Stack", "expertise"],
    ["About", "about"],
    ["Contact", "contact"],
  ] as const) {
    test(`nav: ${label} resolves and its heading is not hidden by the sticky header`, async ({ page }) => {
      await page.goto("/");
      await openNavTo(page, label);
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const heading = page.locator(`#${id}-title`);
      await expect(heading).toBeInViewport();
      // Wait for smooth scrolling to settle, then compare against the header.
      await page.waitForFunction(() => {
        const w = window as unknown as { __y?: number };
        const same = w.__y === window.scrollY;
        w.__y = window.scrollY;
        return same;
      }, null, { polling: 150 });
      const headerBottom = await page.locator("header").evaluate((el) => el.getBoundingClientRect().bottom);
      const headingTop = await heading.evaluate((el) => el.getBoundingClientRect().top);
      expect(headingTop).toBeGreaterThanOrEqual(headerBottom - 1);
    });
  }

  test("project cards link to case studies with accurate status", async ({ page }) => {
    await page.goto("/");
    const work = page.locator("#work");
    await expect(work.getByRole("link", { name: "Klyro", exact: true })).toHaveAttribute("href", "/work/klyro");
    await expect(work.getByRole("link", { name: "LifeSnail", exact: true })).toHaveAttribute("href", "/work/lifesnail");
    await expect(work.getByRole("link", { name: "Code Review", exact: true })).toHaveAttribute("href", "/work/code-review");
    await expect(work.getByText("Live · source private")).toBeVisible();
    await expect(work.getByText("In active development")).toBeVisible();
    await expect(work.getByText("In development · source private")).toBeVisible();
  });

  test("experience shows both Alpide ERP roles without overlap", async ({ page }) => {
    await page.goto("/#experience");
    const roles = page.getByRole("list", { name: "Roles at Alpide ERP" });
    await expect(roles).toContainText("Software Engineer");
    await expect(roles).toContainText("Jul 2026 — Present");
    await expect(roles).toContainText("Software Engineer Intern");
    await expect(roles).toContainText("Aug 2025 — May 2026");
    await expect(page.locator("#experience").getByRole("link", { name: /How I work at Alpide ERP/ })).toHaveAttribute("href", "/work/alpide-erp");
  });

  test("contact links are correct", async ({ page }) => {
    await page.goto("/#contact");
    const contact = page.locator("#contact");
    await expect(contact.getByRole("link", { name: "+91 87662 32844" })).toHaveAttribute("href", "tel:+918766232844");
    await expect(contact.getByRole("link", { name: "tyagi007aniket@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:tyagi007aniket@gmail.com",
    );
    for (const [name, href] of [
      ["LinkedIn", "https://www.linkedin.com/in/aniket-tyagi-728701189/"],
      ["GitHub", "https://github.com/Aniket-ty"],
    ]) {
      const link = contact.getByRole("link", { name: new RegExp(name) });
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("resume downloads the published PDF", async ({ page, request }) => {
    await page.goto("/");
    if (isMobile(page)) await page.getByRole("button", { name: "Open menu" }).click();
    const link = page.getByRole("link", { name: /resume/i }).filter({ visible: true }).first();
    await expect(link).toHaveAttribute("href", "/aniket-tyagi-resume.pdf");
    await expect(link).toHaveAttribute("download", "");
    const res = await request.get("/aniket-tyagi-resume.pdf");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  });

  test("footer shows the current year", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#footer-year")).toHaveText(String(new Date().getFullYear()));
  });
});

test.describe("mobile menu", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 1440) >= 768, "mobile only");

  test("opens, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open menu" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("closes after choosing a link and on outside tap", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "About" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
    await expect(page).toHaveURL(/#about$/);

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.mouse.click(10, 600);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });

  test("tap targets in the header are at least 40px", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Open menu", "Dark theme"]) {
      const box = await page.getByRole("button", { name }).boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(40);
      expect(box!.height).toBeGreaterThanOrEqual(40);
    }
  });
});

test.describe("keyboard", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, "desktop only");

  test("skip link and nav are reachable with visible focus", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Aniket Tyagi — home" })).toBeFocused();
    await page.keyboard.press("Tab");
    const work = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" });
    await expect(work).toBeFocused();
    const outline = await work.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#work$/);
  });
});

test.describe("theme", () => {
  test("opens dark on first visit, whatever the system preference", async ({ browser }) => {
    for (const scheme of ["light", "dark"] as const) {
      const ctx = await browser.newContext({ colorScheme: scheme });
      const page = await ctx.newPage();
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await ctx.close();
    }
  });

  test("toggle persists across reloads and navigation", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    const toggle = page.getByRole("button", { name: "Dark theme" });
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    // Poll: the theme switch cross-fades colours for ~200ms.
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(250, 250, 248)");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.goto("/work/klyro");
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("stored theme is applied before first paint (no flash)", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light");
      // Record the theme as soon as <body> exists, before any React code runs.
      new MutationObserver((_, obs) => {
        if (document.body) {
          (window as unknown as { __firstTheme?: string | null }).__firstTheme =
            document.documentElement.getAttribute("data-theme");
          obs.disconnect();
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto("/");
    const first = await page.evaluate(() => (window as unknown as { __firstTheme?: string }).__firstTheme);
    expect(first).toBe("light");
  });
});

test.describe("case studies", () => {
  test("journey: home → LifeSnail → Klyro via next link, with back/forward", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work").getByRole("link", { name: "LifeSnail", exact: true }).click();
    await expect(page).toHaveURL(/\/work\/lifesnail$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("LifeSnail");
    await expect(page).toHaveTitle("LifeSnail — case study — Aniket Tyagi");

    await page.getByRole("link", { name: /Next case study/ }).click();
    await expect(page).toHaveURL(/\/work\/code-review$/);
    await page.getByRole("link", { name: /Next case study/ }).click();
    await expect(page).toHaveURL(/\/work\/alpide-erp$/);
    await page.getByRole("link", { name: /Next case study/ }).click();
    await expect(page).toHaveURL(/\/work\/klyro$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Klyro");

    await page.goBack();
    await expect(page).toHaveURL(/\/work\/alpide-erp$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/work\/klyro$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Klyro");
  });

  test("nested route survives a hard refresh", async ({ page }) => {
    await page.goto("/work/klyro");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Klyro");
    await expect(page.getByRole("heading", { name: "Problems I found and fixed" })).toBeAttached();
  });

  test("header nav from a case study returns to home sections", async ({ page }) => {
    await page.goto("/work/klyro");
    await openNavTo(page, "Contact");
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator("#contact-title")).toBeInViewport();
  });

  test("LifeSnail exposes no source or fictitious links", async ({ page }) => {
    await page.goto("/work/lifesnail");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: /source|github|repository/i })).toHaveCount(0);
    await expect(main.getByText("Live · source private")).toBeVisible();
    await expect(main.getByRole("link", { name: /Open the live app/ })).toHaveAttribute("href", "https://my-life-os-diary-web.vercel.app/");
  });

  test("Klyro links to the original public repository", async ({ page }) => {
    await page.goto("/work/klyro");
    const link = page.locator("main").getByRole("link", { name: /Source on GitHub/ });
    await expect(link).toHaveAttribute("href", "https://github.com/myos-org/forkify-ERP");
    await expect(page.locator("main").getByRole("link", { name: /Open the live app/ })).toHaveAttribute("href", "https://forkify-erp-851w.vercel.app/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(page.getByText("Planned", { exact: true })).toBeVisible();
  });

  test("Code Review exposes no source links", async ({ page }) => {
    await page.goto("/work/code-review");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: /source|github|repository/i })).toHaveCount(0);
    await expect(main.getByText("In development · source private")).toBeVisible();
  });

  test("Alpide ERP page has no external links in content", async ({ page }) => {
    await page.goto("/work/alpide-erp");
    const external = page.locator('main a[href^="http"]');
    await expect(external).toHaveCount(0);
  });

  test("unknown slug returns a 404 page", async ({ page }) => {
    const res = await page.goto("/work/not-a-project");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn't exist.");
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("all images have alt attributes", async ({ page }) => {
    for (const path of ["/", "/work/klyro", "/work/lifesnail", "/work/code-review", "/work/alpide-erp"]) {
      await page.goto(path);
      const missing = await page.locator("img:not([alt])").count();
      expect(missing, path).toBe(0);
    }
  });
});

test.describe("responsive", () => {
  const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];
  for (const width of widths) {
    test(`no horizontal overflow at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      for (const path of ["/", "/work/klyro", "/work/lifesnail", "/work/code-review", "/work/alpide-erp", "/work/missing"]) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} @ ${width}`).toBeLessThanOrEqual(0);
        const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
        expect(h1!.x).toBeGreaterThanOrEqual(0);
        expect(h1!.x + h1!.width).toBeLessThanOrEqual(width);
      }
      await ctx.close();
    });
  }
});

test.describe("reduced motion", () => {
  test("content is visible immediately and smooth scrolling is off", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    // Without scrolling, below-the-fold content must already be fully opaque.
    const opacity = await page.locator("#contact [data-reveal]").first().evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
    const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    expect(behavior).toBe("auto");
    await ctx.close();
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const theme of ["light", "dark"] as const) {
    for (const path of ["/", "/work/klyro", "/work/lifesnail", "/work/code-review", "/work/alpide-erp", "/work/missing"]) {
      test(`${path} in ${theme} theme`, async ({ browser }) => {
        const ctx = await browser.newContext({ reducedMotion: "reduce" });
        await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
        const page = await ctx.newPage();
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
        expect(summary).toEqual([]);
        await ctx.close();
      });
    }
  }

  test("heading levels never skip", async ({ page }) => {
    for (const path of ["/", "/work/klyro"]) {
      await page.goto(path);
      const levels = await page.locator("h1, h2, h3, h4").evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
      expect(levels[0]).toBe(1);
      expect(levels.filter((l) => l === 1)).toHaveLength(1);
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("seo", () => {
  test("pages have unique titles, descriptions and OG data", async ({ page }) => {
    const seen = new Set<string>();
    for (const path of ["/", "/work/klyro", "/work/lifesnail", "/work/code-review", "/work/alpide-erp"]) {
      await page.goto(path);
      const title = await page.title();
      expect(seen.has(title)).toBe(false);
      seen.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    }
  });

  test("OG images render", async ({ request }) => {
    for (const path of ["/opengraph-image", "/work/klyro/opengraph-image"]) {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });

  test("robots allows indexing; no placeholder domains anywhere", async ({ page, request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Allow: \//);
    expect(robots).not.toMatch(/example\.com|placeholder/);
    await page.goto("/");
    const html = await page.content();
    expect(html).not.toMatch(/example\.com|your-domain|placeholder\.com/);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
  });

  test("security headers are set", async ({ request }) => {
    const res = await request.get("/");
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
    expect(res.headers()["x-frame-options"]).toBe("DENY");
    expect(res.headers()["x-powered-by"]).toBeUndefined();
  });
});
