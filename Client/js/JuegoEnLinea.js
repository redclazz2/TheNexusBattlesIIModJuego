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

let client = new  Colyseus.Client('ws://game.tnb2testing.com:3000/'),
     cookie_data= "";

if(getCookie("config").includes('1')){
    cookie_data = {
        numero_creditos: getCookie("creditosValor"),
        numero_jugadores: getCookie("numJugadores"),
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
    //Codigo de unirse a una partida
}else{
  //Mostrar mensaje de error inesperado
  console.error("Unable to resolve game-command! Please allow cookies in your browser!")
}