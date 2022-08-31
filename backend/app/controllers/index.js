class IndexController {
  handler(req, res) {
    const data = "Ola Mundo";
    res.send({
      data: data,
      message: "Success",
      status: 200,
    });
  }
}

module.exports = IndexController;
