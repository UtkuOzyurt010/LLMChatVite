import { type ChatEntry, createChatEntry } from "./ChatEntry"
import { alpha } from "@mui/material";

import { v4 as uuidv4 } from 'uuid';

export interface Context
{
    guid : string
    prompts : Record<number, ChatEntry>
    responses : Record<number, ChatEntry>
    current_prompt_index : number
    current_response_index : number
    color: string
    color_light: string

}

export const defaultContext : Context = createContext("#000000")



export function createContext(color: string){

    return{
        guid: uuidv4(),
        prompts: {},
        responses: {},
        current_prompt_index: -1, //increment when adding, indexing 0 should return first
        current_response_index: -1, //increment when adding, indexing 0 should return first
        color: color,
        color_light: alpha(color, 0.2)
    }
}

export function addprompt(context: Context, text: string) : Context
{
    const newprompts = context.prompts;
    newprompts[context.current_prompt_index++] = createChatEntry(text, context.guid, "prompt")
    return {
        ...context,
        prompts: newprompts,
    }
}

export function addresponse(context: Context, text: string) 
{
    const newresponses = context.responses;
    newresponses[context.current_response_index++] = createChatEntry(text, context.guid, "response")
    return {
        ...context,
        prompts: newresponses,
    }
}

    //  still needs to rewritten from class function, but might nto use it at all so not doing that now
// export function getall(context: Context) : string {
//     let all = ""
//     for (let index = 0; index < Object.keys(context.responses).length ; index++) { //there cant be more responses than prompts
//         all += "P: " + context.prompts[index]
//         all += "R: " + context.responses[index]
//     }
//     return all
// }
