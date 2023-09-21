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
class InterpreteHandler {
    constructor() {
        //Definir la cola de efectos que lleva el cliente individualmente
        this.listaEfectos = [];
        //[Función para consumir una efecto]
        this.consumeEfecto = (efecto) => { };
        //[Función aplicar efectos al inicio de ronda]
        this.updateEfectos = () => { };
    }
}
//[Función ataque]
InterpreteHandler.atackObjective = (cartaLocal, cartaObjetivo, idObjetivo, controladorJuego) => {
    const ataque = cartaLocal.ataque_base + Math.floor(Math.random() * (cartaLocal.ataque_maximo - 1 + 1) + 1);
    console.log("LOGRE ATACAR? ");
    if (ataque > cartaObjetivo.defensa) {
        console.log("SI ");
        const daño = Math.floor(Math.random() * (cartaLocal.daño_maximo - 1 + 1) + 1) + cartaLocal.modificador_daño_total;
        console.log(daño);
        cartaObjetivo.vidaActual -= daño;
        controladorJuego.updateCardValue(idObjetivo, cartaObjetivo);
        controladorJuego.match_sync_set_card(idObjetivo, cartaObjetivo);
        controladorJuego.turn_action_pass();
    }
    else {
        console.log("NO");
        //Display en la interfaz un modal de que el daño no fué efectivo
    }
};
export default InterpreteHandler;
