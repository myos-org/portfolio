import Link from "next/link";
import { site } from "@/lib/site";
import { InlineScript } from "./InlineScript";
import { Monogram } from "./Monogram";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Monogram className="size-6 text-fg" />
          <p className="text-sm text-muted">
            © <span id="footer-year" suppressHydrationWarning>{process.env.BUILD_YEAR}</span> {site.name}
          </p>
          <InlineScript html={`{var y=document.getElementById("footer-year");if(y)y.textContent=String(new Date().getFullYear())}`} />
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <li>
            <a className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-fg" href={site.social.github} target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-fg" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-fg" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <Link className="inline-flex min-h-10 items-center gap-1.5 text-muted transition-colors hover:text-fg" href="#top">
              Back to top
              <span aria-hidden="true">↑</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
