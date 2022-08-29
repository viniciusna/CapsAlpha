const router = require("express").Router();
const IndexController = require("../controllers/index");

router
  .route("/")
  .get(new IndexController().handler.bind(new IndexController()));

module.exports = router;
