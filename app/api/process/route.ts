import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { combinedDemoInput, demoInboxItems } from "@/lib/demoData";
import { sampleAIResult } from "@/lib/sampleAIResult";
import { operationsAnalysisSchema, ProcessRequestSchema } from "@/lib/schemas";

const AI_TIMEOUT_MS = 12000;

function demoResponse() {
  return NextResponse.json({
    ...sampleAIResult,
    demoFallback: true
  });
}

export async function POST(request: Request) {
  let input = combinedDemoInput;

  try {
    const body = await request.json();
    const parsed = ProcessRequestSchema.safeParse(body);

    if (!parsed.success) {
      return demoResponse();
    }

    input = parsed.data.input;
  } catch {
    return demoResponse();
  }

  if (!process.env.OPENAI_API_KEY) {
    return demoResponse();
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
        "Zpracuj následující demo vstupy pro firmu Stavební servis Novák s.r.o.",
        "Vrať pouze strukturu odpovídající schématu.",
        "Prioritu urč podle rizika ztráty zákazníka.",
        "",
        `Počet vstupů: ${demoInboxItems.length}`,
        input
      ].join("\n")
    }).finally(() => clearTimeout(timeoutId));

    const parsed = operationsAnalysisSchema.safeParse(object);

    if (!parsed.success) {
      return demoResponse();
    }

    return NextResponse.json({
      ...parsed.data,
      demoFallback: false
    });
  } catch {
    return demoResponse();
  }
}
