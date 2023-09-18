export default class MazoView {
    constructor() {
        this.init = () => {
            const divMazo = document.getElementById('mazo');
            divMazo.innerHTML = `
        <div class="v858_301">
        <div class="v858_299"></div>
        <div class="v858_305"></div>
        <div class="v858_300"></div>
        <div class="v858_302"></div>
        <span class="v858_303" id="count">Esperando...</span>
        `;
        };
        this.cardNumber = (getCartasNumber) => {
            const mynumber = document.getElementById('count');
            if (mynumber != null)
                mynumber.innerHTML = "Cartas restantes: " + getCartasNumber().toString();
        };
        console.log('MazoView');
    }
}
