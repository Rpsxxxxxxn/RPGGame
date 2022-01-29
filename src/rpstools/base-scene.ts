export enum SceneType {
    World,
    Battle,
}

export class BaseScene {
    private _type: SceneType;

    constructor(type: SceneType) {
        this._type = type;
    }

    public onLoad() {

    }

    public onInit() {

    }

    public onUpdate() {

    }
}