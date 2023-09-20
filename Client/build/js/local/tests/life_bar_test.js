import controllerJuego from "../componenteJuego/controller/controllerJuego.js";
import modelJuego from "../componenteJuego/model/modelJuego.js";
import viewJuego from "../componenteJuego/view/viewJuego.js";
const index = new controllerJuego(new modelJuego(), new viewJuego());
index.init(4);
index.registerClient("hola", {
    vidaActual: 10,
    tipo_heroe: "ARMAS",
    vida: 10,
    defensa: 1,
    ataque_base: 1,
    poder: 1,
    ataque_maximo: 1,
    daño_maximo: 1,
    descripcion: "xd"
}, 0);
index.updateCardValue("hola", {
    vidaActual: 2,
    tipo_heroe: "ARMAS",
    vida: 10,
    defensa: 1,
    ataque_base: 1,
    poder: 1,
    ataque_maximo: 1,
    daño_maximo: 1,
    descripcion: "xd"
});
