import { Message } from "../types";

export function getMessages(): Message[] {
    return [
        {
            id: "1",
            content: "Hello, how are you?",
            sender: "me",
            timestamp: new Date(),
        },
        {
            id: "2",
            content: "I'm fine, thank you!",
            sender: "other",
            timestamp: new Date(),
        },
    ]
}