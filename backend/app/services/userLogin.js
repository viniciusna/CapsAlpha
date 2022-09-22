const { BadRequest } = require("../error/errors");
const User = require("../repository/user");
const UserLoginValidator = require("../utils/validator/userLoginValidator");
const bcrypt = require("bcrypt");
const config = require("../config/index");
const jwt = require("jsonwebtoken");
const UserDocuments = require("../repository/userDocuments");
module.exports = class UserLogin {
  async execute(params) {
    await new UserLoginValidator().execute(params);
    const user = await new User().findByEmail(params.email);
    if (!user || !this.decryptPassword(user.password, params.password)) {
      throw new BadRequest("Invalid login");
    }
    const userData = await new User().find(user.id);
    const token = this.getToken(userData.id, userData.name);
    const documents = await new UserDocuments().getDocuments(userData.id);
    return { userData, token, documents };
  }

  decryptPassword(correctPassword, password) {
    const passwordIsCorrect = bcrypt.compareSync(password, correctPassword);
    return passwordIsCorrect;
  }

  getToken(id, name) {
    const token = jwt.sign({ id: id, name: name }, config.jwt_secret, {
      expiresIn: 60000000,
    });
    return token;
  }
};
