const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");
const UserDocuments = require("../repository/userDocuments");

module.exports = class UserDocumentGet {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    console.log("===========================");
    console.log(req.cookies);
    console.log(token);
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    console.log(userId);
    const documents = await new UserDocuments().getDocuments(userId);
    return {
      documents: documents,
    };
  }
};
