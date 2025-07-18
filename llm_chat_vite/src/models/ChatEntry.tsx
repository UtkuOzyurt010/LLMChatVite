import { v4 as uuidv4 } from 'uuid';

export class ChatEntry
{
    guid: string // multiple contexts can share the same ChatEntry
    text: string
    datetime: Date
    contextGuId: string;
    type: "prompt" | "response";
    

    constructor(text: string, contextId: string, type: "prompt" | "response" )
    {
        this.guid = uuidv4()
        this.text = text,
        this.datetime = new Date()
        this.contextGuId = contextId
        this.type = type
    }
}