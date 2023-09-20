export default class TurnosView{
    constructor(){}

    init = ():void => {
        const initialize_div = document.getElementById("turnos-content") as HTMLDivElement;
        if(initialize_div != null)
            initialize_div.innerHTML = `
            <div class="componente-turnos">
            <img src="../img/componenteTurnos/turnos-imagen.png"/>
            <p id="turnos-texto">Esperando</p>
            <p id="tiempo-juego">Esperando</p>
            </div>
            `;
    }

    drawTurnData = (turno:number):void => {
        const elementoTexto = document.getElementById("turnos-texto") as HTMLParagraphElement;
        if(elementoTexto != null)
            elementoTexto.innerHTML = `Turno ${turno}`;
    }
}