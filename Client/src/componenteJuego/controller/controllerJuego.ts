import CartaHeroe from "../../cartas/CartaHeroe";
import modelJuego from "../model/modelJuego";
import viewJuego from "../view/viewJuego";

export default class controllerJuego{
    constructor(private readonly model:modelJuego,private readonly view:viewJuego){}

    init = (number_of_players:number):void  => {
        this.view.viewInit();
        this.view.hideExtraCards(number_of_players);
    }

    registerClient=(key:string,carta:CartaHeroe,componenteDiv:number):void =>{
        this.model.addPlayer(key,this.view.viewGetCardComponents(componenteDiv),carta);
    }

    updateCardValue = (playerSessionID:string,cartaHeroe:CartaHeroe):void =>{
        const ModelData = this.model.updateCard(playerSessionID,cartaHeroe);
        this.view.viewUpdateCard(ModelData[0],ModelData[1]);
    }
}