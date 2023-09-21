export default class MazoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init = () => {
            this.view.init();
            this.view.cardNumber(this.model.cardCount);
        };
        this.updateMazoNumber = () => {
            this.view.cardNumber(this.model.cardCount);
        };
        this.setAllNewMazo = (cartas) => {
            this.model.setAll(cartas);
            this.updateMazoNumber();
        };
    }
}
