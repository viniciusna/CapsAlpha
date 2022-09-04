const User = require("../../repository/user");
const { BadRequest } = require("../../error/errors");

class UserValidator {
  async execute(params) {
    this.nameValidate(params);
    this.emailValidate(params);
    this.passwordValidate(params);
    await this.emailAlreadyExist(params);
    return true;
  }

  async emailAlreadyExist(params) {
    const emailExist = await new User().findByEmail(params.email);
    if (emailExist) {
      throw new BadRequest("Email already exists");
    }
  }

  nameValidate(params) {
    if (!("name" in params)) {
      throw new BadRequest("Name is required");
    }
    const { name } = params;
    if (name.length > 60) {
      throw new BadRequest("Name is too long");
    }
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!regex.test(name)) {
      throw new BadRequest("Invalid name");
    }
  }

  passwordValidate(params) {
    if (!("password" in params)) {
      throw new BadRequest("Password is required");
    }
    const { password } = params;
    if (password.length <= 8) {
      throw new BadRequest("The password must be at least 8 digits long");
    }
  }

  emailValidate(params) {
    if (!("email" in params)) {
      throw new BadRequest("Email is required");
    }
    const { email } = params;
    if (email.length > 60) {
      throw new BadRequest("Email is too long");
    }
    const regex =
      /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
    if (!regex.test(email)) {
      throw new BadRequest("Invalid email");
    }
  }
}

module.exports = UserValidator;
