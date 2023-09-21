import Carta from "./Carta.js";

export default interface CartaHeroe extends Carta{
        poder:number,
        vida:number,
        vidaActual:number,
        defensa:number,
        ataque_base: number,
        ataque_maximo: number, //Es el randomico de 1 a la propiedad
        daño_maximo:number, //Es el randomico de 1 a la propiedad
        modificador_daño_total:number  //en caso de que el output de daño tenga algún debuff
}