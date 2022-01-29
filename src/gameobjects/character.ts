import { KeyCode } from './../rpstools/controller';
import * as PIXI from 'pixi.js'
import { GameObject, ObjectType } from '../rpstools/base-object';
import { Main } from '../rpstools/main';

export class Character extends GameObject {
    private _sprite: PIXI.Sprite = new PIXI.Sprite();
    private _graphics: PIXI.Graphics = new PIXI.Graphics();
    private _frameCount: number = 0;
    private _frameTime: number = 0;
    private _frameDirection: number = 0;
    private _position: Float32Array = new Float32Array(2);

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Character.name);
        this._position[0] = 0;
        this._position[1] = 0;
    }

    public onInit(engine: Main): void {
        const charTexture = engine.getTexture('./assets/images/char01.png');
        if (charTexture) {
            charTexture.frame = new PIXI.Rectangle(0, 0, 48, 48);
            charTexture.updateUvs()
            this._sprite = new PIXI.Sprite(charTexture);
        }
        engine.addChild(this._sprite);
    }

    public onUpdate(engine: Main): void {
        this.playerControl(engine);
        this.spriteAnimation(engine);
    }

    private playerControl(engine: Main): void {
        if (engine.getKeyDown(KeyCode.up)) {
            this._frameDirection = 3;
        }
        if (engine.getKeyDown(KeyCode.down)) {
            this._frameDirection = 0;
        }
        if (engine.getKeyDown(KeyCode.left)) {
            this._frameDirection = 1;
        }
        if (engine.getKeyDown(KeyCode.right)) {
            this._frameDirection = 2;
        }
    }

    private spriteAnimation(engine: Main) {
        this._frameTime += engine.getDeltaTime;

        this._sprite.texture.frame = new PIXI.Rectangle(48 * this._frameCount, 48 * this._frameDirection, 48, 48);
        this._sprite.texture.updateUvs()

        if (this._frameTime > 250) {
            this._frameTime = 0;
            if (++this._frameCount >= 3) {
                this._frameCount = 0;
            }
        }
    }
}