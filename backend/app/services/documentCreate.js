const Document = require("../repository/document");
const uuid = require("../utils/uuid");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized } = require("../error/errors");

module.exports = class DocumentCreate {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    const documentId = uuid();
    await new Document().create(userId, documentId);
    return {
      documentId,
    };
  }
};
