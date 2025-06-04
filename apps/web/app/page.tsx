"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import Loader from "./components/Loader";
import db from "@repo/db/client";
import {getPoolId} from "./lib/actions/getPoolId";

export default function Home() {
    const session = useSession();
    const status = session.status;
    const router = useRouter();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

    const [roomId, setRoomId] = useState<string | null>(null);

    const email = session.data?.user?.email || "";
    const domain = email.split("@")[1] || "";
    console.log(domain)
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/api/auth/signin");
            return;
        }

        if (status === "authenticated") {
            setAuthenticated(true);

            const fetchRoom = async () => {
                try {

                    const poolId =  await getPoolId(domain)
                    if (!poolId) {
                        console.error("No pool found for domain:", domain);
                        return;
                    }

                    const res = await fetch("/api/get-room", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: poolId }),
                    });

                    const data = await res.json();
                    if (data.roomId) {
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

    return <Loader />;
}
