export interface UseChatReturnData {
    sendMessage: (message: string) => Promise<unknown>;
}

export function useChat(): UseChatReturnData {
    const sendMessage = async (message: string) => {
        // Boilerplate for API call
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {
        sendMessage,
    }
}