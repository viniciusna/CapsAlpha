const configWebSocket = require("./config");

class WebsocketMethods {
  constructor(ws, rooms) {
    this.ws = ws;
    this.rooms = rooms;
  }

  message(params) {
    const data = JSON.stringify({
      type: "message",
      status: "Success",
      message: "Send data",
      params: {
        data: params.data,
      },
    });
    const room = this.ws.room;
    this.rooms[room].forEach((so) => {
      if (so !== this.ws) {
        so.send(data);
      }
    });
  }

  create(room) {
    console.log(this.rooms);
    if (this.rooms[room]) {
      return;
    }
    this.rooms[room] = [];
  }

  join(params) {
    const room = params.documentId;
    if (!Object.keys(this.rooms).includes(room)) {
      this.create(room);
    }

    if (this.rooms[room].length >= configWebSocket.maxUsers) {
      console.warn(`Room ${room} is full!`);

      this.ws.send(
        JSON.stringify({
          type: "join",
          status: "Error",
          message: `Room ${room} is full!`,
          params: {},
        })
      );
      return;
    }

    this.rooms[room].push(this.ws);
    this.ws["room"] = room;

    this.ws.send(
      JSON.stringify({
        type: "join",
        status: "Success",
        message: `Joined in room ${room}`,
        params: {},
      })
    );
  }

  leave(params) {
    const room = this.ws.room;
    try {
      const res = this.rooms[room].filter((so) => so !== this.ws);
      this.rooms[room] = res;
    } catch (e) {
      console.log(e);
    }

    this.ws["room"] = undefined;
    if (this.rooms[room].length == 0) this.close(room);
    this.ws.send(
      JSON.stringify({
        type: "leave",
        status: "Success",
        message: `Leave from room ${room}`,
        params: {},
      })
    );
  }

  close(room) {
    delete this.rooms[room];
  }
}

module.exports = WebsocketMethods;
