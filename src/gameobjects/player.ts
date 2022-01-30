import { MapData } from './../rpstools/constants';
import * as PIXI from 'pixi.js'
import { Vector2 } from '../rpstools/math-helper';
import { KeyCode } from '../rpstools/controller';
import { GameObject, ObjectType } from '../rpstools/base-object';
import { Main } from '../rpstools/main';
import { Character, Settings } from '../rpstools/constants';
import { GameCharacter } from '../rpstools/game-character';
import { DebugText } from '../rpstools/debug-text';

export class Player extends GameObject {
    private _character: GameCharacter = new GameCharacter();
    private _debugText: DebugText = new DebugText();
    private _position: Vector2 = new Vector2();
    private _direction: Vector2 = new Vector2();
    private _walkSpeed: number = 2;

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Player.name);
        this._position.x = Character.PlayerStartPosX;
        this._position.y = Character.PlayerStartPosY;
        this._direction.x = 0;
        this._direction.y = 0;
    }

    public onInit(engine: Main): void {
        this._character.setTexture(engine, './assets/images/char01.png', Settings.ChipSize);
        this._character.selectCharacter(2);
        engine.addText(this._debugText);
    }

    public onUpdate(engine: Main): void {
        this.playerControl(engine);
        this._character.setPosition(this._position);
        this._character.spriteAnimation(engine);
    }

    private playerControl(engine: Main): void {
        this._debugText.setText = `Player x:${this._position.x} y:${this._position.y}`;

        if (this._position.x % Settings.ChipSize === 0 && this._position.y % Settings.ChipSize === 0) {
            this._direction.x = 0;
            this._direction.y = 0;

            if (engine.getKeyDown(KeyCode.up)) {
                this._character.setDirection(3);
                this._direction.y = -1;
            } else if (engine.getKeyDown(KeyCode.down)) {
                this._character.setDirection(0);
                this._direction.y = 1;
            } else if (engine.getKeyDown(KeyCode.left)) {
                this._character.setDirection(1);
                this._direction.x = -1;
            } else if (engine.getKeyDown(KeyCode.right)) {
                this._character.setDirection(2);
                this._direction.x = 1;
            }

            this._position.x += this._direction.x * this._walkSpeed;
            this._position.y += this._direction.y * this._walkSpeed;
        } else {
            this._position.x += this._direction.x * this._walkSpeed;
            this._position.y += this._direction.y * this._walkSpeed;
        }
    }

    private wallCheck(direction: number): boolean {
        return (
            true
        )
    }
}