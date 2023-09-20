import TurnosView from "../view/TurnosView.js";

export default class TurnosController{

    private turno_actual = 0;

    constructor(private readonly vista:TurnosView){}

    public init():void{
        this.vista.init();
        setTimeout(() => this.vista.drawTurnData(this.turno_actual),3000);
    }

    updateTurnNumber = ():boolean =>{
        try{
            this.turno_actual ++;
            this.vista.drawTurnData(this.turno_actual);
            return true;
        }catch{
            return false;
        }
    }
}