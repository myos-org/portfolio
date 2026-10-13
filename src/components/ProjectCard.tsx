import Link from "next/link";
import type { Project } from "@/lib/types";
import { Preview } from "./previews";
import { StatusBadge, Tag } from "./ui";

export function FeatureProject({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  const href = `/work/${project.slug}`;
  const headingId = `project-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="group relative grid overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card md:grid-cols-2"
      data-reveal
    >
      <div className={`flex flex-col gap-5 p-6 sm:p-8 ${flip ? "md:order-2" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs text-subtle">{String(index).padStart(2, "0")}</span>
          <StatusBadge {...project.status} />
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-wide text-accent-text uppercase">{project.category}</p>
          <h3 id={headingId} className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">
            {/* Stretched link: the whole card is clickable, with one accessible name. */}
            <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
          {project.formerly && <p className="mt-1 text-sm text-muted">Formerly {project.formerly}</p>}
        </div>

        <p className="leading-relaxed text-muted">{project.summary}</p>

        <ul className="space-y-1.5 text-sm text-fg">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.slice(0, 6).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </ul>
        )}

        <p className="mt-auto pt-2 text-sm font-medium text-accent-text" aria-hidden="true">
          Read case study <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </p>
      </div>

      <div
        className={`relative min-h-64 border-t border-line bg-surface-2 md:border-t-0 ${
          flip ? "md:order-1 md:border-r" : "md:border-l"
        }`}
      >
        <Preview id={project.preview} />
      </div>

      {/* Card-wide focus ring for the stretched link. */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-accent ring-offset-2 ring-offset-bg group-has-[:focus-visible]:ring-2" aria-hidden="true" />
    </article>
  );
}

export function CompactProject({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  const headingId = `project-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="group relative grid gap-5 rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card sm:p-8 md:grid-cols-[1fr_auto] md:items-end"
      data-reveal
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-subtle">{String(index).padStart(2, "0")}</span>
          <StatusBadge {...project.status} />
          <span className="font-mono text-[11px] text-subtle">{project.period}</span>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-wide text-accent-text uppercase">{project.category}</p>
          <h3 id={headingId} className="mt-2 text-2xl font-semibold tracking-tight text-fg">
            <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
        </div>
        <p className="max-w-2xl leading-relaxed text-muted">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      </div>
      <p className="text-sm font-medium whitespace-nowrap text-accent-text" aria-hidden="true">
        Read case study <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </p>
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-accent ring-offset-2 ring-offset-bg group-has-[:focus-visible]:ring-2" aria-hidden="true" />
    </article>
  );
}
