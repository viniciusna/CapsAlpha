const DocumentDeleteService = require("../services/documentDelete");

class DocumentDeleteController {
  async handler(req, res) {
    const data = await new DocumentDeleteService().execute(req);
    res.status(200).send({
      data: {
        documentId: data.documentId,
      },
      message: "Success",
    });
  }
}

module.exports = DocumentDeleteController;
