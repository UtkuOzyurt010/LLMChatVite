import { PromptResponse } from "./PromptResponse"

export class Context{
    id : number
    prompts : Record<number, PromptResponse> = {}
    responses : Record<number, PromptResponse> = {}
    current_prompt_index : number = 0
    current_response_index : number = 0
    color: string = "green"

    constructor(id : number, color: string){
        this.id = id
        this.color = color
    }

    addprompt(text: string) {
        this.prompts[this.current_prompt_index++] = new PromptResponse(text)
    }

    addresponse(text: string) 
    {
        this.responses[this.current_response_index++] = new PromptResponse(text)
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