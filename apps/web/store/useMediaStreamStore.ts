import {create} from 'zustand';


type MediaStreamStore = {
    stream: MediaStream | null;
    setStream: (stream: MediaStream) => void;
}

export const useMediaStreamStore = create<MediaStreamStore>((set) =>({
    stream: null,
    setStream: (stream) => set({stream})
}))