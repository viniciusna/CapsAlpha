const UserLoginService = require("../services/userLogin");

class UserLoginController {
  async handler(req, res) {
    const data = await new UserLoginService().execute(req.body);
    res.cookie("token", data.token, { maxAge: 6000 });
    res.status(200).send({
      data: {
        user: data.userData,
        documents: data.documents,
      },
      message: "Success",
    });
  }
}

module.exports = UserLoginController;
