import type { ServerWebSocket } from "bun";

const sockets: Array<ServerWebSocket<unknown>> = []

const server = Bun.serve({
  fetch(req, server) {
  server.upgrade(req);

  },
  websocket: {
    open: (ws) => {
      console.log('opened',)
      sockets.push(ws)
      ws.subscribe("canvas");
    },
    close: () => {
      console.log('close')
    },
    message: async (ws, message) => {

      sockets.forEach(s => ws !== s && s.send(message))
      ws.publish('canvas', message)
    },
  },
  port: 8080,
});

console.log(`Listening on ${server.hostname}:${server.port}`);
