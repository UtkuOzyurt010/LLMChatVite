import type { Context } from "./Context";
import type { PromptResponse } from "./PromptResponse";




export class Session{
  id: number
  summary: string = ""
  all_prompts : Record<number, PromptResponse> = {}
  all_responses : Record<number, PromptResponse> = {}
  contexts: Context[]
  context_ids: Set<number> = new Set<number>()
  current_context: Context
  

  constructor(id : number, contexts: Context[]) //contexts is passed by reference
  {
    this.id = id
    this.contexts = contexts;
    this.contexts.forEach(element => {
      this.context_ids.add(element.id)
    });
    this.current_context=contexts[0]
  }

  add_context_id(id: number) : boolean 
  {
    try{
      this.context_ids.add(id);
      if(this.context_ids.has(id)) return true;
      else return false;
    }
    catch(e){
      console.log(e)
      return false;
    }
  }

  remove_context_id(id: number) : boolean 
  {
    // try{
    //     this.context_ids.delete(id)
    // }
    return this.context_ids.delete(id);
  }

  add_context(id: number, allContexts : Context[]) : boolean
  {
    allContexts.forEach(element => 
      {
        if(element.id == id) {
          this.contexts.push(element);
          this.add_context_id(id);
          return true;
        } 
      })
    return false
  }

  remove_context(id: number) : boolean
  {
    for(let i = 0; i < this.contexts.length; i++)
    {
      if(this.contexts[i].id == id)
      {
        this.contexts.splice(i, 1);
        this.remove_context_id(id);
        return true;
      }
    }
    return false;
  }

  getall() : string {
    let all = ""
    for (let index = 0; index < this.contexts.length ; index++) { //there cant be more responses than prompts
      all += "Context " + this.contexts[index].id.toString() + ": " +  this.contexts[index].getall()
    }
    return all
  }

  getChronologicalEntries(): ChronologicalEntry[] {
    const entries: ChronologicalEntry[] = [];

    for (const ctx of this.contexts) {
      // Add all prompts
      for (const indexStr of Object.keys(ctx.prompts)) {
        const index = Number(indexStr);
        entries.push({
          contextId: ctx.id,
          type: "prompt",
          promptResponse: ctx.prompts[index]
        });
      }

      // Add all responses
      for (const indexStr of Object.keys(ctx.responses)) {
        const index = Number(indexStr);
        entries.push({
          contextId: ctx.id,
          type: "response",
          promptResponse: ctx.responses[index]
        });
      }
    }

    // Sort by datetime ascending
    entries.sort((a, b) => a.promptResponse.datetime.getTime() - b.promptResponse.datetime.getTime());

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