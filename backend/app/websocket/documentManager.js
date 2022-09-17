const configWebSocket = require("./config");
const Redis = require("ioredis");
const config = require("../config/index");
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
});

class DocumentManager {
  constructor(documentId) {
    this.documentId = documentId;
  }

  async message() {
    const quill = new Quill(editor, {
      modules: {
        toolbar: false,
        syntax: false,
      },
      formats: [],
    });
    const text = await this.getText();
    quill.setText(text);
    quill.updateContents();
  }

  async getText(documentId) {
    return await redis.lrange(`document_${this.ws.room}`);
  }
}

export default DocumentManager;
