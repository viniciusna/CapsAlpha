const UserGetService = require("../services/userGet");

class UserGetController {
  async handler(req, res) {
    const data = await new UserGetService().execute(req);
    res.status(201).send({
      data: data,
      message: "Success",
    });
  }
}

module.exports = UserGetController;
