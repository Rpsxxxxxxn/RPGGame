import { Selecter } from './../gameobjects/selecter';
import { BaseScene, SceneType } from "../rpstools/game/base-scene";
import { Main } from "../rpstools/main";
import { NPCWeapon } from './../gameobjects/npc-weapon';
import { NPCItem } from './../gameobjects/npc-item';
import { Player } from './../gameobjects/player';
import { FieldMap } from "../gameobjects/fieldmap";
import { NPCQuestGuide } from '../gameobjects/npc-questguide';

export class WorldScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.World);
    }

    public onInit(): void {
        this.addObject(new FieldMap(this._engine));
        this.addObject(new Player(this._engine));
        this.addObject(new NPCItem(this._engine));
        this.addObject(new NPCWeapon(this._engine));
        this.addObject(new NPCQuestGuide(this._engine));
        this.addObject(new Selecter(this._engine));
    }

    public onUpdate(): void {
        super.onUpdate();
    }
}