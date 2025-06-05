"use server"

import {getPoolId} from "./getPoolId";

export default async function (domain: string, roomId: string) {

    const poolId = await getPoolId(domain)

    await fetch("/api/room",
        {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                poolId: poolId,
                roomId: roomId
            })
        }
    )
}