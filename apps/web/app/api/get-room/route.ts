import {redis} from "../../lib/redis";
import {v4 as uuidv4} from "uuid";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {id: poolId} = await req.json();

    if (!poolId) {
        return NextResponse.json({error: "Missing poolId"}, {status: 400});
    }

    const roomSetKey = `freeRooms:${poolId}`;

    const matchedRoomId = await redis.spop(roomSetKey);

    if (matchedRoomId) {
        return NextResponse.json({roomId: matchedRoomId, joined: true});
    }

    const newRoomId = uuidv4();
    await redis.sadd(roomSetKey, newRoomId);

    return NextResponse.json({roomId: newRoomId, joined: false});
}
