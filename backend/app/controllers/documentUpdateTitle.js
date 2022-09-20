const DocumentUpdateTitleService = require("../services/documentUpdateTitle");

class DocumentUpdateTitleController {
  async handler(req, res) {
    const data = await new DocumentUpdateTitleService().execute(req);
    res.status(200).send({
      data: {
        titleUpdated: data,
      },
    });
  }
}

module.exports = DocumentUpdateTitleController;
