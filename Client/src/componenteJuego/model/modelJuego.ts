import CartaHeroe from "../../cartas/CartaHeroe";

export default class modelJuego{
    clientMap = new Map();
    constructor(){}

    public addPlayer = (key:string,elemento_carta:any,carta_data:CartaHeroe):void =>{
        this.clientMap.set(key,[elemento_carta,carta_data]);
        //console.log(this.clientMap);
    }

    public removePlayer = (key:string) =>{
        this.clientMap.delete(key);
    }

    public getMap = ():Map<any,any> =>{
        return this.clientMap;
    }

    public updateCard = (key:string,card:CartaHeroe):[HTMLDivElement,CartaHeroe] =>{
        const htmlElement = this.clientMap.get(key);
        //console.log(key)
        //console.log(htmlElement);
        this.clientMap.set(key,[htmlElement[0],card]);

        return this.clientMap.get(key);
    }
}