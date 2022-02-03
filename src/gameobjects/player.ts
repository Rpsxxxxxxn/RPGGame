import { MapStage } from './../rpstools/assets-manager';
import { CharacterType } from './../rpstools/game/game-character';
import { SelectType } from './../rpstools/game/select-overlay';
import { SceneType } from './../rpstools/game/base-scene';
import { Status } from './../rpstools/game/game-status';
import { Field } from './../rpstools/constants';
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
    private _talkDirection: Vector2 = new Vector2();
    private _walkSpeed: number = 2;
    private _judgeMap: any;
    private _status: Status = new Status();
    private _talkCompanion: number = 0;

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, Player.name);
        this._position.x = Character.PlayerStartPosX;
        this._position.y = Character.PlayerStartPosY;
        this._direction.x = 0;
        this._direction.y = 0;
    }

    public onInit(engine: Main): void {
        let mapinfo = engine.getMapJsonByStage(engine.shareData.nowStage);
        if (mapinfo) {
            this._judgeMap = mapinfo.data[1].map;
        }
        this._character.setTexture(engine, './assets/images/char03.png', Settings.ChipSize);
        this._character.selectCharacter(5);
        engine.addText(this._debugText);
    }

    public onUpdate(engine: Main): void {
        this.playerControl(engine);
        this._character.setPosition(this._position);
        this._character.spriteAnimation(engine);
        this.startTalkNPC(engine)
    }

    public onDestroy(engine: Main): void {
        engine.removeText(this._debugText);
    }

    /**
     * NPCとおしゃべりを開始
     */
    private startTalkNPC(engine: Main): void {
        if (engine.getKeyPressed(KeyCode.enter) && !engine.isSelectVisible()) {
            let mx = ~~(this._position.x / Settings.ChipSize) + this._talkDirection.x;
            let my = ~~(this._position.y / Settings.ChipSize) + this._talkDirection.y;
            this._talkCompanion = engine.getTalkPlayerType(mx, my);

        } else {
            let select = engine.selectIndex();
            if (select > -1) {
                if (this._talkCompanion === CharacterType.NPCQuestGuide) {
                    switch (select) {
                        case SelectType.Select1:
                            engine.setScene(SceneType.Quest);
                            engine.shareData.nowStage = MapStage.Stage1;
                            break;
                    }
                }
                engine.changeVisible();
            }
            // console.log(select)
        }
    }

    private wallCheck(dx: number, dy: number): boolean {
        this._talkDirection.x = dx;
        this._talkDirection.y = dy;
        let px = (~~(this._position.x / Settings.ChipSize) + dx);
        let py = (~~(this._position.y / Settings.ChipSize) * (Field.Width)) + (Field.Width * dy);
        return this._judgeMap[((px) + (py))] === 0
    }

    private playerControl(engine: Main): void {
        // let px = (~~(this._position.x / Settings.ChipSize));
        // let py = (~~(this._position.y / Settings.ChipSize) * (Field.Width) + (Field.Width * -1));
        // this._debugText.setText = `Player x:${px} y:${py} judge: ${this._judgeMap[((px) + (py))]}`;

        if (this._position.x % Settings.ChipSize === 0 && this._position.y % Settings.ChipSize === 0 && !engine.isSelectVisible()) {
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