//Importa el cliente de colyseus
var client = new  Colyseus.Client('ws://game.tnb2testing.com:3000/');

//Lee la Cookie con la data para unirse o crear una sala
var name = "misDatos=",
      decoded_cookie = decodeURIComponent(document.cookie),
      carr = decoded_cookie.split(';'),
      data_cookie = "";

for(var i=0; i<carr.length;i++){
    var c = carr[i];
    while(c.charAt(0)==' '){
        c=c.substring(1);
    }
    if(c.indexOf(name) == 0) {
        data_cookie = c.substring(name.length, c.length);
    }
}
         
console.log(data_cookie);

client.joinOrCreate("room_battle",document.cookie).then(room => {
    console.log(room.sessionId, "joined", room.name);
}).catch(e => {
    console.log("JOIN ERROR", e);
});