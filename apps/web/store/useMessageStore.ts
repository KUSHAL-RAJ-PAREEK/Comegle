import { create } from "zustand";

type Message = {
    userId: string;
    msg: string;
};

type MessageState = {
    messages: Message[];
    addMessage: (message: Message) => void;
    clearMessages: () => void;
};

export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    clearMessages: () =>
        set({
            messages: [],
        }),

}));
