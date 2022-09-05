const UserRegisterService = require("../services/userRegister");

class UserRegisterController {
  async handler(req, res) {
    const data = await new UserRegisterService().execute(req.body);
    res.send({
      data: data,
      message: "Success",
      status: 200,
    });
  }
}

module.exports = UserRegisterController;
