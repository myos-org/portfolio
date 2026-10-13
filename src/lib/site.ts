/**
 * Site-wide configuration. The production URL is read from the environment so
 * that no placeholder domain is ever published in metadata.
 */

function readSiteUrl(): URL | undefined {
  // Explicit domain first; otherwise the real production URL Vercel provides.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || (vercel ? `https://${vercel}` : "");
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export const site = {
  name: "Aniket Tyagi",
  title: "Software Engineer",
  description:
    "Aniket Tyagi is a software engineer building backend systems, databases, ERP workflows and full-stack web and mobile applications.",
  url: readSiteUrl(),
  email: "tyagi007aniket@gmail.com",
  social: {
    github: "https://github.com/Aniket-ty",
    linkedin: "https://www.linkedin.com/in/aniket-tyagi-728701189/",
  },
  /**
   * Path to an authentic resume PDF in /public (e.g. "/aniket-tyagi-resume.pdf").
   * Leave null until a real file is supplied — the resume action stays hidden.
   */
  resume: null as string | null,
} as const;

export const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
