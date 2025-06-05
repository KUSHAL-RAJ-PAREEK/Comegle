import { redis } from "../../lib/redis";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const { poolId, roomId } = await req.json();

    if (!poolId || !roomId) {
        return NextResponse.json({ error: "Missing poolId or roomId" }, { status: 400 });
    }
    console.log("herere renreirne in room remove")
    const roomSetKey = `freeRooms:${poolId}`;
    const sizeKey = `roomSize:${roomId}`;

    await redis.srem(roomSetKey, roomId);
    await redis.del(sizeKey);

    return NextResponse.json({ success: true, message: `Room ${roomId} removed.` });
}
