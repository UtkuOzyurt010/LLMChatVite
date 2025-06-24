import type { Context } from "./Context";

export class Session{
    all_prompts : Record<number, string> = {}
    all_responses : Record<number, string> = {}
    contexts: Context[] = [];

    getall() : string {
        let all = ""
        for (let index = 0; index < this.contexts.length ; index++) { //there cant be more responses than prompts
            all += "Context " + this.contexts[index].id.toString() + ": " +  this.contexts[index].getall()
        }
        return all
    }
}