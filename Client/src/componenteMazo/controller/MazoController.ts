import MazoModel from "../model/MazoModel.js";
import MazoView from "../view/MazoView.js";

export default class MazoController {
    constructor(private readonly model: MazoModel, private readonly view: MazoView) {
        console.log('MazoController');
    }

    init = ():void => {
        this.view.init();
        this.view.cardNumber(this.model.cardCount);
    }
}