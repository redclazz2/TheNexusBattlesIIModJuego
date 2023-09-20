export default class Timer{
    timerObj:any;

    constructor(private fn:any, private t:any){
        this.timerObj = = setInterval(this.fn, this.t);
    }

    stop = function():void {
        if (this.timerObj) {
            clearInterval(this.timerObj);
            this.timerObj = null;
        }
    }

    // start timer using current settings (if it's not already running)
    start = function() {
        if (!this.timerObj) {
            stop();
            timerObj = setInterval(this.fn, this.t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}