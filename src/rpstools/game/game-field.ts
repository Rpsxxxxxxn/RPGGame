import { Vector2 } from '../math-helper';
import { Main } from '../main';
import { Settings, Field, MapInfo } from '../constants';
import { Rectangle, Sprite } from 'pixi.js';

export interface FieldInfo {
    select: number,
    sprite: Sprite
}

export class GameField {
    private _fieldScale = 1;
    private _mapinfo: any;

    constructor() {
        
    }

    setMapData(engine: Main, textureName: string) {
        let mapinfo = engine.getMapJson(textureName);
        if (mapinfo) {
            this._mapinfo = mapinfo;
            console.log(this._mapinfo)
        }
    }

    setTexture(engine: Main, textureName: string, sourSize: number) {
        this._fieldScale = Settings.ChipSize / sourSize;
        
        let readIndex: number = 0;
        let texture = engine.getTexture(textureName);
        if (texture) {
            // レイヤー
            for (let info of this._mapinfo.data) {
                readIndex = 0;
                for (let y = 0; y < Field.Height; y++) {
                    for (let x = 0; x < Field.Width; x++) {
                        let mapNum = info.map[readIndex++] - 1;
                        if (mapNum < 0) {
                            continue;
                        }

                        let sourX = ~~(mapNum % 8);
                        let sourY = ~~(mapNum / 8);
                        let cloneTexture = texture.clone();
                        cloneTexture.frame = new Rectangle(sourX * sourSize, sourY * sourSize, sourSize, sourSize);
                        cloneTexture.updateUvs()
                        let sprite = new Sprite(cloneTexture);
                        sprite.position.x = x * Settings.ChipSize;
                        sprite.position.y = y * Settings.ChipSize;
                        sprite.scale.set(this._fieldScale, this._fieldScale);
                        engine.addChild(sprite);
                    }
                }
            }
        }
    }
}