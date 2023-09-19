import modelSalaEspera from "../model/modelSalaEspera.js";
import viewSalaEspera from "../view/viewSalaEspera.js";

export default class controladorSalaEspera{
    expectedUsers:number = 4;
    functionInit:any;
    constructor(private readonly model:modelSalaEspera, private readonly view:viewSalaEspera){}

    init = (funcionIniciarPartida:()=>void):void =>{
        console.log("Iniciando Controlador de Sala Espera");
        this.view.int();
        this.functionInit = funcionIniciarPartida;
        console.log("Controlador listo!");
    }

    addPlayer = (key:string,client:any):void =>{
        this.model.addPlayer(key,client);
        this.view.updatePlayerName(this.model.getMap(),this.expectedUsers);
        this.readyUpRoom();
    }

    removePlayer = (key:string):void =>{
        this.model.removePlayer(key);
        this.view.updatePlayerName(this.model.getMap(),this.expectedUsers);
        this.readyUpRoom();
    }

    setExpectedUsers = (expectedUsers:string):void => {
        this.expectedUsers = Number(expectedUsers);
    }

    readyUpRoom = ():void => {
        const currentMap = this.model.getMap();
        if(currentMap.size == this.expectedUsers){
            this.view.updateRoomStatus();
            this.functionInit();
        }
    }

    getPlayerMap = ():Map<string,any> => {
        return this.model.getMap();
    }
}