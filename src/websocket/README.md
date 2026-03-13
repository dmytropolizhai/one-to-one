# WebSocket Documentation

This directory contains the WebSocket implementation for real-time features (like chat messages) using **Socket.IO**.

## Directory Structure

- `server.ts`: The standalone Socket.IO server implementation.
- `events.ts`: TypeScript interfaces for client-to-server and server-to-client events.
- `index.ts`: Singleton client-side socket initialization.
- `hooks/`: React hooks for interacting with the WebSocket.
  - `use-socket.ts`: Primary hook for connection state and event listeners.

---

## Server Implementation (`server.ts`)

The server runs on a separate port (default: `3001`) and manages chat rooms based on `chatId` (UUID).

### Key Features:
- **Room Isolation**: Users join rooms identified by the chat's `publicId`.
- **Relay System**: Receives persisted messages from the client and broadcasts them to the correct room.

### Event Logic:
1.  `joinChat(chatId)`: Adds the socket to a room named after the UUID.
2.  `leaveChat(chatId)`: Removes the socket from that room.
3.  `relayMessage({ chatId, message })`: Broadcasts a fresh database message to everyone in the room.

---

## Client Implementation

### 1. Initialization (`index.ts`)
Uses a singleton pattern to ensure only one socket connection is created per client session. It uses the `NEXT_PUBLIC_SOCKET_URL` environment variable.

### 2. React Hooks (`hooks/use-socket.ts`)

#### `useSocket()`
Provides access to the socket instance and its connection status.
```tsx
const { socket, connected } = useSocket();
```

#### `useSocketEvent(event, handler)`
A typesafe hook to listen for specific server events.
```tsx
useSocketEvent("message", (payload) => {
    console.log("New message received:", payload.message);
});
```

---

## Events & Types (`events.ts`)

### Client to Server (`ClientToServerEvents`)
- `joinChat(chatId: string)`
- `leaveChat(chatId: string)`
- `relayMessage(payload: { chatId: string; message: Message })`

### Server to Client (`ServerToClientEvents`)
- `message(payload: { chatId: string; message: Message })`
- `userCount(count: number)`

---

## Configuration

### Environment Variables (.env)
- `NEXT_PUBLIC_SOCKET_URL`: The URL where the socket server is running (e.g., `http://localhost:3001`).
- `SOCKET_PORT`: The port the server should bind to.

### Running the Environment
The WebSocket server is integrated into the development workflow:
```bash
# Runs both Next.js and the Socket server concurrently
pnpm run dev:all
```
Individual command:
```bash
pnpm run dev:socket
```

---

## Usage Example

In a chat component:
```tsx
export function ChatMessages({ chatId }) {
    const { socket, connected } = useSocket();
    
    // Automatically manage room membership
    useEffect(() => {
        if (!socket || !connected) return;
        socket.emit("joinChat", chatId);
        return () => socket.emit("leaveChat", chatId);
    }, [socket, connected, chatId]);

    // Listen for real-time messages
    useSocketEvent("message", (payload) => {
        if (payload.chatId === chatId) {
            setMessages((prev) => [...prev, payload.message]);
        }
    });
}
```
