import Image from "next/image";
import type { Project } from "@/lib/types";

const sizes = {
  md: { box: "size-12 rounded-xl", mark: "size-8", px: 48 },
  lg: { box: "size-16 rounded-2xl", mark: "size-11", px: 64 },
};

/** A project's brand icon as a square tile; falls back to its initial. */
export function ProjectIcon({ project, size = "md", className = "" }: { project: Project; size?: keyof typeof sizes; className?: string }) {
  const s = sizes[size];
  const { icon } = project;

  if (icon?.tile === "self") {
    return (
      <Image
        src={icon.src}
        alt=""
        width={s.px}
        height={s.px}
        unoptimized
        className={`${s.box} shrink-0 shadow-card ${className}`}
      />
    );
  }

  if (icon?.tile === "light") {
    return (
      <span className={`grid ${s.box} shrink-0 place-items-center border border-line bg-white shadow-card ${className}`}>
        <Image src={icon.src} alt="" width={s.px} height={s.px} unoptimized className={s.mark} />
      </span>
    );
  }

  return (
    <span
      className={`grid ${s.box} shrink-0 place-items-center border border-line-strong bg-surface-2 font-serif text-2xl text-fg italic ${className}`}
      aria-hidden="true"
    >
      {project.name[0]}
    </span>
  );
}
