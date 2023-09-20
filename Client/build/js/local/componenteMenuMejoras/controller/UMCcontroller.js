export default class UMCcontroller {
    constructor(model, view) {
        this.init = () => {
            this.view.render(this.model.getAll());
        };
        this.model = model;
        this.view = view;
    }
}
