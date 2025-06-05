"use server"

import {getPoolId} from "./getPoolId";

export default async  function (domain :string,roomId:string){
    console.log("dssdsdsxzxxxxxxxx",domain,roomId)

    const poolId = await getPoolId(domain)

    await fetch("http://localhost:3000/api/room",
        {
            method: "DELETE",
            headers:{
                "Content-type" : "application/json",
            },
            body: JSON.stringify({
                poolId :poolId,
                roomId :roomId
            })
        }
)
}