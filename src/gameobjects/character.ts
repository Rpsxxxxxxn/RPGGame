import * as PIXI from 'pixi.js'
import { GameObject, ObjectType } from '../rpstools/base-object';
import { Main } from '../rpstools/main';

export class Character extends GameObject {
    private _sprite: PIXI.Sprite = new PIXI.Sprite();
    private _graphics: PIXI.Graphics = new PIXI.Graphics();

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Character.name);
    }

    public onInit(engine: Main): void {
        const charTexture = engine.getTexture('./assets/images/char01.png');
        if (charTexture) {
            this._sprite = new PIXI.Sprite(charTexture);
        }
        engine.addChild(this._sprite);
    }

    public onUpdate(engine: Main): void {
        
    }
}