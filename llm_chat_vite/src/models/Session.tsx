import type { Context } from "./Context";
import type { ChatEntry } from "./ChatEntry";
//import type { ChronologicalEntry } from "./ChronologicalEntry";

import { v4 as uuidv4 } from 'uuid';




export class Session{
  //id: number
  guid: string
  summary: string = ""
  all_prompts : Record<number, ChatEntry> = {}
  all_responses : Record<number, ChatEntry> = {}
  contexts: Context[]
  context_ids: Set<string> = new Set<string>()
  current_context: Context
  

  constructor(contexts: Context[]) //contexts is passed by reference
  {
    this.guid = uuidv4()
    this.contexts = contexts
    this.contexts.forEach(element => {
      this.context_ids.add(element.guid)
    });
    this.current_context=contexts[0]
  }

  private addContextGuid(guid: string) : boolean 
  {
    try{
      this.context_ids.add(guid);
      if(this.context_ids.has(guid)) return true;
      else return false;
    }
    catch(e){
      console.log(e)
      return false;
    }
  }

  private removeContextGuid(guid: string) : boolean 
  {
    return this.context_ids.delete(guid);
  }

  addContext(guid: string, allContexts : Context[]) : boolean
  {
    allContexts.forEach(element => 
      {
        if(element.guid == guid) {
          this.contexts.push(element);
          this.addContextGuid(guid);
          return true;
        } 
      })
    return false
  }

  removeContext(guid: string) : boolean
  {
    for(let i = 0; i < this.contexts.length; i++)
    {
      if(this.contexts[i].guid == guid)
      {
        this.contexts.splice(i, 1);
        this.removeContextGuid(guid);
        return true;
      }
    }
    return false;
  }

  // getAll() : string {
  //   let all = ""
  //   for (let index = 0; index < this.contexts.length ; index++) { //there cant be more responses than prompts
  //     all += "Context " + this.contexts[index].guid.toString() + ": " +  this.contexts[index].getall()
  //   }
  //   return all
  // }

  getSortedEntriesAllContexts(): ChatEntry[] {
    const entries: ChatEntry[] = [];

    for (const context of this.contexts) {
      entries.push(...Object.values(context.prompts));
      entries.push(...Object.values(context.responses));
    }

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
  
}