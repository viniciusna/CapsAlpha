//Vai exportar todas as controllers
const server = require("./app");
const port = 3000;

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
