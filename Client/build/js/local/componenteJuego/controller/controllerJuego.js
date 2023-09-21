import InterpreteHandler from "../../utils/interpreteEfectos/interpreteMain.js";
export default class controllerJuego {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.playerHasPermission = false;
        this.local_session_id = "";
        this.local_current_turn = 0;
        this.local_action_timer = 20;
        this.init = (number_of_players) => {
            this.view.viewInit(this.checkPermission, this.turn_action_pass, this.handlerAttack);
            this.view.hideExtraCards(number_of_players);
        };
        this.handlerAttack = (ObjectiveCard) => {
            //Busca el ID en el mapa de clientes
            //Con el mapa tenemos el session ID
            //Con el mapa tmb tenemos el local
            let ClientMap = this.model.getMap(), ObjectiveSessionID = "";
            for (let [key, val] of ClientMap) {
                if (val[0].id == ObjectiveCard) {
                    ObjectiveSessionID = key;
                    break;
                }
            }
            InterpreteHandler.atackObjective(ClientMap.get(this.local_session_id)[1], ClientMap.get(ObjectiveSessionID)[1], ObjectiveSessionID, this);
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
        //TODO: Quitar el alert y poner un modal bonito
        this.handleTurnChange = () => {
            const turnData = this.model.getTurnRegister();
            if (turnData[this.local_current_turn] == this.local_session_id) {
                this.playerHasPermission = true;
                alert("Te toca!");
            }
            else {
                this.playerHasPermission = false;
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
            0 - Sync de las Cartas
            1 - Pasar de Turno
            2 - Indicar que el cliente está listo
        */
        this.turn_action_pass = () => {
            this.local_room.send(1);
        };
        this.match_status_ready = () => {
            this.local_room.send(2);
        };
        /*
           Esta funcion sincroniza una carta entre los clientes. Se envia el objetivo (SessionID de la carta a modificar)
           y la card data (Valores nuevos de la carta)
        */
        this.match_sync_set_card = (session_id_objective, card_data) => {
            this.local_room.send(0, { sender: session_id_objective, card: card_data });
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
