const configWebSocket = require("./config");
const Redis = require("ioredis");
const Delta = require("quill-delta");
const config = require("../config/index");
const Document = require("../repository/document");

const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
  connectTimeout: 10000,
});

class DocumentManager {
  constructor() {
    this.documentId = "";
  }

  setDocumentId(documentId) {
    this.documentId = documentId;
  }
  clearAttribute(deltaFull) {
    const delta = deltaFull?.ops;
    if (Array.isArray(delta)) {
      return delta.map((op) => {
        delete op.attributes;
        return op;
      });
    } else {
      delete delta.attributes;
      return delta;
    }
  }
  async update(delta) {
    const clearDelta = new Delta(this.clearAttribute(delta));
    const deltaNew = new Delta().compose(clearDelta);
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

  filterInsert(delta) {
    const clearDelta = new Delta(delta);
    const deltaNew = new Delta().compose(clearDelta);
    return deltaNew;
  }

  toPlaintext(object) {
    const delta = this.filterInsert(object);
    return delta.reduce(function (text, op) {
      if (!op.insert)
        throw new TypeError("only insert operations can be transformed!");
      if (typeof op.insert !== "string") return text + " ";
      return text + op.insert;
    }, "");
  }
}

module.exports = DocumentManager;
