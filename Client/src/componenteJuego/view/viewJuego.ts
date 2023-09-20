import CartaHeroe from "../../cartas/CartaHeroe";

export default class viewJuego{

    permissionControllerFunction:()=>boolean = function(){return true};
    passTurnFunction:()=>void=function(){};

    myHTMLCards:{[number:string]:string} = {
        0:"carta_inf", //Carta local
        1:"carta_sup", //En 1
        2:"carta_izq", //En 2
        3:"carta_der" //En 3
    }
    constructor(){}

    viewInit = (permissionFunction:()=>boolean,
                      passFunction:()=>void):void =>{
        this.permissionControllerFunction = permissionFunction;
        this.passTurnFunction = passFunction;
        
        const contenedorVista = document.querySelector('#elementoPrincipal');
        const body = document.body;

        if (contenedorVista) {
            contenedorVista.innerHTML = "";
            body.classList.remove('body');
        }

        const fragmentoHTML = `
        <div class="container">

        <div class="columna c1">
            <div class="v49_153" id="carta_izq">
                <div class="v49_3"></div>
                <div class="v49_4"></div>
                <div class="v49_5"></div>
                <div class="v49_6"></div>
                <div class="v49_8"></div>

                <span class="v49_9" id="clase_carta_izq"></span>
                <span class="v49_10" id="poder_carta_izq"></span>
                <span class="v49_11" id="vida_carta_izq"></span>
                <span class="v49_12" id="defensa_carta_izq"></span>
                <span class="v49_13" id="ataque_dado_carta_izq"></span>
                <span class="v49_14" id="daño_carta_izq"></span>
                <div class="v49_15"></div>
                <span class="v49_16"></span>
                <div class="v49_17"></div>
                <span class="v49_18">Atacar</span>
                <span class="v49_23">Progreso</span>
                <div class="v49_24"></div>
                <div class="v49_25"></div>
                <span class="v49_26" id="vida_actual_carta_izq"></span>
                <div class="v49_27"></div>
            </div>
        </div>


        <div class="columna c2">
            <div class="v49_153" id="carta_sup">
                <div class="v49_3"></div>
                <div class="v49_4"></div>
                <div class="v49_5"></div>
                <div class="v49_6"></div>
                <div class="v49_8"></div>

                <span class="v49_9" id="clase_carta_sup"></span>
                <span class="v49_10" id="poder_carta_sup"></span>
                <span class="v49_11" id="vida_carta_sup"></span>
                <span class="v49_12" id="defensa_carta_sup"></span>
                <span class="v49_13" id="ataque_dado_carta_sup"></span>
                <span class="v49_14" id="daño_carta_sup"></span>
                <div class="v49_15"></div>
                <span class="v49_16"></span>
                <div class="v49_17"></div>
                <span class="v49_18">Atacar</span>
                <span class="v49_23">Progreso</span>
                <div class="v49_24"></div>
                <div class="v49_25"></div>
                <span class="v49_26" id="vida_actual_carta_sup"></span>
                <div class="v49_27"></div>
            </div>


            <div class="v49_153" id="carta_inf">
                <div class="v49_3"></div>
                <div class="v49_4"></div>
                <div class="v49_5"></div>
                <div class="v49_6"></div>
                <div class="v49_8"></div>

                <span class="v49_9" id="clase_carta_inf"></span>
                <span class="v49_10" id="poder_carta_inf"></span>
                <span class="v49_11" id="vida_carta_inf"></span>
                <span class="v49_12" id="defensa_carta_inf"></span>
                <span class="v49_13" id="ataque_dado_carta_inf"></span>
                <span class="v49_14" id="daño_carta_inf"></span>
                <div class="v49_15"></div>
                <span class="v49_16"></span>
                <div class="v49_17 green"></div>
                <span class="v49_18 ">Mejorar</span>
                <div class="v49_19"></div>
                <div class="v49_20"></div>
                <span class="v49_21" id="controlTurnoPasar">P</span>
                <span class="v49_22">+</span>
                <span class="v49_23">Progreso</span>
                <div class="v49_24"></div>
                <div class="v49_25"></div>
                <span class="v49_26" id="vida_actual_carta_inf"></span>
                <div class="v49_27"></div>
            </div>
        </div>

        <div class="columna c3">
            <div class="v49_153" id="carta_der">
                <div class="v49_3"></div>
                <div class="v49_4"></div>
                <div class="v49_5"></div>
                <div class="v49_6"></div>
                <div class="v49_8"></div>

                <span class="v49_9" id="clase_carta_der"></span>
                <span class="v49_10" id="poder_carta_der"></span>
                <span class="v49_11" id="vida_carta_der"></span>
                <span class="v49_12" id="defensa_carta_der"></span>
                <span class="v49_13" id="ataque_dado_carta_der"></span>
                <span class="v49_14" id="daño_carta_der"></span>
                <div class="v49_15"></div>
                <span class="v49_16"></span>
                <div class="v49_17"></div>
                <span class="v49_18">Atacar</span>
                <span class="v49_23">Progreso</span>
                <div class="v49_24"></div>
                <div class="v49_25"></div>
                <span class="v49_26" id="vida_actual_carta_der"></span>
                <div class="v49_27"></div>
            </div>
        </div>
        </div>
        `;

        body.insertAdjacentHTML('beforeend', fragmentoHTML);

        //Agregar Controles
        const pasarTurno = document.getElementById("controlTurnoPasar");
                  pasarTurno?.addEventListener('click',()=>{
                    if(this.permissionControllerFunction()){
                        this.passTurnFunction();
                        console.log("Se ha presionado el boton para saltar de turno");
                    }else{
                        console.log("No es tu turno!");
                    }
                  });
    }

    hideExtraCards = (number_of_players:number):void => {
        if(number_of_players == 2){
            const carta_izq = document.getElementById('carta_izq');
            const carta_der = document.getElementById('carta_der');
            
            if(carta_izq != null) carta_izq.hidden = true;
            if(carta_der != null) carta_der.hidden = true;
        }
        else if(number_of_players == 3)
        {
            const carta_der = document.getElementById('carta_der');
            if(carta_der != null) carta_der.hidden = true;
        }
    }

    viewGetCardComponents=(playerPos:number):HTMLDivElement =>{
        return document.getElementById(this.myHTMLCards[playerPos]) as HTMLDivElement;
    }

    viewUpdateCard = (htmlElement:HTMLDivElement,card:CartaHeroe):void => {
        const completeValue:string = htmlElement.id;
        const clase = document.getElementById('clase_' + completeValue);
        const poder = document.getElementById('poder_' + completeValue);
        const vida = document.getElementById('vida_'+completeValue);
        const vidaActual = document.getElementById('vida_actual_' + completeValue)
        const defensa = document.getElementById('defensa_' + completeValue);
        const ataqueDado = document.getElementById('ataque_dado_' + completeValue);
        const daño = document.getElementById('daño_' + completeValue);
        // Asignar las proiedades correspondientes a los elementos con texto adicional
        if(clase != null) clase.innerText = ` ${card.tipo_heroe}`;
        if(poder != null) poder.innerText = `Poder: ${card.poder}`;
        if(vida != null) vida.innerText = `Vida: ${card.vida}`;
        if(vidaActual !=null) vidaActual.innerText = card.vidaActual.toString();
        if(defensa != null) defensa.innerText = `Defensa: ${card.defensa}`;
        if(ataqueDado != null) ataqueDado.innerText = `Ataque Dado: ${card.ataque_maximo}`;
        if(daño != null) daño.innerText = `Daño: ${card.daño_maximo}`;
        //Actualizar vida de la carta
        const dynamicHealthBar:HTMLDivElement = htmlElement.querySelector(".v49_25") as HTMLDivElement
        dynamicHealthBar.style.width = String((Number(card.vidaActual) * 155)/Number(card.vida)) + "px";
        const healthRate:number = ((Number(card.vidaActual) * 100)/Number(card.vida)) /100
        dynamicHealthBar.style.background = healthRate > 0.6 ? "rgba(25,66,10,1)": healthRate >= 0.4 ? "rgba(255, 204, 102, 0.5)":"rgba(255, 0, 0, 0.5)";        
    }

    /*
        Esta funcion permite actualizar el texto HTML del contador
        de acción para un turno.
    */
    viewUpdateActionTimer = (current:number|string):void =>{
        const docHTMLTimer = document.getElementById('tiempo-juego');

        if(docHTMLTimer != null) docHTMLTimer.innerText = "Tiempo Desición: " + current.toString();
    }
}