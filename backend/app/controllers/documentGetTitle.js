const DocumentGetTitleService = require("../services/documentGetTitle");

class DocumentGetTitleController {
  async handler(req, res) {
    const title = await new DocumentGetTitleService().execute(req);
    res.status(200).send({
      data: title,
      message: "Success",
    });
  }
}

module.exports = DocumentGetTitleController;
