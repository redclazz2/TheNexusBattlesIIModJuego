export default class MazoModel {
    mazo: string[];

    constructor() {
        console.log('MazoModel');
        this.mazo = [];
    }

    drawCard = ():string|void => {
        if (this.mazo.length == 0) return "-1"
        else return this.mazo.pop()
    }

    insertCard = (_id:string):void => {
        this.mazo.push(_id);
    }
    
    cardCount = ():number => {
        return this.mazo.length;
    }

    
}