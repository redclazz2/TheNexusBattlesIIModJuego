export default class MazoView {
    constructor() {
        console.log('MazoView');
    }

    init = ():void => {
        const divMazo = document.getElementById('mazo') as HTMLDivElement;
        divMazo.innerHTML = `
        <div class="v858_301">
        <div class="v858_299"></div>
        <div class="v858_305"></div>
        <div class="v858_300"></div>
        <div class="v858_302"></div>
        <span class="v858_303" id="count">Esperando...</span>
        `

    }

    cardNumber = (getCartasNumber:() => number):void => {
        const mynumber = document.getElementById('count') as HTMLSpanElement;
        if (mynumber != null) mynumber.innerHTML = "Cartas restantes: " + getCartasNumber().toString();
        
    }
}