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
    constructor() {
        //Definir la cola de efectos que lleva el cliente individualmente
        this.listaEfectos = [];
        //[Función ataque]
        this.atackObjective = (cartaLocal, cartaObjetivo, idObjetivo, controladorJuego) => {
            const ataque = cartaLocal.ataque_base + Math.floor(Math.random() * (cartaLocal.ataque_maximo - 1 + 1) + 1);
            if (ataque > cartaObjetivo.defensa) {
                const daño = Math.floor(Math.random() * (cartaLocal.daño_maximo - 1 + 1) + 1) + cartaLocal.modificador_daño_total;
                cartaObjetivo.vida -= daño;
                controladorJuego.updateCardValue(idObjetivo, cartaObjetivo);
            }
            else {
                //Display en la interfaz un modal de que el daño no fué efectivo
            }
        };
        //[Función para consumir una efecto]
        this.consumeEfecto = (efecto) => { };
        //[Función aplicar efectos al inicio de ronda]
        this.updateEfectos = () => { };
    }
}
