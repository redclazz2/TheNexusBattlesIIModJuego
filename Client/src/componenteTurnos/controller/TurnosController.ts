import TurnosView from "../view/TurnosView.js";

export default class TurnosController{

    private turno_actual = 0;

    constructor(private readonly vista:TurnosView){}

    public init():void{
        this.vista.init();
        this.vista.drawTurnData(this.turno_actual);
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