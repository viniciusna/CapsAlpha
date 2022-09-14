const router = require("express").Router();
const UserLoginController = require("../controllers/userLogin");
const UserRegisterController = require("../controllers/userRegister");
const UserUpdateController = require("../controllers/userUpdate");

router
  .route("/register")
  .post(
    new UserRegisterController().handler.bind(new UserRegisterController())
  );

router
  .route("/")
  .put(new UserUpdateController().handler.bind(new UserUpdateController()));

router
  .route("/login")
  .post(new UserLoginController().handler.bind(new UserLoginController()));

module.exports = router;
