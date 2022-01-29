import { BaseScene, SceneType } from "../rpstools/base-scene";
import { Main } from "../rpstools/main";

export class BattleScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.Battle);
    }

    public onInit(): void {

    }

    public onUpdate(): void {
        super.onUpdate();
    }
}