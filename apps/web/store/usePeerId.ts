import { create } from 'zustand';

type PeerIdState = {
    myId: string;
    setMyId: (id: string) => void;
};

export const usePeerIdStore = create<PeerIdState>((set) => ({
    myId: '',
    setMyId: (id) => set({ myId: id }),
}));
