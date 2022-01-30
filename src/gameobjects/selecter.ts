import { Main } from '../rpstools/main';
import { GameObject, ObjectType } from '../rpstools/game/base-object';
import { Container } from 'pixi.js';
import { SelectOverlay } from '../rpstools/game/select-overlay';

export class Selecter extends GameObject {
    private _container: Container = new Container;
    private _select: SelectOverlay = new SelectOverlay;
    private _count: number = 0;

    constructor(engine: Main) {
        super(ObjectType.Overlays, engine.getObjectId, Selecter.name); 
    }

    public onInit(engine: Main): void {
        // this._select.setTexture();
        this._select.addSelectText('ダンジョン');
        this._select.addSelectText('ＰＶＰ');
        this._select.addSelectText('もどる');
        this._select.createGraphics(engine);
        this._select.changeVisible();
        this._select.addMessageText('1');
        this._select.addMessageText('2');
        this._select.addMessageText('3');
        // this._select.addMessageText('4');
    }

    public onUpdate(engine: Main): void {
        let selected = this._select.selectIndex(engine);
        switch (selected) {
            case 0:
                break; 
            case 1:
                break; 
            case 2:
                this._select.changeVisible();
                break; 
        }

        // this._count += 1234;
        // this._select.addMessageText(this._count.toString());
    }

    public onDestroy(engine: Main): void {
    }
}