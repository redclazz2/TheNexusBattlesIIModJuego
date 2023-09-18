import { Schema, type,ArraySchema } from "@colyseus/schema";

export class Player extends Schema{
  @type("string") username: string;
  @type("string") sessionID: string;

  super(username:string,sessionID:string){
    this.username = username;
    this.sessionID = sessionID;
  }
}

export class RoomBattleState extends Schema {
  @type("number") currentTurn:number = 1;
  @type([Player]) clients = new ArraySchema<Player>();
}
