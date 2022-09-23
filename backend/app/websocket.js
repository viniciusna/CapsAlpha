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
    const roomManager = new RoomManager(ws);

    ws.on("error", (error) => {
      console.log("Socket Error: " + error);
    });

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("close", async () => {
      await roomManager.leave(wss.clients, WebSocket);
    });

    //wsStart(ws, req)
    ws.on("message", async (data) => {
      try {
        const { type, params } = JSON.parse(data);
        switch (type) {
          case "join":
            console.log(type);
            ws.userId = params.userId;
            await roomManager.join(params);
            break;
          case "leave":
            await roomManager.leave(wss.clients, WebSocket);
            break;
          case "message":
            await roomManager.messageEdition(
              params,
              wss.clients,
              WebSocket,
              type
            );
            break;
          case "cursor":
            await roomManager.messageChanges(
              params,
              wss.clients,
              WebSocket,
              type
            );
            break;
          case "title":
            await roomManager.messageChanges(
              params,
              wss.clients,
              WebSocket,
              type
            );
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
