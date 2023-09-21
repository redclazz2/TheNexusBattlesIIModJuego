var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class InventarioController {
    constructor(model, view) {
        this.cartasSeleccionadas = [];
        this.init = (funcionIniciarJuego) => __awaiter(this, void 0, void 0, function* () {
            this.inventarioView.init();
            try {
                const cartas = yield this.getInventario();
                this.inventarioView.llenarCartasEnHTML(cartas, this.cartasSeleccionadas);
                this.inventarioView.iniciarBtn.addEventListener('click', () => {
                    if (this.inventarioView.cartasSeleccionadas >= 10) {
                        //alert('Guardando Cartas Seleccionadas');
                        //console.log("Mapa maestro de cartas:")
                        //console.log(this.inventarioModelo.getMasterMap());
                        //console.log("Cartas Seleccionadas: ")
                        //console.log(this.cartasSeleccionadas);
                        // console.log("Mazo: ")
                        const mazo = this.inventarioModelo.autoCompletePlayerSelection(this.cartasSeleccionadas);
                        // console.log(mazo)
                        //console.log("----------Iniciando Juego-----------");
                        funcionIniciarJuego(mazo);
                    }
                    else {
                        alert('Debes seleccionar 10 cartas para iniciar el juego');
                    }
                });
            }
            catch (error) {
                console.error('Error al cargar el inventario:', error);
            }
        });
        this.getInventario = () => __awaiter(this, void 0, void 0, function* () {
            const cartas = yield this.inventarioModelo.getUserInventory();
            return Promise.all(cartas);
        });
        this.inventarioModelo = model;
        this.inventarioView = view;
        this.cartasSeleccionadas = [];
    }
}
