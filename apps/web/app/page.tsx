"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import AuthBox from "./components/AuthBox/AuthBox";
import {use, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "../store/authStore";
import {useSocketStore} from "../store/useSocketStore";

export default function Home() {
  const session = useSession();
  const status = session.status
const router = useRouter()
    const socket = useSocketStore((state) => state.socket);

    const setAuthenticated = useAuthStore((state) =>state.setAuthenticated)
    useEffect(() => {
       setTimeout(()=>{},2000)
        if(status == 'unauthenticated'){
            router.replace('/api/auth/signin')
        }else{
            setAuthenticated(true)
        }
    }, [socket,status]);

    useEffect(() => {
        const hasReloaded = sessionStorage.getItem("hasReloaded");
        if (hasReloaded !== "krp") {
            console.log(hasReloaded)
            sessionStorage.setItem("hasReloaded", "krp");
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket?.on("connect",()=>{
            console.log("client",socket.id);
        })
    }, [socket,status]);

    return (
   <div>
       <button onClick={()=>{
           sessionStorage.removeItem("no");
        return signOut()
       }}>
           btn
       </button>
       {status}

   </div>
  );
}