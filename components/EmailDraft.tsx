import type { OperationsAnalysis } from "@/lib/schemas";
import { Mail, Wand2 } from "lucide-react";

type EmailDraftProps = {
  reply: OperationsAnalysis["customerReply"];
};

export function EmailDraft({ reply }: EmailDraftProps) {
  return (
    <section className="rounded-lg border border-line bg-panel shadow-panel">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-brand" aria-hidden="true" />
          <h2 className="text-base font-semibold text-ink">Návrh odpovědi zákazníkovi</h2>
        </div>
        <Wand2 size={17} className="text-muted" aria-hidden="true" />
      </div>

      <div className="p-4">
        <div className="rounded-md border border-line bg-canvas p-4">
          <p className="text-sm font-semibold text-ink">{reply.subject}</p>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink">
            {reply.body}
          </p>
        </div>
      </div>
    </section>
  );
}
