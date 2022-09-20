const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");

module.exports = class DocumentUpdateTitle {
  async execute(req) {
    console.log(req.cookies)
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    await checkTokenUser(token);
    const { documentId, title} = req.body;
    console.log("Service")
    console.log(`DocumentId: ${documentId}`)
    console.log(`Title: ${title}`)
    if (!documentId || !title) {
      throw new BadRequest("Missing data");
    }
    const titleUpdated = await new Document().updateTitle(documentId, title);
    return {
      titleUpdated,
    };
  }
};
