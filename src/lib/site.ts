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
    "Aniket Tyagi is a full-stack software engineer building ERP software across sales, purchase, inventory, CRM and manufacturing, plus AI developer tools and web and mobile products.",
  url: readSiteUrl(),
  email: "tyagi007aniket@gmail.com",
  phone: { display: "+91 87662 32844", href: "tel:+918766232844" },
  location: "Meerut, Uttar Pradesh, India",
  social: {
    github: "https://github.com/Aniket-ty",
    linkedin: "https://www.linkedin.com/in/aniket-tyagi-728701189/",
  },
  /**
   * Path to the resume PDF in /public, built from resume/resume.html by
   * `node resume/build.mjs`. Set to null to hide the resume action.
   */
  resume: "/aniket-tyagi-resume.pdf" as string | null,
} as const;

export const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
