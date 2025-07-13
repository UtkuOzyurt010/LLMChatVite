export class PromptResponse
{
    text: string
    datetime: Date

    constructor(text: string)
    {
        this.text = text,
        this.datetime = new Date()
    }
}