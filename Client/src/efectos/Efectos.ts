/* 
    Bienvenido a los efectos de las cartas.

    Para representar el efecto que toma una carta dentro del juego
    se ha creado la siguiente interfaz:
    caso -1: suma o resta una estadística única de forma permanente
    Caso 0: Suma o resta una estadistica única por turnos determinados a un objetivo
    Caso 1: Compara dos estadísticas y está a favor de una para sumar o restar una estadistica única por turnos determinados a un objetivo
                [Stadististica a Favor, Estadistica 0, Estadistica 1, Estadistica a modificar].
    Caso 2: Afecta a dos estadísticas sumando o restando por tunos determinados a un obejetivo.
                Numero Efecto Estadistica: [#1,#2],  Efecto Estadística [Est.1,Est2]
    Caso 3: Solo toma efecto cuando se ha utilizado otra carta.
                Stat: [Estadistica Modificar, Operacion], Target: [obj,carta_verificar]
    Caso 4: Una estadistica se multiplica por un valor especifico durante un turno.
    caso 5: reflejar % de daño (reflect)
    Caso 6: aplicar una estadística según un requerimiento (tener en turno una carta específica)
*/


export default interface Efecto{
    caso:number,
    numero_efecto_estadistica: number|number[],
    efecto_estadistica: string|string[],
    target: string|string[],
    cantidad_turnos: number //Define el stack del efecto x turnos
}