const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");

module.exports = class DocumentGetTitle {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    await checkTokenUser(token);

    const documentId = req.params.id
    const title = await new Document().getTitle(documentId);
    return {
      title,
    };
  }
};
