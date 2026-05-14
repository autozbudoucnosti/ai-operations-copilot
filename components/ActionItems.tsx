import { CalendarClock, CheckSquare, UserRound } from "lucide-react";
import type { OperationsAnalysis } from "@/lib/schemas";

type ActionItemsProps = {
  items: OperationsAnalysis["actionItems"];
};

export function ActionItems({ items }: ActionItemsProps) {
  return (
    <section className="rounded-lg border border-line bg-panel shadow-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <CheckSquare size={18} className="text-mint" aria-hidden="true" />
        <h2 className="text-base font-semibold text-ink">Akční kroky</h2>
      </div>

      <div className="divide-y divide-line">
        {items.map((item) => (
          <article key={`${item.owner}-${item.task}`} className="p-4">
            <p className="text-sm font-medium leading-6 text-ink">{item.task}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <UserRound size={14} aria-hidden="true" />
                {item.owner}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock size={14} aria-hidden="true" />
                {item.dueDate}
              </span>
            </div>
            <p className="mt-3 rounded bg-canvas px-3 py-2 text-xs leading-5 text-muted">
              {item.reason}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
