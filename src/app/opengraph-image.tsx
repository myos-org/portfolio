import { hero } from "@/content/profile";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Aniket Tyagi — Software Engineer, backend and full-stack";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: hero.eyebrow, title: hero.headline, subtitle: "Backend systems · databases · ERP workflows · web and mobile" });
}
