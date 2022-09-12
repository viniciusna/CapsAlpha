const server = require("./app");
const config = require("../app/config");
const port = config.port;

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
const wss = require("./websocket");
wss(server);
