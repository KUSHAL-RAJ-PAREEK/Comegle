import {useEffect, useRef, useState} from "react";
import {useSocketStore} from "../store/useSocketStore";
import { useParams } from "next/navigation";
import {usePeerStore} from "../store/usePeerStore";
import {usePeerIdStore} from "../store/usePeerId";
import {useSession} from "next-auth/react";

const usePeer = () =>{

    const { setPeer } = usePeerStore();
    const { setMyId } = usePeerIdStore();
    const isPeerSet = useRef(false);
    const socket = useSocketStore((state) => state.socket);
// @ts-ignore
    const { roomId } = useParams();
    // console.log(roomId)
    useEffect(() =>{
        if(isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        (async function initPeer(){
            const myPeer = new (await import('peerjs')).default();
            // @ts-ignore
            setPeer(myPeer)
            myPeer.on('open',(id) =>{
                console.log(`your peer id is ${id}`)
                setMyId(id)
                // console.log("ROOMI"+ roomId)
                socket?.emit('join-room',roomId,id)
            })
        })()
    },[roomId,socket])

    return {
        ...usePeerStore(),
        ...usePeerIdStore(),
    }
}

export default usePeer;