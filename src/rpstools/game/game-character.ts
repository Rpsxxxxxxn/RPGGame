import { Vector2 } from '../math-helper';
import { Main } from '../main';
import { Settings } from '../constants';
import { Rectangle, Sprite } from 'pixi.js';

export enum CharacterType {
    None,
    Player,
    Enemy,
    NPCItem,
    NPCQuestGuide,
    NPCWeapon
}

export class GameCharacter {
    private _sprite: Sprite = new Sprite;
    private _sourSize: number = 0;
    private _frameCount: number = 0;
    private _frameTime: number = 0;
    private _frameDirection: number = 0;
    private _charSelect: number = 0;
    private _swapTime: number = 250;
    private _swapLimit: number = 3;

    constructor() {
    }

    public setTexture(engine: Main, name: string, sourSize: number) {
        this._sourSize = sourSize;
        
        const charTexture = engine.getTexture(name);
        if (charTexture) {
            let cloneTexture = charTexture.clone();
            cloneTexture.frame = new Rectangle(0, 0, sourSize, sourSize);
            cloneTexture.updateUvs()
            this._sprite = new Sprite(cloneTexture);
            engine.addSceneChild(this._sprite);
        }
    }

    public selectCharacter(value: number) {
        this._charSelect = value * 3;
    }

    public setDirection(value: number) {
        this._frameDirection = value;
    }

    public setPosition(value: Vector2) {
        this._sprite.position.x = value.x;
        this._sprite.position.y = value.y;
    }

    public spriteAnimation(engine: Main) {
        this._frameTime += engine.getDeltaTime;

        this._sprite.texture.frame = new Rectangle(
            Settings.ChipSize * (this._frameCount + (this._charSelect % 12)),
            Settings.ChipSize * (this._frameDirection + (~~(this._charSelect / 12) * 4)),
            Settings.ChipSize, Settings.ChipSize);
        this._sprite.texture.updateUvs()

        if (this._frameTime > this._swapTime) {
            this._frameTime = 0;
            
            if (++this._frameCount >= this._swapLimit) {
                this._frameCount = 0;
            }
        }
    }
}