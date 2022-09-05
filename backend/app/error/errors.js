class InternalServerError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "InternalServerError";
    this.status = 500;
  }
}

class BadRequest extends Error {
  constructor(msg) {
    super(msg);
    this.name = "BadRequest";
    this.status = 400;
  }
}

class Unauthorized extends Error {
  constructor(msg) {
    super(msg);
    this.name = "Unauthorized";
    this.status = 401;
  }
}

module.exports = {
  InternalServerError,
  BadRequest,
  Unauthorized,
};
