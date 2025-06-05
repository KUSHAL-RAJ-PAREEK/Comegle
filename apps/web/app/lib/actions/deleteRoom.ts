"use server"

import {getPoolId} from "./getPoolId";

export default async function (domain: string, roomId: string) {

    const poolId = await getPoolId(domain)

    await fetch("http://10.10.103.62:3000/api/room",
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