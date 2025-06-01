"use client"
import {useSession} from "next-auth/react";


export default function page(){

    const session = useSession()
    if(session.status == "authenticated"){
        return<div>
            email verified
        </div>
    }else{
     return  <div>
           verification email sent
       </div>
    }

}