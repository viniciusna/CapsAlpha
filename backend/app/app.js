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

const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const documentRoute = require("./routes/document");

////////////////////////////////////////////////////////////////////////////////
// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// const allowedOrigins = ["*"];

// const options = {
//   origin: allowedOrigins,
// };
// app.use(cors(options));

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
  //ws.send('Welcome to the chat, enjoy :)');

  ws.on("error", (error) => {
    console.log("Socket Error: " + error);
  });

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("close", () => {
    console.log("Socket Client Disconnected");
  });

  //wsStart(ws, req)

  ws.userId = uuid();

  ws.on("message", (data, isBinary) => {
    try {
      const message = isBinary ? data : data.toString();
      //console.log(isBinary, message, typeof message)
      console.log(wss);
      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          ws.userId !== client.userId
        ) {
          client.send(message);
        }
      });
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
