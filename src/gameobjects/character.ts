import * as PIXI from 'pixi.js'
import { BaseObject, ObjectType } from '../rpstools/base-object';

export class Character extends BaseObject {
    private _graphics: PIXI.Graphics;

    constructor() {
        super(ObjectType.Character);
        this._graphics = new PIXI.Graphics();
    }


}