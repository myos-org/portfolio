import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { about, experience, leadership } from "@/content/profile";
import { getNextProject, getProject, projects } from "@/content/projects";
import { formatMonth, formatRange, splitCode } from "@/lib/format";
import { site } from "@/lib/site";

describe("format helpers", () => {
  it("formats months without depending on locale", () => {
    expect(formatMonth("2025-08")).toBe("Aug 2025");
    expect(formatMonth("2026-07")).toBe("Jul 2026");
    expect(formatRange("2026-07", null)).toBe("Jul 2026 — Present");
  });

  it("rejects malformed months", () => {
    expect(() => formatMonth("2026-13")).toThrow();
    expect(() => formatMonth("nope")).toThrow();
  });

  it("splits inline code without interpreting HTML", () => {
    expect(splitCode("a `b` c")).toEqual([
      { code: false, value: "a " },
      { code: true, value: "b" },
      { code: false, value: " c" },
    ]);
    expect(splitCode("<script>x</script>")).toEqual([{ code: false, value: "<script>x</script>" }]);
  });
});

describe("projects", () => {
  it("have unique slugs and resolve by slug", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(getProject(slug)?.slug).toBe(slug);
    expect(getProject("does-not-exist")).toBeUndefined();
  });

  it("cycle through next-project links", () => {
    const visited = new Set<string>();
    let current = projects[0];
    for (let i = 0; i < projects.length; i++) {
      visited.add(current.slug);
      current = getNextProject(current.slug);
    }
    expect(visited.size).toBe(projects.length);
    expect(current.slug).toBe(projects[0].slug);
  });

  it("only use https links and no placeholder domains", () => {
    for (const p of projects) {
      for (const link of p.links) {
        const url = new URL(link.href);
        expect(url.protocol).toBe("https:");
        expect(url.hostname).not.toMatch(/example\.|localhost|placeholder|your-?domain/);
      }
    }
  });

  it("never show a source link for private-source LifeSnail, only the live app", () => {
    const lifesnail = getProject("lifesnail")!;
    expect(lifesnail.status.label.toLowerCase()).toContain("private");
    expect(lifesnail.links.filter((l) => l.kind === "source")).toHaveLength(0);
    expect(lifesnail.links.map((l) => l.href)).toEqual(["https://my-life-os-diary-web.vercel.app/"]);
  });

  it("present Klyro with its original repository, not an invented one", () => {
    const klyro = getProject("klyro")!;
    expect(klyro.formerly).toBe("Forkify ERP");
    expect(klyro.links.map((l) => l.href)).toEqual([
      "https://forkify-erp-851w.vercel.app/",
      "https://github.com/myos-org/forkify-ERP",
    ]);
  });

  it("present Klyro as completed and live, with no planned work", () => {
    const klyro = getProject("klyro")!;
    expect(klyro.status).toEqual({ label: "Completed · Live", tone: "live" });
    expect(klyro.links.some((l) => l.kind === "live")).toBe(true);
    const phases = klyro.sections.flatMap((s) => s.blocks).filter((b) => b.type === "phases");
    for (const p of phases) if (p.type === "phases") expect(p.items.every((i) => i.state === "done")).toBe(true);
  });

  it("never show a source link for private-source Code Review", () => {
    const review = getProject("code-review")!;
    expect(review.status.label.toLowerCase()).toContain("private");
    expect(review.links).toHaveLength(0);
  });

  it("only reference icons that exist in /public", () => {
    for (const p of projects) {
      if (p.icon) expect(existsSync(join(process.cwd(), "public", p.icon.src))).toBe(true);
    }
  });

  it("keep professional work free of links", () => {
    expect(getProject("alpide-erp")!.links).toHaveLength(0);
  });

  it("have unique section ids per case study", () => {
    for (const p of projects) {
      const ids = p.sections.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("have balanced inline-code backticks in all text", () => {
    const texts = JSON.stringify(projects).match(/"(text|detail)":"([^"\\]|\\.)*"/g) ?? [];
    for (const t of texts) expect((t.match(/`/g) ?? []).length % 2).toBe(0);
  });
});

describe("experience", () => {
  it("has non-overlapping role periods, newest first", () => {
    for (const job of experience) {
      for (let i = 0; i < job.roles.length - 1; i++) {
        const newer = job.roles[i];
        const older = job.roles[i + 1];
        expect(older.end).not.toBeNull();
        expect(older.end! < newer.start).toBe(true);
      }
    }
  });

  it("matches the LinkedIn Alpide ERP timeline", () => {
    const alpide = experience.find((e) => e.company === "Alpide ERP")!;
    expect(alpide.roles.map(({ title, start, end }) => ({ title, start, end }))).toEqual([
      { title: "Software Engineer", start: "2026-07", end: null },
      { title: "Software Engineer Intern", start: "2025-08", end: "2026-05" },
    ]);
    for (const role of alpide.roles) expect(role.points.length).toBeGreaterThan(0);
  });
});

describe("resume", () => {
  it("states the same degree and institution as the site", () => {
    const html = readFileSync(join(process.cwd(), "resume", "resume.html"), "utf8");
    expect(html).toContain(about.education.degree);
    expect(html).toContain(about.education.institution!);
    expect(html).toContain("August 2022 – July 2026");
    for (const item of leadership) expect(html).toContain(`<b>${item.role}</b>, ${item.org}`);
  });
});

describe("site config", () => {
  it("uses the supplied contact details", () => {
    expect(site.email).toBe("tyagi007aniket@gmail.com");
    expect(site.phone.href).toBe("tel:+918766232844");
    expect(site.social.github).toBe("https://github.com/Aniket-ty");
    expect(site.social.linkedin).toBe("https://www.linkedin.com/in/aniket-tyagi-728701189/");
  });

  it("links a resume that exists in /public", () => {
    expect(site.resume).toBe("/aniket-tyagi-resume.pdf");
    expect(existsSync(join(process.cwd(), "public", site.resume!))).toBe(true);
  });
});
