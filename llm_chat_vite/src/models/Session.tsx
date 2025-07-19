import { type Context } from "./Context";
import { type ChatEntry } from "./ChatEntry";
//import type { ChronologicalEntry } from "./ChronologicalEntry";

import { v4 as uuidv4 } from 'uuid';
import { defaultContext } from "./Context";

export interface Session
{
  //id: number
  guid: string
  summary : string
  // all_prompts : Record<number, ChatEntry>
  // all_responses : Record<number, ChatEntry>
  //contexts: Context[] //this is probably not a good as contexts should already exist in 
  contextIds: string[]
  currentContextId: string
  
}

export const defaultSession = createSession([defaultContext.guid])

export function createSession(contextsIds: string[]): Session {
  // const contextIds = new Set<string>();
  // contexts.forEach(ctx => contextIds.add(ctx.guid));

  return {
    guid: uuidv4(),
    summary: "",
    //contexts: contexts,
    contextIds: contextsIds,
    currentContextId: contextsIds[0],
    

  };
}

export function addContextGuid(session: Session, guid: string) : Session 
{
  return {
    ...session,
    contextIds: [...session.contextIds, guid],
  };
}

export function removeContextGuid(session: Session, guid: string) : Session 
{
  const newContextIds = session.contextIds.filter(id => id !== guid);
  return {
    ...session,
    contextIds: newContextIds,
  };
}

// export function addContext(session: Session, guid: string, allContexts : Context[]) : Session
// {
//   //finds context with given guid in allContexts to add to sessions contexts list
//   const contextToAdd = allContexts.find(c => c.guid === guid);
//   if (!contextToAdd) return session;

//   // Add context if it does not exist yet (optional)
//   //const newContexts = [...session.contexts, contextToAdd];
//   // Add guid to context_ids set
//   const newContextIds = new Set(session.contextIds);
//   newContextIds.add(guid);

//   return {
//     ...session,
//     //contexts: newContexts,
//     contextIds: newContextIds
//   };
// }

// export function removeContext(session: Session, guid: string) : Session
// {
//   // Filter out the context with the given guid
//   //const newContexts = session.contexts.filter(context => context.guid !== guid);

//   // Create a new Set without the guid
//   const newContextIds = new Set(session.context_ids);
//   newContextIds.delete(guid);

//   return {
//     ...session,
//     //contexts: newContexts,
//     context_ids: newContextIds,
//   };
// }

// getAll() : string {
//   let all = ""
//   for (let index = 0; index < this.contexts.length ; index++) { //there cant be more responses than prompts
//     all += "Context " + this.contexts[index].guid.toString() + ": " +  this.contexts[index].getall()
//   }
//   return all
// }

export function getSortedEntriesAllContexts(session: Session): ChatEntry[] {
  const entries: ChatEntry[] = [];

  // for (const context of session.contexts) {
  //   entries.push(...Object.values(context.prompts));
  //   entries.push(...Object.values(context.responses));
  // }

  // Sort by datetime ascending
  entries.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

  return entries;
}

  // get_all_prompts() : Record<number, PromptResponse>{
  //   const all_prompts: Record<number, PromptResponse> = {};

  //   for(let i = 0; i < this.contexts.length; i++)
  //   {
  //     this.contexts[i].
  //   }
  // }
  // get_all_responses() : Record<number, PromptResponse>{

  // }

//   *promptResponseGenerator(): Generator<[number, string, string | undefined]> {
//     for (const key of Object.keys(this.all_prompts).map(Number)) {
//       yield [key, this.all_prompts[key], this.all_responses[key]];
//     }
//   }

//   *promptGenerator(): Generator<string> {
//     for (const key of Object.keys(this.all_prompts).map(Number)) {
//       yield this.all_prompts[key];
//     }
//   }

//   *responseGenerator(): Generator<string> {
//     for (const key of Object.keys(this.all_responses).map(Number)) {
//       yield this.all_responses[key];
//     }
//   }
// }
  
