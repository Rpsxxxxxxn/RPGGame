import * as PIXI from 'pixi.js'
import { KeyCode } from './../rpstools/controller';
import { GameObject, ObjectType } from '../rpstools/base-object';
import { Main } from '../rpstools/main';
import { Settings } from '../rpstools/constants';

export class Character extends GameObject {
    private _sprite: PIXI.Sprite = new PIXI.Sprite();
    private _graphics: PIXI.Graphics = new PIXI.Graphics();
    private _frameCount: number = 0;
    private _frameTime: number = 0;
    private _frameDirection: number = 0;
    private _position: Float32Array = new Float32Array(2);
    private _direction: Float32Array = new Float32Array(2);
    private _walkSpeed: number = 2;

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Character.name);
        this._position[0] = 0;
        this._position[1] = 0;
        this._direction[0] = 0;
        this._direction[1] = 0;
        
    }

    public onInit(engine: Main): void {
        const charTexture = engine.getTexture('./assets/images/char01.png');
        if (charTexture) {
            charTexture.frame = new PIXI.Rectangle(0, 0, Settings.ChipSize, Settings.ChipSize);
            charTexture.updateUvs()
            this._sprite = new PIXI.Sprite(charTexture);
            engine.addChild(this._sprite);
        }
    }

    public onUpdate(engine: Main): void {
        this.playerControl(engine);
        this.spriteAnimation(engine);
    }

    private playerControl(engine: Main): void {
        if (this._position[0] % Settings.ChipSize === 0 || this._position[1] % Settings.ChipSize === 0) {
            this._direction[0] = 0;
            this._direction[1] = 0;

            if (engine.getKeyDown(KeyCode.up)) {
                this._frameDirection = 3;
                this._direction[1] = -1;
            }
            if (engine.getKeyDown(KeyCode.down)) {
                this._frameDirection = 0;
                this._direction[1] = 1;
            }
            if (engine.getKeyDown(KeyCode.left)) {
                this._frameDirection = 1;
                this._direction[0] = -1;
            }
            if (engine.getKeyDown(KeyCode.right)) {
                this._frameDirection = 2;
                this._direction[0] = 1;
            }

            this._position[0] += this._direction[0] * this._walkSpeed;
            this._position[1] += this._direction[1] * this._walkSpeed;
        } else {
            this._position[0] += this._direction[0] * this._walkSpeed;
            this._position[1] += this._direction[1] * this._walkSpeed;
        }
    }

    private spriteAnimation(engine: Main) {
        this._frameTime += engine.getDeltaTime;

        this._sprite.texture.frame = new PIXI.Rectangle(Settings.ChipSize * this._frameCount, Settings.ChipSize * this._frameDirection, Settings.ChipSize, Settings.ChipSize);
        this._sprite.texture.updateUvs()

        this._sprite.position.x = this._position[0];
        this._sprite.position.y = this._position[1];

        if (this._frameTime > 250) {
            this._frameTime = 0;
            if (++this._frameCount >= 3) {
                this._frameCount = 0;
            }
        }
    }
}