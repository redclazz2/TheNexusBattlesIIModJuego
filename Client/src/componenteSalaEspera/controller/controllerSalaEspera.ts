import modelSalaEspera from "../model/modelSalaEspera.js";
import viewSalaEspera from "../view/viewSalaEspera.js";

export default class controladorSalaEspera{
    constructor(private readonly model:modelSalaEspera, private readonly view:viewSalaEspera){}

    init = ():void =>{
        console.log("Iniciando Controlador de Sala Espera");
        this.view.int();
        console.log("Controlador listo!");
    }
}