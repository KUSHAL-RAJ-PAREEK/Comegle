import { create } from 'zustand';


type PeerInstanceState = {
    peer: any | null;
    setPeer: (peer: any) => void;
};

export const usePeerStore = create<PeerInstanceState>((set) => ({
    peer: null,
    setPeer: (peer) => set({ peer }),
}));