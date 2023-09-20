import CartaHeroe from "../../cartas/CartaHeroe";

export default class modelJuego{
    clientMap = new Map();
    turnArray = new Array();
    constructor(){}

    public addPlayer = (key:string,elemento_carta:any,carta_data:CartaHeroe):void =>{
        this.clientMap.set(key,[elemento_carta,carta_data]);
    }

    public removePlayer = (key:string) =>{
        this.clientMap.delete(key);
    }

    public getMap = ():Map<any,any> =>{
        return this.clientMap;
    }

    public updateCard = (key:string,card:CartaHeroe):[HTMLDivElement,CartaHeroe] =>{
        const htmlElement = this.clientMap.get(key);
        this.clientMap.set(key,[htmlElement[0],card]);
        return this.clientMap.get(key);
    }

    public addTurnRegister = (session:string):void => {
        this.turnArray.push(session);
    }

    public removeTurnRegister = (session:string):void => {
        const _at = this.turnArray.indexOf(session);
        this.turnArray.slice(_at,1);
    }

    public getTurnRegister = ():Array<string> =>{
        return this.turnArray;
    }
}