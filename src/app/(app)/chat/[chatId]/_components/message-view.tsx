import { getMe } from "@/data/users/actions";
import { MessageList } from "./message-list";
import { getChat } from "@/data/chats/actions";
import { prisma } from "@/shared/lib/prisma";
import { CentralMessage } from "@/shared/components/central-message";

interface ChatMessagesViewProps {
    chatId?: string;
}

export async function MessageView({ chatId }: ChatMessagesViewProps) {
    if (!chatId) return null;

    const chat = await getChat(chatId);
    const me = await getMe();

    if (!me) return null;

    const messages = await prisma.message.findMany({
        where: {
            chatId: chat.id
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return (
        <MessageList
            messages={messages}
            meId={me.id}
            chatId={chatId}
        />
    )
}
