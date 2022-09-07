const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");

module.exports = class DocumentDelete {
  async execute(req) {
    //Apenas o owner pode deletar o documento
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const userId = decoded.id;
    console.log(req.params);
    const documentId = req.params.id;
    const deleted = await new Document().delete(userId, documentId);
    if (!deleted) {
      throw new BadRequest("You don't have access to delete this document");
    }
    return {
      documentId,
    };
  }
};
