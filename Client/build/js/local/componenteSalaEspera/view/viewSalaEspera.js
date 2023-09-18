export default class viewSalaEspera {
    constructor() {
        this.int = () => {
            const elemetoDiv = document.getElementById("elementoPrincipal");
            elemetoDiv.innerHTML = `
                <div id="title-box">
            <a class="botonMenu1" href="./ConfiguracionSala.html">Atrás</a>
            Sala de espera
            <button class="botonMenu2" id="crearSalaBoton">Iniciar Partida</button>
        </div>

        <div id="contenedorPrincipal">
            <div id = estadoSala>
                <div id="textoEsperar">Esperando Jugadores...</div>
            </div>
            <div class="jugadores">
            
            <div id="jugador">
                <div class="labelJugador" id="labelJugador1">Anfitrión</div>
            </div>
            <div id="jugador">
                <div class="labelJugador" id="labelJugador2">Esperando...</div>
            </div>
            <div id="jugador">
                <div class="labelJugador" id="labelJugador3">Esperando...</div>
            </div>
            <div id="jugador">
                <div class="labelJugador" id="labelJugador4">Esperando...</div>
            </div>  
            </div>
        </div>

        <div id="overlay"></div>
        <div id="popup">
            <p>No tienes las cartas suficientes para continuar</p>
            <button id="cerrarPopup">Cerrar</button>
        </div>

        <div id="overlay"></div>
        <div id="popupCreditos">
            <p>No tienes los suficientes creditos para la apuesta</p>
            <button id="cerrarPopupCreditos">Cerrar</button>
        </div>
        `;
        };
    }
}
