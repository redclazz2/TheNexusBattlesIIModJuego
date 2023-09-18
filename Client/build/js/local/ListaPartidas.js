let client = new Colyseus.Client('https://game.thenexusbattles2.cloud/server-0');

// Tabla en HTML donde se guardan las fila
const table = document.querySelector(".tabla");

const functionBusqueda = async () => {
  try {
    // Seleccionar todos los elementos con la clase "fila" y eliminarlos
    const filas = document.querySelectorAll('.fila');
    filas.forEach(row => row.remove());

    await client.getAvailableRooms("room_battle").then(rooms => {
      if (rooms.length > 0) {
        rooms.forEach(room => {
          console.log(room.roomId);
          console.log(room.clients);
          console.log(room.maxClients);
          console.log(room.metadata);
          // Div con clase fila donde se guardará la información de la partida
          const tableItem = document.createElement("div");
          tableItem.classList.add("fila");

          tableItem.innerHTML = `
            <div class="columna nombreP">${room.roomId}</div>
            <div class="columna">${room.metadata.nombre}</div>
            <div class="columna">${room.clients}/${room.maxClients}</div>
            <div class="columna">${room.metadata.ganacia}</div>
             <div class="columna"><button class="joinButton"><input id="btnJoins" type="text" class="hidden" value="${room.roomId}">Join</button></div>
          `;
         
          // Div fila se guarda en la tabla
          table.appendChild(tableItem);
        });
      } else {
        console.log("NO DATA");

        // Crear el elemento HTML para el mensaje de error
        const errorPopup = document.createElement("div");
        errorPopup.classList.add("popup-container");
        errorPopup.innerHTML = `
          <div class="popup">
              <div class="popup-header">
                  <span class="error-icon">!</span>
              </div>
              <div class="popup-content">
                  <p>¡Ups! Parece que no hay partidas aun. Por favor, intenta de nuevo más tarde.</p>
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
    }).catch(e => {
      console.log("JOIN ERROR", e);
      // Crear el elemento HTML para el mensaje de error
      const errorPopup = document.createElement("div");
      errorPopup.classList.add("popup-container");
      errorPopup.innerHTML = `
        <div class="popup">
            <div class="popup-header">
                <span class="error-icon">!</span>
            </div>
            <div class="popup-content">
                <p>¡Ups! ${e}</p>
                <div class="btn__confirmar">
                  <button class="close-button">Confirmar</button>
                </div>
            </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Ocurrió un error:', error);
    // Crear el elemento HTML para el mensaje de error
    const errorPopup = document.createElement("div");
    errorPopup.classList.add("popup-container");
    errorPopup.innerHTML = `
      <div class="popup">
          <div class="popup-header">
              <span class="error-icon">!</span>
          </div>
          <div class="popup-content">
              <p>¡Ups! ${error}</p>
              <div class="btn__confirmar">
                <button class="close-button">Confirmar</button>
              </div>
          </div>
      </div>
    `;
  }
};

//Traer id de la partida 
table.addEventListener('click', (event) => {
  //Se trae el elemento al que se le dio click en la tabla
  const clickedElement = event.target;

  // Verificar si el elemento clicado es un botón con clase 'joinButton'
  if (clickedElement.classList.contains('joinButton')) {
    //Se trae el input dentro del boton el cual guarda el id de la partida
    const inputInsideButton = clickedElement.querySelector('input.hidden');
    //Por ultimo se imprime en la consola
    if (inputInsideButton) {
      console.log(inputInsideButton.value);
      var now = new Date();
      now.setTime(now.getTime()+(3*60*1000));
      document.cookie = `config='2'; expires=${now.toUTCString()}`;
      document.cookie = `roomID = ${inputInsideButton.value}; expires=${now.toUTCString()}`;
    
      window.setTimeout(()=>{
        window.location.replace("./JuegoEnLinea.html");
      },1000);
    }
  }
});

document.addEventListener("DOMContentLoaded", functionBusqueda);

const boton_actualizar = document.getElementById('btn_actualizar');
boton_actualizar.addEventListener('click', functionBusqueda);
