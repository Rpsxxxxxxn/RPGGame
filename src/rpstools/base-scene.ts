import { GameObject } from './base-object';
import { Main } from "./main";

export enum SceneType {
    None,
    World,
    Battle,
}

export class BaseScene {
    protected _engine: Main;
    private _type: SceneType;
    private _objects: GameObject[] = [];

    constructor(engine: Main, type: SceneType) {
        this._type = type;
        this._engine = engine;
    }

    public onInit(): void {
 
    }

    public onUpdate(): void {

    }

    public addObject(object: GameObject) {
        this._objects.push(object);
        object.onInit(this._engine);
    }

    public removeObject(object: GameObject) {
        if (object) {
            const index = this._objects.findIndex((value) => value === object);
            if (index >= 0) {
                this._objects.splice(index, 1);
            }
        }
    }

    public removeObjectById(object: GameObject) {
        if (object) {
            const index = this._objects.findIndex((value) => value.getId === object.getId);
            if (index >= 0) {
                this._objects.splice(index, 1);
            }
        }
    }
}