import CartaHeroe from "../cartas/CartaHeroe.js";
import Efecto from "./Efectos.js";

export default interface EfectoAplicado{
    player:string,
    carta:CartaHeroe,
    efecto:Efecto
}