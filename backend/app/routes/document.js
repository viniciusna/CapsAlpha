const router = require("express").Router();
const DocumentCreateController = require("../controllers/documentCreate");
const DocumentDeleteController = require("../controllers/documentDelete");

router
  .route("/")
  .post(
    new DocumentCreateController().handler.bind(new DocumentCreateController())
  );

router
  .route("/:id")
  .delete(
    new DocumentDeleteController().handler.bind(new DocumentDeleteController())
  );

module.exports = router;
