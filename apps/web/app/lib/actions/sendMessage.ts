export default function (socket: any, msg: string, roomId: string | undefined, userId: string) {

    if (socket) {
        socket.emit("message", {
            roomId,
            userId,
            message: msg,
        });
    } else {
        console.warn("Socket is not connected. Message not sent:", msg);
    }
}
