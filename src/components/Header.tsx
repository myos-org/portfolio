"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, site } from "@/lib/site";
import { Monogram } from "./Monogram";
import { ThemeToggle } from "./ThemeToggle";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        // The section nearest the top of the reading band wins.
        const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0]?.[0] ?? null;
        setActive(next);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  // Tied to the current path, so the menu closes itself on navigation.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) =>
      setOpenFor((prevPath) => {
        const prev = prevPath === pathname;
        return (typeof next === "function" ? next(prev) : next) ? pathname : null;
      }),
    [pathname],
  );
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(
    (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) buttonRef.current?.focus();
    },
    [setOpen],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 48rem)").matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="-ml-1 flex items-center gap-2.5 rounded-md px-1 py-1 text-fg"
          aria-label={`${site.name} — home`}
        >
          <Monogram className="size-7" />
          <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span className="hidden font-mono text-[11px] text-subtle lg:inline" aria-hidden="true">
                      0{i + 1}
                    </span>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {site.resume && (
            <a
              href={site.resume}
              download
              className="mr-1 hidden rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg transition-colors hover:border-fg sm:inline-block"
            >
              Resume
            </a>
          )}
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="grid size-10 place-items-center rounded-full text-fg hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 pt-2 pb-5 sm:px-6">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id} className="border-b border-line last:border-b-0">
                <Link
                  href={hrefFor(item.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className="flex items-baseline gap-3 py-3.5 text-lg text-fg"
                >
                  <span className="font-mono text-xs text-subtle" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {site.resume && (
            <a href={site.resume} download className="mt-4 inline-block rounded-full border border-line-strong px-4 py-2 text-sm">
              Download resume
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
