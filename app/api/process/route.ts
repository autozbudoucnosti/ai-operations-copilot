import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { combineScenarioInputs, getDemoScenario } from "@/lib/demoScenarios";
import { createCustomFallbackAIResult, createFallbackAIResult } from "@/lib/sampleAIResult";
import { operationsAnalysisSchema, ProcessRequestSchema } from "@/lib/schemas";
import type { DemoScenario } from "@/lib/schemas";

const AI_TIMEOUT_MS = 12000;

function demoResponse(scenario: DemoScenario) {
  return NextResponse.json({
    ...createFallbackAIResult(scenario),
    demoFallback: true
  });
}

function customDemoResponse() {
  return NextResponse.json({
    ...createCustomFallbackAIResult(),
    demoFallback: true
  });
}

export async function POST(request: Request) {
  let scenario = getDemoScenario();
  let input = combineScenarioInputs(scenario.inputs);
  let inputCount = scenario.inputs.length;
  let isCustomInput = false;

  try {
    const body = await request.json();
    const parsed = ProcessRequestSchema.safeParse(body);

    if (!parsed.success) {
      return demoResponse(scenario);
    }

    if (parsed.data.customText) {
      input = parsed.data.customText;
      inputCount = 1;
      isCustomInput = true;
    } else {
      scenario = getDemoScenario(parsed.data.scenarioId);
      input = parsed.data.input ?? combineScenarioInputs(parsed.data.inputs ?? scenario.inputs);
      inputCount = parsed.data.inputs?.length ?? scenario.inputs.length;
    }
  } catch {
    return demoResponse(scenario);
  }

  if (!process.env.OPENAI_API_KEY) {
    return isCustomInput ? customDemoResponse() : demoResponse(scenario);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
    const { object } = await generateObject({
      model: openai("gpt-4.1-mini"),
      schema: operationsAnalysisSchema,
      abortSignal: controller.signal,
      maxRetries: 0,
      system:
        "Jsi AI operations assistant pro české malé a střední firmy. Analyzuj neuspořádané provozní vstupy a vytvoř praktické administrativní výstupy. Používej češtinu. Buď konkrétní. Nevymýšlej nemožná fakta. Pokud něco chybí, označ to jako blocker. Vytvoř užitečný návrh e-mailu zákazníkovi.",
      prompt: [
        isCustomInput
          ? "Zpracuj následující vlastní anonymizovaný firemní vstup."
          : `Zpracuj následující demo vstupy pro firmu ${scenario.companyName}.`,
        isCustomInput
          ? "Název firmy ve výstupu nastav na: Vlastní firemní vstup."
          : `Odvětví: ${scenario.industry}.`,
        isCustomInput ? "Typ vstupu: vlastní text uživatele." : `Scénář: ${scenario.title}.`,
        "Vrať pouze strukturu odpovídající schématu.",
        "Prioritu urč podle rizika ztráty zákazníka.",
        "",
        `Počet vstupů: ${inputCount}`,
        input
      ].join("\n")
    }).finally(() => clearTimeout(timeoutId));

    const parsed = operationsAnalysisSchema.safeParse(object);

    if (!parsed.success) {
      return isCustomInput ? customDemoResponse() : demoResponse(scenario);
    }

    return NextResponse.json({
      ...(isCustomInput ? { ...parsed.data, company: "Vlastní firemní vstup" } : parsed.data),
      demoFallback: false
    });
  } catch {
    return isCustomInput ? customDemoResponse() : demoResponse(scenario);
  }
}
