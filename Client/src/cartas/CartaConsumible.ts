import Efecto from "../efectos/Efectos.js";
import Carta from "./Carta.js";

/*
        Carta consumible representa a las armaduras, armas y cartas épicas.
        Armas y armaduras pueden utilizar solo la primera propiedad efecto.
        Las cartas épicas pueden utilizar el efecto héroe.
*/

export default interface CartaConsumible extends Carta{
        efecto:Efecto,
        efecto_heroe:Efecto|null
}