const UserLoginService = require("../services/userLogin");

class UserLoginController {
  async handler(req, res) {
    const data = await new UserLoginService().execute(req.body);
    res.send({
      data: data,
      message: "Success",
      status: 200,
    });
  }
}

module.exports = UserLoginController;
