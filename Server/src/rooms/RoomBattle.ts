import { Room, Client, ClientArray } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class room_battle extends Room<MyRoomState> {
  maxClients = 1;
  clients: ClientArray<any, any>;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    //console.log(options);
    this.setMetadata({
      ganacia: options.numero_creditos,
      nombre: options.nombre_sala
    })

    this.maxClients = options.numero_jugadores;
    this.onMessage("type", (client, message) => {
      
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
