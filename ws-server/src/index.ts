import { WebSocketServer } from "ws";
import { WS_EVENTS } from "./utils/events.js";

const PORT = (process.env.PORT as unknown as number) || 8080;

const wss = new WebSocketServer({ port: PORT });

const clients = new Map(); //userId -> ws
const sockets = new Map(); //ws -> userId

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data: string) {
    const parsedData = JSON.parse(data);
    // {
    //     type: "connection_init",
    //     userId: "user123"
    // }
    if (parsedData.type === WS_EVENTS.CONNECTION) {
      var userId = parsedData.userId;
      if (!clients.get(userId)) {
        clients.set(userId, ws);
        sockets.set(ws, userId);
        ws.send(`${userId} connection_init and added to memory`);
      } else {
        ws.send(`${userId} already connected`);
      }
    }

    ws.send(
      JSON.stringify({
        event: WS_EVENTS.CONNECTION_ACK,
        message: "connected",
      })
    );
  });

  ws.on("close", () => {
    const userId = sockets.get(ws);
    if (userId) {
      clients.delete(userId);
      sockets.delete(ws);
      console.log(`User Disconnected: ${userId}`);
    }
  });
});
