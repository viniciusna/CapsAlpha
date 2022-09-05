const { Unauthorized } = require("../error/errors");
const config = require("../config/index");
const jwt = require("jsonwebtoken");

async function checkTokenUser(token) {
  const secret = config.jwt_secret;
  return await jwt.verify(token, secret);
}

module.exports = { checkTokenUser };
