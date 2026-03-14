import { useEffect } from "react";
import { create } from "zustand";

import { getMe } from "./actions";
import { ClientUser } from "./schema";

interface UserState {
    user: ClientUser | null;
    setUser: (user: ClientUser | null) => void;
    init: () => Promise<ClientUser | null>;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    init: async () => {
        const user = await getMe();
        set({ user });
        return user;
    }
}));

export function useUser() {
    const userStore = useUserStore();

    useEffect(() => {
        if (!userStore.user) {
            userStore.init();
        }
    }, [])

    return userStore.user;
}
