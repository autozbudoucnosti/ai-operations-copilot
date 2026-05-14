import { FileText, Inbox, MessageSquareText } from "lucide-react";
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
    <aside className="space-y-5">
      <section className="rounded-lg border border-line bg-panel shadow-panel">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <Inbox size={18} className="text-brand" aria-hidden="true" />
            <h2 className="text-base font-semibold text-ink">Firemní vstupy</h2>
          </div>
          <div className="flex gap-2 text-xs font-medium text-muted">
            <span>{stats.messages} zdroje</span>
            <span>{stats.words} slov</span>
          </div>
        </div>

        <div className="space-y-3 p-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-md border border-line p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-brand">
                  <FileText size={13} aria-hidden="true" />
                  {item.source}
                </span>
                <span className="text-xs text-muted">{item.receivedAt}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink">{item.subject}</h3>
              <p className="mt-1 text-xs font-medium text-muted">{item.from}</p>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-panel shadow-panel">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <MessageSquareText size={18} className="text-mint" aria-hidden="true" />
          <h2 className="text-base font-semibold text-ink">Surový balík podkladů</h2>
        </div>
        <div className="p-4">
          <textarea
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            className="min-h-[300px] w-full resize-y rounded-md border border-line bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-blue-100"
            aria-label="Surový balík firemních podkladů"
          />
        </div>
      </section>
    </aside>
  );
}
