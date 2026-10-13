import { describe, expect, it } from "vitest";
import { experience } from "@/content/profile";
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

  it("never show a source link for private-source LifeSnail", () => {
    const lifesnail = getProject("lifesnail")!;
    expect(lifesnail.status.label.toLowerCase()).toContain("private");
    expect(lifesnail.links.filter((l) => l.kind === "source")).toHaveLength(0);
  });

  it("present Klyro with its original repository, not an invented one", () => {
    const klyro = getProject("klyro")!;
    expect(klyro.formerly).toBe("Forkify ERP");
    expect(klyro.links.map((l) => l.href)).toEqual(["https://github.com/myos-org/forkify-ERP"]);
  });

  it("mark Klyro's roadmap as planned, not done", () => {
    const klyro = getProject("klyro")!;
    const phases = klyro.sections.flatMap((s) => s.blocks).find((b) => b.type === "phases");
    expect(phases?.type).toBe("phases");
    if (phases?.type !== "phases") return;
    const hardening = phases.items.find((p) => p.title.includes("hardening"));
    expect(hardening?.state).toBe("planned");
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

  it("matches the supplied Alpide ERP timeline", () => {
    const alpide = experience.find((e) => e.company === "Alpide ERP")!;
    expect(alpide.roles).toEqual([
      { title: "Software Engineer", start: "2026-07", end: null },
      { title: "Software Engineer Intern", start: "2025-08", end: "2026-06" },
    ]);
  });
});

describe("site config", () => {
  it("uses the supplied contact details", () => {
    expect(site.email).toBe("tyagi007aniket@gmail.com");
    expect(site.social.github).toBe("https://github.com/Aniket-ty");
    expect(site.social.linkedin).toBe("https://www.linkedin.com/in/aniket-tyagi-728701189/");
  });

  it("hides the resume until a real file is supplied", () => {
    expect(site.resume).toBeNull();
  });
});
