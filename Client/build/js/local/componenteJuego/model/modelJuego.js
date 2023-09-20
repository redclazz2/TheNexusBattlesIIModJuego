export default class modelJuego {
    constructor() {
        this.clientMap = new Map();
        this.turnArray = new Array();
        this.addPlayer = (key, elemento_carta, carta_data) => {
            this.clientMap.set(key, [elemento_carta, carta_data]);
        };
        this.removePlayer = (key) => {
            this.clientMap.delete(key);
        };
        this.getMap = () => {
            return this.clientMap;
        };
        this.updateCard = (key, card) => {
            const htmlElement = this.clientMap.get(key);
            this.clientMap.set(key, [htmlElement[0], card]);
            return this.clientMap.get(key);
        };
        this.addTurnRegister = (session) => {
            this.turnArray.push(session);
        };
        this.removeTurnRegister = (session) => {
            const _at = this.turnArray.indexOf(session);
            this.turnArray.slice(_at, 1);
        };
        this.getTurnRegister = () => {
            return this.turnArray;
        };
    }
}
