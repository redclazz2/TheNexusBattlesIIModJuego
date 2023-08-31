//Importa el cliente de colyseus
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

let client = new  Colyseus.Client('https://game.thenexusbattles2.com/server-0'),
     cookie_data= "";

if(getCookie("config").includes('1')){
    cookie_data = {
        numero_creditos: getCookie("creditosValor"),
        numero_jugadores: getCookie("numJugadores"),
        nombre_sala: getCookie("nombre"),
        tj2: getCookie("tj2"),
        tj3: getCookie("tj3"),
        tj4: getCookie("tj4"),
        equipos: getCookie("equipos"),
        ej1:getCookie("ej1"),
        ej2:getCookie("ej2"),
        ej3:getCookie("ej3"),
        ej4:getCookie("ej4")
    }

    //console.log(cookie_data);
    client.create("room_battle",cookie_data).then(room => {
        console.log(room.sessionId, "joined", room.name);
        const displayLog = document.getElementsByTagName('h3');
        displayLog[0].innerHTML = `Conectado a:${room.sessionId}. Esperando jugadores ...`
    }).catch(e => {
        console.log("JOIN ERROR", e);
    });
}else if(getCookie("config").includes('2')){
  try {
    const room = await client.joinById(getCookie("roomID"), {/* options */});
    console.log("joined successfully", room); 
    const displayLog = document.getElementsByTagName('h3');
    displayLog[0].innerHTML = `Conectado a:${room.sessionId}. Esperando jugadores ...`
  } catch (e) {
    console.error("join error", e);
    show_modal("No se ha podido establecer una conexión con la sala. Es posible que ya no esté disponible. ERR:2001")
  }
}else{
  //Mostrar mensaje de error inesperado
  show_modal("No se puede establecer una conexión al servidor. Intenta de nuevo más tarde. ERR:1001")
  console.error("Unable to resolve game-command! Please allow cookies in your browser!")
}

function show_modal(code){
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
