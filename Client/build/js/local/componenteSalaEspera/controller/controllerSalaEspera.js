export default class controladorSalaEspera {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.expectedUsers = 4;
        this.init = () => {
            console.log("Iniciando Controlador de Sala Espera");
            this.view.int();
            console.log("Controlador listo!");
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
            }
        };
    }
}
