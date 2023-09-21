import CartaConsumible from "../../cartas/CartaConsumible";

export default class MazoModel {
    mazo: CartaConsumible[];

    constructor() {
        this.mazo = [];
    }

    drawCard = ():CartaConsumible|void => {
        if (this.mazo.length == 0) return undefined
        else return this.mazo.pop()
    }

    insertCard = (Carta:CartaConsumible):void => {
        this.mazo.push(Carta);
    }
    
    cardCount = ():number => {
        return this.mazo.length;
    }

    setAll = (CardArray:Array<CartaConsumible>):void =>{
        this.mazo = CardArray;
        console.log("Iniciando Mazo");

        for (var i = this.mazo.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [this.mazo[i], this.mazo[rand]] = [this.mazo[rand], this.mazo[i]]
        }
        
        console.log(this.mazo);
    }
}