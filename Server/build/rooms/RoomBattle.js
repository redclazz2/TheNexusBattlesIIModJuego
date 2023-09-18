"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_battle = void 0;
const core_1 = require("@colyseus/core");
const RoomBattleState_1 = require("./schema/RoomBattleState");
class room_battle extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 1;
    }
    onCreate(options) {
        this.setState(new RoomBattleState_1.RoomBattleState());
        this.setMetadata({
            ganacia: options.numero_creditos,
            nombre: options.nombre_sala
        });
        this.maxClients = options.numero_jugadores;
        this.onMessage("type", (client, message) => {
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        this.state.clients.push(new RoomBattleState_1.Player("Player", client.sessionId));
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.room_battle = room_battle;
