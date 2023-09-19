export default class modelJuego {
    constructor() {
        this.clientMap = new Map();
        this.addPlayer = (key, elemento_carta, carta_data) => {
            this.clientMap.set(key, [elemento_carta, carta_data]);
            //console.log(this.clientMap);
        };
        this.removePlayer = (key) => {
            this.clientMap.delete(key);
        };
        this.getMap = () => {
            return this.clientMap;
        };
        this.updateCard = (key, card) => {
            const htmlElement = this.clientMap.get(key);
            //console.log(key)
            //console.log(htmlElement);
            this.clientMap.set(key, [htmlElement[0], card]);
            return this.clientMap.get(key);
        };
    }
}
