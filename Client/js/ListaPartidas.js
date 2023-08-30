let client = new  Colyseus.Client('ws://game.tnb2testing.com:3000/');

const functionBusqueda = async() =>{
    await client.getAvailableRooms("room_battle").then(rooms => {
        if(rooms.length > 0){
            rooms.forEach((room) => {
            console.log(room.roomId);
            console.log(room.clients);
            console.log(room.maxClients);
            console.log(room.metadata);
          });
        }else{
          console.log("NO DATA");
        }
      }).catch(e => {
          console.log("JOIN ERROR", e);
      });
}

const boton_actualizar = document.getElementById('btn_actualizar');
          boton_actualizar.addEventListener('click',functionBusqueda);

