const User = require("../../repository/user");
const { BadRequest } = require("../../error/errors");

class UserValidatorUpdate {
  async execute(params, userId) {
    const user = await new User().find(userId);
    this.nameValidate(params, user);
    await this.emailValidate(params, user);
    this.passwordValidate(params);
    this.confirmPasswordValidate(params);
    return true;
  }

  nameValidate(params, user) {
    if (!("name" in params)) {
      throw new BadRequest("Name is required");
    }
    const { name } = params;
    if (name == user.name) {
      return;
    }
    if (name.length > 60) {
      throw new BadRequest("Name is too long");
    }
  }

  passwordValidate(params) {
    if ("password" in params) {
      const { password } = params;
      if (password.length <= 8) {
        throw new BadRequest("The password must be at least 8 digits long");
      }
    }
  }

  confirmPasswordValidate(params) {
    if (!("confirmPassword" in params)) {
      return;
    }
    if (!("password" in params)) {
      throw new BadRequest(
        "To change the password you need the password and password confirmation"
      );
    }
    const { confirmPassword, password } = params;
    if (confirmPassword != password) {
      throw new BadRequest(
        "Password must be the same as password confirmation"
      );
    }
  }

  async emailValidate(params, user) {
    if (!("email" in params)) {
      throw new BadRequest("Email is required");
    }
    const { email } = params;
    if (email == user.email) {
      return;
    }
    if (email.length > 60) {
      throw new BadRequest("Email is too long");
    }
    const regex =
      /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
    if (!regex.test(email)) {
      throw new BadRequest("Invalid email");
    }
    await this.emailAlreadyExist(params);
  }
  async emailAlreadyExist(params) {
    const emailExist = await new User().findByEmail(params.email);
    if (emailExist) {
      throw new BadRequest("Email already exists");
    }
  }
}

module.exports = UserValidatorUpdate;
