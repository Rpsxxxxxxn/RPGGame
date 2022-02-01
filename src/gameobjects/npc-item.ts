import { CharacterType } from './../rpstools/game/game-character';
import { Vector2 } from '../rpstools/math-helper';
import { DebugText } from '../rpstools/debug-text';
import { GameCharacter } from '../rpstools/game/game-character';
import { Main } from '../rpstools/main';
import { GameObject, ObjectType } from '../rpstools/game/base-object';
import { Settings } from '../rpstools/constants';

export class NPCItem extends GameObject {
    private _character: GameCharacter = new GameCharacter();
    private _debugText: DebugText = new DebugText;
    private _position: Vector2 = new Vector2();
    private _direction: Vector2 = new Vector2();

    constructor(engine: Main) {
        super(ObjectType.Character, engine.getObjectId, NPCItem.name);
        this._position.x = Settings.ChipSize * 3;
        this._position.y = Settings.ChipSize * 1;
    }
    
    public onInit(engine: Main): void {
        this._character.setTexture(engine, './assets/images/char01.png', Settings.ChipSize);
        this._character.selectCharacter(5);
        engine.addText(this._debugText);
        engine.setTalkPlayerInfo({
            characterType: CharacterType.NPCItem,
            position: this._position,
            messages: ['アイテム販売','今回はどうなさいましたか？',''],
            selects: ['購入', '回復', 'もどる']
        });
    }

    public onUpdate(engine: Main): void {
        // this._debugText.setText = `${ItemNPC.name} x:${this._position.x} y:${this._position.y}`;

        this._character.setPosition(this._position);
        this._character.spriteAnimation(engine);
    }

    public onDestroy(engine: Main): void {
        
    }
}