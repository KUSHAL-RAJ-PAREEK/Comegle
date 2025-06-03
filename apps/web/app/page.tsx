"use client"

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "../store/authStore";
import Loader from "./components/Loader";


export default function Home() {
    const session = useSession();
    const status = session.status
    const router = useRouter()

    const setAuthenticated = useAuthStore((state) => state.setAuthenticated)


    useEffect(() => {
        setTimeout(() => {
        }, 2000)
        if (status == 'unauthenticated') {
            router.replace('/api/auth/signin')
        } else {
            setAuthenticated(true)
        }
    }, [status]);

    useEffect(() => {
        const hasReloaded = sessionStorage.getItem("hasReloaded");
        if (hasReloaded !== "krp") {
            console.log(hasReloaded)
            sessionStorage.setItem("hasReloaded", "krp");
            window.location.reload();
        }
    }, []);

    return (
          <Loader/>
    );
}