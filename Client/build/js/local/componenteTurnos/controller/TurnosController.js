export default class TurnosController {
    constructor(vista) {
        this.vista = vista;
        this.turno_actual = 1;
        this.updateTurnNumber = () => {
            try {
                this.turno_actual++;
                this.vista.drawTurnData(this.turno_actual);
                return true;
            }
            catch (_a) {
                return false;
            }
        };
    }
    init() {
        this.vista.init();
        setTimeout(() => this.vista.drawTurnData(this.turno_actual), 3000);
    }
}