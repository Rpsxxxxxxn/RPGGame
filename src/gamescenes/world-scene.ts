import { Character } from "../gameobjects/character";
import { FieldMap } from "../gameobjects/fieldmap";
import { BaseScene, SceneType } from "../rpstools/base-scene";
import { Main } from "../rpstools/main";

export class WorldScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.World);
    }

    public onInit(): void {
        this.addObject(new FieldMap(this._engine));
        this.addObject(new Character(this._engine));
    }

    public onUpdate(): void {
        super.onUpdate();
    }
}