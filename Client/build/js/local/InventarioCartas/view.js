export default class InventarioView {
    constructor() {
        this.init = () => {
            const contenedorVista = document.querySelector('#elementoPrincipal');
            const body = document.body;
            if (contenedorVista) {
                contenedorVista.innerHTML = "";
                body.classList.remove('body');
            }
            const newElement = document.getElementById('ElementoInventario');
            if (newElement != null)
                newElement.innerHTML = `<div class="container-inventory">
    <img src="../img/titulofondo-removebg-preview.png" alt="" class="tituloimagen">
    <div class="card-container">
      <!-- Cartas desde JavaScript -->
    </div>
    <div id="codigoCarta" style="display: none;">
      <h2>Código de la Carta Seleccionada</h2>
      <pre id="codigoTexto"></pre>
    </div>
    <button class="btniniciar" id="iniciarBtn">Iniciar</button>
  </div>`;
            this.iniciarBtn = document.getElementById('iniciarBtn');
        };
        this.cartasSeleccionadas = 0;
    }
    llenarCartasEnHTML(cartas) {
        try {
            const container = document.querySelector('.card-container');
            if (container != null)
                container.innerHTML = "";
            cartas.forEach((carta) => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                let innerHTML = "";
                //Corregir este switch. Pensé que se necesitarían más tipos de carta.
                switch (carta.coleccion) {
                    case "Heroe":
                        innerHTML = `
          <div style="background:rgba(17,18,18,1); color:white; border:1px solid rgba(255,244,0,1);" class="carta2 2xl:w-[250px] 2xl:h-[350px] md:w-[200px] md:h-[290px]" data-tilt data-tilt-max="15" data-tilt-speed="400" data-tilt-perspective="1000">
            <div class="titulo">
              <p class="2xl:text-[18px] md:text-[15px]">${carta.clase + " " + carta.tipo}</p>
            </div>
            <img src="${carta.urlImagen}" alt="" class="2xl:h-[100px] md:sm:h-[80px]">
            <div class="contenido">
              <div>
                <p class="2xl:text-[16px] md:text-[15px]">Poder: ${carta.poder}</p>
                <p class="2xl:text-[16px] md:text-[15px]">Vida: ${carta.vida}</p>
                <p class="2xl:text-[16px] md:text-[15px]" style="align-self: center;">Defensa: ${carta.defensa}</p>
              </div>
              <div>
                <p class="2xl:text-[16px] md:text-[15px]">Ataque: ${carta.ataqueBase} + 1d8</p>
                <p class="2xl:text-[16px] md:text-[15px]">Daño: ${carta.danoMax}</p>
              </div>
            </div>
          </div>
          <button class="seleccionarBtn" data-seleccionada="false" data-id="${carta.id}">Seleccionar</button>
        `;
                        break;
                    default:
                        innerHTML = `
            <div style="background:rgba(17,18,18,1); color:white; border:1px solid rgba(255,244,0,1);" class="carta2 2xl:w-[250px] 2xl:h-[350px] md:w-[200px] md:h-[290px]" data-tilt data-tilt-max="15" data-tilt-speed="400" data-tilt-perspective="1000">
              <div class="titulo">
                <p class="2xl:text-[18px] md:text-[15px]">${carta.nombre}</p>
              </div>
              <img src="${carta.urlImagen}" alt="" class="2xl:h-[100px] md:sm:h-[80px]">
              <div class="contenido">
                <div>
                  <p class="2xl:text-[16px] md:text-[15px]">${carta.desc}</p>
                </div>
              </div>
            </div>
            <button class="seleccionarBtn" data-seleccionada="false" data-id="${carta.id}">Seleccionar</button>`;
                        break;
                }
                cardDiv.innerHTML = innerHTML;
                if (container != null)
                    container.appendChild(cardDiv);
                // Evento click al botón "Seleccionar"
                const seleccionarBtn = cardDiv.querySelector('.seleccionarBtn');
                if (seleccionarBtn != null)
                    seleccionarBtn.addEventListener('click', () => {
                        const seleccionada = seleccionarBtn.getAttribute('data-seleccionada');
                        if (seleccionada === 'false') {
                            seleccionarBtn.style.backgroundColor = 'green';
                            seleccionarBtn.setAttribute('data-seleccionada', 'true');
                            this.cartasSeleccionadas++;
                            if (this.cartasSeleccionadas >= 10) {
                                this.iniciarBtn.removeAttribute('disabled');
                            }
                        }
                        else {
                            seleccionarBtn.style.backgroundColor = '';
                            seleccionarBtn.setAttribute('data-seleccionada', 'false');
                            this.cartasSeleccionadas--;
                            this.iniciarBtn.setAttribute('disabled', 'true');
                        }
                    });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    mostrarCodigo(codigo) {
        const codigoCarta = document.getElementById('codigoCarta');
        const codigoTexto = document.getElementById('codigoTexto');
        if (codigoTexto != null)
            codigoTexto.textContent = codigo;
        if (codigoCarta != null)
            codigoCarta.style.display = 'block';
    }
}
