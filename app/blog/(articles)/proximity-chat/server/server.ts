import type { ServerWebSocket } from "bun";

let rooms: Map<string, Array<ServerWebSocket<unknown>>> = new Map();

const userList: Array<string> = [];
const server = Bun.serve({
  fetch(req, server) {
    const url = new URL(req.url);
    const roomName = url.searchParams.get("roomName");

    if (!roomName) {
      return;
    }
    server.upgrade(req, { data: { roomName } });
  },
  websocket: {
    open: (ws) => {
      const { roomName } = ws.data as { roomName: string };
      const room = rooms.get(roomName);

      if (!room) {
        rooms.set(roomName, [ws]);
        return;
      }
      room?.push(ws);
    },
    close: (ws) => {
      const { roomName } = ws.data as { roomName: string };
      rooms.set(roomName, rooms.get(roomName)?.filter((s) => s !== ws) ?? []);
    },
    message: async (ws, message) => {
      const { roomName } = ws.data as { roomName: string };
      const room = rooms.get(roomName)!;
      room.forEach((s) => ws !== s && s.send(message));
    },
  },
  port: 8080,
});

console.log(`Listening on ${server.hostname}:${server.port}`);
