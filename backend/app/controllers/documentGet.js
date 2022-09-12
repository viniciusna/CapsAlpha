const DocumentGetService = require("../services/documentGet");

class DocumentGetController {
  async handler(req, res) {
    const data = await new DocumentGetService().execute(req);
    res.cookie("documentId", data.document.id, { maxAge: 6000 });
    res.status(200).send({
      data: {
        document: data.document,
      },
      message: "Success",
    });
  }
}

module.exports = DocumentGetController;
