const User = require("../repository/user");
const UserValidator = require("../utils/validator/userValidator");
const bcrypt = require("bcrypt");

module.exports = class UserRegister {
  async execute(params) {
    await new UserValidator().execute(params);
    const user = {
      password: this.encryptPassword(params.password),
      email: params.email,
      name: params.name,
    };
    const userId = await new User().create(user);

    return {
      userId: userId,
    };
  }

  encryptPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
};
