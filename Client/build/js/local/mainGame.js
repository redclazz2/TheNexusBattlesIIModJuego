import controladorSalaEspera from "./componenteSalaEspera/controller/controllerSalaEspera.js";
import modelSalaEspera from "./componenteSalaEspera/model/modelSalaEspera.js";
import viewSalaEspera from "./componenteSalaEspera/view/viewSalaEspera.js";

//Definir Controladores
const sala_espera_controller = new controladorSalaEspera(new modelSalaEspera(), new viewSalaEspera());
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
//'https://game.thenexusbattles2.com/server-0'
let client = new Colyseus.Client('https://game.thenexusbattles2.cloud/server-0'), clientArray = [], cookie_data;
//Validacion cartas y creditos
//Si si pasa a leer las cookies y si no muestra el error
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
    client.create("room_battle", cookie_data).then((room) => HandleJoinAction(room)).catch(e => {
        console.log("JOIN ERROR", e);
    });
}
else if (getCookie("config").includes('2')) {
    try {
        const room = client.joinById(getCookie("roomID"), { /* options */});
        sala_espera_controller.init();
        console.log("joined successfully", room);
    }
    catch (e) {
        console.error("join error", e);
        show_modal("No se ha podido establecer una conexión con la sala. Es posible que ya no esté disponible. ERR:2001");
    }
}
else {
    //Mostrar mensaje de error inesperado
    show_modal("No se puede establecer una conexión al servidor. Intenta de nuevo más tarde. ERR:1001");
    console.error("Unable to resolve game-command! Please allow cookies in your browser!");
}
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
const HandleJoinAction = (room) => {
    console.log(room.sessionId, "joined", room.name);
    sala_espera_controller.init();
    room.state.listen("currentTurn", (currentValue, previousValue) => {
        console.log(`currentTurn is now ${currentValue}`);
        console.log(`previous value was: ${previousValue}`);
    });
    room.state.clients.onAdd((client, key) => {
        console.log(client, "has been added at", key);
        clientArray.push(client);
    });
    room.state.clients.onRemove((client, key) => {
        console.log(client, "has been removed at", key);
        const index = clientArray.indexOf(client);
        if (index > -1)
            clientArray.splice(index, 1);
    });
};
