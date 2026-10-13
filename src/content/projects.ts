import type { Project } from "@/lib/types";

/*
 * Every claim below is traceable:
 *  - Klyro: github.com/myos-org/forkify-ERP (source, docs/audit, docs/engineering),
 *    with the backend suite re-run locally on 2026-10-13 (22 tests, 0 failures).
 *    Completed and live (confirmed by Aniket); no roadmap is published.
 *  - LifeSnail: the project's own README and docs (private repository). No
 *    code, screenshots or links are published.
 *  - Code Review: the project's source and README (private repository).
 *    README roadmap items not in the code are labelled as planned.
 *  - Alpide ERP: Aniket's LinkedIn profile export and alpide.com. No internal
 *    detail is published.
 */

const klyro: Project = {
  slug: "klyro",
  name: "Klyro",
  formerly: "Forkify ERP",
  category: "Restaurant operations & ERP platform",
  summary:
    "A multi-branch restaurant ERP — Spring Boot API, React web app and React Native mobile app — that began as my college project and was finished with production habits. Completed and live.",
  intro:
    "Klyro connects the operational work of a multi-branch restaurant business — recipes and their costs, raw-material stock, purchasing, inter-branch transfers, menus, sales and loyalty — behind one API used by a web app and a mobile app. It started as Forkify ERP, my college project, and I took it well past that scope — audited, tested, rebranded and shipped. The project is complete and live.",
  status: { label: "Completed · Live", tone: "live" },
  period: "Mar — Oct 2026",
  role: "Backend, web and mobile development",
  stack: [
    "Java 17",
    "Spring Boot 3",
    "Spring Security · JWT",
    "JPA / Hibernate",
    "MySQL 8",
    "React 19",
    "Redux",
    "React Native · Expo",
    "JUnit 5",
    "GitHub Actions",
  ],
  highlights: [
    "Procurement chain from indent to purchase order to goods receipt, updating stock",
    "Inter-branch transfers modelled as a validated state machine",
    "12 defects fixed in a full audit, backed by 22 backend integration tests",
  ],
  links: [
    {
      label: "Open the live app",
      href: "https://forkify-erp-851w.vercel.app/",
      kind: "live",
    },
    {
      label: "Source on GitHub",
      href: "https://github.com/myos-org/forkify-ERP",
      kind: "source",
      note: "repository still uses the original Forkify ERP name",
    },
  ],
  preview: "klyro",
  icon: { src: "/projects/klyro/symbol.svg", tile: "light" },
  layout: "feature",
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "p",
          text: "A restaurant business with several branches has a central kitchen or head office that defines recipes and menus, and branches that cook, sell, waste and reorder ingredients every day. Questions like “what does this dish cost us right now?”, “which branch is about to run out of paneer?” or “has this purchase order actually arrived?” are hard to answer when that work lives in separate spreadsheets.",
        },
        {
          type: "p",
          text: "Klyro puts those workflows on one Spring Boot API with a MySQL database. A React web app serves head-office and branch staff, an Expo mobile app covers the same operations on the floor, and a public QR menu lets diners order without an account.",
        },
      ],
    },
    {
      id: "users",
      title: "Who it's for",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "Head office admins",
              detail: "Manage users and branches, review audit logs and analytics, and own the master recipes and menus.",
            },
            {
              term: "Branch managers",
              detail: "Run stock, procurement, production, wastage approvals and staff shifts for their branch.",
            },
            {
              term: "Staff",
              detail: "See their own shifts and clock in and out.",
            },
            {
              term: "Diners",
              detail: "Order from a public QR menu that shows live availability. Orders create or update a customer record automatically.",
            },
          ],
        },
      ],
    },
    {
      id: "evolution",
      title: "From Forkify ERP to Klyro",
      blocks: [
        {
          type: "p",
          text: "The project went through four stages: what the college project delivered, getting it ready to host, hardening it, and shipping it under a new name.",
        },
        {
          type: "phases",
          items: [
            {
              period: "Mar 2026",
              title: "Forkify ERP — academic scope",
              state: "done",
              points: [
                "Spring Boot + MySQL backend with JWT authentication and role-based access",
                "React web app and Expo mobile app over the same API",
                "Recipes, inventory, procurement, meal planning, menus and QR ordering, sales and loyalty, shifts, reports, and a Groq-powered assistant",
              ],
            },
            {
              period: "May 2026",
              title: "Hosting groundwork",
              state: "done",
              points: ["Database dialect and web-server configuration for running outside a local machine"],
            },
            {
              period: "Oct 2026",
              title: "Stabilisation",
              state: "done",
              points: [
                "Audited every module against its screens, endpoints and tables",
                "Fixed 12 defects, from an auth bypass to stock that could go negative",
                "Added 22 backend integration tests and a GitHub Actions pipeline",
              ],
            },
            {
              period: "Oct 2026",
              title: "Rebrand to Klyro",
              state: "done",
              points: [
                "New identity and design tokens across the web app, mobile app and landing page",
                "User-facing names changed; packages, tables, API routes and mobile bundle IDs deliberately kept",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "diagram",
          id: "klyro-architecture",
          caption:
            "Three clients share one stateless API. Web and mobile send a JWT on every request; the QR menu uses two explicitly public endpoints. The AI assistant is the only outbound integration.",
        },
        {
          type: "p",
          text: "Inside the API, a JWT filter runs before any controller. 26 REST controllers delegate to service classes that hold the business rules and run inside transactions, and Spring Data JPA repositories map 31 entities onto MySQL. Tests run the same code against H2 in MySQL compatibility mode.",
        },
        {
          type: "groups",
          items: [
            { label: "Backend", values: ["Java 17", "Spring Boot 3.1", "Spring Security", "Spring Data JPA", "Bean Validation", "JJWT", "MySQL 8"] },
            { label: "Web", values: ["React 19", "Redux", "React Router 7", "Ant Design 6", "Axios"] },
            { label: "Mobile", values: ["React Native 0.76", "Expo 52", "Expo Router", "Redux Toolkit"] },
            { label: "Delivery", values: ["JUnit 5", "H2 (MySQL mode)", "GitHub Actions", "Docker Compose"] },
          ],
        },
      ],
    },
    {
      id: "decisions",
      title: "Implementation decisions",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "A small, explicit public surface",
              detail: "Sessions are stateless (`SessionCreationPolicy.STATELESS`) with 24-hour tokens. Only login and registration, first-run setup and the public menu endpoints are `permitAll`; everything else needs a bearer token, and admin endpoints need `ROLE_ADMIN`.",
            },
            {
              term: "Every stock movement leaves a record",
              detail: "Stock-in, production, wastage and transfers each write a `stock_transactions` row in the same transaction as the quantity change, so any balance can be traced back to the events that produced it.",
            },
            {
              term: "Workflows as state machines",
              detail: "Transfers move `PENDING → APPROVED → DISPATCHED → RECEIVED`, wastage must be approved before it deducts stock, and purchasing runs indent → purchase order → goods receipt. Each transition checks the current state before doing anything.",
            },
            {
              term: "Branch boundaries on head-office data",
              detail: "Branch managers can read but not edit recipes owned by head office, and non-admin users can only buy from approved or branch-level suppliers.",
            },
            {
              term: "Recipe history as snapshots",
              detail: "Each recipe edit stores a JSON snapshot with a change summary, so a previous version — including its ingredient list — can be restored.",
            },
            {
              term: "An assistant that fails safely",
              detail: "The AI endpoint builds its prompt from live recipe, stock and sales data. If no API key is configured it returns HTTP 503 with a clear message instead of failing at startup.",
            },
            {
              term: "Rename what users see, not what systems depend on",
              detail: "The Klyro rebrand changed screens, titles, icons and the app display name, but kept Java packages, table names, API routes and mobile bundle identifiers so nothing downstream had to migrate.",
            },
          ],
        },
      ],
    },
    {
      id: "data-flow",
      title: "Stock and procurement flow",
      blocks: [
        {
          type: "diagram",
          id: "klyro-procurement",
          caption:
            "Purchasing feeds inventory. Confirming a goods receipt credits stock, writes a STOCK_IN transaction and moves the purchase order to PARTIAL or RECEIVED based on the quantities received per line.",
        },
        {
          type: "diagram",
          id: "klyro-transfer-states",
          caption:
            "Inter-branch transfer lifecycle. Dispatch validates stock for every line before deducting anything; cancelling a dispatched transfer refunds the source branch.",
        },
      ],
    },
    {
      id: "data-model",
      title: "Data model",
      blocks: [
        {
          type: "p",
          text: "The schema has 31 entities. Grouped by domain, the core of it looks like this:",
        },
        {
          type: "groups",
          items: [
            { label: "Organisation", values: ["users", "branches", "audit_logs", "shifts"] },
            { label: "Catalogue", values: ["recipes", "recipe_ingredients", "recipe_steps", "recipe_versions", "ingredients"] },
            { label: "Inventory", values: ["inventory_items", "finished_good_stock", "stock_transactions", "wastage_records", "stock_transfers"] },
            { label: "Procurement", values: ["suppliers", "material_indents", "purchase_orders", "po_items", "goods_received"] },
            { label: "Sales", values: ["menus", "menu_items", "branch_menu_prices", "sales_entries", "customers"] },
            { label: "Planning", values: ["meal_plans", "meal_plan_items", "production_logs"] },
          ],
        },
        {
          type: "p",
          text: "Service classes are annotated `@Transactional`, so multi-step operations — confirming a goods receipt, logging production, approving wastage — update quantities, statuses and the transaction ledger together or not at all.",
        },
      ],
    },
    {
      id: "challenges",
      title: "Problems I found and fixed",
      blocks: [
        {
          type: "p",
          text: "The October audit traced each module from screen to endpoint to table. These were the most instructive defects:",
        },
        {
          type: "facts",
          items: [
            {
              term: "Editing a recipe duplicated its ingredients",
              detail: "The update deleted child rows through a repository, but the managed `Recipe` entity still held them in its collection, so Hibernate's cascade re-inserted them on save. Clearing the collections on the entity before re-populating fixed it; the same bug existed in menu updates.",
            },
            {
              term: "Purchase orders never reached RECEIVED",
              detail: "Goods-receipt confirmation checked whether every line had `receivedQuantity >= quantity`, but never incremented `receivedQuantity`. Orders stayed PARTIAL forever. The fix updates each line before evaluating completion, and a test now covers a partial receipt followed by the remainder.",
            },
            {
              term: "Transfers could push stock negative — and lose it",
              detail: "Dispatch clamped quantities with `Math.max(0, …)` instead of validating, and cancelling a dispatched transfer didn't return the stock. Dispatch now validates every line up front, and cancellation refunds the source branch with a ledger entry.",
            },
            {
              term: "Disabled users could still sign in",
              detail: "`UserDetailsImpl.isEnabled()` was hard-coded to `true`. It now reflects the user record, with a regression test asserting HTTP 401.",
            },
            {
              term: "The mobile app called endpoints that didn't exist",
              detail: "Mobile report screens requested six `/api/reports/*` endpoints with no backend controller behind them, and one screen redirected to itself in a loop. I implemented the controller against the contract the client already expected and covered all six endpoints with integration tests.",
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Testing and verification",
      blocks: [
        {
          type: "p",
          text: "The backend suite uses JUnit 5 and Spring Boot Test against an in-memory H2 database in MySQL mode. I re-ran it on 13 October 2026 with JDK 17: 22 tests, 0 failures, 0 errors.",
        },
        {
          type: "facts",
          items: [
            { term: "Auth integration (4)", detail: "Registration and login, disabled users rejected, first-run setup without a token, protected routes return 401." },
            { term: "Stock transfers (3)", detail: "Insufficient stock blocks dispatch, cancellation refunds, full A-to-B workflow." },
            { term: "Inventory (4)", detail: "Stock-in ledger, low-stock filtering, wastage approval and rejection." },
            { term: "Recipes (3)", detail: "Cost per serving, no duplicate ingredients on update, branch cannot edit head-office recipes." },
            { term: "Procurement (2)", detail: "Indent to purchase order, partial then complete goods receipt." },
            { term: "Reports (6)", detail: "Response schema and data for all six report endpoints." },
          ],
        },
        {
          type: "p",
          text: "A GitHub Actions workflow runs the backend tests and packages the JAR, builds and tests the web app, validates the mobile app configuration, builds the landing page and checks the Docker setup.",
        },
        {
          type: "note",
          text: "Coverage is concentrated on the workflows that had defects. Most controllers don't have direct tests yet, and the web app has a single smoke test.",
        },
      ],
    },
    {
      id: "lessons",
      title: "Lessons",
      blocks: [
        {
          type: "list",
          items: [
            "ORM state and database state can disagree. When code deletes rows behind Hibernate's back, the in-memory collection still wins on the next save.",
            "Validate before side effects. A workflow step should check everything it needs and then change state — never change state and clamp the damage.",
            "Clients and server drift apart quietly. Tests at the API boundary catch missing endpoints before a screen does.",
            "A rename is a product change, not a schema migration. Keeping technical identifiers stable made the rebrand low-risk.",
          ],
        },
      ],
    },
  ],
};

const lifesnail: Project = {
  slug: "lifesnail",
  name: "LifeSnail",
  category: "Personal life OS",
  summary:
    "One app for money, fitness, food and daily life. Tell it what you want — click, type, speak or scan a bill — and it routes the request to the right module. Nothing changes until you confirm.",
  intro:
    "LifeSnail is a personal operating system: expenses and shared bills, workouts and nutrition, diary, todos and reminders, behind one command bar and an AI assistant that can only act through tools you approve. It is live, and its source is private — so this case study covers the product and its architecture, not the code.",
  status: { label: "Live · source private", tone: "live" },
  period: "2026 — present",
  role: "Product, backend, web and mobile",
  stack: [
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS 4",
    "Expo · React Native",
    "FastAPI (OCR)",
  ],
  highlights: [
    "Splitwise-style groups with four split modes and debt simplification",
    "One command pipeline for voice and text; common commands skip the AI entirely",
    "AI assistant limited to 16 validated tools — every write waits for confirmation",
  ],
  links: [
    {
      label: "Open the live app",
      href: "https://my-life-os-diary-web.vercel.app/",
      kind: "live",
      note: "deployment still uses the working title My Life OS",
    },
  ],
  preview: "lifesnail",
  icon: { src: "/projects/lifesnail/icon.svg", tile: "self" },
  layout: "feature",
  sections: [
    {
      id: "problem",
      title: "The problem",
      blocks: [
        {
          type: "p",
          text: "Personal admin is usually spread across a budgeting app, a bill-splitting app, a fitness tracker, a food log and a reminders list. Each holds part of the picture and none of them talk to each other.",
        },
        {
          type: "p",
          text: "LifeSnail treats all of it as what it is — one person's data — and puts it behind a single way of asking for things.",
        },
      ],
    },
    {
      id: "scope",
      title: "What it does",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "Money",
              detail: "Expenses with categories, multi-currency and CSV export; budgets with live status; recurring expenses that can pause, resume and catch up missed dates; groups with `EQUAL`, `EXACT`, `PERCENTAGE` and `SHARES` splits, settlements and debt simplification.",
            },
            {
              term: "Bill scanning",
              detail: "OCR first, then AI interpretation, then rule-based checks on totals, tax and discounts before anything is saved.",
            },
            {
              term: "Fitness",
              detail: "Workouts and plans, an exercise library, an AI plan generator that saves drafts, and a gym-machine scanner that matches a photo to a machine and its exercises.",
            },
            {
              term: "Food",
              detail: "Food logging backed by a food database and OpenFoodFacts, with quantity parsing (\"200g chicken\") and daily totals. Every value is labelled as user-provided, database or estimated.",
            },
            {
              term: "Life",
              detail: "Diary, todos, reminders with push notifications, an activity timeline, global search and a dashboard.",
            },
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "diagram",
          id: "lifesnail-architecture",
          caption:
            "Web and mobile share one modular Node.js API. PostgreSQL holds the data; the only separate service is a small Python OCR service, because it has native dependencies. LLM providers sit behind a fallback chain.",
        },
        {
          type: "p",
          text: "The backend is one modular service, not a set of microservices — auth, expenses, groups, budgets, fitness, nutrition, diary, reminders, search, analytics and the assistant are modules in the same Express app, with Prisma migrations against PostgreSQL. Clients authenticate with JWT access and refresh tokens.",
        },
      ],
    },
    {
      id: "decisions",
      title: "Decisions that shaped it",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "Deterministic before AI",
              detail: "Voice and the command bar share one pipeline (`POST /api/v1/commands`). Common commands — \"spent 500 on dinner\", \"log 200g chicken\", \"who owes me\" — run through a parser with no model call. AI is the fallback, not the default.",
            },
            {
              term: "The assistant proposes, the user disposes",
              detail: "The assistant can only call a fixed registry of 16 backend tools. Arguments are validated and ownership is checked, and every write comes back as a pending action the user confirms. It never gets database access, SQL or code execution.",
            },
            {
              term: "Providers are configuration",
              detail: "LLM calls go to OpenAI-compatible providers with automatic fallback — Groq, then Gemini, then OpenRouter, then OpenAI. Without any key the app still runs: AI features return a clear `AI_NOT_CONFIGURED` error and the parser keeps working.",
            },
            {
              term: "Insights from data, never invented",
              detail: "Insights are computed from what the user has stored, with a clear not-advice disclaimer. Conversation history is optional and deleted after a retention period.",
            },
          ],
        },
      ],
    },
    {
      id: "delivery",
      title: "Testing and delivery",
      blocks: [
        {
          type: "p",
          text: "Each package has its own test suite — Jest for the API and the mobile app, Vitest for the web app, pytest for the OCR service — and a GitHub Actions workflow runs CI for all four.",
        },
        {
          type: "note",
          text: "The source is private, so there is no repository link — but the app itself is live and open to try.",
        },
      ],
    },
  ],
};

const codeReview: Project = {
  slug: "code-review",
  name: "Code Review",
  category: "AI developer tool",
  summary:
    "An agent that reviews GitHub pull requests — fetches the diff, finds bugs and risky changes, and writes the review. Bring your own model key, so it costs nothing to host.",
  intro:
    "Code Review takes a pull-request URL, pulls the diff from GitHub, asks a model for structured findings, throws away anything that doesn't point at the diff, and writes the review comment. It's built around Bring Your Own Key: visitors pick a provider and paste their own key, which lives only for that request.",
  status: { label: "In development · source private", tone: "active" },
  period: "2026 — present",
  role: "Agent, API and UI",
  stack: ["Python 3.12", "LangGraph", "LangChain", "FastAPI", "Streamlit", "Pydantic", "httpx", "Chroma", "pytest", "Docker"],
  highlights: [
    "fetch → analyze → summarize as a LangGraph pipeline",
    "Findings grounded against the diff — hallucinated files are dropped",
    "Five providers behind one factory; keys never stored or logged",
  ],
  links: [],
  preview: "code-review",
  icon: { src: "/projects/code-review/icon.svg", tile: "self" },
  layout: "feature",
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "p",
          text: "Most LLM portfolio apps either burn the author's API credits or go offline when they run out. Code Review never touches my key: you choose a provider and model, paste your own key, and give it a pull request.",
        },
        {
          type: "p",
          text: "It runs as a Streamlit app for people and a FastAPI service for programs, both calling the same agent.",
        },
      ],
    },
    {
      id: "pipeline",
      title: "How a review runs",
      blocks: [
        {
          type: "diagram",
          id: "code-review-pipeline",
          caption:
            "A three-node LangGraph. Generated files and lock files are filtered out of the diff, and the prompt is cut to a fixed budget — largest files dropped first — before the model is ever called.",
        },
        {
          type: "p",
          text: "The analyze step uses structured output: each finding has a severity, a file and an optional line. The summarize step turns the surviving findings into a review comment.",
        },
      ],
    },
    {
      id: "decisions",
      title: "Implementation decisions",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "Ground findings in the diff",
              detail: "A finding on a file the PR doesn't touch is a hallucination, so it's dropped. A line number outside the diff is cleared rather than trusted, so the finding survives but can never become a misplaced inline comment. Results are sorted by severity.",
            },
            {
              term: "Keys live for one request",
              detail: "Model keys and GitHub tokens are modelled as `SecretStr`, kept out of tracebacks and `repr()`, and never logged, persisted or returned. The GitHub token lives in a closure, not the graph state, so it's never part of anything the graph returns.",
            },
            {
              term: "One vendor-aware module",
              detail: "A provider factory turns (provider, model, key) into a LangChain chat model — Groq, Anthropic, OpenAI, Google or a local Ollama. The agent never knows which vendor it's talking to, and SDKs are imported lazily so a missing one only breaks its own provider.",
            },
            {
              term: "A free tier that costs $0",
              detail: "If the host sets a free-tier Groq key, each visitor gets three reviews on it. When those run out — or Groq returns HTTP 429 — the UI asks for the visitor's own key. A pasted key always takes priority.",
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Testing",
      blocks: [
        {
          type: "p",
          text: "A pytest suite of 22 tests covers the provider factory, finding grounding and ordering, PR fetching and diff filtering, and the free-tier rules. Linting uses Ruff.",
        },
      ],
    },
    {
      id: "roadmap",
      title: "Where it's going",
      blocks: [
        {
          type: "phases",
          items: [
            {
              period: "2026",
              title: "Working pipeline",
              state: "done",
              points: [
                "Provider factory with five backends and the optional free tier",
                "PR fetching with generated-file filtering and a prompt budget",
                "Structured, diff-grounded findings; Streamlit UI, FastAPI and Docker",
              ],
            },
            {
              period: "Next",
              title: "Deeper reviews",
              state: "planned",
              points: [
                "A dedicated security-scanning node",
                "Follow-up questions over the diff, using an ephemeral Chroma store",
                "Comparison mode — two models on one PR, side by side",
                "Posting the review back to the PR, and an evaluation harness over a fixed set of PRs",
              ],
            },
          ],
        },
      ],
    },
  ],
};

const alpide: Project = {
  slug: "alpide-erp",
  name: "Alpide ERP",
  category: "Professional work",
  summary:
    "Features across a cloud ERP — sales, purchase, inventory, CRM, HRMS, finance and manufacturing — on React, Java services and MySQL. First as an intern, now full-time.",
  intro:
    "Alpide ERP is a cloud ERP platform used by manufacturers, distributors and e-commerce businesses. I joined its engineering team as a Software Engineer Intern in August 2025 and moved into a full-time Software Engineer role in July 2026. I work across most of the product — sales, purchase, inventory, CRM, HRMS, finance and manufacturing — and across its layers: the React web app, the Java services, the SQL beneath them and the React Native app.",
  status: { label: "Professional · confidential", tone: "confidential" },
  period: "Aug 2025 — present",
  role: "Software Engineer, within the engineering team",
  stack: ["Java 17", "Spring Boot 3", "Spring Cloud", "MySQL", "React", "Redux", "Ant Design", "React Native", "Node.js (PDF)"],
  highlights: [
    "RFQ comparison, subcontracting and sales-order workflows",
    "CRM integrations: Exotel calling, mail and calendar sync",
    "Inventory ledgers, audit trail and capacity scheduling",
  ],
  links: [],
  preview: "alpide",
  layout: "compact",
  sections: [
    {
      id: "confidentiality",
      title: "A note on confidentiality",
      blocks: [
        {
          type: "note",
          text: "This is company work. There is no proprietary code, internal screenshot, customer data or private URL on this page. I describe features and design approaches only, and they were built as part of a team.",
        },
      ],
    },
    {
      id: "scope",
      title: "What I work on",
      blocks: [
        {
          type: "facts",
          items: [
            { term: "Sales", detail: "Sales-order close, quotation profitability, a setting for how stock is deducted (FIFO by default) when a quote becomes an order, and customer–supplier party sync." },
            { term: "Purchase", detail: "RFQ comparison and award, subcontract purchase orders, material issue slips, returnable challans, store requisitions and goods-receipt quality checks." },
            { term: "Inventory", detail: "Inventory ledger and movement reports, stock adjustments, consumable requests and inventory issue management." },
            { term: "CRM", detail: "Leads, opportunities and meetings; Exotel calling with webhooks; scheduled email campaigns; multi-account Google and Microsoft mail and calendar sync." },
            { term: "HRMS & finance", detail: "Leave, shifts and overtime; reconciliation, business-expense and payment screens; fixes in critical accounting flows." },
            { term: "Manufacturing", detail: "BOMs and routings, MRP runs, finite-capacity scheduling and shop-floor execution, with inventory deducted as operations complete." },
            { term: "Documents & web", detail: "PDF templates for quotes, work orders and issue slips; product pages for the marketing site; screens for the internal content admin." },
          ],
        },
      ],
    },
    {
      id: "engineering",
      title: "Selected engineering",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "An audit trail that can't break a save",
              detail: "Entity listeners publish events; an asynchronous listener writes the audit record in its own transaction. A failed audit write never rolls back the business change, and each record carries a full snapshot plus typed traceability fields.",
            },
            {
              term: "Reuse over rebuild",
              detail: "The RFQ comparison is computed live from the RFQ itself and hands the award to the existing purchase-order generator, rather than adding a parallel document flow. Reference links connect each document to the one it came from — MRP to purchase request, work order to subcontract PO.",
            },
            {
              term: "Third-party integrations",
              detail: "Exotel calling reaches the CRM through webhooks, and mail and calendar sync supports several Google and Microsoft accounts per user, so calls, email and meetings sit alongside the leads and opportunities they relate to.",
            },
            {
              term: "One scheduling engine, four callers",
              detail: "The same engine serves the schedule preview, MRP validation, work-order commit and load adjustment. It reads shift calendars — working days, breaks, overtime — keeps operations in sequence, refuses overlapping bookings on a resource and locks work orders that have started. Previews are pure simulations that never write.",
            },
          ],
        },
      ],
    },
    {
      id: "cross-layer",
      title: "Working across the stack",
      blocks: [
        {
          type: "diagram",
          id: "alpide-layers",
          caption:
            "A typical feature touches every layer: data shaped in SQL, rules enforced in a Java service behind a REST endpoint, and a web or React Native screen on top.",
        },
        {
          type: "groups",
          items: [
            { label: "Web", values: ["React", "Redux", "Ant Design", "ag-Grid", "ApexCharts"] },
            { label: "Services", values: ["Java 17", "Spring Boot 3", "Spring Cloud", "Feign clients", "API gateway"] },
            { label: "Data", values: ["MySQL", "Versioned release scripts", "Views", "Stored procedures"] },
            { label: "Also", values: ["React Native · Expo", "Node.js PDF service", "Next.js marketing site"] },
          ],
        },
        {
          type: "p",
          text: "Because I work on every layer, I can follow a requirement — or a bug — from the screen down to the query and back. Much of the hardest debugging is cross-module: a sales order, a stock commit and a purchase receipt that all have to agree.",
        },
      ],
    },
    {
      id: "trade-offs",
      title: "Trade-offs I work with",
      blocks: [
        {
          type: "facts",
          items: [
            {
              term: "SQL or service layer?",
              detail: "Views and stored procedures sit close to the data and handle set-based work like ledgers and paginated summaries well; logic in the Java service is easier to test, review and reuse. Deciding where a rule lives is a recurring design question.",
            },
            {
              term: "Services that call each other",
              detail: "Sales, purchase, inventory, CRM and manufacturing are separate services that call each other. Inter-service calls need fallbacks, and a change to one contract has to keep the others working.",
            },
            {
              term: "Numbers that have to agree",
              detail: "In an ERP, quantities and statuses connect documents to each other. A change in one workflow has to leave the related records consistent.",
            },
          ],
        },
      ],
    },
  ],
};

export const projects: Project[] = [klyro, lifesnail, codeReview, alpide];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
