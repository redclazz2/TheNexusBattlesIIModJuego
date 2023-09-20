import CartaHeroe from "../../cartas/CartaHeroe";
import modelJuego from "../model/modelJuego";
import viewJuego from "../view/viewJuego";

export default class controllerJuego{
    
    playerHasPermission:boolean = false;
    local_session_id:string = "";
    local_room:any;
    local_current_turn:number = 0;
    
    constructor(private readonly model:modelJuego,private readonly view:viewJuego){}

    init = (number_of_players:number):void  => {
        this.view.viewInit(this.checkPermission,this.turn_action_pass);
        this.view.hideExtraCards(number_of_players);
    }

    registerLocalSessionID = (session:string) => {
        this.local_session_id = session;
    }

    getLocalSessionID = ():string => {
        return this.local_session_id;
    }

    registerLocalRoom = (room:any) => {
        this.local_room = room;
    }

    getLocalRoom = ():any => {
        return this.local_room;
    }

    registerClient=(key:string,carta:CartaHeroe,componenteDiv:number):void =>{
        this.model.addPlayer(key,this.view.viewGetCardComponents(componenteDiv),carta);
    }

    updateCardValue = (playerSessionID:string,cartaHeroe:CartaHeroe):void =>{
        const ModelData = this.model.updateCard(playerSessionID,cartaHeroe);
        this.view.viewUpdateCard(ModelData[0],ModelData[1]);
    }

    addCurrentTurnArray = (session:string):void =>{
        this.model.addTurnRegister(session);
    }

    removeCurrentTurnArray = (session:string):void => {
        this.model.removeTurnRegister(session);
    }

    getTurnRegister = ():Array<string> =>{
        return this.model.getTurnRegister();
    }

    handleTurnChange = ():void =>{
        const turnData = this.model.getTurnRegister();

        if(turnData[this.local_current_turn] == this.local_session_id){
            this.playerHasPermission = true;
            console.log("Turno Local");
        }else{
            this.playerHasPermission = false;
            console.log("Turno Enemigo");
        }
    }

    registerCurrentTurnChange = (newTurnData:number):void =>{
        this.local_current_turn = newTurnData;
        this.handleTurnChange();
    }

    checkPermission = ():boolean => {
        return this.playerHasPermission;
    }

    //#region Acciones en los turnos
    /* 
        Tabla de Acciones:
        0 - Sync Inicial de las Cartas
        1 - Pasar de Turno
    */

    turn_action_pass=():void =>{
        this.local_room.send(1);
    }

    //#endregion
}