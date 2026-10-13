import type { Experience } from "@/lib/types";

/*
 * Sourced from Aniket's LinkedIn profile export (Oct 2026) and the project
 * repositories. Nothing here goes beyond what those state.
 */

export const hero = {
  eyebrow: "Software Engineer · Full-stack, ERP & Mobile",
  headline: { before: "I build the", accent: "software", after: "businesses run on." },
  lede: "Full-stack engineer at Alpide ERP — from sales orders and supplier RFQs to CRM calling, HR workflows and production planning — in Java, Spring Boot, React, React Native and MySQL. Outside work I build my own products, from the schema to the screen.",
  modules: ["Sales", "Purchase", "Inventory", "CRM", "HRMS", "Finance", "Manufacturing"],
  current: { role: "Software Engineer", company: "Alpide ERP" },
  location: "Noida, India",
  stats: [
    { value: "6+", label: "ERP modules shipped in" },
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
          "Sales and purchase: built an RFQ comparison sheet that ranks supplier quotes item by item and generates one purchase order per supplier; added sales-order close, quotation profitability and configurable FIFO stock deduction when quotes become orders.",
          "Inventory: inventory ledger and movement reports, stock adjustments and consumable requests, backed by MySQL views and stored procedures.",
          "Manufacturing: MRP runs and a finite-capacity scheduling engine that books work orders against shift calendars and real machine, labour and equipment resources.",
          "Designed a transaction audit trail — full snapshots of every change plus business events — written asynchronously so it can never block or roll back a save.",
          "Finance screens (reconciliation, business expenses, payments), PDF templates for business documents, and product pages for the marketing site.",
        ],
      },
      {
        title: "Software Engineer Intern",
        start: "2025-08",
        end: "2026-05",
        points: [
          "CRM: Exotel calling with webhooks, leads, opportunities and meetings, scheduled email campaigns, and multi-account Google and Microsoft mail and calendar sync.",
          "Purchase: subcontract purchase orders, material issue slips, returnable challans, store requisitions and quality checks on goods receipt.",
          "HRMS and accounting: features and fixes across leave, shifts and overtime, and debugging critical sales, purchase and accounting flows.",
          "Manufacturing: BOMs and routings, and shop-floor execution on web and React Native, with inventory deducted as operations complete.",
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

/** Kept in step with the Leadership section of resume/resume.html. */
export const leadership: { role: string; org: string; date?: string }[] = [
  { role: "President", org: "Computer Science Society, University of Delhi" },
  {
    role: "Student Judge",
    org: "Innovate X Hackathon 2026 (inter-college), Shyam Lal College, University of Delhi",
    date: "February 2026",
  },
];

export const about = {
  paragraphs: [
    "I'm a software engineer who likes the parts of a product where numbers have to agree — stock, orders, money. At Alpide ERP I work across Java services, SQL, React and React Native — on sales, purchase, inventory, CRM, HRMS and manufacturing.",
    "Outside work I build my own products — Klyro, LifeSnail and Code Review — where I make every call, from the schema to the screen. I care about software that is useful, honest about what it does, and easy to keep working.",
  ],
  education: {
    degree: "Bachelor of Science (Honours with Research), Computer Science",
    institution: "University of Delhi" as string | null,
    status: "August 2022 — July 2026",
  },
};
