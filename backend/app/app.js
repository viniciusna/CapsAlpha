require("express-async-errors");

const express = require("express");
const app = express();
const wss = require("./websocket");
const http = require("http");
const server = http.createServer(app);

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
