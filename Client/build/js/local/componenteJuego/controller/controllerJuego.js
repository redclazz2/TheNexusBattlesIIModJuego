export default class controllerJuego {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.playerHasPermission = false;
        this.local_session_id = "";
        this.local_current_turn = 0;
        this.local_action_timer = 20;
        this.init = (number_of_players) => {
            this.view.viewInit(this.checkPermission, this.turn_action_pass);
            this.view.hideExtraCards(number_of_players);
        };
        this.registerLocalSessionID = (session) => {
            this.local_session_id = session;
        };
        this.getLocalSessionID = () => {
            return this.local_session_id;
        };
        this.registerLocalRoom = (room) => {
            this.local_room = room;
        };
        this.getLocalRoom = () => {
            return this.local_room;
        };
        this.registerClient = (key, carta, componenteDiv) => {
            this.model.addPlayer(key, this.view.viewGetCardComponents(componenteDiv), carta);
        };
        this.updateCardValue = (playerSessionID, cartaHeroe) => {
            const ModelData = this.model.updateCard(playerSessionID, cartaHeroe);
            this.view.viewUpdateCard(ModelData[0], ModelData[1]);
        };
        this.addCurrentTurnArray = (session) => {
            this.model.addTurnRegister(session);
        };
        this.removeCurrentTurnArray = (session) => {
            this.model.removeTurnRegister(session);
        };
        this.getTurnRegister = () => {
            return this.model.getTurnRegister();
        };
        this.handleTurnChange = () => {
            const turnData = this.model.getTurnRegister();
            if (turnData[this.local_current_turn] == this.local_session_id) {
                this.playerHasPermission = true;
                console.log("Turno Local");
            }
            else {
                this.playerHasPermission = false;
                console.log("Turno Enemigo");
            }
        };
        this.registerCurrentTurnChange = (newTurnData) => {
            this.local_current_turn = newTurnData;
            this.handleTurnChange();
            this.removeTimer();
            this.countdown();
        };
        this.checkPermission = () => {
            return this.playerHasPermission;
        };
        //#region Acciones en los turnos
        /*
            Tabla de Acciones:
            0 - Sync Inicial de las Cartas
            1 - Pasar de Turno
            2 - Indicar que el cliente está listo
        */
        this.turn_action_pass = () => {
            this.local_room.send(1);
        };
        this.match_status_ready = () => {
            this.local_room.send(2);
        };
        this.countdown = () => {
            let timeleft = 60;
            this.intervID = setInterval(() => {
                if (timeleft > -1)
                    timeleft--;
                if (timeleft == 0) {
                    if (this.checkPermission()) {
                        this.turn_action_pass();
                    }
                }
                else {
                    this.view.viewUpdateActionTimer(timeleft);
                }
            }, 1000);
        };
        this.removeTimer = () => {
            clearInterval(this.intervID);
        };
    }
}
