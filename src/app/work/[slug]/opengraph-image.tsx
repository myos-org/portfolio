import { getProject, projects } from "@/content/projects";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Case study by Aniket Tyagi";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.name ?? "Aniket Tyagi",
    subtitle: project?.summary ?? "",
  });
}
