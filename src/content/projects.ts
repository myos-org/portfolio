import type { Project } from "@/lib/types";

/*
 * Every claim below is traceable:
 *  - Klyro: github.com/myos-org/forkify-ERP (source, docs/audit, docs/engineering),
 *    with the backend suite re-run locally on 2026-10-13 (22 tests, 0 failures).
 *  - LifeSnail: scope as supplied by Aniket; source is private and no public
 *    demo was available to audit, so nothing beyond the scope is claimed.
 *  - Alpide ERP: contribution areas as supplied by Aniket; company description
 *    from alpide.com. No internal detail is published.
 */

const klyro: Project = {
  slug: "klyro",
  name: "Klyro",
  formerly: "Forkify ERP",
  category: "Restaurant operations & ERP platform",
  summary:
    "A multi-branch restaurant ERP — Spring Boot API, React web app and React Native mobile app — that began as my college project and is now being rebuilt with production habits.",
  intro:
    "Klyro connects the operational work of a multi-branch restaurant business — recipes and their costs, raw-material stock, purchasing, inter-branch transfers, menus, sales and loyalty — behind one API used by a web app and a mobile app. It started as Forkify ERP, my college project, and I've kept developing it well past that scope.",
  status: { label: "In active development", tone: "active" },
  period: "2026 — present",
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
      label: "Source on GitHub",
      href: "https://github.com/myos-org/forkify-ERP",
      kind: "source",
      note: "repository still uses the original Forkify ERP name",
    },
  ],
  preview: "klyro",
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
          text: "The project has three distinct stages, and it matters to keep them apart: what the college project delivered, what I've done since, and what is still a plan.",
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
            {
              period: "Next",
              title: "Engineering hardening",
              state: "planned",
              points: [
                "Composite indexes, optimistic locking on master data and row locks on stock updates",
                "Redis caching, a transactional outbox with Kafka, and idempotency keys on mutations",
                "Structured logging with correlation IDs, rate limiting, multi-tenancy and offline mobile sync",
              ],
            },
          ],
        },
        {
          type: "note",
          text: "The hardening stage is a roadmap, not shipped work. The repository's Docker Compose file already provisions Redis and Kafka containers, but no application code uses them yet.",
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
      title: "Lessons and next steps",
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
        {
          type: "p",
          text: "Next on the roadmap: indexes and locking on inventory updates, caching for read-heavy catalogue and report endpoints, an outbox for reliable events, idempotency keys for retries, and moving the web app from Create React App to Vite.",
        },
      ],
    },
  ],
};

const lifesnail: Project = {
  slug: "lifesnail",
  name: "LifeSnail",
  category: "Personal life-management platform",
  summary:
    "A live web app that brings personal finance, health habits and reminders into one place, with AI assistance where it saves effort.",
  intro:
    "LifeSnail is a personal life-management web app. It is live, and its source code is private — so this case study focuses on the product and the decisions behind it rather than the code.",
  status: { label: "Live · source private", tone: "live" },
  period: "Personal project",
  role: "Personal project",
  stack: [],
  highlights: [
    "Expense tracking and budgeting",
    "Fitness and food logging",
    "Reminders and AI-assisted workflows",
  ],
  links: [],
  preview: "lifesnail",
  layout: "feature",
  sections: [
    {
      id: "problem",
      title: "The problem",
      blocks: [
        {
          type: "p",
          text: "Personal admin is usually spread across a budgeting app, a fitness tracker, a food log and a reminders list. Each one holds part of the picture, and none of them talk to each other.",
        },
        {
          type: "p",
          text: "LifeSnail treats these as what they are — one person's data — and keeps them in one place.",
        },
      ],
    },
    {
      id: "scope",
      title: "Product scope",
      blocks: [
        {
          type: "facts",
          items: [
            { term: "Money", detail: "Expense tracking and budgeting." },
            { term: "Health", detail: "Fitness and food logging." },
            { term: "Time", detail: "Reminders." },
            { term: "Assistance", detail: "AI-assisted workflows across the app." },
          ],
        },
      ],
    },
    {
      id: "status",
      title: "Status",
      blocks: [
        {
          type: "p",
          text: "LifeSnail is live. Because the codebase is private there is no repository link, and implementation details are shared only where they don't expose private code.",
        },
        {
          type: "note",
          text: "A fuller write-up — feature walkthrough, screenshots and architecture — is in progress and will be published once it has been reviewed against the live app.",
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
    "Backend, database, web and mobile work on a cloud ERP platform — first as an intern, now full-time. Described at a high level; no confidential details.",
  intro:
    "Alpide ERP is a cloud ERP platform used by manufacturers, distributors and e-commerce businesses. I joined its engineering team as a Software Engineer Intern in August 2025 and moved into a full-time Software Engineer role in July 2026.",
  status: { label: "Professional · confidential", tone: "confidential" },
  period: "Aug 2025 — present",
  role: "Software Engineer, within the engineering team",
  stack: ["Java", "REST APIs", "SQL", "Views & stored procedures", "React", "React Native"],
  highlights: [
    "Java REST APIs and the business logic behind ERP workflows",
    "SQL queries, views and stored procedures",
    "Web and React Native features, integrated end to end",
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
          text: "This is company work. There is no proprietary code, internal screenshot, customer data or private URL on this page, and the features I describe were built as part of a team.",
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
            { term: "Backend", detail: "Java services and REST APIs that implement ERP business rules." },
            { term: "Database", detail: "SQL queries, views and stored procedures." },
            { term: "ERP workflows", detail: "Business processes across the platform, including manufacturing-related functionality." },
            { term: "Web", detail: "Frontend screens that use those APIs." },
            { term: "Mobile", detail: "React Native features for the mobile application." },
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
          type: "p",
          text: "Because I work on every layer, I can follow a requirement — or a bug — from the screen down to the query and back, instead of handing it over at each boundary.",
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
              detail: "Views and stored procedures sit close to the data and handle set-based work well; logic in the Java service is easier to test, review and reuse. Deciding where a rule lives is a recurring design question.",
            },
            {
              term: "One API, two clients",
              detail: "Web and mobile screens depend on the same endpoints, so a contract change has to work for both.",
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

export const projects: Project[] = [klyro, lifesnail, alpide];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
