import { redis } from "../../lib/redis";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

const MAX_USERS_PER_ROOM = 2;

export async function POST(req: Request) {
    const { id: poolId } = await req.json();

    if (!poolId) {
        return NextResponse.json({ error: "Missing poolId" }, { status: 400 });
    }

    const roomSetKey = `freeRooms:${poolId}`;
    const roomIds = await redis.smembers(roomSetKey);

    for (const roomId of roomIds) {
        const ownerId = await redis.get(`roomOwner:${roomId}`);
        if (ownerId === roomId) continue;

        const sizeKey = `roomSize:${roomId}`;
        const sizeRaw = await redis.get(sizeKey);
        const size = parseInt(sizeRaw || "0");

        if (size >= MAX_USERS_PER_ROOM) {
            await redis.srem(roomSetKey, roomId);
            continue;
        }

        const newSize = await redis.incr(sizeKey);

        if (newSize > MAX_USERS_PER_ROOM) {
            await redis.decr(sizeKey);
            continue;
        }

        if (newSize === MAX_USERS_PER_ROOM) {
            await redis.srem(roomSetKey, roomId);
            await redis.del(`roomSize:${roomId}`);
            await redis.del(`roomOwner:${roomId}`);
        }

        return NextResponse.json({ roomId, joined: true });
    }

    const newRoomId = uuidv4();
    const sizeKey = `roomSize:${newRoomId}`;
    await redis.set(sizeKey, 1);
    await redis.sadd(roomSetKey, newRoomId);
    await redis.set(`roomOwner:${newRoomId}`, poolId);

    return NextResponse.json({ roomId: newRoomId, joined: false });
}
