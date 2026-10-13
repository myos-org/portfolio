import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectIcon } from "./ProjectIcon";
import { StatusBadge, Tag } from "./ui";

/**
 * One project as a full-width row: index, icon and name on the left, what it
 * is and why it's interesting on the right. The whole row is the link.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  const headingId = `project-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="group relative grid gap-6 border-t border-line py-10 transition-colors duration-300 last:border-b md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:py-12"
      data-reveal
    >
      {/* Hover wash that bleeds slightly past the column edges. */}
      <span
        className="pointer-events-none absolute -inset-x-4 inset-y-0 rounded-2xl bg-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-inset-x-6"
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-5">
        <ProjectIcon
          project={project}
          className="transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="min-w-0">
          <p className="font-mono text-xs text-subtle">
            {String(index).padStart(2, "0")} <span aria-hidden="true">·</span> {project.category}
          </p>
          <h3 id={headingId} className="mt-1.5 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
            {/* Stretched link: the whole row is clickable, with one accessible name. */}
            <Link href={href} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
          {project.formerly && <p className="mt-1 text-sm text-muted">Formerly {project.formerly}</p>}
          <div className="mt-4">
            <StatusBadge {...project.status} />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-5">
        <p className="text-[17px] leading-relaxed text-muted">{project.summary}</p>

        <ul className="space-y-2 text-[15px] text-fg">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-end justify-between gap-4">
          {project.stack.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.stack.slice(0, 5).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </ul>
          )}
          <p className="ml-auto inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap text-fg" aria-hidden="true">
            Case study
            <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:-rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              →
            </span>
          </p>
        </div>
      </div>

      {/* Row-wide focus ring for the stretched link. */}
      <span
        className="pointer-events-none absolute -inset-x-4 inset-y-0 rounded-2xl ring-accent sm:-inset-x-6 group-has-[:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
