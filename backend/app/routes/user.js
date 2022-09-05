const router = require("express").Router();
const UserRegisterController = require("../controllers/userRegister");
const UserLoginController = require("../controllers/userLogin");

router
  .route("/register")
  .post(
    new UserRegisterController().handler.bind(new UserRegisterController())
  );

router
  .route("/login")
  .post(new UserLoginController().handler.bind(new UserLoginController()));

module.exports = router;
