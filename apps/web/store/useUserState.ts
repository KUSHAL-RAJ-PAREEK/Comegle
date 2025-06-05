import { create } from 'zustand';

interface UserState {
    name: string;
    email: string;
    poolId : string;
    setUser: (name: string, email: string,poolId :string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    name: '',
    email: '',
    poolId: '',
    setUser: (name, email,poolId) => set({ name, email,poolId }),
    clearUser: () => set({ name: '', email: '' ,poolId: ''}),
}));
