"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import AuthBox from "./components/AuthBox/AuthBox";
import {use, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
  const session = useSession();
  const status = session.status
const router = useRouter()
    useEffect(() => {
       setTimeout(()=>{},2000)
        if(status == 'unauthenticated'){
            router.replace('/api/auth/signin')
        }
    }, [session,status]);
    return (
   <div>
       <button onClick={()=>{

        return signOut()
       }}>
           btn
       </button>
       {status}

   </div>
  );
}