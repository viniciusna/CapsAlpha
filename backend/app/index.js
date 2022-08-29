//Vai exportar todas as controllers
const app = require("./app");
const port = 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
