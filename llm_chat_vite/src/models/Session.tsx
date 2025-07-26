import { v4 as uuidv4 } from 'uuid';
import { defaultContext } from "./Context";

export interface Session
{
  guid: string
  summary : string
  contextIds: string[]
  currentContextId: string
}

export const defaultSession = createSession([defaultContext.guid])

export function createSession(contextsIds: string[]): Session {
  return {
    guid: uuidv4(),
    summary: "",
    contextIds: contextsIds,
    currentContextId: contextsIds[0],
  };
}

