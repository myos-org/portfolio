export type DiagramId =
  | "klyro-architecture"
  | "klyro-procurement"
  | "klyro-transfer-states"
  | "alpide-layers"
  | "lifesnail-architecture"
  | "code-review-pipeline";

export type PreviewId = "klyro" | "lifesnail" | "code-review" | "alpide";

export type StatusTone = "live" | "active" | "confidential";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "source";
  /** Short qualifier shown next to the link, e.g. "original Forkify repository". */
  note?: string;
};

/**
 * Case-study content blocks. Text fields support `inline code` via backticks
 * and are rendered as plain text, never as HTML.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: { term: string; detail: string }[] }
  | { type: "diagram"; id: DiagramId; caption: string }
  | { type: "note"; text: string }
  | {
      type: "phases";
      items: {
        period: string;
        title: string;
        state: "done" | "planned";
        points: string[];
      }[];
    }
  | { type: "groups"; items: { label: string; values: string[] }[] };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Project = {
  slug: string;
  name: string;
  /** Earlier name, shown as context (e.g. "formerly Forkify ERP"). */
  formerly?: string;
  category: string;
  /** One-line summary for cards and metadata. */
  summary: string;
  /** Longer standfirst for the case-study header. */
  intro: string;
  status: { label: string; tone: StatusTone };
  period: string;
  role: string;
  stack: string[];
  /** Up to three short points shown on the home-page card. */
  highlights: string[];
  links: ProjectLink[];
  preview: PreviewId;
  /**
   * Brand icon in /public. `tile: "light"` places a transparent mark on a white
   * tile; `"self"` means the file already is a finished app-icon tile.
   */
  icon?: { src: string; tile: "light" | "self" };
  sections: Section[];
  /** Visual weight on the home page. */
  layout: "feature" | "compact";
};

export type Role = {
  title: string;
  start: string; // ISO yyyy-mm
  end: string | null; // null = present
  points: string[];
};

export type Experience = {
  company: string;
  summary: string;
  location: string;
  roles: Role[];
  caseStudy?: string;
};
