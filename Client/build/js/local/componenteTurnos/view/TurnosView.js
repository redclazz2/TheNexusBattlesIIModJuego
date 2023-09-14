export default class TurnosView {
    constructor() {
        this.init = () => {
            const initialize_div = document.getElementById("turnos-content");
            if (initialize_div != null)
                initialize_div.innerHTML = `
            <div class="componente-turnos">
            <img src="../img/componenteTurnos/turnos-imagen.png"/>
            <p id="turnos-texto">Esperando</p>
            </div>
            `;
        };
        this.drawTurnData = (turno) => {
            const elementoTexto = document.getElementById("turnos-texto");
            if (elementoTexto != null)
                elementoTexto.innerHTML = `Turno ${turno}`;
        };
    }
}
