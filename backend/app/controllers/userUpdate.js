const UserUpdateService = require("../services/userUpdate");

class UserUpdateController {
  async handler(req, res) {
    const data = await new UserUpdateService().execute(req.body);
    res.status(201).send({
      data: data,
      message: "Success",
    });
  }
}

module.exports = UserUpdateController;
