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
        // engine.changeVisible();
    }

    public onUpdate(engine: Main): void {

        // this._count += 1234;
        // this._select.addMessageText(this._count.toString());
    }

    public onDestroy(engine: Main): void {
    }
}