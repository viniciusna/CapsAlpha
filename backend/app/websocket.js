const server = require("./app");
const RoomManager = require("./websocket/roomManager");
const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server,
    clientTracking: true,
  });
  wss.on("error", (error) => {
    console.log("Socket Server Error: " + error);
  });

  wss.on("close", () => {
    console.log("Socket Server Close");
  });

  wss.on("connection", (ws, req) => {
    console.log("Socket Client Connection");
    const roomManager = new RoomManager(ws);

    ws.on("error", (error) => {
      console.log("Socket Error: " + error);
    });

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("close", async () => {
      await roomManager.leave();
      console.log("Socket Client Disconnected");
    });

    //wsStart(ws, req)
    ws.on("message", async (data) => {
      try {
        const { type, params } = JSON.parse(data);
        switch (type) {
          case "join":
            ws.userId = params.userId;
            await roomManager.join(params);
            break;
          case "leave":
            await roomManager.leave(params);
            break;
          case "message":
            await roomManager.message(params, wss.clients, WebSocket);
            break;
          default:
            console.warn(`Type: ${type} unknown`);
            break;
        }
      } catch (e) {
        console.log(
          "WS-MESSAGE ERROR: message(fn) --> received non-parsable DATA --> " +
            e
        );
        return;
      }
    });
  });

  return wss;
};
