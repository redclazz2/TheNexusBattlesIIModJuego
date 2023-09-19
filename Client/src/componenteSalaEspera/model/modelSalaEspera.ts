export default class modelSalaEspera{
    clientMap = new Map();
    turnos:string[] = [];
    constructor(){}

    public addPlayer = (key:string,client:any):void =>{
        this.clientMap.set(key,client);
        this.turnos.push(key);
    }

    public removePlayer = (key:string) =>{
        this.clientMap.delete(key);
        const _i = this.turnos.indexOf(key);
        this.turnos.slice(_i,1);
    }

    public getMap = ():Map<any,any> =>{
        return this.clientMap;
    }
}