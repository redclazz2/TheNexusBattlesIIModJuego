export default class controladorSalaEspera {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init = () => {
            console.log("Iniciando Controlador de Sala Espera");
            this.view.int();
            console.log("Controlador listo!");
        };
    }
}
