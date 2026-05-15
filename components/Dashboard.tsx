"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  CheckCircle2,
  CheckSquare,
  Cloud,
  Cpu,
  FileCheck2,
  FileText,
  Loader2,
  LockKeyhole,
  Mail,
  Navigation,
  Server,
  Sparkles,
  UserCheck,
  UserRound,
  Wand2
} from "lucide-react";
import { InboxPanel } from "@/components/InboxPanel";
import {
  combineScenarioInputs,
  defaultScenarioId,
  demoScenarios,
  getDemoScenario
} from "@/lib/demoScenarios";
import { createCustomFallbackAIResult, createFallbackAIResult } from "@/lib/sampleAIResult";
import type { OperationsAnalysisResponse } from "@/lib/schemas";

type InputMode = "demo" | "custom";

const priorityLabels: Record<OperationsAnalysisResponse["priority"], string> = {
  low: "Nízká",
  medium: "Střední",
  high: "Vysoká"
};

const priorityStyles: Record<OperationsAnalysisResponse["priority"], string> = {
  low: "border-mint/20 bg-mint/10 text-mint",
  medium: "border-amber/20 bg-amber/10 text-amber",
  high: "border-rose/20 bg-rose/10 text-rose"
};

const statusCards = [
  {
    value: "Čeká 4 dny",
    icon: CalendarClock,
    className: "text-amber bg-amber/10"
  },
  {
    value: "Chybí podklady",
    icon: FileText,
    className: "text-brand bg-blue-50"
  },
  {
    value: "Vysoké riziko",
    icon: AlertTriangle,
    className: "text-rose bg-rose/10"
  },
  {
    value: "Odpověď připravena",
    icon: CheckCircle2,
    className: "text-mint bg-mint/10"
  }
];

const businessFlow = [
  "AI čte vybraný proces, například opožděné nabídky.",
  "Připraví shrnutí, rizika, úkoly a návrh odpovědi.",
  "Člověk schválí komunikaci i interní kroky.",
  "Automatizují se jen opakovatelné a bezpečné části."
];

const integrations = ["E-mail", "interní úkoly", "sdílené dokumenty", "CRM", "faktury"];

const pilotSteps = [
  "Vybrat jeden proces",
  "Dodat ukázková data",
  "Nastavit rozhodovací pravidla",
  "Schvalovat výstupy člověkem",
  "Napojit bezpečné kroky",
  "Vyhodnotit přínos"
];

const demoFlowSteps = [
  "Neuspořádané vstupy",
  "AI vyhodnocení",
  "Návrh odpovědi a úkolů",
  "Schválení člověkem",
  "Teprve potom automatizace"
];

const customInitialResult: OperationsAnalysisResponse = {
  ...createCustomFallbackAIResult(),
  summary:
    "Vložte vlastní anonymizovaný firemní kontext a spusťte analýzu. Výstup bude mít stejnou strukturu jako demo scénáře.",
  actionItems: [
    {
      owner: "Odpovědná osoba",
      task: "Vložit vlastní text a spustit analýzu.",
      dueDate: "nyní",
      reason: "Bez vstupu není možné připravit smysluplný výstup."
    }
  ],
  blockers: [
    {
      issue: "Čeká se na vlastní text.",
      risk: "AI zatím nemá co analyzovat.",
      suggestedFix: "Vložte anonymizovaný e-mail, poznámku nebo smíšený firemní kontext."
    }
  ],
  customerReply: {
    subject: "Návrh odpovědi bude připraven po analýze",
    body: "Po vložení vlastního textu zde uvidíte návrh odpovědi ke schválení."
  },
  recommendedNextStep: "Vložit vlastní anonymizovaný text a kliknout na analýzu.",
  automationSuggestions: [],
  demoFallback: true
};

export function Dashboard() {
  const defaultScenario = getDemoScenario(defaultScenarioId);
  const [inputMode, setInputMode] = useState<InputMode>("demo");
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id);
  const [input, setInput] = useState(combineScenarioInputs(defaultScenario.inputs));
  const [customText, setCustomText] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [result, setResult] = useState<OperationsAnalysisResponse>({
    ...createFallbackAIResult(defaultScenario),
    demoFallback: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedAt, setLastProcessedAt] = useState("vzorová data");
  const [hasProcessed, setHasProcessed] = useState(false);

  const selectedScenario = useMemo(
    () => getDemoScenario(selectedScenarioId),
    [selectedScenarioId]
  );

  const inputStats = useMemo(
    () => ({
      messages: selectedScenario.inputs.length,
      words: input.trim().split(/\s+/).filter(Boolean).length
    }),
    [input, selectedScenario.inputs.length]
  );

  const customStats = useMemo(
    () => ({
      characters: customText.trim().length,
      words: customText.trim().split(/\s+/).filter(Boolean).length
    }),
    [customText]
  );

  function handleModeChange(nextMode: InputMode) {
    setInputMode(nextMode);
    setValidationMessage("");
    setHasProcessed(false);
    setLastProcessedAt("vzorová data");

    if (nextMode === "demo") {
      setResult({
        ...createFallbackAIResult(selectedScenario),
        demoFallback: true
      });
    } else {
      setResult(customInitialResult);
    }
  }

  function handleScenarioChange(nextScenarioId: string) {
    const nextScenario = getDemoScenario(nextScenarioId);

    setSelectedScenarioId(nextScenario.id);
    setInput(combineScenarioInputs(nextScenario.inputs));
    setResult({
      ...createFallbackAIResult(nextScenario),
      demoFallback: true
    });
    setHasProcessed(false);
    setLastProcessedAt("vzorová data");
  }

  async function handleProcess() {
    if (isProcessing) {
      return;
    }

    if (inputMode === "custom") {
      const trimmedText = customText.trim();

      if (!trimmedText) {
        setValidationMessage("Vložte nejdříve text ke zpracování.");
        return;
      }

      if (trimmedText.length < 30) {
        setValidationMessage("Text je příliš krátký pro smysluplnou analýzu.");
        return;
      }
    } else if (!input.trim()) {
      return;
    }

    setValidationMessage("");
    setIsProcessing(true);

    try {
      const requestBody =
        inputMode === "custom"
          ? { customText: customText.trim() }
          : {
              scenarioId: selectedScenario.id,
              input,
              inputs: selectedScenario.inputs
            };

      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error("Zpracování selhalo.");
      }

      const data = (await response.json()) as OperationsAnalysisResponse;
      setResult(data);
      setHasProcessed(true);
      setLastProcessedAt(
        new Intl.DateTimeFormat("cs-CZ", {
          hour: "2-digit",
          minute: "2-digit"
        }).format(new Date())
      );
    } catch {
      setResult({
        ...(inputMode === "custom" ? createCustomFallbackAIResult() : createFallbackAIResult(selectedScenario)),
        demoFallback: true
      });
      setHasProcessed(true);
      setLastProcessedAt("vzorová data");
    } finally {
      setIsProcessing(false);
    }
  }

  const primaryBlocker = result.blockers[0];
  const primaryAction = result.actionItems[0];
  const outputChecks = [
    {
      label: "Hlavní problém identifikován",
      passed: result.summary.trim().length > 40
    },
    {
      label: "Blokery pojmenovány",
      passed: result.blockers.length > 0
    },
    {
      label: "Úkoly mají odpovědnou osobu",
      passed:
        result.actionItems.length > 0 &&
        result.actionItems.every((item) => item.owner.trim().length > 0)
    },
    {
      label: "Návrh odpovědi je použitelný",
      passed: result.customerReply.body.trim().length > 80
    },
    {
      label: "Další krok je konkrétní",
      passed: result.recommendedNextStep.trim().length > 30
    }
  ];
  const passedOutputChecks = outputChecks.filter((check) => check.passed).length;

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
                <Building2 size={16} aria-hidden="true" />
                Firemní provoz
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
                Firemní AI asistent pro provoz a administrativu
              </h1>
              <p className="mt-3 text-base leading-7 text-muted">
                Z e-mailů, poznámek a úkolů připraví prioritu, blokery, odpověď
                zákazníkovi a další krok.
              </p>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing || (inputMode === "demo" && !input.trim())}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto"
            >
              {isProcessing ? (
                <Loader2 className="animate-spin" size={18} aria-hidden="true" />
              ) : (
                <Sparkles size={18} aria-hidden="true" />
              )}
              {isProcessing
                ? "Zpracovávám vstupy"
                : inputMode === "custom"
                  ? "Analyzovat vlastní vstup"
                  : "Zpracovat nové vstupy"}
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-line bg-canvas px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
              <span className="mr-1 uppercase tracking-wide text-brand">Co právě ukazujeme</span>
              {demoFlowSteps.map((step, index) => (
                <div key={step} className="inline-flex items-center gap-2">
                  <span className="rounded bg-white px-2 py-1 text-ink">{step}</span>
                  {index < demoFlowSteps.length - 1 ? (
                    <span className="text-muted" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-line bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              {(["demo", "custom"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleModeChange(mode)}
                  disabled={isProcessing}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed ${
                    inputMode === mode
                      ? "bg-ink text-white"
                      : "border border-line bg-canvas text-muted hover:text-ink"
                  }`}
                >
                  {mode === "demo" ? "Demo scénáře" : "Vlastní vstup"}
                </button>
              ))}
            </div>

            {inputMode === "demo" ? (
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(220px,0.45fr)_minmax(0,1fr)] lg:items-end">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Demo scénář
                  </span>
                  <select
                    value={selectedScenario.id}
                    onChange={(event) => handleScenarioChange(event.target.value)}
                    disabled={isProcessing}
                    className="mt-2 h-10 w-full rounded-md border border-line bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-canvas"
                  >
                    {demoScenarios.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.industry} - {scenario.title}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <p className="text-sm font-semibold text-ink">{selectedScenario.companyName}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {selectedScenario.industry} · {selectedScenario.shortDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Vlastní firemní kontext
                  </span>
                  <textarea
                    value={customText}
                    onChange={(event) => {
                      setCustomText(event.target.value);
                      setValidationMessage("");
                    }}
                    disabled={isProcessing}
                    placeholder="Vložte anonymizovaný e-mail, poznámku, úkoly, poptávku nebo jiný firemní kontext..."
                    className="mt-2 min-h-[190px] w-full resize-y rounded-md border border-line bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-canvas"
                  />
                </label>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <p className="text-muted">Data se v této demo verzi neukládají.</p>
                  <p className="font-medium text-muted">
                    {customStats.characters} znaků · {customStats.words} slov
                  </p>
                </div>
                {validationMessage ? (
                  <p className="mt-2 text-sm font-medium text-rose">{validationMessage}</p>
                ) : null}
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statusCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.value}
                  className="rounded-lg border border-line bg-white px-4 py-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-semibold text-ink">{card.value}</p>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${card.className}`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 lg:grid-cols-3">
        {inputMode === "demo" ? (
          <InboxPanel
            input={input}
            items={selectedScenario.inputs}
            stats={inputStats}
            onInputChange={setInput}
          />
        ) : (
          <section className="rounded-lg border border-line bg-panel shadow-sm">
            <div className="border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-brand" aria-hidden="true" />
                <h2 className="text-base font-semibold text-ink">Vlastní vstup</h2>
              </div>
              <p className="mt-1 text-xs text-muted">
                Text se analyzuje jen pro aktuální požadavek
              </p>
            </div>
            <div className="space-y-3 p-4">
              <div className="rounded-md border border-line bg-canvas p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Rozsah</p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {customStats.characters} znaků · {customStats.words} slov
                </p>
              </div>
              <p className="text-sm leading-6 text-muted">
                Vložte anonymizovaný text nahoře a spusťte analýzu. Výsledek se zobrazí ve
                stejné struktuře jako demo scénáře.
              </p>
            </div>
          </section>
        )}

        <section className="rounded-lg border border-line bg-panel shadow-sm">
          <div className="border-b border-line px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {isProcessing ? (
                  <Loader2 className="animate-spin text-brand" size={18} aria-hidden="true" />
                ) : (
                  <Sparkles size={18} className="text-brand" aria-hidden="true" />
                )}
                <h2 className="text-base font-semibold text-ink">AI vyhodnocení</h2>
              </div>
              {hasProcessed && result.demoFallback ? (
                <span className="rounded bg-canvas px-2 py-1 text-xs font-medium text-muted">
                  Demo režim: použitý vzorový výstup.
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-muted">
              {result.company} · {hasProcessed ? `aktualizováno ${lastProcessedAt}` : "ukázka připravena"}
            </p>
          </div>

          <div className="space-y-4 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Shrnutí</p>
              <p className="mt-2 line-clamp-5 text-sm leading-6 text-ink">{result.summary}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-md border border-line bg-canvas p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Priorita
                </p>
                <span
                  className={`mt-2 inline-flex rounded border px-2 py-1 text-sm font-semibold ${priorityStyles[result.priority]}`}
                >
                  {priorityLabels[result.priority]}
                </span>
              </div>
              <div className="rounded-md border border-line bg-canvas p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Blokery
                </p>
                <p className="mt-2 text-sm font-semibold leading-5 text-ink">
                  {primaryBlocker?.issue ?? "Bez blokujících bodů"}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-mint" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-ink">Akční kroky</h3>
              </div>
              <div className="mt-3 space-y-2">
                {result.actionItems.slice(0, 3).map((item) => (
                  <article key={`${item.owner}-${item.task}`} className="rounded-md bg-canvas p-3">
                    <p className="text-sm font-medium leading-5 text-ink">{item.task}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <UserRound size={13} aria-hidden="true" />
                        {item.owner}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock size={13} aria-hidden="true" />
                        {item.dueDate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-line bg-panel shadow-sm">
          <div className="border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <Navigation size={18} className="text-mint" aria-hidden="true" />
              <h2 className="text-base font-semibold text-ink">Doporučená reakce</h2>
            </div>
            <p className="mt-1 text-xs text-muted">Připraveno pro schválení člověkem</p>
          </div>

          <div className="space-y-4 p-4">
            <article className="rounded-lg bg-ink p-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Další krok
              </p>
              <p className="mt-2 text-sm font-semibold leading-6">{result.recommendedNextStep}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink">
                <CheckCircle2 size={16} aria-hidden="true" />
                Schválit reakci
              </div>
            </article>

            <article className="rounded-md border border-line bg-canvas p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-brand" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-ink">E-mail zákazníkovi</h3>
                </div>
                <Wand2 size={16} className="text-muted" aria-hidden="true" />
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{result.customerReply.subject}</p>
              <p className="mt-2 line-clamp-[10] whitespace-pre-line text-sm leading-6 text-muted">
                {result.customerReply.body}
              </p>
            </article>

            {primaryAction ? (
              <article className="rounded-md border border-line bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  První interní úkol
                </p>
                <p className="mt-2 text-sm font-medium leading-5 text-ink">{primaryAction.task}</p>
              </article>
            ) : null}
          </div>
        </section>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 pt-1">
        <article className="rounded-lg border border-line bg-panel p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CheckSquare size={17} className="text-mint" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-ink">Kontrola výstupu</h2>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted">
                Kontrola ověřuje strukturu a použitelnost výstupu, ne pravdivost vůči reálným
                datům.
              </p>
            </div>
            <p className="shrink-0 rounded-md bg-canvas px-3 py-2 text-sm font-semibold text-ink">
              {passedOutputChecks}/5 praktických kontrol splněno
            </p>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {outputChecks.map((check) => (
              <div
                key={check.label}
                className="flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2"
              >
                <CheckCircle2
                  size={15}
                  className={check.passed ? "shrink-0 text-mint" : "shrink-0 text-muted"}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium leading-5 text-ink">{check.label}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-panel p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <UserCheck size={17} className="text-brand" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">Jak by to fungovalo ve firmě</h2>
            </div>
            <ol className="mt-4 space-y-2">
              {businessFlow.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-5 text-muted">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-canvas text-xs font-semibold text-ink">
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
                  className="rounded border border-line bg-canvas px-2 py-1 text-xs font-medium text-muted"
                >
                  {integration}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-line bg-panel p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FileCheck2 size={17} className="text-mint" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">Jak by probíhal pilot</h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {pilotSteps.map((step, index) => (
                <div key={step} className="rounded-md bg-canvas px-3 py-2">
                  <p className="text-xs font-semibold text-muted">{index + 1}</p>
                  <p className="mt-1 text-sm font-medium leading-5 text-ink">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 text-xs leading-5 text-muted">
              <p className="flex gap-2">
                <Cloud size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                Cloudový dashboard pro vedení.
              </p>
              <p className="flex gap-2">
                <Server size={15} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
                Lokální zpracování citlivých dokumentů.
              </p>
              <p className="flex gap-2">
                <LockKeyhole size={15} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                Schvalování před každou akcí navenek.
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-line bg-panel p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Cpu size={17} className="text-brand" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">Co demo prokazuje</h2>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-canvas p-3">
                <p className="text-sm font-semibold text-ink">Nepořádek převede na rozhodnutí</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Z e-mailů a poznámek vznikne priorita, riziko a další krok.
                </p>
              </div>
              <div className="rounded-md bg-canvas p-3">
                <p className="text-sm font-semibold text-ink">Výstup je strukturovaný</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Dashboard pracuje s validovanými daty pro úkoly, blokery a odpověď.
                </p>
              </div>
              <div className="rounded-md bg-canvas p-3">
                <p className="text-sm font-semibold text-ink">Demo funguje i bez API klíče</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Když AI není dostupná, použije se vzorový výstup.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
