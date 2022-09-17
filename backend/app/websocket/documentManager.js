const configWebSocket = require("./config");
const Redis = require("ioredis");
const Delta = require("quill-delta");
const config = require("../config/index");
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
});

class DocumentManager {
  constructor() {
    this.documentId = "";
  }

  setDocument(documentId) {
    this.documentId = documentId;
  }

  async update(delta) {
    const deltaNew = new Delta().compose(delta);
    const text = await this.getText();
    const deltaOld = new Delta().insert(text);
    const dataDocument = deltaOld.compose(deltaNew);
    const newDocument = this.toPlaintext(dataDocument);
    await this.setText(newDocument);
  }

  async getText() {
    const text = await redis.get(`document_${this.documentId}`);
    if (!text) {
      return "";
    }
    return text;
  }

  async setText(text) {
    return await redis.set(`document_${this.documentId}`, text);
  }

  toPlaintext(delta) {
    return delta.reduce(function (text, op) {
      if (!op.insert)
        throw new TypeError("only `insert` operations can be transformed!");
      if (typeof op.insert !== "string") return text + " ";
      return text + op.insert;
    }, "");
  }
}

module.exports = DocumentManager;
