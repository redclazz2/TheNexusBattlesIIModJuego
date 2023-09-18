export default class modelSalaEspera{
    clientMap = new Map();
    constructor(){}

    public addPlayer = (key:string,client:any):void =>{
        this.clientMap.set(key,client);
    }

    public removePlayer = (key:string) =>{
        this.clientMap.delete(key);
    }

    public getMap = ():Map<any,any> =>{
        return this.clientMap;
    }
}