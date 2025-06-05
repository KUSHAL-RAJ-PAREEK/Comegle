import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import Redis from 'ioredis'
import dotenv from "dotenv";
dotenv.config();


// @ts-ignore
const pub = new Redis(process.env["REDIS"]);
// @ts-ignore
const sub = new Redis(process.env["REDIS"]);

const dev = process.env.NODE_ENV !== "production";
const hostname = "10.10.103.62";
const port = 8000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    console.log("inside socket")
    // @ts-ignore
    if (!globalThis.io) {
        const io = new Server(httpServer,{
            cors:{
                allowedHeaders:['*'],
                origin: '*'
            }
        });
        // @ts-ignore
        globalThis.io = io;
        sub.subscribe('MESSAGES')

        io.on('connection',(socket)=>{
            console.log('server is connected')
            socket?.on('join-room',(roomId,id) =>{
                const room = io.sockets.adapter.rooms.get(roomId);
                const numUsers = room ? room.size : 0;
                if (numUsers >= 2) {
                    console.log(`Room ${roomId} is full`);
                    socket.emit("room-full");
                    return;
                }
                console.log(`a new User ${id} joined room ${roomId}`)
                socket.join(roomId)
                socket.broadcast.to(roomId).emit(`user-connected`,id)
            })

            socket.on(`user-leave`,(userId,roomId)=>{
                socket.broadcast.to(roomId).emit(`user-leave`,userId)
                socket.leave(roomId);
                socket.broadcast.to(roomId).emit(`leave-now`)
            })

            socket.on("message", async ({ roomId, userId,message }: { roomId: string; userId:string; message: string }) => {
                console.log(`New message in room ${roomId}:`, message);

                await pub.publish("MESSAGES", JSON.stringify({ roomId,userId, message }));
            });

            socket.on("disconnect", () => {
                console.log("Socket disconnected:", socket.id);
            });

        })
        sub.on("message", (channel, message) => {
            if (channel === "MESSAGES") {
                const { roomId, userId, message: msg } = JSON.parse(message);
                console.log("New message from Redis:", msg);
                io.to(roomId).emit("message", {userId, message: msg});
            }
        });


        pub.on("error", (err) => console.error("Redis PUB Error:", err));
        sub.on("error", (err) => console.error("Redis SUB Error:", err));


    } else {
        console.log("Socket.IO server already running.");
    }

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
