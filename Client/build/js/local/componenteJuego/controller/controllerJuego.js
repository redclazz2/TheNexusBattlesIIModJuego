export default class controllerJuego {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init = (number_of_players) => {
            this.view.viewInit();
            this.view.hideExtraCards(number_of_players);
        };
        this.registerClient = (key, carta, componenteDiv) => {
            this.model.addPlayer(key, this.view.viewGetCardComponents(componenteDiv), carta);
        };
        this.updateCardValue = (playerSessionID, cartaHeroe) => {
            const ModelData = this.model.updateCard(playerSessionID, cartaHeroe);
            this.view.viewUpdateCard(ModelData[0], ModelData[1]);
        };
    }
}
