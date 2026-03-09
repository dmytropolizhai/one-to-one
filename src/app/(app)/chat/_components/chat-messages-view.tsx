import { getMe } from "@/data/users/actions";
import { ChatMessageList } from "./chat-message-list";
import { getChat } from "@/data/chats/actions";

interface ChatMessagesViewProps {
    chatId?: string;
}

export async function ChatMessagesView({ chatId }: ChatMessagesViewProps) {
    if (!chatId) return null;

    const chat = await getChat(chatId);
    const me = await getMe();

    if (!me) return null;

    if (!chat || !chat.isParticipant) {
        return (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
                No active chat found.
            </div>
        )
    }

    const messages = await chat.getMessages();

    return (
        <ChatMessageList
            messages={messages}
            meId={me.id}
            chatId={chatId}
        />
    )
}


