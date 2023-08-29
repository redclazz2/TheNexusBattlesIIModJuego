import { Room, Client, ClientArray } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class room_battle extends Room<MyRoomState> {
  maxClients = 4;
  clients: ClientArray<any, any>;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.setMetadata({})
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
