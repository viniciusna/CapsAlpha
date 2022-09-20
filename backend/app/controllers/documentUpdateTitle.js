const DocumentUpdateTitleService = require("../services/documentUpdateTitle");

class DocumentUpdateTitleController {
  async handler(req, res) {
    const data = await new DocumentUpdateTitleService().execute(req);
    res.status(200).send({
      data: {
        titleUpdated: data,
      },
    });
    console.log("data no Controller")
    console.log(data)
    console.log("Final do processo")
  }
}

module.exports = DocumentUpdateTitleController;
