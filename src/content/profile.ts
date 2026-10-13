import type { Experience } from "@/lib/types";

export const hero = {
  eyebrow: "Software Engineer · Backend & Full-stack",
  headline: "I build software that solves real problems.",
  lede: "I work across backend systems, databases, enterprise workflows and full-stack applications — turning complex requirements into useful, maintainable software.",
  current: { role: "Software Engineer", company: "Alpide ERP" },
};

export const experience: Experience[] = [
  {
    company: "Alpide ERP",
    summary: "Cloud ERP platform for manufacturers, distributors and e-commerce businesses.",
    roles: [
      { title: "Software Engineer", start: "2026-07", end: null },
      { title: "Software Engineer Intern", start: "2025-08", end: "2026-06" },
    ],
    points: [
      "Build backend features in Java — REST APIs and the business logic behind ERP workflows.",
      "Write and maintain SQL: queries, views and stored procedures.",
      "Work on manufacturing-related processes within the ERP.",
      "Build web and React Native screens and integrate them with backend APIs.",
      "Take features across layers, from the database to the UI, as part of the engineering team.",
    ],
    caseStudy: "alpide-erp",
  },
];

/**
 * Grouped by capability. Only technologies evidenced by the Klyro repository
 * or supplied as part of the Alpide ERP role are listed.
 */
export const expertise: { area: string; note: string; items: string[] }[] = [
  {
    area: "Backend",
    note: "Services, APIs and the rules behind them",
    items: ["Java", "Spring Boot", "Spring Security", "JPA / Hibernate", "REST API design", "JWT auth"],
  },
  {
    area: "Data",
    note: "Modelling and querying relational data",
    items: ["SQL", "MySQL", "Views", "Stored procedures", "Schema design", "Transactions"],
  },
  {
    area: "Frontend",
    note: "Interfaces for operational software",
    items: ["React", "Redux", "JavaScript", "React Router", "Ant Design"],
  },
  {
    area: "Mobile",
    note: "Field and floor workflows on phones",
    items: ["React Native", "Expo", "Expo Router", "Redux Toolkit"],
  },
  {
    area: "ERP domain",
    note: "Workflows where quantities and states must agree",
    items: ["Inventory", "Procurement", "Manufacturing processes", "Multi-branch operations"],
  },
  {
    area: "Practice",
    note: "Keeping software working",
    items: ["JUnit 5 integration tests", "Cross-layer debugging", "Git", "GitHub Actions", "Docker Compose"],
  },
];

export const about = {
  paragraphs: [
    "I'm a software engineer with a background in computer science. At Alpide ERP I build and integrate software across backend services, databases, web and mobile, mostly around ERP and manufacturing workflows.",
    "Outside work I build my own products — Klyro and LifeSnail — where I make every decision, from the schema to the screen. I'm interested in building useful products and in the engineering problems underneath them.",
  ],
  education: {
    degree: "B.Sc. Computer Science (Honours with Research)",
    // Not yet confirmed — set once the official institution name is verified.
    institution: null as string | null,
    status: "Graduated",
  },
};
