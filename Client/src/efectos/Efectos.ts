/* 
    Bienvenido a los efectos de las cartas.

    Para representar el efecto que toma una carta dentro del juego
    se ha creado la siguiente interfaz:
    caso -1: suma o resta una estadística única de forma permanente
    Caso 0: Suma o resta una estadistica única por turnos determinados a un objetivo
    Caso 1: Compara dos estadísticas y etsá a favor de una para sumar o restar una estadistica única por turnos determinados a un objetivo
                [Stadististica a Favor, Estadistica 0, Estadistica 1, Estadistica a modificar].
    Caso 2: Afecta a dos estadísticas sumando o restando por tunos determinados a un obejetivo.
                Numero Efecto Estadistica: [#1,#2],  Efecto Estadística [Est.1,Est2]
    Caso 3: Solo toma efecto cuando se ha utilizado otra carta.
                Stat: [Estadistica Modificar, Operacion], Target: [obj,carta_verificar]
    Caso 4: Una estadistica se multiplica por un valor especifico durante un turno.
    caso 5: reflejar % de daño (reflect)
    Caso 6: aplicar una estadística según un requerimiento (tener en turno una carta específica)
*/

import CartaHeroe from "../cartas/CartaHeroe"

export default interface Efecto{
    caso:number,
    numero_efecto_estadistica: number|number[],
    efecto_estadistica: string|string[],
    target: string|string[],
    cantidad_turnos: number //Define el stack del efecto x turnos
}

export default interface EfectoAplicado{
    player:string,
    carta:CartaHeroe,
    efecto:Efecto
}

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
