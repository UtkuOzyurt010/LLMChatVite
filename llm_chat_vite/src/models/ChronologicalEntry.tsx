import { PromptResponse } from "./PromptResponse";

export interface ChronologicalEntry {
  contextId: number;
  type: "prompt" | "response";
  promptResponse: PromptResponse;
}


