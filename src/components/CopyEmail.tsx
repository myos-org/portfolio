"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:border-fg"
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy email"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Could not copy the email address" : ""}
      </span>
    </>
  );
}
