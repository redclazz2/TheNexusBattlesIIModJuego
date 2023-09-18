import controladorSalaEspera from "./componenteSalaEspera/controller/controllerSalaEspera.js";
import modelSalaEspera from "./componenteSalaEspera/model/modelSalaEspera.js";
import viewSalaEspera from "./componenteSalaEspera/view/viewSalaEspera.js";
const sala_espera_controller = new controladorSalaEspera(new modelSalaEspera(), new viewSalaEspera());
sala_espera_controller.init();
