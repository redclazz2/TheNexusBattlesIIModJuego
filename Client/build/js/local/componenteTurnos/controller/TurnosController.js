export default class TurnosController {
    constructor(vista) {
        this.vista = vista;
        this.turno_actual = 0;
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
    }
}
