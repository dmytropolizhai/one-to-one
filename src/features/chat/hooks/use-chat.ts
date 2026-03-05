export interface UseChatReturnData {
    sendMessage: (message: string) => void;
}

export function useChat(): UseChatReturnData {
    const sendMessage = (message: string) => {
        console.log(message);
    }

    return {
        sendMessage,
    }
}