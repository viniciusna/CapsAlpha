const { BadRequest } = require("../../error/errors");

class UserLoginValidator {
  async execute(params) {
    this.emailValidate(params);
    this.passwordValidate(params);
    return true;
  }

  passwordValidate(params) {
    if (!("password" in params)) {
      throw new BadRequest("Password is required");
    }
  }

  emailValidate(params) {
    if (!("email" in params)) {
      throw new BadRequest("Email is required");
    }
  }
}

module.exports = UserLoginValidator;
