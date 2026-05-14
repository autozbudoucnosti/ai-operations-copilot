"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  Loader2,
  LockKeyhole,
  Navigation,
  Server,
  Sparkles,
  UserCheck
} from "lucide-react";
import { ActionItems } from "@/components/ActionItems";
import { AutomationSuggestions } from "@/components/AutomationSuggestions";
import { Bottlenecks } from "@/components/Bottlenecks";
import { EmailDraft } from "@/components/EmailDraft";
import { InboxPanel } from "@/components/InboxPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { combinedDemoInput, demoInboxItems } from "@/lib/demoData";
import { sampleAIResult } from "@/lib/sampleAIResult";
import type { OperationsAnalysisResponse } from "@/lib/schemas";

const priorityLabels: Record<OperationsAnalysisResponse["priority"], string> = {
  low: "nízká",
  medium: "střední",
  high: "vysoká"
};

const priorityStyles: Record<OperationsAnalysisResponse["priority"], string> = {
  low: "text-mint bg-mint/10 border-mint/20",
  medium: "text-amber bg-amber/10 border-amber/20",
  high: "text-rose bg-rose/10 border-rose/20"
};

const businessFlow = [
  "Vybere se jeden konkrétní proces, například opožděné nabídky.",
  "AI nejprve pouze navrhuje shrnutí, odpovědi a úkoly.",
  "Člověk schvaluje odpovědi zákazníkům i interní úkoly.",
  "Až potom se automatizují bezpečné kroky, které mají jasná pravidla."
];

const integrations = ["Gmail/Outlook", "Slack/Teams", "Google Drive", "CRM", "faktury"];

const pilotSteps = [
  "Výběr jednoho procesu",
  "Ukázková data a pravidla",
  "AI asistent pouze pro návrhy",
  "Schvalování člověkem",
  "Integrace a automatizace",
  "Nasazení do cloudu nebo lokálně"
];

export function Dashboard() {
  const [input, setInput] = useState(combinedDemoInput);
  const [result, setResult] = useState<OperationsAnalysisResponse>({
    ...sampleAIResult,
    demoFallback: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedAt, setLastProcessedAt] = useState("vzorová data");
  const [hasProcessed, setHasProcessed] = useState(false);

  const inputStats = useMemo(
    () => ({
      messages: demoInboxItems.length,
      words: input.trim().split(/\s+/).filter(Boolean).length
    }),
    [input]
  );

  async function handleProcess() {
    if (isProcessing || !input.trim()) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });

      if (!response.ok) {
        throw new Error("Zpracování selhalo.");
      }

      const data = (await response.json()) as OperationsAnalysisResponse;
      setResult(data);
      setHasProcessed(true);
      setLastProcessedAt(new Intl.DateTimeFormat("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date()));
    } catch {
      setResult({
        ...sampleAIResult,
        demoFallback: true
      });
      setHasProcessed(true);
      setLastProcessedAt("vzorová data");
    } finally {
      setIsProcessing(false);
    }
  }

  const statusCards = [
    {
      label: "Nové vstupy",
      value: `${inputStats.messages} zdroje`,
      note: `${inputStats.words} slov k analýze`,
      icon: ClipboardCheck,
      className: "text-brand bg-blue-50"
    },
    {
      label: "Priorita",
      value: priorityLabels[result.priority],
      note: "podle rizika ztráty zakázky",
      icon: Gauge,
      className: priorityStyles[result.priority]
    },
    {
      label: "Blokery",
      value: `${result.blockers.length}`,
      note: result.blockers[0]?.issue ?? "Bez blokujících bodů",
      icon: AlertTriangle,
      className: "text-amber bg-amber/10 border-amber/20"
    },
    {
      label: "Doporučený další krok",
      value: "schválit odpověď",
      note: result.recommendedNextStep,
      icon: Navigation,
      className: "text-mint bg-mint/10 border-mint/20"
    }
  ];

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                <Building2 size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Ukázkové demo
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-normal text-ink sm:text-3xl">
                  Firemní AI asistent pro provoz a administrativu
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                  Jednoduchý interní nástroj, který z firemních e-mailů, poznámek a úkolů
                  připraví shrnutí, priority, blokery, odpověď zákazníkovi a další kroky.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button
                onClick={handleProcess}
                disabled={isProcessing || !input.trim()}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                ) : (
                  <Sparkles size={18} aria-hidden="true" />
                )}
                {isProcessing ? "Zpracovávám vstupy" : "Zpracovat nové vstupy"}
              </button>
              <p className="text-xs text-muted">Scénář: Stavební servis Novák s.r.o.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {statusCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="min-h-[132px] rounded-lg border border-line bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {card.label}
                    </p>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${card.className}`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-ink">{card.value}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted">{card.note}</p>
                </article>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[minmax(340px,0.88fr)_minmax(0,1.55fr)]">
        <InboxPanel
          input={input}
          items={demoInboxItems}
          stats={inputStats}
          onInputChange={setInput}
        />

        <div className="space-y-5">
          <section className="rounded-lg border border-line bg-panel shadow-panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                {isProcessing ? (
                  <Loader2 className="animate-spin text-brand" size={18} aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="text-mint" size={18} aria-hidden="true" />
                )}
                {isProcessing
                  ? "AI zpracovává firemní vstupy..."
                  : `Výstup připravený pro ${result.company}`}
              </div>
              <p className="text-sm text-muted">
                {result.demoFallback ? "Ukázkový výstup" : "Zpracováno"}: {lastProcessedAt}
              </p>
            </div>

            {hasProcessed && result.demoFallback ? (
              <div className="border-b border-line bg-blue-50 px-4 py-3 text-sm font-medium text-brand">
                Demo režim: výstup je načten ze vzorových dat.
              </div>
            ) : null}

            <div className="grid gap-3 px-4 py-4 sm:grid-cols-3">
              <div className="rounded-md border border-line bg-canvas px-3 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                  <Activity size={14} aria-hidden="true" />
                  Stav
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {isProcessing ? "Probíhá analýza" : "Připraveno k rozhodnutí"}
                </p>
              </div>
              <div className="rounded-md border border-line bg-canvas px-3 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                  <ClipboardCheck size={14} aria-hidden="true" />
                  Vstupy
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {inputStats.messages} zdroje, {inputStats.words} slov
                </p>
              </div>
              <div className="rounded-md border border-line bg-canvas px-3 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                  <Sparkles size={14} aria-hidden="true" />
                  Výsledek
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  Shrnutí, úkoly, rizika a e-mail
                </p>
              </div>
            </div>
          </section>

          <SummaryPanel
            summary={result.summary}
            priority={result.priority}
            recommendedNextStep={result.recommendedNextStep}
          />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <ActionItems items={result.actionItems} />
            <Bottlenecks blockers={result.blockers} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <EmailDraft reply={result.customerReply} />
            <AutomationSuggestions suggestions={result.automationSuggestions} />
          </div>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <article className="rounded-lg border border-line bg-panel p-5 shadow-panel">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-brand" aria-hidden="true" />
                <h2 className="text-base font-semibold text-ink">Jak by to fungovalo ve firmě</h2>
              </div>
              <ol className="mt-4 space-y-3">
                {businessFlow.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-canvas text-xs font-semibold text-ink">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex flex-wrap gap-2">
                {integrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded border border-line bg-canvas px-2 py-1 text-xs font-semibold text-muted"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-line bg-panel p-5 shadow-panel">
              <div className="flex items-center gap-2">
                <FileCheck2 size={18} className="text-mint" aria-hidden="true" />
                <h2 className="text-base font-semibold text-ink">Jak by probíhal pilot</h2>
              </div>
              <div className="mt-4 grid gap-2">
                {pilotSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-md bg-canvas px-3 py-2">
                    <span className="text-xs font-semibold text-muted">{index + 1}</span>
                    <span className="text-sm font-medium text-ink">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm leading-6 text-muted">
                <p className="flex gap-2">
                  <Cloud size={16} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
                  Cloud: Vercel / hostovaný dashboard.
                </p>
                <p className="flex gap-2">
                  <Server size={16} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
                  Lokálně: Mac mini jako worker pro dokumenty a znalostní bázi.
                </p>
                <p className="flex gap-2">
                  <LockKeyhole size={16} className="mt-1 shrink-0 text-mint" aria-hidden="true" />
                  Hybridně: dashboard v cloudu, citlivé zpracování lokálně.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-lg border border-line bg-panel p-5 shadow-panel">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-brand" aria-hidden="true" />
              <h2 className="text-base font-semibold text-ink">Co demo prokazuje</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-md bg-canvas p-3">
                <FileText size={18} className="text-brand" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-ink">Neuspořádané vstupy</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  E-maily, poznámky a úkoly na jednom místě.
                </p>
              </div>
              <div className="rounded-md bg-canvas p-3">
                <Database size={18} className="text-mint" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-ink">Strukturovaný výstup</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Validovaná data pro úkoly, rizika a návrhy odpovědí.
                </p>
              </div>
              <div className="rounded-md bg-canvas p-3">
                <CheckCircle2 size={18} className="text-amber" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-ink">Bezpečný pilot</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Nejdřív návrhy, potom schvalování a až nakonec automatizace.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
