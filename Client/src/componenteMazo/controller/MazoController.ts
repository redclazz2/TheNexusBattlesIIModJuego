import CartaConsumible from "../../cartas/CartaConsumible.js";
import MazoModel from "../model/MazoModel.js";
import MazoView from "../view/MazoView.js";

export default class MazoController {
    constructor(private readonly model: MazoModel, private readonly view: MazoView) {}

    init = ():void => {
        this.view.init();
        this.view.cardNumber(this.model.cardCount);
    }

    updateMazoNumber = ():void =>{
        this.view.cardNumber(this.model.cardCount);
    }

    setAllNewMazo = (cartas:Array<CartaConsumible>):void =>{
        this.model.setAll(cartas);
        this.updateMazoNumber();
    }
}