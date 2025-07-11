export class Context{
    id : number
    prompts : Record<number, string> = {}
    responses : Record<number, string> = {}
    current_prompt_index : number = 0
    current_response_index : number = 0
    color: string = "green"

    constructor(id : number, color: string){
        this.id = id
        this.color = color
    }

    addprompt(key: string) {
        const newDict = { ...this.prompts, [key]: this.current_prompt_index++}
        this.prompts = newDict
    }

    addresponse(key: string) {
        const newDict = { ...this.responses, [key]: this.current_response_index++ }
        this.responses = newDict
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