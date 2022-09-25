const configWebSocket = require("./config");
const Redis = require("ioredis");
const config = require("../config/index");
const UserDocument = require("../repository/userDocuments");
const DocumentManager = require("./documentManager");
const Document = require("../repository/document");
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

  async messageEdition(params, clients, websocket) {
    const roomId = this.ws.room;
    const userIdsInRoom = await this.getRoom(roomId);
    const data = JSON.stringify({
      type: "message",
      params: {
        data: params.data,
      },
    });
    await this.documentManager.update(params.data);

    userIdsInRoom.forEach((userId) => {
      if (userId != `${this.ws.userId}`) {
        clients.forEach((client) => {
          if (client.readyState === websocket.OPEN && client.userId == userId) {
            client.send(data);
          }
        });
      }
    });
  }

  async messageChanges(params, clients, websocket, type) {
    const roomId = this.ws.room;
    const userIdsInRoom = await this.getRoom(roomId);
    const data = JSON.stringify({
      type: type,
      params: {
        data: params.data,
      },
    });

    userIdsInRoom.forEach((userId) => {
      if (userId != `${this.ws.userId}`) {
        clients.forEach((client) => {
          if (client.readyState === websocket.OPEN && client.userId == userId) {
            client.send(data);
          }
        });
      }
    });
  }

  async saveRelation(documentId, userId) {
    const relationExist = await new UserDocument().find(userId, documentId);
    if (!relationExist) {
      await new UserDocument().set(userId, documentId);
    }
  }

  async addUser(room, user) {
    await redis.rpush(`room_${room}`, user);
  }

  async getRoom(room) {
    return await redis.lrange(`room_${room}`, 0, -1);
  }

  async removeUser(room, userId) {
    if (!userId) return;
    await redis.lrem(`room_${room}`, 0, userId);
  }

  async deleteRoom(room) {
    await redis.del(`room_${room}`);
  }

  async documentExist(documentId) {
    const document = await new Document().get(documentId);
    if (!document) {
      return false;
    }
    return true;
  }

  async join(params) {
    const roomId = params.documentId;

    if (!(await this.documentExist(roomId))) {
      console.warn(`Document ${roomId} does not exist`);
      this.ws.send(
        JSON.stringify({
          type: "join",
          status: "Error",
          message: `Document ${roomId} does not exist`,
          params: {},
        })
      );
      return;
    }

    const room = await this.getRoom(roomId);
    this.room = roomId;
    console.log("JOIN ROOM ID: ", roomId);
    console.log("JOIN USER: ", this.ws.userId);
    console.log("JOIN ROOM: ", room);
    console.log("=======================================");

    if (room.includes(`${this.ws.userId}`)) {
      console.warn(`Room ${roomId} already have this user`);
      this.ws.send(
        JSON.stringify({
          type: "join",
          status: "Error",
          message: `Room ${roomId} already have this user`,
          params: {},
        })
      );
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

    this.documentManager.setDocumentId(roomId);
    this.ws.room = roomId;

    this.ws.send(
      JSON.stringify({
        type: "join",
        status: "Success",
        message: `Joined in room ${roomId}`,
        params: {},
      })
    );
  }

  async leave(clients, websocket) {
    const roomId = this.room;
    const userIdExiting = this.ws.userId;

    console.log("LEAVE ROOM ID: ", roomId);
    console.log("BEFORE LEAVE: ", await this.getRoom(roomId));
    console.log("USER LEAVE: ", userIdExiting);
    await this.removeUser(roomId, `${userIdExiting}`);
    console.log("AFTER LEAVE: ", await this.getRoom(roomId));
    console.log("=========================================");

    this.room = undefined;
    if ((await this.getRoom(roomId).length) == 0) this.close(this.room);
    this.ws.send(
      JSON.stringify({
        type: "leave",
        status: "Success",
        message: `Leave from room ${roomId}`,
        params: {},
      })
    );

    if (this.getRoom(roomId).length == 0) {
      this.close(room);
      return;
    }

    const userIdsInRoom = await this.getRoom(roomId);
    const data = JSON.stringify({
      type: "leave",
      userIdExiting: userIdExiting,
    });

    userIdsInRoom.forEach((userId) => {
      if (userId != `${userIdExiting}`) {
        clients.forEach((client) => {
          if (client.readyState === websocket.OPEN && client.userId == userId) {
            client.send(data);
          }
        });
      }
    });
  }

  async close(room) {
    this.deleteRoom(room);
  }

  async save(params) {
    const roomId = this.room;
    const text = await this.documentManager.getText();
    const result = await new Document().updateContent(roomId, text);
    if (result) {
      this.ws.send(
        JSON.stringify({
          type: "save",
          status: "Success",
          message: `Updated document ${roomId}`,
          params: {},
        })
      );
    }
    this.ws.send(
      JSON.stringify({
        type: "save",
        status: "Error",
        message: `Document ${roomId} not updated`,
        params: {},
      })
    );
  }
}

module.exports = RoomManager;
