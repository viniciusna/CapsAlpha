const router = require("express").Router();
const DocumentCreateController = require("../controllers/documentCreate");
const DocumentDeleteController = require("../controllers/documentDelete");
const DocumentGetController = require("../controllers/documentGet");

router
  .route("/")
  .post(
    new DocumentCreateController().handler.bind(new DocumentCreateController())
  );

router
  .route("/:id")
  .get(new DocumentGetController().handler.bind(new DocumentGetController()));

router
  .route("/:id")
  .delete(
    new DocumentDeleteController().handler.bind(new DocumentDeleteController())
  );

module.exports = router;
