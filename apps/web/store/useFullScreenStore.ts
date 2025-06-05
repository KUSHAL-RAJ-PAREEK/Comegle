
import { create } from 'zustand';

interface FullScreenData{
    isFullScreen : boolean
    setFullScreen: (isFullScreen: boolean) => void;

}

export const useFullScreenStore = create<FullScreenData>((set) =>({
    isFullScreen : false,
    setFullScreen:(isFullScreen) => set({isFullScreen})
}))