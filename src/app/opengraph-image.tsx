import { hero } from "@/content/profile";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Aniket Tyagi — Software Engineer, full-stack and mobile";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: hero.eyebrow, title: `${hero.headline.before} ${hero.headline.accent} ${hero.headline.after}`, subtitle: "ERP software · AI developer tools · web and mobile" });
}
