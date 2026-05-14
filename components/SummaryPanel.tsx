import { ClipboardList, Navigation } from "lucide-react";

type SummaryPanelProps = {
  summary: string;
  priority: "low" | "medium" | "high";
  recommendedNextStep: string;
};

const priorityLabels: Record<SummaryPanelProps["priority"], string> = {
  low: "nízká priorita",
  medium: "střední priorita",
  high: "vysoká priorita"
};

const priorityStyles: Record<SummaryPanelProps["priority"], string> = {
  low: "bg-mint/10 text-mint",
  medium: "bg-amber/10 text-amber",
  high: "bg-rose/10 text-rose"
};

export function SummaryPanel({
  summary,
  priority,
  recommendedNextStep
}: SummaryPanelProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)]">
      <div className="rounded-lg border border-line bg-panel p-5 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList size={19} className="text-brand" aria-hidden="true" />
            <h2 className="text-base font-semibold text-ink">Shrnutí situace</h2>
          </div>
          <span className={`rounded px-2 py-1 text-xs font-semibold ${priorityStyles[priority]}`}>
            {priorityLabels[priority]}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">{summary}</p>
      </div>

      <div className="rounded-lg border border-line bg-ink p-5 text-white shadow-panel">
        <div className="flex items-center gap-2">
          <Navigation size={18} className="text-white" aria-hidden="true" />
          <h2 className="text-base font-semibold">Doporučený další krok</h2>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-200">{recommendedNextStep}</p>
      </div>
    </section>
  );
}
