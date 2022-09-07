const DocumentUpdateService = require("../services/documentUpdate");

class DocumentUpdateController {
  async handler(req, res) {
    const data = await new DocumentUpdateService().execute(req);
    res.status(200).send({
      data: {
        document: data.document,
      },
      message: "Success",
    });
  }
}

module.exports = DocumentUpdateController;
