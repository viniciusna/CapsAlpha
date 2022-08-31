require("express-async-errors");
const indexRoute = require("./routes/index");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const allowedOrigins = ["*"];

// const options = {
//   origin: allowedOrigins,
// };
// app.use(cors(options));

app.get("/a", (req, res) => {
  res.send("Algo");
});
app.use("/coisas", indexRoute);

app.use((err, req, res, next) => {
  console.log(err);
  if (err && err.status) {
    res.status(err.status).send({
      data: err.name,
      message: err.message,
      status: err.status,
    });
  } else {
    res.status(500).send({
      data: "InternalServerError",
      message: "Something when wrong",
      status: 500,
    });
  }
  next();
});

module.exports = app;
