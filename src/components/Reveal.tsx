"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `is-visible` to [data-reveal] elements as they enter the viewport.
 * Hidden-until-revealed styling only applies when JS runs and motion is allowed
 * (see globals.css), so content is never lost without it.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
