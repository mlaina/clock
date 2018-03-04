export class Main {
    constructor() {
        this.view = {
            eBtnMenuMob: document.querySelector('#menuBtn'),
        }
        this.view.eBtnMenuMob.addEventListener('click', this.desplegarMenu.bind(this), false);
        this.view.eBtnSug ? this.vista.eBtnSug.addEventListener('click', this.desplegarFormSug.bind(this), false) : null;

    }
}