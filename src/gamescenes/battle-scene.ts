import { Container } from "pixi.js";
import { BaseScene, SceneType } from "../rpstools/game/base-scene";
import { Main } from "../rpstools/main";

export class BattleScene extends BaseScene {

    constructor(engine: Main) {
        super(engine, SceneType.Battle);
    }

    public onInit(): void {
        super.onInit();
    }

    public onUpdate(): void {
        super.onUpdate();
    }

    public onDestroy(): void {
        super.onDestroy();
    }
}