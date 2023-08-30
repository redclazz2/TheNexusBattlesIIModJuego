let client = new Colyseus.Client('ws://game.tnb2testing.com:3000/');

//Tabla en html donde se guardan las filas
const table = document.querySelector(".tabla");
const functionBusqueda = async () => {
  try {
    // Seleccionar todos los elementos con la clase "fila" y eliminarlos
    const filas = document.querySelectorAll('.fila');
    filas.forEach(row => row.remove());

    await client.getAvailableRooms("room_battle").then(rooms => {
      if (rooms.length > 0) {
        rooms.forEach(room => {
          /*console.log(room.roomId);
          console.log(room.clients);
          console.log(room.maxClients);
          console.log(room.metadata);*/
          //Div con clase fila donde se guardara la informacion de la partida
          const tableItem = document.createElement("div");
          tableItem.classList.add("fila");

          tableItem.innerHTML = `
            <div class="columna nombreP">${room.roomId}</div>
            <div class="columna">${room.clients}/${room.maxClients}</div>
            <div class="columna">${room.metadata.ganacia}</div>
            <div class="columna"><button>Join</button></div>
          `;
          //Div fila se guarda en la tabla
          table.appendChild(tableItem);
        });
      } else {
        console.log("NO DATA");
      }
    }).catch(e => {
      console.log("JOIN ERROR", e);
    });
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
};

const boton_actualizar = document.getElementById('btn_actualizar');
boton_actualizar.addEventListener('click', functionBusqueda);