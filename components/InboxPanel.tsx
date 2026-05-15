import { ChevronDown, FileText, Inbox } from "lucide-react";
import type { InboxItem } from "@/lib/schemas";

type InboxPanelProps = {
  input: string;
  items: InboxItem[];
  stats: {
    messages: number;
    words: number;
  };
  onInputChange: (value: string) => void;
};

export function InboxPanel({ input, items, stats, onInputChange }: InboxPanelProps) {
  return (
    <section className="rounded-lg border border-line bg-panel shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <Inbox size={18} className="text-brand" aria-hidden="true" />
            <h2 className="text-base font-semibold text-ink">Firemní vstupy</h2>
          </div>
          <p className="mt-1 text-xs text-muted">{stats.messages} firemní vstupy</p>
        </div>
      </div>

      <div className="space-y-2 p-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border border-line bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold text-brand">
                <FileText size={13} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{item.source}</span>
              </span>
              <span className="shrink-0 text-xs text-muted">{item.receivedAt}</span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-ink">
              {item.subject}
            </h3>
            <p className="mt-1 truncate text-xs text-muted">{item.from}</p>
          </article>
        ))}

        <details className="group rounded-md border border-dashed border-line bg-canvas">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm font-semibold text-ink">
            <span>Zobrazit surový text</span>
            <span className="ml-auto text-xs font-medium text-muted">{stats.words} slov</span>
            <ChevronDown
              size={16}
              className="shrink-0 text-muted transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-line p-3">
            <textarea
              value={input}
              onChange={(event) => onInputChange(event.target.value)}
              className="min-h-[220px] w-full resize-y rounded-md border border-line bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-blue-100"
              aria-label="Surový balík firemních podkladů"
            />
          </div>
        </details>
      </div>
    </section>
  );
}
