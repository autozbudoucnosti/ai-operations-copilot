import { z } from "zod";

export const toneSchema = z.enum(["klidný", "věcný", "urgentní"]);

export const inboxItemSchema = z.object({
  id: z.string(),
  source: z.string().min(1),
  from: z.string(),
  subject: z.string(),
  receivedAt: z.string(),
  body: z.string(),
  tone: toneSchema
});

export const demoScenarioSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  industry: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  inputs: z.array(inboxItemSchema).length(4)
});

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

export type Tone = z.infer<typeof toneSchema>;

export type InboxItem = z.infer<typeof inboxItemSchema>;
export type DemoScenario = z.infer<typeof demoScenarioSchema>;

export const ProcessRequestSchema = z.object({
  scenarioId: z.string().optional(),
  input: z.string().trim().min(1).optional(),
  inputs: z.array(inboxItemSchema).optional(),
  customText: z.string().trim().min(1).optional()
});

export type ProcessRequest = z.infer<typeof ProcessRequestSchema>;
