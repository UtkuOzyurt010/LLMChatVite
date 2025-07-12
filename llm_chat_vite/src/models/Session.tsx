import type { Context } from "./Context";

export class Session{
  id: number
  summary: string = ""
  all_prompts : Record<number, string> = {}
  all_responses : Record<number, string> = {}
  contexts: Context[]
  context_ids: Set<number> = new Set<number>()
  

  constructor(id : number, contexts: Context[]) //contexts is passed by reference
  {
    this.id = id
    this.contexts = contexts;
    this.contexts.forEach(element => {
      this.context_ids.add(element.id)
    });
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
  
}