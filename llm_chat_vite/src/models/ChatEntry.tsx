import { v4 as uuidv4 } from 'uuid';

export interface ChatEntry
{
  guid: string //currently multiple Contexts can't share a ChatEntry, a copy is made instead
  text: string
  datetime: Date
  contextGuId: string;
  type: "prompt" | "response";
}

export function createChatEntry(text: string, contextId: string, type: "prompt" | "response" ) : ChatEntry
  {
    return{
      guid: uuidv4(),
      text: text,
      datetime: new Date(),
      contextGuId: contextId,
      type: type
    }
  }