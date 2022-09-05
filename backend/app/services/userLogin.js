const { BadRequest } = require("../error/errors");
const User = require("../repository/user");
const UserLoginValidator = require("../utils/validator/userLoginValidator");
const bcrypt = require("bcrypt");

module.exports = class UserRegister {
  async execute(params) {
    await new UserLoginValidator().execute(params);
    const user = await new User().findByEmail(params.email);
    if (!user || !this.decryptPassword(user.password, params.password)) {
      throw new BadRequest("Invalid login");
    }
    const userData = await new User().find(user.id);
    return { userData };
  }

  decryptPassword(correctPassword, password) {
    const passwordIsCorrect = bcrypt.compareSync(password, correctPassword);
    return passwordIsCorrect;
  }
};
