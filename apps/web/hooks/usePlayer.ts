import {useEffect, useState} from "react";
import {usePeerIdStore} from "../store/usePeerId";
import { cloneDeep } from 'lodash'
import {PlayerData, usePlayersStore} from "../store/usePlayerStore";
import {useSocketStore} from "../store/useSocketStore";
import {log} from "node:util";
import {useRouter} from "next/navigation";

// @ts-ignore
const usePlayer =  (myId: string | undefined,roomId:any,peer:any)  =>{
    const players = usePlayersStore((state) => state.players);
    const setPlayers = usePlayersStore((state) => state.setPlayers);
    const playersCopy = cloneDeep(players)
    const socket = useSocketStore((state) => state.socket);
const router = useRouter()
    let playerHighlighted: PlayerData | null = null;


    useEffect(() => {
        if (myId && playersCopy[myId]) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            playerHighlighted = playersCopy[myId];
            delete playersCopy[myId];
        }
    }, [myId]);

    const leaveRoom = () =>{
        console.log("hi in l;eave reomrem")
     socket.emit('user-leave',myId,roomId)
        console.log("leaving room",myId,roomId)
        peer?.disconnect();
     router.push("/")
    }

    return { players, setPlayers, playerHighlighted,playersCopy,leaveRoom };

}

export default usePlayer;