const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");

module.exports = class DocumentUpdate {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    const { documentId, title, content } = req.body;
    if (!documentId || !title || !content) {
      throw new BadRequest("Missing data");
    }
    const document = await new Document().update(documentId, title, content);
    return {
      document,
    };
  }
};
