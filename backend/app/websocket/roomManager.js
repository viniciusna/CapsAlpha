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

  async message(params, clients, websocket) {
    // const room = params.room;
    // console.log(`params ${params}`);
    // console.log(`params.room ${params.room}`);
    // console.log(room);
    const rooms = await this.getRoom(params.room);
    // console.log("Rooms", rooms);
    // console.log(this.ws.userId);
    // console.log(params);
    // console.log(params.data.ops);
    const data = JSON.stringify({
      type: "message",
      status: "Success",
      message: "Send data",
      params: {
        data: params.data,
      },
    });
    rooms.forEach((userId) => {
      if (userId != `${this.ws.userId}`) {
        clients.forEach((client) => {
          if (client.readyState === websocket.OPEN && client.userId == userId) {
            // console.log("Manda os dados");
            client.send(data);
          }
        });
      }
    });
  }

  async msgCursor(params, clients, websocket) {
    const rooms = await this.getRoom(params.room);
    const data = JSON.stringify({
      type: "cursor",
      params: {
        data: params,
      },
    });
    // console.log(data)
    rooms.forEach((userId) => {
      if (userId != `${this.ws.userId}`) {
        clients.forEach((client) => {
          // console.log(client.room);
          // console.log(client.userId);
          // console.log(client.readyState);
          // console.log(websocket.OPEN);

          // console.log("========");
          // console.log(client.userId == userId);
          // console.log(client.readyState === websocket.OPEN);
          if (client.readyState === websocket.OPEN && client.userId == userId) {
            // console.log("Manda os dadso");
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

    // console.log("ROOM", room);
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

  async leave() {
    const roomId = this.ws.room;

    await this.removeUser(roomId, this.ws.userId);

    this.ws["room"] = undefined;
    if (this.getRoom(roomId).length == 0) this.close(room);
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
