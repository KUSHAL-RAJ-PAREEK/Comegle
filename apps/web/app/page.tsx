"use client"

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "../store/authStore";
import Loader from "./components/Loader";
import {getPoolId} from "./lib/actions/getPoolId";
import {useUserStore} from "../store/useUserState";

export default function Home() {
    const session = useSession();
    const status = session.status;
    const router = useRouter();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

    const [setRoomId] = useState<string | null>(null);
    const {setUser} = useUserStore();

    const email = session.data?.user?.email || "";
    const domain = email.split("@")[1] || "";


    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/api/auth/signin");
            return;
        }

        if (status === "authenticated") {
            setAuthenticated(true);

            const fetchRoom = async () => {
                try {

                    const poolId = await getPoolId(domain)
                    console.log(poolId)

                    // @ts-ignore
                    setUser({name: session.data?.user?.name, email: session.data?.user?.email, poolId: poolId})

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

                        // @ts-ignore
                        setRoomId(data.roomId);

                        console.log("Got roomId:", data.roomId);

                        router.push(`/${data.roomId}`);
                    }
                } catch (error) {
                    console.error("Error fetching room:", error);
                }
            };

            setTimeout(fetchRoom, 2000);
        }
    }, [status, domain, router, setAuthenticated]);

    useEffect(() => {
        const hasReloaded = sessionStorage.getItem("hasReloaded");
        if (hasReloaded !== "krp") {
            sessionStorage.setItem("hasReloaded", "krp");
            window.location.reload();
        }
    }, []);

    return <Loader/>;
}
