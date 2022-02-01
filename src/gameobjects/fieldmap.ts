import { GameField } from '../rpstools/game/game-field';
import { GameObject, ObjectType } from "../rpstools/game/base-object";
import { Main } from '../rpstools/main';
import { MapStage } from '../rpstools/assets-manager';

export class FieldMap extends GameObject {
    private _field: GameField = new GameField();

    constructor(engine: Main) {
        super(ObjectType.Field, engine.getObjectId, 'Map');
        this._field.setMapData(engine, MapStage.Town);
    }

    public onInit(engine: Main): void {
        this._field.setTexture(engine, './assets/images/town01.png', 32);
    }

    public onUpdate(engine: Main): void {
    }

    public onDestroy(engine: Main): void {
        
    }
}