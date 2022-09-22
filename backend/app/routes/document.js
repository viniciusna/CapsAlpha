const router = require("express").Router();
const DocumentCreateController = require("../controllers/documentCreate");
const DocumentDeleteController = require("../controllers/documentDelete");
const DocumentGetController = require("../controllers/documentGet");
const DocumentUpdateController = require("../controllers/documentUpdate");
const DocumentUpdateTitleController = require("../controllers/documentUpdateTitle");
const UserDocumentGetController = require("../controllers/userDocumentsGet");

router
  .route("/")
  .post(
    new DocumentCreateController().handler.bind(new DocumentCreateController())
  );

router
  .route("/my")
  .get(
    new UserDocumentGetController().handler.bind(
      new UserDocumentGetController()
    )
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
  .route("/title")
  .post(
    new DocumentUpdateTitleController().handler.bind(new DocumentUpdateTitleController())
  );

router
  .route("/:id")
  .delete(
    new DocumentDeleteController().handler.bind(new DocumentDeleteController())
  );

module.exports = router;
