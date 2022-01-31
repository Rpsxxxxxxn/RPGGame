import { Main } from '../rpstools/main';
import { GameObject, ObjectType } from '../rpstools/game/base-object';
import { Container } from 'pixi.js';
import { SelectOverlay, SelectType } from '../rpstools/game/select-overlay';

export class Selecter extends GameObject {
    private _container: Container = new Container;
    private _battleSelect: SelectOverlay = new SelectOverlay;
    private _questSelect: SelectOverlay = new SelectOverlay;
    private _weaponSelect: SelectOverlay = new SelectOverlay;
    private _itemSelect: SelectOverlay = new SelectOverlay;
    private _count: number = 0;

    constructor(engine: Main) {
        super(ObjectType.Overlays, engine.getObjectId, Selecter.name); 
    }

    public onInit(engine: Main): void {
        this._questSelect.createGraphics(engine);
        this._questSelect.addMessageText('1');
        this._questSelect.addMessageText('2');
        this._questSelect.addMessageText('3');
        this._questSelect.setSelectText(0, 'ダンジョン');
        this._questSelect.setSelectText(1, 'ＰＶＰ');
        this._questSelect.setSelectText(2, 'もどる');
        this._questSelect.changeVisible();
    }

    public onUpdate(engine: Main): void {
        let selected = this._questSelect.selectIndex(engine);
        switch (selected) {
            case SelectType.Select1:
                break; 
            case SelectType.Select2:
                break;
        }

        // this._count += 1234;
        // this._select.addMessageText(this._count.toString());
    }

    public onDestroy(engine: Main): void {
    }
}