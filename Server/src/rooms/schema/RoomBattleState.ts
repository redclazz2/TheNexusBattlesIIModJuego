import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema{
  @type("string") username: string;
  @type("string") sessionID: string;
}

export class RoomBattleState extends Schema {
  @type("number") currentTurn:number = 1;
  @type("string") expectedUsers:string = "4";
  @type({map: Player}) clients = new MapSchema<Player>();
}
