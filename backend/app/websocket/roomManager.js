const configWebSocket = require("./config");
const Redis = require("ioredis");
const config = require("../config/index");
const UserDocument = require("../repository/userDocuments");
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
});

class RoomManager {
  constructor(ws, rooms) {
    this.ws = ws;
    this.rooms = rooms;
  }

  async message(params, clients, websocket, type) {
    const roomId = this.ws.room
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

  async addUser(room, user) {
    await redis.sadd(`room_${room}`, user);
  }

  async getRoom(room) {
    return await redis.smembers(`room_${room}`);
  }

  async removeUser(room, userId) {
    await redis.srem(`room_${room}`, userId);
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
    this.ws["room"] = roomId;

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
    const roomId = this.ws.room;
    const userIdExiting = this.ws.userId

    await this.removeUser(roomId, userIdExiting);

    this.ws["room"] = undefined;
    this.ws.send(
      JSON.stringify({
        type: "leave",
        status: "Success",
        message: `Leave from room ${roomId}`,
        params: {},
      })
    );

    if (this.getRoom(roomId).length == 0) {
      this.close(room)
      return
    };

    const userIdsInRoom = await this.getRoom(roomId);
    const data = JSON.stringify({
      type: "leave",
      userIdExiting: userIdExiting
    })

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
}

module.exports = RoomManager;
