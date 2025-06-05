import {useCallback, useEffect, useState} from "react";
import {usePeerIdStore} from "../store/usePeerId";
import {cloneDeep} from 'lodash'
import {PlayerData, usePlayersStore} from "../store/usePlayerStore";
import {useSocketStore} from "../store/useSocketStore";
import {log} from "node:util";
import {useRouter} from "next/navigation";
import {useUserStore} from "../store/useUserState";
import {getPoolId} from "../app/lib/actions/getPoolId";
import {useSession} from "next-auth/react";
import deleteRoom from "../app/lib/actions/deleteRoom";
import {useMessageStore} from "../store/useMessageStore";

// @ts-ignore
const usePlayer = (myId: string | undefined, roomId: any, peer: any) => {
    const players = usePlayersStore((state) => state.players);
    const setPlayers = usePlayersStore((state) => state.setPlayers);
    const playersCopy = cloneDeep(players)
    const socket = useSocketStore((state) => state.socket);
    const addMessage = useMessageStore((state) => state.addMessage);
    const clearMessages = useMessageStore((state) => state.clearMessages);

    const session = useSession();
    const email = session.data?.user?.email || "";
    const domain = email.split("@")[1] || "";



    const router = useRouter()
    let playerHighlighted: PlayerData | null = null;


    // @ts-ignore
    if (myId && playersCopy[myId]) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        playerHighlighted = playersCopy[myId];
        delete playersCopy[myId];
    }


    const leaveRoom = useCallback(async () => {
        console.log("hi, leaving room");
        socket.emit("user-leave", myId, roomId);
        console.log("leaving room", myId, roomId);
        peer?.disconnect();


        setPlayers((prev) => {
            const filteredPlayers: Record<string, PlayerData> = {};
            if (myId && prev[myId]) {
                filteredPlayers[myId] = prev[myId];
            }
            return filteredPlayers;
        });

        clearMessages()
        await fetchRoom(domain);
        await deleteRoom(domain,roomId)

    }, [socket, myId, roomId, peer, domain]);


    const stopRoom = useCallback(async () => {
        console.log("hi, stop room");
        socket.emit("user-leave", myId, roomId);
        console.log("stop-now", myId, roomId);
        peer?.disconnect();

        setPlayers((prev) => {
            const filteredPlayers: Record<string, PlayerData> = {};
            if (myId && prev[myId]) {
                filteredPlayers[myId] = prev[myId];
            }
            return filteredPlayers;
        });
        await deleteRoom(domain,roomId)

        clearMessages()
    }, [socket, myId, roomId, peer, domain]);

    useEffect(() => {
        if (!socket) return;
        const updateMessages = ({ userId, message }: { userId: string; message: string }) => {
            addMessage({ userId, msg: message });
        };
        socket.on("message", updateMessages);
        return () => {
            socket.off("message", updateMessages);
        };
    }, [socket, addMessage]);

    console.log("🔵 Highlighted Player:", playerHighlighted);
    console.log("🟢 Non-Highlighted Players:", playersCopy);


    useEffect(() => {
        if (!socket) return;
        const handleLeaveNow = () => {
            console.log("Received 'leave-now' event from server");
            leaveRoom();
        };

        socket.on("leave-now", handleLeaveNow);

        return () => {
            socket.off("leave-now", handleLeaveNow);
        };
    }, [socket, leaveRoom]);



    const fetchRoom = async (domain: string) => {
        try {

            const poolId = await getPoolId(domain)
            console.log("poolId  in usePlayer: ", poolId)

            if (!poolId) {
                console.error("No pool found for domain:", domain);
                return;
            }

            const res = await fetch("/api/get-room", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: poolId}),
            });

            const data = await res.json();
            if (data.roomId) {
                console.log("Got roomId:", data.roomId);
                router.push(`/${data.roomId}`);
            }
        } catch (error) {
            console.error("Error fetching room:", error);
        }
    };
    if (myId && playersCopy[myId]) {
        delete playersCopy[myId];
    }


    return {players, setPlayers, playerHighlighted, playersCopy, leaveRoom,stopRoom};

}

export default usePlayer;