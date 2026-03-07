import { getMessages } from "@/data/messages/actions";
import { MessageItem } from "./message-item";
import { getMe } from "@/data/users/actions";

export async function MessageList() {
    const messages = await getMessages();
    const me = await getMe();

    return (
        <ul className="flex flex-col gap-2 w-full p-4 overflow-y-auto">
            {messages.map(({ id, content, createdAt, userId, updatedAt, chatId, ...rest }) => {
                const isMe = userId === me?.id;
                return (
                    <MessageItem
                        key={id}
                        id={id.toString()}
                        content={content}
                        createdAt={createdAt}
                        className={isMe ? "ml-auto w-fit" : "mr-auto w-fit"}
                        isMe={isMe}
                        {...rest}
                    />
                );
            })}
        </ul>
    )
}