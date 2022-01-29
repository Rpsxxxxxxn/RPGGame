import { Character } from "../gameobjects/character";
import { BaseScene, SceneType } from "../rpstools/base-scene";
import { Main } from "../rpstools/main";

export class WorldScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.World);
    }

    public onInit() {
        this.addObject(new Character(this._engine));
    }

    public onUpdate() {

    }
}