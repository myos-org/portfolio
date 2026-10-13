import { Flow, Node } from "./Figure";

export function KlyroArchitecture() {
  return (
    <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1.35fr_auto_1fr] md:gap-4">
      <div className="space-y-2">
        <p className="font-mono text-[11px] text-subtle uppercase">Clients</p>
        <Node title="Web app" detail="React 19 · Redux" />
        <Node title="Mobile app" detail="React Native · Expo" />
        <Node title="QR menu" detail="public · no login" dashed />
      </div>

      <Flow label="HTTPS · JWT" />

      <div className="space-y-2">
        <p className="font-mono text-[11px] text-subtle uppercase">Spring Boot API</p>
        <div className="space-y-2 rounded-lg border border-accent p-2">
          <Node title="Security filter chain" detail="stateless JWT · role checks" emphasis />
          <Node title="26 REST controllers" detail="/api/inventory, /api/grn, …" />
          <Node title="Services" detail="business rules · @Transactional" />
          <Node title="Spring Data repositories" detail="JPA / Hibernate" />
        </div>
      </div>

      <Flow label="JPA" />

      <div className="space-y-2">
        <p className="font-mono text-[11px] text-subtle uppercase">Data &amp; services</p>
        <Node title="MySQL 8" detail="31 entities" emphasis />
        <Node title="Groq API" detail="optional · AI chat · 503 if unset" dashed />
      </div>
    </div>
  );
}
