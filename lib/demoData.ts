import { combineScenarioInputs, getDemoScenario } from "@/lib/demoScenarios";

export const demoInboxItems = getDemoScenario().inputs;

export const combinedDemoInput = combineScenarioInputs(demoInboxItems);
