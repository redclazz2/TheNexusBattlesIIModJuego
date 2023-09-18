import controladorSalaEspera from "./componenteSalaEspera/controller/controllerSalaEspera.js";
import modelSalaEspera from "./componenteSalaEspera/model/modelSalaEspera.js";
import viewSalaEspera from "./componenteSalaEspera/view/viewSalaEspera.js";

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
    console.log(room.sessionId, "joined", room.name);
    sala_espera_controller.init();
    //#region Room State Listeners
    room.state.listen("currentTurn", (currentValue, previousValue) => {
        console.log(`currentTurn is now ${currentValue}`);
        console.log(`previous value was: ${previousValue}`);
    });
    room.state.listen("expectedUsers", (currentValue, previousValue) => {
        console.log(`expectedUsers is now ${currentValue}`);
        console.log(`previous value was: ${previousValue}`);
        sala_espera_controller.setExpectedUsers(currentValue.toString());
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
    room.onMessage("RoomReady", (message) => {
        const textoEsperar = document.getElementById('textoEsperar');
        if (textoEsperar != null)
            textoEsperar.textContent = 'Jugadores listos';
    });
};
