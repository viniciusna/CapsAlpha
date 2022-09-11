require("express-async-errors");
//const indexRoute = require("./routes/index");
const { wsStart } = require("./websocket/index");
const uuid = require("./utils/uuid");

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({
  server: server,
  clientTracking: true,
});
const WebsocketMethods = require("./websocket/methods");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const documentRoute = require("./routes/document");

////////////////////////////////////////////////////////////////////////////////
// Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// const allowedOrigins = ["*"];

// const options = {
//   origin: allowedOrigins,
// };
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

////////////////////////////////////////////////////////////////////////////////
// HTTP Server

app.use("/", indexRoute);
app.use("/user", userRoute);
app.use("/document", documentRoute);

app.use((err, req, res, next) => {
  console.log(err);
  if (err && err.status) {
    res.status(err.status).json({
      data: err.name,
      message: err.message,
    });
  } else {
    res.status(500).json({
      data: "InternalServerError",
      message: "Something when wrong",
    });
  }
  next();
});

////////////////////////////////////////////////////////////////////////////////
// WebSocket Server

wss.on("error", (error) => {
  console.log("Socket Server Error: " + error);
});

wss.on("close", () => {
  console.log("Socket Server Close");
});

wss.on("connection", (ws, req) => {
  console.log("Socket Client Connection");

  ws.on("error", (error) => {
    console.log("Socket Error: " + error);
  });

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("close", () => {
    const websocketMethods = new WebsocketMethods(ws);
    websocketMethods.removeUser(ws.room, ws.userId);
    console.log("Socket Client Disconnected");
  });

  //wsStart(ws, req)
  ws.userId = uuid();

  ws.on("message", async (data) => {
    try {
      const websocketMethods = new WebsocketMethods(ws);
      const obj = JSON.parse(data);
      console.log(data);
      console.log(obj);
      const type = obj.type;
      const params = obj.params;
      switch (type) {
        case "join":
          await websocketMethods.join(params);
          break;
        case "leave":
          websocketMethods.leave(params);
          break;
        case "message":
          websocketMethods.message(params, wss.clients, WebSocket);
          break;
        default:
          console.warn(`Type: ${type} unknown`);
          break;
      }
    } catch (e) {
      console.log(
        "WS-MESSAGE ERROR: message(fn) --> received non-parsable DATA --> " + e
      );
      return;
    }
  });

  //ws.on('message', (data, isBinary) => { })
});

////////////////////////////////////////////////////////////////////////////////
// Export HTTP Server

module.exports = server;

// {
//   api_caps_alpha_1_1  |       _events: [Object],
//   api_caps_alpha_1_1  |       _eventsCount: 4,
//   api_caps_alpha_1_1  |       _binaryType: 'nodebuffer',
//   api_caps_alpha_1_1  |       _closeCode: 1006,
//   api_caps_alpha_1_1  |       _closeFrameReceived: false,
//   api_caps_alpha_1_1  |       _closeFrameSent: false,
//   api_caps_alpha_1_1  |       _closeMessage: [Object],
//   api_caps_alpha_1_1  |       _closeTimer: null,
//   api_caps_alpha_1_1  |       _extensions: {},
//   api_caps_alpha_1_1  |       _paused: false,
//   api_caps_alpha_1_1  |       _protocol: '',
//   api_caps_alpha_1_1  |       _readyState: 1,
//   api_caps_alpha_1_1  |       _receiver: [Object],
//   api_caps_alpha_1_1  |       _sender: [Object],
//   api_caps_alpha_1_1  |       _socket: [Object],
//   api_caps_alpha_1_1  |       _isServer: true,
//   api_caps_alpha_1_1  |       userId: '4909fe0e-8f05-4f21-86b1-f66e14b02673'
//   api_caps_alpha_1_1  |     }
