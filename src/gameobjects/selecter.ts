import { Main } from '../rpstools/main';
import { GameObject, ObjectType } from '../rpstools/game/base-object';
import { Container } from 'pixi.js';
import { SelectOverlay, SelectType } from '../rpstools/game/select-overlay';

export class Selecter extends GameObject {
    private _container: Container = new Container;
    private _count: number = 0;

    constructor(engine: Main) {
        super(ObjectType.Overlays, engine.getObjectId, Selecter.name); 
    }

    public onInit(engine: Main): void {
        engine.createGraphics();
        engine.addMessageText('1');
        engine.addMessageText('2');
        engine.addMessageText('3');
        engine.setSelectText(0, 'ダンジョン');
        engine.setSelectText(1, 'ＰＶＰ');
        engine.setSelectText(2, 'もどる');
        // engine.changeVisible();
    }

    public onUpdate(engine: Main): void {

        // this._count += 1234;
        // this._select.addMessageText(this._count.toString());
    }

    public onDestroy(engine: Main): void {
    }
}