export default class MazoModel {
    constructor() {
        this.drawCard = () => {
            if (this.mazo.length == 0)
                return undefined;
            else
                return this.mazo.pop();
        };
        this.insertCard = (Carta) => {
            this.mazo.push(Carta);
        };
        this.cardCount = () => {
            return this.mazo.length;
        };
        this.setAll = (CardArray) => {
            this.mazo = CardArray;
            console.log("Iniciando Mazo");
            for (var i = this.mazo.length - 1; i > 0; i--) {
                var rand = Math.floor(Math.random() * (i + 1));
                [this.mazo[i], this.mazo[rand]] = [this.mazo[rand], this.mazo[i]];
            }
            console.log(this.mazo);
        };
        this.mazo = [];
    }
}
