import inventarioController from "./controller.js";
import inventarioModel from "./model.js";
import inventarioVista from './view.js'

const inventarioControlador = new inventarioController(new inventarioModel(), new inventarioVista());
inventarioControlador.init();