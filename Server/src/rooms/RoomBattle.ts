import { Room, Client } from "@colyseus/core";
import { RoomBattleState, Player } from "./schema/RoomBattleState";

export class room_battle extends Room<RoomBattleState> {
  maxClients = 1;

  onCreate (options: any) {
    this.setState(new RoomBattleState());
    
    this.setMetadata({
      ganacia: options.numero_creditos,
      nombre: options.nombre_sala
    })

    this.maxClients = options.numero_jugadores;
    this.state.expectedUsers = this.maxClients.toString();
    this.state.clients;

    this.onMessage("CardSync", (client, message) => {
        this.broadcast("CardSync", message, { except: client });
    });

    this.onMessage("ataque", (client, message) => {
    
    });

    this.onMessage("asdnad", (client, message) => {
    
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    let _player = new Player();
    _player.sessionID = client.sessionId;
    _player.username = "Player";
    this.state.clients.set(_player.sessionID,_player);
    this.state.turnos.push(_player.sessionID);
  }
  
  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.clients.delete(client.sessionId);
    const _i = this.state.turnos.indexOf(client.sessionId);
    this.state.turnos.deleteAt(_i);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
