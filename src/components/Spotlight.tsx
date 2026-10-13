"use client";

import { useEffect, useRef } from "react";

/**
 * Soft glow that follows the pointer across the hero. Purely decorative: with
 * reduced motion, touch input or no JS it stays centred where the CSS puts it.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />;
}
