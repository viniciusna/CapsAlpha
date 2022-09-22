const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");
const User = require("../repository/user");
const UserValidator = require("../utils/validator/userValidator");

module.exports = class UserUpdate {
  async execute(req) {
    await new UserValidator().execute(req.body);
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    const { name, email, password } = req.body;
    const user = await new User().update(userId, name, email, password);
    return {
      user: user,
    };
  }
};
