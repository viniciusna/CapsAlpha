const DocumentCreateService = require("../services/documentCreate");

class DocumentCreateController {
  async handler(req, res) {
    const data = await new DocumentCreateService().execute(req);
    res.status(200).send({
      data: {
        documentId: data.documentId,
      },
      message: "Success",
    });
  }
}

module.exports = DocumentCreateController;
