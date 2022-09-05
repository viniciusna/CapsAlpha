const UserLoginService = require("../services/userLogin");

class UserLoginController {
  async handler(req, res) {
    const data = await new UserLoginService().execute(req.body);
    res.cookie("token", data.token, { maxAge: 6000 });
    res.send({
      data: data.userData,
      message: "Success",
      status: 200,
    });
  }
}

module.exports = UserLoginController;
