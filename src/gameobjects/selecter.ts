import { Main } from '../rpstools/main';
import { GameObject, ObjectType } from '../rpstools/game/base-object';
import { Container } from 'pixi.js';
import { SelectOverlay } from '../rpstools/game/select-overlay';

export class Selecter extends GameObject {
    private _container: Container = new Container;
    private _select: SelectOverlay = new SelectOverlay;

    constructor(engine: Main) {
        super(ObjectType.Overlays, engine.getObjectId, Selecter.name); 
    }

    public onInit(engine: Main): void {
        // this._select.setTexture();
        this._select.addText('ダンジョン');
        this._select.addText('ＰＶＰ');
        this._select.addText('もどる');
        this._select.createGraphics(engine);
        this._select.changeVisible();
    }

    public onUpdate(engine: Main): void {
        let selected = this._select.selectIndex(engine);
        switch (selected) {
            case 0:

                // console.log("kek")
                break; 
            case 1:

                // console.log("aek")
                break; 
            case 2:
                this._select.changeVisible();
                // console.log("hek")
                break; 
        }
        // console.log("")
    }

    public onDestroy(engine: Main): void {
    }
}