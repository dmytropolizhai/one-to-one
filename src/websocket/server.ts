import { createServer } from "http";
import { Server } from "socket.io";
import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@/websocket/events";

const PORT = Number(process.env.SOCKET_PORT ?? 3001);
const httpServer = createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinChat", (chatId) => {
        socket.join(chatId.toString());
        console.log(`Socket ${socket.id} joined room: ${chatId}`);
    });

    socket.on("leaveChat", (chatId) => {
        socket.leave(chatId.toString());
        console.log(`Socket ${socket.id} left room: ${chatId}`);
    });

    socket.on("relayMessage", (payload) => {
        io.to(payload.chatId.toString()).emit("message", payload);
        console.log(`Relaying message ${payload.message.id} to room ${payload.chatId}`);
    });



    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
});