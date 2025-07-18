import { ChatEntry } from "./ChatEntry"

import { v4 as uuidv4 } from 'uuid';

export class Context{
    guid : string
    prompts : Record<number, ChatEntry> = {}
    responses : Record<number, ChatEntry> = {}
    current_prompt_index : number = 0
    current_response_index : number = 0
    color: string = "green"

    constructor(color: string){
        this.guid = uuidv4()
        this.color = color
    }

    addprompt(text: string) {
        this.prompts[this.current_prompt_index++] = new ChatEntry(text, this.guid, "prompt")
    }

    addresponse(text: string) 
    {
        this.responses[this.current_response_index++] = new ChatEntry(text, this.guid, "response")
    }

    getall() : string {
        let all = ""
        for (let index = 0; index < Object.keys(this.responses).length ; index++) { //there cant be more responses than prompts
            all += "P: " + this.prompts[index]
            all += "R: " + this.responses[index]
        }
        return all
    }
}