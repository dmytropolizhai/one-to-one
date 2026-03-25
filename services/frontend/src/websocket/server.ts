import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@/websocket/events";

const PORT = Number(process.env.SOCKET_PORT ?? 3001);
const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";

const httpServer = createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "healthy" }));
        return;
    }
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

async function setup() {
    try {
        const pubClient = createClient({ url: REDIS_URL });
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);
        console.log("Redis connected for WebSocket adapter");

        io.adapter(createAdapter(pubClient, subClient));
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
    }

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
}

setup();