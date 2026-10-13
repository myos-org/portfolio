import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { LayerStack } from "@/components/diagrams/LayerStack";
import { CompactProject, FeatureProject } from "@/components/ProjectCard";
import { ArrowLink, Container, ExternalLink, SectionHeading } from "@/components/ui";
import { about, experience, expertise, hero } from "@/content/profile";
import { projects } from "@/content/projects";
import { formatRange } from "@/lib/format";
import { site } from "@/lib/site";

export default function Home() {
  const features = projects.filter((p) => p.layout === "feature");
  const compact = projects.filter((p) => p.layout === "compact");

  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="scroll-mt-20 pt-12 pb-20 md:pt-16 md:pb-28">
        <Container>
          <SectionHeading id="work-title" index="01" label="Work" title="Selected work, with the engineering behind it." />
          <div className="space-y-6">
            {features.map((project, i) => (
              <FeatureProject key={project.slug} project={project} index={i + 1} flip={i % 2 === 1} />
            ))}
            {compact.map((project, i) => (
              <CompactProject key={project.slug} project={project} index={features.length + i + 1} />
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 border-t border-line py-20 md:py-28">
        <Container>
          <SectionHeading id="experience-title" index="02" label="Experience" title="Where I've been building." />
          {experience.map((job) => (
            <div key={job.company} className="grid gap-8 md:grid-cols-[10rem_1fr]" data-reveal>
              <p className="font-mono text-xs text-subtle md:pt-1.5">
                {formatRange(job.roles[job.roles.length - 1].start, job.roles[0].end)}
              </p>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-fg">{job.company}</h3>
                <p className="mt-1 text-sm text-muted">{job.summary}</p>

                <ol className="mt-6 space-y-0 border-l border-line" aria-label={`Roles at ${job.company}`}>
                  {job.roles.map((role, i) => (
                    <li key={role.title} className="relative pb-5 pl-6 last:pb-0">
                      <span
                        className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 ${
                          i === 0 ? "border-accent bg-accent" : "border-line-strong bg-bg"
                        }`}
                        aria-hidden="true"
                      />
                      <p className="font-medium text-fg">{role.title}</p>
                      <p className="font-mono text-xs text-muted">{formatRange(role.start, role.end)}</p>
                    </li>
                  ))}
                </ol>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                {job.caseStudy && (
                  <ArrowLink href={`/work/${job.caseStudy}`} className="mt-8 text-sm">
                    How I work at {job.company}
                  </ArrowLink>
                )}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-20 border-t border-line py-20 md:py-28">
        <Container>
          <SectionHeading id="expertise-title" index="03" label="Expertise" title="What I work with, grouped by what it's for." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((group, i) => (
              <div
                key={group.area}
                className="bg-bg p-6"
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
              >
                <h3 className="font-semibold text-fg">{group.area}</h3>
                <p className="mt-1 text-sm text-muted">{group.note}</p>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[13px] text-fg">
                  {group.items.map((item, j) => (
                    <li key={item} className="flex items-center gap-3">
                      {item}
                      {j < group.items.length - 1 && (
                        <span className="text-line-strong" aria-hidden="true">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line py-20 md:py-28">
        <Container>
          <SectionHeading id="about-title" index="04" label="About" title="Briefly, about me." />
          <div className="grid gap-10 md:grid-cols-[10rem_1fr]">
            <div className="hidden md:block" />
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16" data-reveal>
              <div className="max-w-prose space-y-5 text-[17px] leading-relaxed text-muted">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="h-fit divide-y divide-line rounded-xl border border-line bg-surface text-sm">
                <div className="p-5">
                  <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">Currently</dt>
                  <dd className="mt-1.5 text-fg">
                    {hero.current.role}, {hero.current.company}
                  </dd>
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
                  <dd className="mt-1.5 text-fg">Backend &amp; full-stack engineering</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-[10rem_1fr]">
            <p className="font-mono text-xs tracking-wide text-subtle uppercase md:pt-3">
              <span className="text-accent-text">05</span> / Contact
            </p>
            <div data-reveal>
              <h2 id="contact-title" className="max-w-3xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
                Open to backend and full-stack engineering roles.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                If you&apos;re hiring, or want to talk through any of the work here, email is the best way to reach me.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full bg-accent-solid px-5 text-sm font-medium break-all text-on-accent transition-opacity hover:opacity-90"
                >
                  {site.email}
                </a>
                <CopyEmail email={site.email} />
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
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
          </div>
        </Container>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="grid items-center gap-12 pt-12 pb-8 md:pt-20 md:pb-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs tracking-[0.08em] text-accent-text uppercase">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-fg xs:text-5xl sm:text-6xl lg:text-[4.25rem]"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.lede}</p>

          <p className="mt-6 flex items-center gap-2.5 text-sm text-muted">
            <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
            <span>
              {hero.current.role} at <span className="text-fg">{hero.current.company}</span>
            </span>
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-solid px-5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Explore my work <span aria-hidden="true">↓</span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:border-fg"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <LayerStack
            label="The layers I work across"
            trace
            layers={[
              { name: "Interface", detail: "React · React Native" },
              { name: "API", detail: "REST · Java · Spring Boot" },
              { name: "Business logic", detail: "ERP workflows · validation" },
              { name: "Data", detail: "SQL · views · stored procedures" },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
