"use server"

import db from "@repo/db/client";
export const getPoolId = async (domain:string) =>{
    const pool = await db.pool.findUnique({
        where: { domain },
        select: { poolId: true },
    });

    return pool?.poolId;

}
