"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_battle = void 0;
const core_1 = require("@colyseus/core");
const MyRoomState_1 = require("./schema/MyRoomState");
class room_battle extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 1;
    }
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        //console.log(options);
        this.setMetadata({
            ganacia: options.numero_creditos
        });
        this.maxClients = options.numero_jugadores;
        this.onMessage("type", (client, message) => {
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.room_battle = room_battle;
