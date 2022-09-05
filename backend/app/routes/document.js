const router = require("express").Router();
const DocumentCreateController = require("../controllers/documentCreate");

router
  .route("/")
  .post(
    new DocumentCreateController().handler.bind(new DocumentCreateController())
  );

router
  .route("/:id")
  .delete(
    new DocumentCreateController().handler.bind(new DocumentCreateController())
  );

module.exports = router;
