const router = require("express").Router();
const DocumentCreateController = require("../controllers/documentCreate");
const DocumentDeleteController = require("../controllers/documentDelete");
const DocumentGetController = require("../controllers/documentGet");
const DocumentUpdateController = require("../controllers/documentUpdate");

router
  .route("/")
  .post(
    new DocumentCreateController().handler.bind(new DocumentCreateController())
  );

router
  .route("/:id")
  .get(new DocumentGetController().handler.bind(new DocumentGetController()));

router
  .route("/")
  .put(
    new DocumentUpdateController().handler.bind(new DocumentUpdateController())
  );

router
  .route("/:id")
  .delete(
    new DocumentDeleteController().handler.bind(new DocumentDeleteController())
  );

module.exports = router;
