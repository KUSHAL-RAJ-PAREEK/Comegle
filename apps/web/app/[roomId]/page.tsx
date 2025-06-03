"use client"
import {useSocketStore} from "../../store/useSocketStore";
import usePeer from "../../hooks/usePeer";
import useMediaStream from "../../hooks/useMediaStream";

import Player from "../components/Player/index"
import {useEffect, useState} from "react";
import usePlayer from "../../hooks/usePlayer";
import {useParams} from "next/navigation";
import {cloneDeep} from "lodash";
import { useUsersStore } from "../../store/useUsersStore";

const Room = () => {
    const socket = useSocketStore((state) => state.socket);

    const {peer, myId} = usePeer();
    const { stream } = useMediaStream();
    const { roomId } = useParams();

    const {players, setPlayers,playerHighlighted,playersCopy :nonHighlightedPlayers,leaveRoom} = usePlayer(myId,roomId,peer);

    const users = useUsersStore((state) => state.users);
    const setUser = useUsersStore((state) => state.setUser);
    const removeUser = useUsersStore((state) => state.removeUser);
    useEffect(() => {
        if(!socket || !peer || !stream) return;
        const handleUserConnected =  (newUser:string) =>{
            console.log(`user connected in room with ${newUser}`)

            const call = peer.call(newUser,stream)

            call.on('stream',(incomingStream:any) =>{
                console.log( `incoming stream from ${newUser}`)
                setPlayers((prev) =>({
                    ...prev,
                    [newUser] :{
                        url:incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
                // @ts-ignore
                setUser((prev) =>({
                 ...prev,
                 [newUser]:call
                }))
            })
        }
        socket.on("user-connected",handleUserConnected)

        return () =>{
            socket.off("user-connected",handleUserConnected)
        }
    }, [peer, socket, stream]);

    useEffect(() => {
        if (!socket) return;

        const handleUserLeave = (userId:any) =>{
            console.log(`user ${userId} leaving the room`)
            // @ts-ignore
            users[userId]?.close()
            const playerCopy = cloneDeep(players);
            delete playerCopy[userId]
            // @ts-ignore
            setPlayers((prev) => {
                const playerCopy = { ...prev };
                delete playerCopy[userId];
                return playerCopy;
            });
            removeUser(userId)
            console.log("player copy:   ",playerCopy)
        }


        socket.on(`user-leave`,handleUserLeave)

        return () => {
            socket.off(`user-leave`,handleUserLeave)
        }
    }, [setPlayers,socket,users]);


    useEffect(() => {
        if(!peer || !stream) return;

        peer.on('call',(call:any) =>{
            const { peer: callerId} = call;
            call.answer(stream)

            call.on('stream',(incomingStream:any) =>{
                console.log( `incoming stream from ${callerId}`)
                // @ts-ignore
                setPlayers((prev) =>({
                    ...prev,
                    [callerId] :{
                        url:incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
                // @ts-ignore
                setusers((prev) =>({
                    ...prev,
                    [callerId]:call
                }))
            })
        })
    }, [peer,setPlayers,stream]);

    useEffect(() =>{
        if(!stream || !myId ) return;
        console.log(`setting My stream ${myId}`)
        setPlayers((prev) =>({
            ...prev,
            [myId] :{
                url:stream,
                muted: false,
                playing: true
            }
        }))
    },[myId,setPlayers,stream])

    return (<>
        <div>
            {
                playerHighlighted && (
                    <Player
                        // @ts-ignore
                        url={playerHighlighted.url}
                        // @ts-ignore
                        muted={playerHighlighted.muted}
                        // @ts-ignore
                        playing={playerHighlighted.playing}
                        isActive={true}
                    />
                )
            }
        </div>
        <div>
            {
                nonHighlightedPlayers && Object.keys(nonHighlightedPlayers).map((playerId :any)=>{
                    // @ts-ignore
                    const  {url,muted,playing} = nonHighlightedPlayers[playerId];
                    return  <Player key = {playerId} url = {url}  muted={muted} playing = {playing} isActive = {false}/>
                })}
        </div>
        <button onClick={()=>leaveRoom() }>leave</button>


    </>)
}

export default Room;