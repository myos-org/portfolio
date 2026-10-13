import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 md:py-40">
      <p className="font-mono text-xs tracking-wide text-accent-text uppercase">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The link may be out of date. Everything on the site is reachable from the home page.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent-solid px-5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </Container>
  );
}
