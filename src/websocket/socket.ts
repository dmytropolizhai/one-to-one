"use client";

import { io, Socket } from "socket.io-client";
import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from "./events";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function getSocket() {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3001", {
            transports: ["websocket"],
            autoConnect: false,
        });
    }

    return socket;
}