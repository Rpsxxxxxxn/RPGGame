import { Container } from "pixi.js";
import { BaseScene, SceneType } from "../rpstools/game/base-scene";
import { Main } from "../rpstools/main";

export class BattleScene extends BaseScene {
    // private _container: Container = new Container();

    constructor(engine: Main) {
        super(engine, SceneType.Battle);
    }

    public onInit(): void {

    }

    public onUpdate(): void {
        super.onUpdate();
    }
}