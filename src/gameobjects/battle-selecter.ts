import { GameObject, ObjectType } from "../rpstools/game/base-object";
import { Main } from "../rpstools/main";

export class BattleSelecter extends GameObject{
    constructor(engine: Main) {
        super(ObjectType.Overlays, engine.getObjectId, BattleSelecter.name);
    }

    onInit(engine: Main): void {
        engine.addSelectText("攻撃");
        engine.addSelectText("防御");
        engine.addSelectText("逃げる");
        engine.addMessageText("モンスターに遭遇した");
        engine.addMessageText("コマンドを選択してください");
        engine.addMessageText("");
    }

    onUpdate(engine: Main): void {

    }

    onDestroy(engine: Main): void {

    }
}