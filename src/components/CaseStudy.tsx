import Link from "next/link";
import { Diagram } from "@/components/diagrams";
import { Preview } from "@/components/previews";
import { ProjectIcon } from "@/components/ProjectIcon";
import { ArrowLink, Container, ExternalLink, RichText, StatusBadge, Tag } from "@/components/ui";
import type { Block, Project } from "@/lib/types";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="max-w-prose text-[17px] leading-relaxed text-muted">
          <RichText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="max-w-prose space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-muted">
              <span className="mt-[13px] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "facts":
      return (
        <dl className="divide-y divide-line border-y border-line">
          {block.items.map((item) => (
            <div key={item.term} className="grid gap-1.5 py-5 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8">
              <dt className="font-medium text-fg">{item.term}</dt>
              <dd className="leading-relaxed text-muted">
                <RichText text={item.detail} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "diagram":
      return <Diagram id={block.id} caption={block.caption} />;
    case "note":
      return (
        <aside className="flex max-w-prose gap-3 rounded-lg border border-line bg-surface-2 px-4 py-3.5 text-[15px] leading-relaxed text-muted">
          <span className="font-mono text-xs font-medium text-fg uppercase" aria-hidden="true">
            Note
          </span>
          <p>
            <span className="sr-only">Note: </span>
            <RichText text={block.text} />
          </p>
        </aside>
      );
    case "phases":
      return (
        <ol className="relative space-y-0 border-l border-line">
          {block.items.map((phase) => (
            <li key={phase.title} className="relative pb-8 pl-7 last:pb-0">
              <span
                className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 ${
                  phase.state === "done" ? "border-accent bg-accent" : "border-dashed border-subtle bg-bg"
                }`}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-subtle">{phase.period}</span>
                <h3 className="font-medium text-fg">{phase.title}</h3>
                <span
                  className={`rounded border px-1.5 font-mono text-[10px] uppercase ${
                    phase.state === "done" ? "border-line text-muted" : "border-dashed border-line-strong text-warn"
                  }`}
                >
                  {phase.state === "done" ? "Done" : "Planned"}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {phase.points.map((point) => (
                  <li key={point} className="max-w-prose text-[15px] leading-relaxed text-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      );
    case "groups":
      return (
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {block.items.map((group) => (
            <div key={group.label} className="bg-surface p-4">
              <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">{group.label}</dt>
              <dd className="mt-2 font-mono text-[13px] leading-relaxed break-words text-fg">{group.values.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  return (
    <article aria-labelledby="case-title">
      <Container className="pt-10 md:pt-16">
        <Link href="/#work" className="inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className="mt-6 grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14 md:pb-16">
          <div>
            <ProjectIcon project={project} size="lg" className="mb-8" />
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[11px] tracking-wide text-accent-text uppercase">{project.category}</p>
              <StatusBadge {...project.status} />
            </div>
            <h1 id="case-title" className="mt-4 text-5xl font-semibold tracking-[-0.045em] text-fg sm:text-6xl md:text-7xl">
              {project.name}
            </h1>
            {project.formerly && <p className="mt-2 text-muted">Formerly {project.formerly}</p>}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{project.intro}</p>

            <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm xs:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Role</dt>
                <dd className="mt-1 text-fg">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Timeline</dt>
                <dd className="mt-1 text-fg">{project.period}</dd>
              </div>
              {project.links.length > 0 && (
                <div className="xs:col-span-2">
                  <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Links</dt>
                  {project.links.map((link) => (
                    <dd key={link.href} className="mt-1">
                      <ExternalLink href={link.href} className="font-medium text-accent-text">
                        {link.label}
                      </ExternalLink>
                      {link.note && <span className="text-muted"> — {link.note}</span>}
                    </dd>
                  ))}
                </div>
              )}
            </dl>
          </div>

          {project.preview !== "alpide" && (
            <div className="group h-fit overflow-hidden rounded-2xl border border-line bg-surface-2">
              <Preview id={project.preview} />
            </div>
          )}
          {project.stack.length > 0 && project.preview === "alpide" && (
            <div className="h-fit rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">Day-to-day stack</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </ul>
            </div>
          )}
        </header>
      </Container>

      <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-[12rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">On this page</p>
            <ol className="mt-3 space-y-1 border-l border-line">
              {project.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-3 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            {project.stack.length > 0 && project.preview !== "alpide" && (
              <>
                <p className="mt-8 font-mono text-[11px] tracking-wide text-subtle uppercase">Stack</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </>
            )}
          </div>
        </nav>

        <div className="min-w-0 space-y-16 md:space-y-20">
          {project.sections.map((section, i) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24">
              <div className="mb-6 flex items-baseline gap-4">
                <span className="font-mono text-xs text-accent-text" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 id={`${section.id}-title`} className="text-3xl font-semibold tracking-[-0.03em] text-fg">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-6">
                {section.blocks.map((block, j) => (
                  <BlockView key={j} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>

      <Container className="pb-20 md:pb-28">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card sm:flex-row sm:items-center sm:p-8"
        >
          <ProjectIcon project={next} />
          <span className="flex-1">
            <span className="block font-mono text-[11px] tracking-wide text-subtle uppercase">Next case study</span>
            <span className="mt-1 block text-3xl font-semibold tracking-[-0.03em] text-fg">{next.name}</span>
            <span className="mt-1 block text-sm text-muted">{next.category}</span>
          </span>
          <span className="text-2xl text-accent-text transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
        <div className="mt-8">
          <ArrowLink href="/#contact" className="text-sm">
            Get in touch
          </ArrowLink>
        </div>
      </Container>
    </article>
  );
}
