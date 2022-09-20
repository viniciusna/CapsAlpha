const Document = require("../repository/document");
const { checkTokenUser } = require("../utils/jwt");
const { Unauthorized, BadRequest } = require("../error/errors");
const UserDocuments = require("../repository/userDocuments");
const config = require("../config/index");
const Redis = require("ioredis");
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
});

module.exports = class DocumentGet {
  async execute(req) {
    if (!("token" in req?.cookies)) {
      throw new Unauthorized("Access denied");
    }
    const token = req.cookies["token"];
    const decoded = await checkTokenUser(token);
    const documentId = req.params.id;
    const userId = decoded.id;
    const document = await this.getDocument(documentId);
    if (!document) {
      throw new BadRequest("Document don't exist");
    }
    await this.saveInUserDocuments(userId, documentId);

    return {
      document,
    };
  }

  async getRedisText(documentId) {
    const text = await redis.get(`document_${documentId}`);
    if (!text) {
      return "";
    }
    return text;
  }

  async getDocument(documentId) {
    const redisText = await this.getRedisText(documentId);
    console.log("REDIS TEXT: ", redisText);
    if (redisText != "") {
      return {
        content: redisText,
      };
    }

    const postgresDocument = await new Document().get(documentId);
    console.log("POSTEGRES: ", postgresDocument);
    if (!postgresDocument) {
      console.log("Document don't exist ");
      await this.setText("", documentId);
      return postgresDocument;
    } else {
      await this.setText(postgresDocument.content, documentId);
      return postgresDocument;
    }
  }

  async setText(text, documentId) {
    return await redis.set(`document_${documentId}`, text);
  }

  async saveInUserDocuments(userId, documentId) {
    const exist = await new UserDocuments().find(userId, documentId);
    if (!exist) {
      return await new UserDocuments().set(userId, documentId);
    }
    return true;
  }
};
