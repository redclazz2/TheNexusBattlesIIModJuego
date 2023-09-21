import CartaConsumible from "../../cartas/CartaConsumible";

export default class UMCmodel{
    public listaEffectos:CartaConsumible[];

    constructor(listaEfectos:CartaConsumible[]){
        this.listaEffectos = listaEfectos;
    }

    getAll = ():CartaConsumible[]=>{
        return this.listaEffectos;
    }
}