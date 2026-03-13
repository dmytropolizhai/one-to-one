import "server-only"
import { getChat } from "@/data/chats/actions";
import { getMe } from "@/data/users/actions";

export async function getChatPageData(chatId: number) {
    const chat = await getChat(chatId);
    const me = await getMe();

    if (!chat || !me) {
        return null;
    }

    const isParticipant = chat.participants.some(p => p.userId === me.id);
    const otherParticipant = chat.participants.find(p => p.userId !== me.id)?.user ?? null;

    return {
        ...chat,
        isParticipant,
        otherUser: otherParticipant
    };
}