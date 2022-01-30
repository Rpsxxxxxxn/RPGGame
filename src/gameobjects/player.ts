import { SelectOverlay } from './../rpstools/game/select-overlay';
import { MapData, Field } from './../rpstools/constants';
import { Vector2 } from '../rpstools/math-helper';
import { KeyCode } from '../rpstools/controller';
import { GameObject, ObjectType } from '../rpstools/game/base-object';
import { Main } from '../rpstools/main';
import { Character, Settings } from '../rpstools/constants';
import { GameCharacter } from '../rpstools/game/game-character';
import { DebugText } from '../rpstools/debug-text';

export class Player extends GameObject {
    private _character: GameCharacter = new GameCharacter();
    private _debugText: DebugText = new DebugText();
    private _position: Vector2 = new Vector2();
    private _direction: Vector2 = new Vector2();
    private _walkSpeed: number = 2;
    private _questSelect: SelectOverlay = new SelectOverlay;
    private _weaponSelect: SelectOverlay = new SelectOverlay;
    private _itemSelect: SelectOverlay = new SelectOverlay;
    private _judgeMap: any;

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Player.name);
        this._position.x = Character.PlayerStartPosX;
        this._position.y = Character.PlayerStartPosY;
        this._direction.x = 0;
        this._direction.y = 0;
    }

    public onInit(engine: Main): void {
        let mapinfo = engine.getMapJson('./assets/json/town1.json');
        if (mapinfo) {
            this._judgeMap = mapinfo.data[1].map;
            console.log(this._judgeMap)
        }
        this._character.setTexture(engine, './assets/images/char01.png', Settings.ChipSize);
        this._character.selectCharacter(2);
        engine.addText(this._debugText);
    }

    public onUpdate(engine: Main): void {
        this.playerControl(engine);
        this._character.setPosition(this._position);
        this._character.spriteAnimation(engine);
    }

    public onDestroy(engine: Main): void {
    }

    private wallCheck(dx: number, dy: number): boolean {
        let px = (~~(this._position.x / Settings.ChipSize) + dx);
        let py = (~~(this._position.y / Settings.ChipSize) * (Field.Width)) + (Field.Width * dy);
        return (
            this._judgeMap[((px) + (py))] === 0
        )
    }

    private playerControl(engine: Main): void {
        // let px = (~~(this._position.x / Settings.ChipSize));
        // let py = (~~(this._position.y / Settings.ChipSize) * (Field.Width) + (Field.Width * -1));
        // this._debugText.setText = `Player x:${px} y:${py} judge: ${this._judgeMap[((px) + (py))]}`;

        if (this._position.x % Settings.ChipSize === 0 && this._position.y % Settings.ChipSize === 0) {
            this._direction.x = 0;
            this._direction.y = 0;

            if (engine.getKeyDown(KeyCode.w)) {
                this._character.setDirection(3);
                if (this.wallCheck(0, -1)) {
                    this._direction.y = -1;
                }
            } else if (engine.getKeyDown(KeyCode.s)) {
                this._character.setDirection(0);
                if (this.wallCheck(0, 1)) {
                    this._direction.y = 1;
                }
            } else if (engine.getKeyDown(KeyCode.a)) {
                this._character.setDirection(1);
                if (this.wallCheck(-1, 0)) {
                    this._direction.x = -1;
                }
            } else if (engine.getKeyDown(KeyCode.d)) {
                this._character.setDirection(2);
                if (this.wallCheck(1, 0)) {
                    this._direction.x = 1;
                }
            }

            this._position.x += this._direction.x * this._walkSpeed;
            this._position.y += this._direction.y * this._walkSpeed;
        } else {
            this._position.x += this._direction.x * this._walkSpeed;
            this._position.y += this._direction.y * this._walkSpeed;
        }
    }
}