export default class InventarioController {
  inventarioModelo;
  inventarioView;
  cartasSeleccionadas = []

  constructor(model: any, view: any) {
    this.inventarioModelo = model;
    this.inventarioView = view;
    this.cartasSeleccionadas = [];
  }

  init = async (funcionIniciarJuego:(mazo:Array<any>)=>void) => {
    this.inventarioView.init();

    try {
      const cartas = await this.getInventario();
      this.inventarioView.llenarCartasEnHTML(cartas,this.cartasSeleccionadas);

      this.inventarioView.iniciarBtn.addEventListener('click', () => {
        if (this.inventarioView.cartasSeleccionadas >= 10) {
          alert('Guardando Cartas Seleccionadas');
          
          console.log("Mapa maestro de cartas:")
          console.log(this.inventarioModelo.getMasterMap());
          
          console.log("Cartas Seleccionadas: ")
          console.log(this.cartasSeleccionadas);
          
          console.log("Mazo: ")
          const mazo = this.inventarioModelo.autoCompletePlayerSelection(this.cartasSeleccionadas)
          console.log(mazo)

          console.log("----------Iniciando Juego-----------");
          funcionIniciarJuego(mazo);
        } else {
          alert('Debes seleccionar 10 cartas para iniciar el juego');
        }
      });
    } catch (error) {
      console.error('Error al cargar el inventario:', error);
    }
  };

  getInventario = async () => {
    const cartas = await this.inventarioModelo.getUserInventory();
    return Promise.all(cartas);
  };
}