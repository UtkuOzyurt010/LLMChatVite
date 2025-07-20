import { type ChatEntry, createChatEntry } from "./ChatEntry"

import { v4 as uuidv4 } from 'uuid';

export interface Context
{
    guid : string
    prompts : Record<number, ChatEntry>
    responses : Record<number, ChatEntry>
    current_prompt_index : number
    current_response_index : number
    color: string

}

export const defaultContext : Context = createContext("black")

export const getRandomHexColor = () =>{
    const randomNum = Math.floor(Math.random() * 0xffffff);
    const hexString = randomNum.toString(16).padStart(6, '0');
    return `#${hexString}`;
  }

export function createContext(color: string){

    return{
        guid: uuidv4(),
        prompts: {},
        responses: {},
        current_prompt_index: 0,
        current_response_index: 0,
        color: color
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
