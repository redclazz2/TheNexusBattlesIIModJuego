export default class controladorSalaEspera {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.expectedUsers = 4;
        this.init = (funcionIniciarPartida) => {
            this.view.int();
            this.functionInit = funcionIniciarPartida;
        };
        this.addPlayer = (key, client) => {
            this.model.addPlayer(key, client);
            this.view.updatePlayerName(this.model.getMap(), this.expectedUsers);
            this.readyUpRoom();
        };
        this.removePlayer = (key) => {
            this.model.removePlayer(key);
            this.view.updatePlayerName(this.model.getMap(), this.expectedUsers);
            this.readyUpRoom();
        };
        this.setExpectedUsers = (expectedUsers) => {
            this.expectedUsers = Number(expectedUsers);
        };
        this.readyUpRoom = () => {
            const currentMap = this.model.getMap();
            if (currentMap.size == this.expectedUsers) {
                this.view.updateRoomStatus();
                this.functionInit();
            }
        };
        this.getPlayerMap = () => {
            return this.model.getMap();
        };
    }
}
