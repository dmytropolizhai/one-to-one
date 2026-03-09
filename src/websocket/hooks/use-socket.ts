"use client"

import { useEffect, useState } from "react"
import { getSocket } from "@/websocket/socket"
import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@/websocket/events"
import type { Socket } from "socket.io-client"

export function useSocket() {
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)

    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const socketInstance = getSocket()

        setSocket(socketInstance)

        const onConnect = () => setConnected(true)
        const onDisconnect = () => setConnected(false)

        socketInstance.on("connect", onConnect)
        socketInstance.on("disconnect", onDisconnect)

        socketInstance.connect()

        return () => {
            socketInstance.off("connect", onConnect)
            socketInstance.off("disconnect", onDisconnect)
        }
    }, [])

    return {
        socket,
        connected,
    }
}

type ServerEventName = keyof ServerToClientEvents
type EventHandler<T extends ServerEventName> = ServerToClientEvents[T]

export function useSocketEvent<T extends ServerEventName>(
    event: T,
    handler: EventHandler<T>
) {
    const { socket } = useSocket()

    useEffect(() => {
        if (!socket) return

        const listener = handler as EventHandler<T>

        socket.on(event, listener as never)

        return () => {
            socket.off(event, listener as never)
        }
    }, [socket, event, handler])
}