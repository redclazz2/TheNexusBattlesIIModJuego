export default class modelSalaEspera {
    constructor() {
        this.clientMap = new Map();
        this.turnos = [];
        this.addPlayer = (key, client) => {
            this.clientMap.set(key, client);
            this.turnos.push(key);
        };
        this.removePlayer = (key) => {
            this.clientMap.delete(key);
            const _i = this.turnos.indexOf(key);
            this.turnos.slice(_i, 1);
        };
        this.getMap = () => {
            return this.clientMap;
        };
    }
}
