require("express-async-errors");

const fs = require('fs');
const express = require("express");
const app = express();
const https = require("https");
const server = https.createServer({
  key: fs.readFileSync('./.ssl/capsalpha.live.key'),
  cert: fs.readFileSync('./.ssl/capsalpha.live.crt')
}, app);

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
app.use(
  cors({
    credentials: true,
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "ws://localhost:3001",
      "http://capsalpha.live",
      "https://capsalpha.live",
      "wss://capsalpha.live:3001",
      "wss://www.capsalpha.live",
      "http://www.capsalpha.live",
      "https://www.capsalpha.live:3001",
      "https://www.capsalpha.live"
    ],
  })
);

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

module.exports = server;