import UMCmodel from "../model/UMCmodel.js";
import UMCview from "../view/UMCview.js";

export default class UMCcontroller{
    private model:UMCmodel;
    private view:UMCview;

    constructor( model:UMCmodel, view:UMCview){
        this.model = model;
        this.view = view;
    }

    init = ()=>{
        this.view.render(this.model.getAll())
    }
}