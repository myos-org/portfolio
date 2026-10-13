import type { Experience } from "@/lib/types";

/*
 * Sourced from Aniket's LinkedIn profile export (Oct 2026) and the project
 * repositories. Nothing here goes beyond what those state.
 */

export const hero = {
  eyebrow: "Software Engineer · Full-stack & Mobile",
  headline: { before: "I build the", accent: "systems", after: "behind real work." },
  lede: "Full-stack engineer at Alpide ERP, building the manufacturing side of a cloud ERP — MRP, capacity scheduling, shop-floor execution — in Java, Spring Boot, React and MySQL. Outside work I build my own products, from the schema to the screen.",
  current: { role: "Software Engineer", company: "Alpide ERP" },
  location: "Noida, India",
  stats: [
    { value: "6+", label: "ERP modules worked across" },
    { value: "3", label: "products built end to end" },
    { value: "2025", label: "shipping at Alpide since" },
  ],
};

export const experience: Experience[] = [
  {
    company: "Alpide ERP",
    summary: "Cloud ERP platform for manufacturers, distributors and e-commerce businesses.",
    location: "Noida, Uttar Pradesh",
    roles: [
      {
        title: "Software Engineer",
        start: "2026-07",
        end: null,
        points: [
          "Manufacturing planning: master production schedules and MRP runs — results, exceptions, and converting planned orders into work orders and purchase requests.",
          "Built a finite-capacity scheduling engine that books work orders against each work center's shift calendar and resource pool, with side-effect-free previews and cost- or time-first strategies.",
          "Turned work-center capacity from a single number into real machines, labour and equipment with status and efficiency, shared by the scheduler and the shop floor.",
          "Designed the manufacturing audit trail: every create, update and delete across the module, plus business events, recorded with full snapshots — without ever blocking the business transaction.",
          "Built an RFQ comparison sheet that ranks supplier quotes item by item, supports split awards and generates one purchase order per supplier.",
        ],
      },
      {
        title: "Software Engineer Intern",
        start: "2025-08",
        end: "2026-05",
        points: [
          "Shop-floor execution: operator assignment, setup, run and inspection time, scrap and quality checks, with inventory deducted as operations complete.",
          "Bills of materials and routings — variants, sub-assemblies, phantom kits — and work-order material request, issue and consumption.",
          "Subcontracting: subcontract purchase orders, material issue slips, returnable challans and quality checks on goods receipt.",
          "Integrations: Exotel calling for the CRM, email campaigns, and multi-account Google and Microsoft mail and calendar sync.",
          "Fixes and features across Sales, Purchase, Inventory and Accounting — from FIFO stock deduction on order conversion to inventory ledger reports.",
        ],
      },
    ],
    caseStudy: "alpide-erp",
  },
];

/**
 * Grouped by capability. Only technologies evidenced by the project
 * repositories or listed for the Alpide ERP role.
 */
export const expertise: { area: string; note: string; items: string[] }[] = [
  {
    area: "Backend",
    note: "Services, APIs and the rules behind them",
    items: ["Java", "Spring Boot", "Spring Cloud", "JPA / Hibernate", "Microservices", "Node.js", "Express"],
  },
  {
    area: "Data",
    note: "Modelling and querying relational data",
    items: ["MySQL", "PostgreSQL", "Prisma", "Views", "Stored procedures", "Schema design"],
  },
  {
    area: "Frontend",
    note: "Interfaces for operational software",
    items: ["React", "Redux", "TypeScript", "Ant Design", "ag-Grid", "Tailwind CSS"],
  },
  {
    area: "Mobile",
    note: "Field and floor workflows on phones",
    items: ["React Native", "Expo", "Expo Router", "Redux Toolkit"],
  },
  {
    area: "AI tooling",
    note: "LLM features that stay grounded",
    items: ["Python", "LangGraph", "LangChain", "FastAPI", "Structured output", "Multi-provider fallback"],
  },
  {
    area: "Practice",
    note: "Keeping software working",
    items: ["JUnit 5", "pytest", "Jest / Vitest", "GitHub Actions", "Docker Compose", "Git"],
  },
];

export const about = {
  paragraphs: [
    "I'm a software engineer who likes the parts of a product where numbers have to agree — stock, orders, money. At Alpide ERP I work across Java services, SQL, React and React Native, mostly on manufacturing and inventory workflows.",
    "Outside work I build my own products — Klyro, LifeSnail and Code Review — where I make every call, from the schema to the screen. I care about software that is useful, honest about what it does, and easy to keep working.",
  ],
  education: {
    degree: "B.Sc. (Hons.) Computer Science",
    institution: "University of Delhi" as string | null,
    status: "2022 — 2026",
  },
};
