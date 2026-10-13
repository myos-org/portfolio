import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

const known = new Set(projects.map((p) => p.slug));

/**
 * Case-study pages stream a prerendered shell, so a notFound() inside the page
 * would arrive after a 200 status. Unknown slugs are routed to a path that
 * matches nothing, which renders the 404 page with a real 404 status.
 */
export function proxy(request: NextRequest) {
  const [, , slug, ...rest] = request.nextUrl.pathname.split("/");
  if (!slug || rest.length > 1 || rest[0] === "") return NextResponse.next();
  if (rest.length === 1 && rest[0] === "opengraph-image" && known.has(slug)) return NextResponse.next();
  if (rest.length === 0 && known.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: "/work/:path*",
};
