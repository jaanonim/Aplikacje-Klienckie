import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("conn");
    socket.on("pos", (data) => {
        io.emit("pos", data);
    });
});

httpServer.listen(3000);
