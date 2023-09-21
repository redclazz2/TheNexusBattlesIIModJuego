import CartaConsumible from "../../cartas/CartaConsumible.js";
import CartaHeroe from "../../cartas/CartaHeroe.js";
import controllerJuego from "../../componenteJuego/controller/controllerJuego.js";
import EfectoAplicado from "../../efectos/efectoAplicado.js";

///0. ataque inputs: [CartaLocal,CartaObjetivo]
///0. Aplica el daño
///0. luego de calcular el ataque se hace update de la CartaObjetivo al backend

//1. al inicio de nuevo turno --- verificar la cola de efectos - aplica la estadística []EfectoAplicado
//1. si el efecto se acaba esa ronda y hay estadísticas alteradas, revertirlas (excepto la vida)
//1. Update al backend

//2. Consumir un efecto [CartaLocal,CartaObjetivo]
//2. Validar los casos
//2. al consumir un efecto de stack, en ese mismo turno al final se consume 1 carga y c resta al turno
//Subir al backend
export default class InterpreteHandler {
    //Definir la cola de efectos que lleva el cliente individualmente
    listaEfectos:EfectoAplicado[] = [];

    //[Función ataque]
    static atackObjective = (cartaLocal:CartaHeroe,cartaObjetivo:CartaHeroe,idObjetivo:string,controladorJuego:controllerJuego,localID:string):void=>{
        const ataque:number = cartaLocal.ataque_base + Math.floor(Math.random() * (cartaLocal.ataque_maximo - 1 + 1) + 1);
        console.log("LOGRE ATACAR? ");
        if (ataque > cartaObjetivo.defensa) {
            console.log("SI ");
            const daño = Math.floor(Math.random() * (cartaLocal.daño_maximo - 1 + 1) + 1) + cartaLocal.modificador_daño_total;
            console.log(daño);
            cartaObjetivo.vidaActual -=daño;
            cartaLocal.dano_efectivo = daño;

            //Actualiza carta rival
            controladorJuego.updateCardValue(idObjetivo,cartaObjetivo);
            controladorJuego.match_sync_set_card(idObjetivo,cartaObjetivo);

            //Actualiza la actual con el daño
            controladorJuego.updateCardValue(localID,cartaLocal);
            controladorJuego.match_sync_set_card(localID,cartaLocal);

            controladorJuego.turn_action_pass();
        }else{
            console.log("NO");
            //Display en la interfaz un modal de que el daño no fué efectivo
        }
    }

    //[Función para consumir una efecto]
    consumeEfecto = (efecto:CartaConsumible,):void=>{}
    
    //[Función aplicar efectos al inicio de ronda]
    updateEfectos = ():void=>{}

}