import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { ProjectRow } from "@/components/ProjectCard";
import { Spotlight } from "@/components/Spotlight";
import { ArrowLink, Container, ExternalLink, SectionHeading } from "@/components/ui";
import { about, experience, expertise, hero } from "@/content/profile";
import { projects } from "@/content/projects";
import { formatRange } from "@/lib/format";
import { site } from "@/lib/site";

export default function Home() {
  const products = projects.filter((p) => p.layout === "feature");

  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="scroll-mt-20 pt-16 pb-24 md:pt-24 md:pb-32">
        <Container>
          <SectionHeading id="work-title" index="01" label="Work" title="Selected work" accent="built end to end." />
          <div>
            {products.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i + 1} />
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 border-t border-line py-24 md:py-32">
        <Container>
          <SectionHeading id="experience-title" index="02" label="Experience" title="Where I've been" accent="shipping." />
          {experience.map((job) => (
            <div key={job.company} className="grid gap-8 md:grid-cols-[10rem_1fr]">
              <div className="md:pt-1">
                <p className="font-mono text-xs text-subtle">
                  {formatRange(job.roles[job.roles.length - 1].start, job.roles[0].end)}
                </p>
                <p className="mt-1 font-mono text-xs text-subtle">{job.location}</p>
              </div>
              <div>
                <div data-reveal>
                  <h3 className="text-2xl font-semibold tracking-tight text-fg">{job.company}</h3>
                  <p className="mt-1 text-muted">{job.summary}</p>
                </div>

                <ol className="mt-10 border-l border-line" aria-label={`Roles at ${job.company}`}>
                  {job.roles.map((role, i) => (
                    <li key={role.title} className="relative pb-12 pl-8 last:pb-0" data-reveal>
                      <span
                        className={`absolute top-2 -left-[5px] size-[9px] rounded-full ${
                          i === 0 ? "bg-accent shadow-[0_0_0_4px_var(--accent-soft)]" : "border-2 border-line-strong bg-bg"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="text-lg font-medium text-fg">{role.title}</p>
                        <p className="font-mono text-xs text-muted">{formatRange(role.start, role.end)}</p>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {role.points.map((point) => (
                          <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                            <span className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>

                {job.caseStudy && (
                  <ArrowLink href={`/work/${job.caseStudy}`} className="mt-10 text-sm">
                    How I work at {job.company}
                  </ArrowLink>
                )}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-20 border-t border-line py-24 md:py-32">
        <Container>
          <SectionHeading id="expertise-title" index="03" label="Stack" title="Tools, grouped by" accent="what they're for." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((group, i) => (
              <div
                key={group.area}
                className="bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
              >
                <p className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-semibold text-fg">{group.area}</h3>
                <p className="mt-1 text-sm text-muted">{group.note}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-line px-2.5 py-1 font-mono text-[12px] text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line py-24 md:py-32">
        <Container>
          <SectionHeading id="about-title" index="04" label="About" title="Briefly," accent="about me." />
          <div className="grid gap-10 md:grid-cols-[10rem_1fr]">
            <div className="hidden md:block" />
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16" data-reveal>
              <div className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="h-fit divide-y divide-line rounded-2xl border border-line bg-surface text-sm">
                <div className="p-5">
                  <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Currently</dt>
                  <dd className="mt-1.5 text-fg">
                    {hero.current.role}, {hero.current.company}
                  </dd>
                  <dd className="text-muted">{hero.location}</dd>
                </div>
                <div className="p-5">
                  <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Based in</dt>
                  <dd className="mt-1.5 text-fg">{site.location}</dd>
                </div>
                <div className="p-5">
                  <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Education</dt>
                  <dd className="mt-1.5 text-fg">{about.education.degree}</dd>
                  <dd className="text-muted">
                    {[about.education.institution, about.education.status].filter(Boolean).join(" · ")}
                  </dd>
                </div>
                <div className="p-5">
                  <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Focus</dt>
                  <dd className="mt-1.5 text-fg">Full-stack, backend-first — ERP, AI tools and mobile</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 md:py-36">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <Container className="relative">
          <p className="font-mono text-xs tracking-wide text-subtle uppercase">
            <span className="text-accent-text">05</span> / Contact
          </p>
          <div data-reveal>
            <h2
              id="contact-title"
              className="mt-8 max-w-4xl text-[2.75rem] leading-[1] font-semibold tracking-[-0.045em] text-fg xs:text-6xl md:text-7xl lg:text-8xl"
            >
              Let&apos;s build <span className="serif-accent text-accent-text">something</span> that works.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Open to full-stack and backend roles. If you&apos;re hiring, or want to talk through any of the work here, email is the best way to reach me.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 max-w-full items-center gap-2 rounded-full bg-accent-solid px-6 text-[15px] font-medium break-all text-on-accent transition-transform duration-200 hover:-translate-y-0.5"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <li>
                <a href={site.phone.href} className="inline-flex min-h-10 items-center text-fg underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <ExternalLink href={site.social.linkedin} className="min-h-10 text-fg">
                  LinkedIn
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={site.social.github} className="min-h-10 text-fg">
                  GitHub
                </ExternalLink>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Spotlight />

      <Container className="relative pt-16 pb-16 md:pt-28 md:pb-24">
        <p className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[13px] text-muted backdrop-blur">
          <span className="pulse relative size-1.5 rounded-full bg-ok text-ok" aria-hidden="true" />
          <span>
            {hero.current.role} at <span className="text-fg">{hero.current.company}</span>
          </span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>{hero.location}</span>
        </p>

        <p className="mt-10 font-mono text-xs tracking-[0.12em] text-subtle uppercase">
          <span className="hidden sm:inline">{site.name} — </span>
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="mt-5 max-w-5xl text-[2.75rem] leading-[1] font-semibold tracking-[-0.045em] text-fg xs:text-6xl sm:text-7xl lg:text-[6.5rem]"
        >
          {hero.headline.before} <span className="serif-accent pr-1 text-accent-text">{hero.headline.accent}</span>{" "}
          {hero.headline.after}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{hero.lede}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="#work"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-solid px-6 text-[15px] font-medium text-on-accent transition-transform duration-200 hover:-translate-y-0.5"
          >
            Explore my work{" "}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </Link>
          <Link
            href="#contact"
            className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 text-[15px] font-medium text-fg transition-colors hover:border-fg"
          >
            Get in touch
          </Link>
        </div>

        <dl className="mt-20 grid max-w-3xl grid-cols-3 border-t border-line pt-6">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="pr-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{stat.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm" aria-hidden="true">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
