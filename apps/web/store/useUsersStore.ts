import { create } from 'zustand';

type UsersMap = Record<string, any>;

interface UsersStore {
    users: UsersMap;
    setUser: (id: string, call: any) => void;
    removeUser: (id: string) => void;
    resetUsers: () => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
    users: {},
    setUser: (id, call) =>
        set((state) => ({
            users: {
                ...state.users,
                [id]: call,
            },
        })),
    removeUser: (id) =>
        set((state) => {
            const newUsers = { ...state.users };
            delete newUsers[id];
            return { users: newUsers };
        }),
    resetUsers: () => set({ users: {} }),
}));
