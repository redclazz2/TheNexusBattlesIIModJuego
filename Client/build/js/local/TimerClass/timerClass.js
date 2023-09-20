export default class Timer {
    constructor(fn, t) {
        this.fn = fn;
        this.t = t;
        this.stop = function () {
            if (this.timerObj) {
                clearInterval(this.timerObj);
                this.timerObj = null;
            }
        };
        // start timer using current settings (if it's not already running)
        this.start = function () {
            if (!this.timerObj) {
                stop();
                timerObj = setInterval(this.fn, this.t);
            }
            return this;
        };
        this.timerObj =  = setInterval(this.fn, this.t);
    }
}
// start with new or original interval, stop current interval
this.reset = function (newT = t) {
    t = newT;
    return this.stop().start();
};
