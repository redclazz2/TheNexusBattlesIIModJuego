import CartaHeroe from "../../cartas/CartaHeroe.js";
import InterpreteHandler from "../../utils/interpreteEfectos/interpreteMain.js";
import modelJuego from "../model/modelJuego.js";
import viewJuego from "../view/viewJuego.js";

export default class controllerJuego{
    
    playerHasPermission:boolean = false;
    local_session_id:string = "";
    local_room:any;
    local_current_turn:number = 0;
    local_action_timer = 20;
    
    constructor(private readonly model:modelJuego,private readonly view:viewJuego){}

    init = (number_of_players:number):void  => {
        this.view.viewInit(this.checkPermission,this.turn_action_pass,this.handlerAttack);
        this.view.hideExtraCards(number_of_players);
    }

    handlerAttack = (ObjectiveCard:string):void => {
        //Busca el ID en el mapa de clientes
        //Con el mapa tenemos el session ID
        //Con el mapa tmb tenemos el local

        let ClientMap = this.model.getMap(),
             ObjectiveSessionID = "";

        for(let [key,val] of ClientMap){
            if(val[0].id == ObjectiveCard){
                ObjectiveSessionID = key;
                break;
            }
        }

        InterpreteHandler.atackObjective(ClientMap.get(this.local_session_id)[1],ClientMap.get(ObjectiveSessionID)[1],
        ObjectiveSessionID,this);
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

    //TODO: Quitar el alert y poner un modal bonito
    handleTurnChange = ():void =>{
        const turnData = this.model.getTurnRegister();

        if(turnData[this.local_current_turn] == this.local_session_id){
            this.playerHasPermission = true;
            alert("Te toca!");
        }else{
            this.playerHasPermission = false;
        }
    }

    registerCurrentTurnChange = (newTurnData:number):void =>{
        this.local_current_turn = newTurnData;
        this.handleTurnChange();
        this.removeTimer();
        this.countdown();
    }

    checkPermission = ():boolean => {
        return this.playerHasPermission;
    }

    //#region Acciones en los turnos
    /* 
        Tabla de Acciones:
        0 - Sync de las Cartas
        1 - Pasar de Turno
        2 - Indicar que el cliente está listo
    */

    turn_action_pass=():void =>{
        this.local_room.send(1);
    }

    match_status_ready = ():void => {
        this.local_room.send(2);
    }

    /*
       Esta funcion sincroniza una carta entre los clientes. Se envia el objetivo (SessionID de la carta a modificar)
       y la card data (Valores nuevos de la carta)
    */
    match_sync_set_card = (session_id_objective:string,card_data:any):void =>{
        this.local_room.send(0,{sender:session_id_objective,card:card_data});
    }

    //#endregion

    //#region Action Timer
    intervID:any;

    countdown = ():void => {
            let timeleft = 60;
            this.intervID = setInterval(()=>{
                if(timeleft > -1) timeleft --;
                if(timeleft == 0){
                    if(this.checkPermission()) {this.turn_action_pass();}
                }else{
                    this.view.viewUpdateActionTimer(timeleft);
                }
            },1000);
    }

    removeTimer = () =>{
        clearInterval(this.intervID);
    }
    //#endregion
}