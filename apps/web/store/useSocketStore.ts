import {create} from "zustand";

type SocketState = {
    socket: any | null;
    setSocket: (socket: any) => void;
    disconnectSocket: () => void;
};

export const useSocketStore = create<SocketState>((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),

    disconnectSocket: () => set((state) => {
        if(state.socket) {
            state.socket.disconnect();
        }
        return { socket: null };
    }),
}));