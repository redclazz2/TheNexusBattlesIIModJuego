var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import controladorSalaEspera from "./componenteSalaEspera/controller/controllerSalaEspera.js";
import modelSalaEspera from "./componenteSalaEspera/model/modelSalaEspera.js";
import viewSalaEspera from "./componenteSalaEspera/view/viewSalaEspera.js";
//import * as Colyseus from "../build/js/Vendors/colyseus.js";
import controllerJuego from "./componenteJuego/controller/controllerJuego.js";
import modelJuego from "./componenteJuego/model/modelJuego.js";
import viewJuego from "./componenteJuego/view/viewJuego.js";
import TurnosController from "./componenteTurnos/controller/TurnosController.js";
import TurnosView from "./componenteTurnos/view/TurnosView.js";
import MazoController from "./componenteMazo/controller/MazoController.js";
import MazoModel from "./componenteMazo/model/MazoModel.js";
import MazoView from "./componenteMazo/view/MazoView.js";
//#region Funciones Generales de la Vista
function show_modal(code) {
    const errorPopup = document.createElement("div");
    errorPopup.classList.add("popup-container");
    errorPopup.innerHTML = `
            <div class="popup">
                <div class="popup-header">
                    <span class="error-icon">!</span>
                </div>
                <div class="popup-content">
                    <p>¡Ups! ${code}</p>
                    <div class="btn__confirmar">
                      <button class="close-button">Confirmar</button>
                    </div>
                </div>
            </div>
          `;
    // Agregar el mensaje de error al cuerpo del documento
    document.body.appendChild(errorPopup);
    //Eliminar el mensaje de error al hacer click en "Confirmar"
    const closeButton = document.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            errorPopup.remove();
        });
    }
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//#endregion
//#region Definición de Controladores
const sala_espera_controller = new controladorSalaEspera(new modelSalaEspera(), new viewSalaEspera());
const juego_controller = new controllerJuego(new modelJuego(), new viewJuego());
const turnos_controller = new TurnosController(new TurnosView());
const mazo_controller = new MazoController(new MazoModel(), new MazoView());
//#endregion
let client = new Colyseus.Client('https://game.thenexusbattles2.cloud/server-0'), cookie_data;
//Bloque de unión a la partida
try {
    //En caso de que se intente crear una partida
    if (getCookie("config").includes('1')) {
        cookie_data = {
            numero_creditos: getCookie("creditosValor"),
            numero_jugadores: getCookie("numJugadores"),
            nombre_sala: getCookie("nombre"),
            tj2: getCookie("tj2"),
            tj3: getCookie("tj3"),
            tj4: getCookie("tj4"),
            equipos: getCookie("equipos"),
            ej1: getCookie("ej1"),
            ej2: getCookie("ej2"),
            ej3: getCookie("ej3"),
            ej4: getCookie("ej4")
        };
        //Acción crear en Colyseus
        client.create("room_battle", cookie_data).then((room) => HandleJoinAction(room));
        //En caso de que se intente unir a una partida
    }
    else if (getCookie("config").includes('2')) {
        client.joinById(getCookie("roomID"), { /* options */}).then((room) => HandleJoinAction(room));
    }
    else {
        //Error en caso de que no exista la cookie
        show_modal("No se ha logrado inicializar el cliente de juego. Intenta de nuevo más tarde. ERR:1001");
    }
}
catch (e) {
    show_modal("Ha ocurrido un error al unirse a la sala de juego. Intenta de nuevo más tarde: ERR:0000");
}
//Función que se encarga del control de juego
const HandleJoinAction = (room) => {
    juego_controller.registerLocalSessionID(room.sessionId);
    juego_controller.registerLocalRoom(room);
    console.log(room.sessionId, "joined", room.name);
    sala_espera_controller.init(StartGameView);
    //#region Room State Listeners
    room.state.listen("currentTurn", (currentValue, previousValue) => {
        console.log(`currentTurn is now ${currentValue}`);
        console.log(`previous value was: ${previousValue}`);
        turnos_controller.updateTurnNumber();
    });
    room.state.listen("expectedUsers", (currentValue, previousValue) => {
        console.log(`expectedUsers is now ${currentValue}`);
        console.log(`previous value was: ${previousValue}`);
        sala_espera_controller.setExpectedUsers(currentValue.toString());
    });
    room.state.listen("localTurnStatus", (currentValue, previousValue) => {
        console.log(`localTurnStatus is now ${currentValue}`);
        console.log(`previous value was: ${previousValue}`);
        juego_controller.registerCurrentTurnChange(currentValue);
    });
    room.state.turnos.onAdd((client, key) => {
        console.log(client, "turn has been added at", key);
        juego_controller.addCurrentTurnArray(client);
        console.log(juego_controller.getTurnRegister());
    });
    room.state.turnos.onRemove((client, key) => {
        console.log(client, "turn has been removed at", key);
        juego_controller.removeCurrentTurnArray(client);
        console.log(juego_controller.getTurnRegister());
    });
    room.state.clients.onAdd((client, key) => {
        console.log(client, "has been added at", key);
        sala_espera_controller.addPlayer(key, client);
    });
    room.state.clients.onRemove((client, key) => {
        console.log(client, "has been removed at", key);
        sala_espera_controller.removePlayer(key);
    });
    //#endregion
    room.onMessage(0, (message) => {
        console.log(message);
        juego_controller.updateCardValue(message.sender, message.card);
    });
};
const StartGameView = () => __awaiter(void 0, void 0, void 0, function* () {
    juego_controller.init(sala_espera_controller.getPlayerMap().size);
    //Carta Seleccionada:
    const my_hero_card_api = fetch('https://cards.thenexusbattles2.cloud/api/heroes/65035fb3cd1283c97b876f9d');
    let my_hero_card = {};
    yield my_hero_card_api.then(response => response.json()).then(data => {
        my_hero_card.tipo_heroe = data.Clase + " " + data.Tipo,
            my_hero_card.vida = data.Vida,
            my_hero_card.defensa = data.Defensa,
            my_hero_card.ataque_base = data.AtaqueBase,
            my_hero_card.poder = 1,
            my_hero_card.ataque_maximo = data.AtaqueDado,
            my_hero_card.daño_maximo = data.DanoMax;
        my_hero_card.descripcion = data.Desc;
    });
    let player_pos = 1;
    for (let [key, value] of sala_espera_controller.getPlayerMap().entries()) {
        if (key == juego_controller.getLocalSessionID()) {
            juego_controller.registerClient(value.sessionID, my_hero_card, 0);
        }
        else {
            juego_controller.registerClient(value.sessionID, {}, player_pos);
            player_pos++;
        }
    }
    juego_controller.getLocalRoom().send(0, { sender: juego_controller.getLocalSessionID(), card: my_hero_card });
    juego_controller.updateCardValue(juego_controller.getLocalSessionID(), my_hero_card);
    juego_controller.handleTurnChange();
    turnos_controller.init();
    mazo_controller.init();
});
