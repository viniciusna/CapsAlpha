const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized } = require("../error/errors");

module.exports = class DocumentCreate {
  async execute(req) {
    //Ver se tem acesso ao document
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    console.log(req.params);
    const documentId = req.params.documentId;
    const userId = decoded.id;
    await new Document().get(userId, documentId);
    return {
      document,
    };
  }
};
