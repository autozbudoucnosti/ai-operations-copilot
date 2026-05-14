import { AlertTriangle } from "lucide-react";
import type { OperationsAnalysis } from "@/lib/schemas";

type BottlenecksProps = {
  blockers: OperationsAnalysis["blockers"];
};

export function Bottlenecks({ blockers }: BottlenecksProps) {
  return (
    <section className="rounded-lg border border-line bg-panel shadow-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <AlertTriangle size={18} className="text-amber" aria-hidden="true" />
        <h2 className="text-base font-semibold text-ink">Blokery a rizika</h2>
      </div>

      <div className="space-y-3 p-4">
        {blockers.map((blocker) => (
          <article key={blocker.issue} className="rounded-md border border-line p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber">
              Blokující bod
            </p>
            <h3 className="mt-2 text-sm font-semibold leading-5 text-ink">
              {blocker.issue}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{blocker.risk}</p>
            <p className="mt-3 rounded bg-amber/10 px-3 py-2 text-xs leading-5 text-amber">
              {blocker.suggestedFix}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
