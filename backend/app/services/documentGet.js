const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");
const UserDocuments = require("../repository/userDocuments");

module.exports = class DocumentGet {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const documentId = req.params.id;
    const userId = decoded.id;
    console.log(documentId, userId);
    const document = await new Document().get(documentId);
    if (!document) {
      throw new BadRequest("Document don't exist");
    }
    await this.saveInUserDocuments(userId, documentId);
    return {
      document,
    };
  }
  async saveInUserDocuments(userId, documentId) {
    const exist = await new UserDocuments().find(userId, documentId);
    if (!exist) {
      return await new UserDocuments().set(userId, documentId);
    }
    return true;
  }
};
