export default class modelSalaEspera {
    constructor() {
        this.clientMap = new Map();
        this.addPlayer = (key, client) => {
            this.clientMap.set(key, client);
        };
        this.removePlayer = (key) => {
            this.clientMap.delete(key);
        };
        this.getMap = () => {
            return this.clientMap;
        };
    }
}
