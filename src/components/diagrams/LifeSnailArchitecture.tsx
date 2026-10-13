import { Flow, Node } from "./Figure";

export function LifeSnailArchitecture() {
  return (
    <div className="space-y-2 md:space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <Node title="Web" detail="React 19 · TypeScript · Vite" />
        <Node title="Mobile" detail="Expo · React Native" />
      </div>
      <div className="flex justify-center text-subtle" aria-hidden="true">
        <span className="font-mono text-[10px] tracking-wide uppercase">↓ HTTPS /api/v1 · JWT access + refresh</span>
      </div>
      <Node
        title="Node.js / Express API"
        detail="auth · expenses · groups · budgets · fitness · nutrition · diary · reminders · search · assistant"
        emphasis
      />
      <div className="hidden md:block">
        <Flow />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Node title="PostgreSQL" detail="Prisma schema + migrations" />
        <Node title="AI providers" detail="Groq → Gemini → OpenRouter → OpenAI" dashed />
        <Node title="OCR service" detail="Python · FastAPI · no LLMs" />
      </div>
    </div>
  );
}
