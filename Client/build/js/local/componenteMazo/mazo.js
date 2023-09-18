import MazoController from "./controller/MazoController.js";
import MazoModel from "./model/MazoModel.js";
import MazoView from "./view/MazoView.js";
const compMazoController = new MazoController(new MazoModel(), new MazoView());
compMazoController.init();
