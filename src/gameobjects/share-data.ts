import { MapStage } from "../rpstools/assets-manager";
import { Vector2 } from "../rpstools/math-helper";

export class ShareData {
    public nowStage: MapStage = MapStage.Town;
    public playerStartPosition: Vector2 = new Vector2(0, 0);

    constructor() {}
}