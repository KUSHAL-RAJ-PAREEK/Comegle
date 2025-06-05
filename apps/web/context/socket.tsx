import {io} from "socket.io-client";
import {createContext, useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useSocketStore} from "../store/useSocketStore";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}
let connection:any;
export const SocketProvider = (props:any) => {
    const {children} = props
    const setSocket = useSocketStore((state) => state.setSocket);
    const disconnectSocket = useSocketStore((state) => state.disconnectSocket);
    const socket = useSocketStore((state) => state.socket);

    const session = useSession();
    const status = session.status
    useEffect(() => {
        if(status === 'authenticated'){
            connection = io(    `${process.env.HOSTNAME}:8000`, {
                transports: ["websocket"],
            });

            connection.on("connect", () => {
                console.log("client - connected", connection.id);
            });


            // @ts-ignore
            setSocket(connection);
            return () => {
                disconnectSocket();
            };
        }

    }, [status]);

socket?.on('connect_error',async(err:any) =>{
    console.log("Error established socket",err);

})

    return (<>
        {children}
    </>
)
}