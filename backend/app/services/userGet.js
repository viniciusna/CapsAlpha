const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");
const User = require("../repository/user");

module.exports = class UserGet {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    const user = await new User().find(userId);
    if (!user) {
      throw new BadRequest("User don't exist");
    }
    return {
      user: user,
    };
  }
};
