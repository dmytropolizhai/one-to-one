"use client"

import { useEffect, useState } from "react"
import { getSocket } from "@/websocket/client"
import type { ServerToClientEvents } from "@/websocket/events"

export function useSocket() {
    const socket = getSocket()
    const [connected, setConnected] = useState(socket.connected)

    useEffect(() => {
        const onConnect = () => setConnected(true)
        const onDisconnect = () => setConnected(false)

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)

        if (!socket.connected) {
            socket.connect()
        }

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [socket])

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