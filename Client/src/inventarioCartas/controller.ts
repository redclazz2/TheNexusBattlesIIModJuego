export default class InventarioController {
  inventarioModelo;
  inventarioView;
  cartasSeleccionadas = []

  constructor(model: any, view: any) {
    this.inventarioModelo = model;
    this.inventarioView = view;
    this.cartasSeleccionadas = [];
  }

  init = async () => {
    this.inventarioView.init();

    try {
      const cartas = await this.getInventario();
      this.inventarioView.llenarCartasEnHTML(cartas);

      this.inventarioView.iniciarBtn.addEventListener('click', () => {
        if (this.inventarioView.cartasSeleccionadas >= 10) {
          alert('Guardando Cartas Seleccionadas');

          //funcion para guardar las cartas (Index de cartas)
          //y autocompletado.

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