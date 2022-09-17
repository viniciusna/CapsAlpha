const configWebSocket = require("./config");
const Redis = require("ioredis");
const config = require("../config/index");
const UserDocument = require("../repository/userDocuments");
const DocumentManager = require("./documentManager");
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
});
class RoomManager {
  constructor(ws) {
    this.ws = ws;
    this.room = "";
    this.documentManager = new DocumentManager();
  }

  async message(params, clients, websocket) {
    const room = params.room;
    const rooms = await this.getRoom(params.room);
    const data = JSON.stringify({
      type: "message",
      status: "Success",
      message: "Send data",
      params: {
        data: params.data,
      },
    });
    await this.documentManager.update(params.data);
    rooms.forEach((userId) => {
      if (userId != `${this.ws.userId}`) {
        clients.forEach((client) => {
          if (client.readyState === websocket.OPEN && client.userId == userId) {
            client.send(data);
          }
        });
      }
    });
  }

  async addUser(room, user) {
    await redis.lpush(`room_${room}`, user);
  }

  async getRoom(room) {
    return await redis.lrange(`room_${room}`, 0, -1);
  }

  async removeUser(room, user) {
    await redis.lrem(`room_${room}`, 5, user);
  }

  async deleteRoom(room) {
    await redis.del(`room_${room}`);
  }
  async saveRelation(documentId, userId) {
    const relationExist = await new UserDocument().find(userId, documentId);
    if (!relationExist) {
      await new UserDocument().set(userId, documentId);
    }
  }

  async join(params) {
    const roomId = params.documentId;
    const room = await this.getRoom(roomId);
    this.room = roomId;
    if (room.includes(`${this.ws.userId}`)) {
      console.warn(`Room ${roomId} already have this user`);
      return;
    }
    if (room.length >= configWebSocket.maxUsers) {
      console.warn(`Room ${roomId} is full!`);
      this.ws.send(
        JSON.stringify({
          type: "join",
          status: "Error",
          message: `Room ${roomId} is full!`,
          params: {},
        })
      );
      return;
    }
    await this.saveRelation(roomId, this.ws.userId);
    await this.addUser(roomId, this.ws.userId);

    this.documentManager.setDocument(roomId);
    const document = await this.documentManager.getText();
    this.ws.room = roomId;

    this.ws.send(
      JSON.stringify({
        type: "join",
        status: "Success",
        message: `Joined in room ${roomId}`,
        params: {
          data: document,
        },
      })
    );
  }

  async leave() {
    const roomId = this.room;

    await this.removeUser(roomId, this.ws.userId);

    this.room = undefined;
    if (this.getRoom(roomId).length == 0) this.close(this.room);
    this.ws.send(
      JSON.stringify({
        type: "leave",
        status: "Success",
        message: `Leave from room ${roomId}`,
        params: {},
      })
    );
  }

  async close(room) {
    this.deleteRoom(room);
  }
}

module.exports = RoomManager;
