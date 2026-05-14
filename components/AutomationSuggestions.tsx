import { Cpu, Gauge } from "lucide-react";
import type { OperationsAnalysis } from "@/lib/schemas";

type AutomationSuggestionsProps = {
  suggestions: OperationsAnalysis["automationSuggestions"];
};

export function AutomationSuggestions({ suggestions }: AutomationSuggestionsProps) {
  return (
    <section className="rounded-lg border border-line bg-panel shadow-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Cpu size={18} className="text-mint" aria-hidden="true" />
        <h2 className="text-base font-semibold text-ink">Návrhy automatizace</h2>
      </div>

      <div className="space-y-3 p-4">
        {suggestions.map((suggestion) => (
          <article key={suggestion.name} className="rounded-md border border-line p-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold leading-5 text-ink">{suggestion.name}</h3>
              <span className="inline-flex shrink-0 items-center gap-1 rounded bg-mint/10 px-2 py-1 text-xs font-semibold text-mint">
                <Gauge size={13} aria-hidden="true" />
                přínos
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{suggestion.businessValue}</p>
            <dl className="mt-3 space-y-2 text-xs leading-5 text-muted">
              <div>
                <dt className="font-semibold text-ink">Spouštěč</dt>
                <dd>{suggestion.trigger}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Akce</dt>
                <dd>{suggestion.action}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
