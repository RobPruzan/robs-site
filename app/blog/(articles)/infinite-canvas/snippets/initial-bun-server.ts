const server = Bun.serve({
  fetch(req, server) {
    server.upgrade(req);
  },
  websocket: {
    open: (ws) => {
      ws.subscribe("canvas");
    },
    message: async (ws, message) => {
      ws.publish("canvas", message);
    },
  },
  port: 8080,
});

console.log(`Listening on ${server.hostname}:${server.port}`);