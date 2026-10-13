import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { getNextProject, getProject, projects } from "@/content/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — case study`;
  return {
    title,
    description: project.summary,
    alternates: site.url ? { canonical: `/work/${project.slug}` } : undefined,
    openGraph: { type: "article", title: `${title} — ${site.name}`, description: project.summary },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudy project={project} next={getNextProject(project.slug)} />;
}
