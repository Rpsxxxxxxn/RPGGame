import { Vector2 } from './../rpstools/math-helper';
import * as PIXI from 'pixi.js'
import { DebugText } from './../rpstools/debug-text';
import { GameCharacter } from './../rpstools/game-character';
import { Main } from './../rpstools/main';
import { GameObject, ObjectType } from './../rpstools/base-object';
import { Settings } from '../rpstools/constants';

export class Enemy extends GameObject {
    private _character: GameCharacter = new GameCharacter();
    private _debugText: DebugText = new DebugText;
    private _position: Vector2 = new Vector2();
    private _direction: Vector2 = new Vector2();

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Enemy.name);
    }
    
    public onInit(engine: Main): void {
        this._character.setTexture(engine, './assets/images/char01.png', Settings.ChipSize);
        this._character.selectCharacter(5);
        engine.addText(this._debugText);
    }

    public onUpdate(engine: Main): void {
        // this._debugText.setText = `${Enemy.name} x:${this._position.x} y:${this._position.y}`;

        this._character.setPosition(this._position);
        this._character.spriteAnimation(engine);
    }

    public onDestroy(engine: Main): void {
        
    }
}