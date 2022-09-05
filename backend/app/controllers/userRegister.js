const UserRegisterService = require("../services/userRegister");

class UserRegisterController {
  async handler(req, res) {
    const data = await new UserRegisterService().execute(req.body);
    res.status(201).send({
      data: data,
      message: "Success",
    });
  }
}

module.exports = UserRegisterController;
