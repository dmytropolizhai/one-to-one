import { MessageItem } from "./message-item";
import { getMessages } from "../data/messages";


export function MessageChat() {
    const messages = getMessages();

    return (
        <ul className="flex flex-col gap-2 w-full p-4">
            {messages.map((message) => {
                if (message.sender === "me") {
                    return <MessageItem key={message.id} className="ml-auto w-fit" {...message} />
                }

                return <MessageItem key={message.id} className="mr-auto w-fit" {...message} />
            })}
        </ul>
    )
}