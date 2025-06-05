"use server"

import db from "@repo/db/client";
export const getPoolId = async (domain:string) =>{
    console.log("in i ma in")
    const pool = await db.pool.findUnique({
        where: { domain },
        select: { poolId: true },
    });

    return pool?.poolId;

}
