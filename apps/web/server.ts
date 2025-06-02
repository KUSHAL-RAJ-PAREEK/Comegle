import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    console.log("inside socket")
    // @ts-ignore
    if (!globalThis.io) {
        const io = new Server(httpServer);
        // @ts-ignore
        globalThis.io = io;

        io.on("connection", (socket) => {
            console.log("Socket connected:", socket.id);


            // socket.on("join-room", (roomId, id) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-connected", id);
            // });

            // socket.on("user-toggle-audio", (userId, roomId) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
            // });

            // socket.on("user-toggle-video", (userId, roomId) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-toggle-video", userId);
            // });

            // socket.on("user-leave", (userId, roomId) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-leave", userId);
            // });
        });
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
