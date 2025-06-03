import { create } from 'zustand'

export interface PlayerData {
    url : MediaStream;
    muted: Boolean;
    playing: Boolean
}

interface PlayersState {
    players: Record<string, PlayerData>;
    setPlayers: (fn: (prev: Record<string, PlayerData>) => Record<string,PlayerData>) => void;
}

export const usePlayersStore = create<PlayersState>((set) => ({
    players: {},
    setPlayers: (fn) => set((state) => ({
        players: fn(state.players)
    }))
}))