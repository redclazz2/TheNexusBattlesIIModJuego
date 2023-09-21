export default class UMCmodel {
    constructor(listaEfectos) {
        this.getAll = () => {
            return this.listaEffectos;
        };
        this.listaEffectos = listaEfectos;
    }
}
