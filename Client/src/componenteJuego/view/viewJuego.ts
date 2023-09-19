import CartaHeroe from "../../cartas/CartaHeroe";

export default class viewJuego{
    myHTMLCards:{[number:string]:string} = {
        0:"carta_inf", //Carta local
        1:"carta_sup", //En 1
        2:"carta_izq", //En 2
        3:"carta_der" //En 3
    }
    constructor(){}

    viewInit = ():void =>{
        const contenedorVista = document.querySelector('#elementoPrincipal');
        const body = document.body;

        if (contenedorVista) {
            //contenedorVista.classList.add('none');
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
                <span class="v49_26">15</span>
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
                <span class="v49_26">15</span>
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
                <span class="v49_21">P</span>
                <span class="v49_22">+</span>
                <span class="v49_23">Progreso</span>
                <div class="v49_24"></div>
                <div class="v49_25"></div>
                <span class="v49_26">15</span>
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
                <span class="v49_26">15</span>
                <div class="v49_27"></div>
            </div>
        </div>
        </div>
        `;

        body.insertAdjacentHTML('beforeend', fragmentoHTML);
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
        const defensa = document.getElementById('defensa_' + completeValue);
        const ataqueDado = document.getElementById('ataque_dado_' + completeValue);
        const daño = document.getElementById('daño_' + completeValue);
        // Asignar las proiedades correspondientes a los elementos con texto adicional
        if(clase != null) clase.innerText = ` ${card.tipo_heroe}`;
        if(poder != null) poder.innerText = `Poder: ${card.poder}`;
        if(vida != null) vida.innerText = `Vida: ${card.vida}`;
        if(defensa != null) defensa.innerText = `Defensa: ${card.defensa}`;
        if(ataqueDado != null) ataqueDado.innerText = `Ataque Dado: ${card.ataque_maximo}`;
        if(daño != null) daño.innerText = `Daño: ${card.daño_maximo}`;
    }
}