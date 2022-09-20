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
      await roomManager.leave(wss.clients, WebSocket);
      console.log("Socket Client Disconnected");
    });

    //wsStart(ws, req)
    ws.on("message", async (data) => {
      try {
        const { type, params } = JSON.parse(data);
        // console.log(JSON.parse(data));
        switch (type) {
          case "join":
            ws.userId = params.userId;
            await roomManager.join(params);
            break;
          case "leave":
            await roomManager.leave(wss.clients, WebSocket);
            break;
          case "message":
            await roomManager.message(params, wss.clients, WebSocket, type);
            break;
          case "cursor":
            await roomManager.cursor(params, wss.clients, WebSocket, type);
            break;
          case "title":
            await roomManager.message(params, wss.clients, WebSocket, type);
            break;
          case "save":
            await roomManager.save(params);
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
