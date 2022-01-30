import { QuestGuideNPC } from './../gameobjects/questguidenpc';
import { WeaponNPC } from './../gameobjects/weaponnpc';
import { Player } from './../gameobjects/player';
import { FieldMap } from "../gameobjects/fieldmap";
import { BaseScene, SceneType } from "../rpstools/base-scene";
import { Main } from "../rpstools/main";
import { Enemy } from '../gameobjects/enemy';
import { ItemNPC } from '../gameobjects/itemnpc';

export class WorldScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.World);
    }

    public onInit(): void {
        this.addObject(new FieldMap(this._engine));
        this.addObject(new Player(this._engine));
        this.addObject(new ItemNPC(this._engine));
        this.addObject(new WeaponNPC(this._engine));
        this.addObject(new QuestGuideNPC(this._engine));
    }

    public onUpdate(): void {
        super.onUpdate();
    }
}