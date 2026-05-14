import { z } from "zod";

export const operationsAnalysisSchema = z.object({
  company: z.string(),
  summary: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  actionItems: z.array(
    z.object({
      owner: z.string(),
      task: z.string(),
      dueDate: z.string(),
      reason: z.string()
    })
  ),
  blockers: z.array(
    z.object({
      issue: z.string(),
      risk: z.string(),
      suggestedFix: z.string()
    })
  ),
  customerReply: z.object({
    subject: z.string(),
    body: z.string()
  }),
  recommendedNextStep: z.string(),
  automationSuggestions: z.array(
    z.object({
      name: z.string(),
      trigger: z.string(),
      action: z.string(),
      businessValue: z.string()
    })
  )
});

export type OperationsAnalysis = z.infer<typeof operationsAnalysisSchema>;
export type OperationsAnalysisResponse = OperationsAnalysis & {
  demoFallback?: boolean;
};

export type Tone = "klidný" | "věcný" | "urgentní";

export type InboxItem = {
  id: string;
  source:
    | "E-mail zákazníka"
    | "Interní poznámka"
    | "Seznam úkolů"
    | "Poptávka k nacenění";
  from: string;
  subject: string;
  receivedAt: string;
  body: string;
  tone: Tone;
};

export const ProcessRequestSchema = z.object({
  input: z.string().trim().min(1)
});

export type ProcessRequest = z.infer<typeof ProcessRequestSchema>;
