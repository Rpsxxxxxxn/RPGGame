import { Selecter } from './../gameobjects/selecter';
import { BaseScene, SceneType } from "../rpstools/game/base-scene";
import { Main } from "../rpstools/main";
import { NPCWeapon } from './../gameobjects/npc-weapon';
import { NPCItem } from './../gameobjects/npc-item';
import { Player } from './../gameobjects/player';
import { FieldMap } from "../gameobjects/fieldmap";
import { NPCQuestGuide } from '../gameobjects/npc-questguide';

export class QuestScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.Quest);
    }

    public onInit(): void {
        super.onInit();

        this.addObject(new FieldMap(this._engine));
        this.addObject(new Player(this._engine));
        this.addObject(new Selecter(this._engine));
    }

    public onUpdate(): void {
        super.onUpdate();
    }
    
    public onDestroy(): void {
        super.onDestroy();
    }
}