const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");
const User = require("../repository/user");
const UserValidatorUpdate = require("../utils/validator/userValidatorUpdate");
const bcrypt = require("bcrypt");

module.exports = class UserUpdate {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    await new UserValidatorUpdate().execute(req.body, userId);
    const { name, email, password } = req.body;
    if (password) {
      await new User().updatePassword(userId, this.encryptPassword(password));
    }
    const user = await new User().update(userId, name, email);

    return {
      user: user,
    };
  }
  encryptPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
};
