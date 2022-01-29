import * as PIXI from 'pixi.js'
import { GameObject, ObjectType } from "../rpstools/base-object";
import { Settings } from '../rpstools/constants';
import { Main } from '../rpstools/main';

export class FieldMap extends GameObject {
    // private _sprite: PIXI.Sprite = new PIXI.Sprite;
    private _mapchip: Array<Array<number>> = new Array<Array<number>>();

    constructor(engine: Main) {
        super(ObjectType.Field, engine.getObjectId, 'Map');
        // this._mapchip = [
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
        // ]
    }

    public onInit(engine: Main): void {
        let texture = engine.getTexture('./assets/images/town01.png');
        if (texture) {
            for (let x = 0; x < 18; x++) {
                for (let y = 0; y < 12; y++) {
                    let sourX = 0;
                    let sourY = 0;
                    let texClone = texture.clone();
                    texClone.frame = new PIXI.Rectangle(sourX * 32, sourY * 32, 32, 32);
                    texClone.updateUvs()
                    let sprite = new PIXI.Sprite(texClone);
                    sprite.position.x = x * Settings.ChipSize;
                    sprite.position.y = y * Settings.ChipSize;
                    sprite.scale.set(1.5, 1.5);
                    engine.addChild(sprite);
                }
            }
            for (let x = 0; x < 18; x++) {
                for (let y = 0; y < 12; y++) {
                    let num = 79;
                    let sourX = 0;
                    let sourY = 0;
                    if (x === 0 || y === 0 || x === 17 || y === 11) {
                        sourX = ~~(num % 8);
                        sourY = ~~(num / 8);
                        let texClone = texture.clone();
                        texClone.frame = new PIXI.Rectangle(sourX * 32, sourY * 32, 32, 32);
                        texClone.updateUvs()
                        let sprite = new PIXI.Sprite(texClone);
                        sprite.position.x = x * Settings.ChipSize;
                        sprite.position.y = y * Settings.ChipSize;
                        sprite.scale.set(1.5, 1.5);
                        engine.addChild(sprite);
                    }
                }
            }
        }
    }

    public onUpdate(engine: Main): void {
    }
}