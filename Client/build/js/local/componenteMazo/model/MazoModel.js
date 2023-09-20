export default class MazoModel {
    constructor() {
        this.drawCard = () => {
            if (this.mazo.length == 0)
                return "-1";
            else
                return this.mazo.pop();
        };
        this.insertCard = (_id) => {
            this.mazo.push(_id);
        };
        this.cardCount = () => {
            return this.mazo.length;
        };
        this.mazo = [];
    }
}
