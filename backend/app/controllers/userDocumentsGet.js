const UserDocumentGetService = require("../services/userDocumentGet");

class UserDocumentGetController {
  async handler(req, res) {
    const data = await new UserDocumentGetService().execute(req);
    res.status(200).send({
      data: {
        documents: data.documents,
      },
      message: "Success",
    });
  }
}

module.exports = UserDocumentGetController;
