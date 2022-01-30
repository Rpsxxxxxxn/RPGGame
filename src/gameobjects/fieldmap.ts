import { GameField } from './../rpstools/game-field';
import * as PIXI from 'pixi.js'
import { GameObject, ObjectType } from "../rpstools/base-object";
import { Settings } from '../rpstools/constants';
import { Main } from '../rpstools/main';

export class FieldMap extends GameObject {
    private _field: GameField = new GameField();

    constructor(engine: Main) {
        super(ObjectType.Field, engine.getObjectId, 'Map');
        this._field.setMapData(engine, './assets/json/town1.json');
    }

    public onInit(engine: Main): void {
        this._field.setTexture(engine, './assets/images/town01.png', 32);
    }

    public onUpdate(engine: Main): void {
    }

    public onDestroy(engine: Main): void {
        
    }
}