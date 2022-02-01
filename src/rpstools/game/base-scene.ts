import { Container } from 'pixi.js';
import { GameObject } from './base-object';
import { Main } from "../main";
import { DisplayObject } from 'pixi.js';

export enum SceneType {
    None,
    World,
    Quest,
    Battle,
}

export class BaseScene {
    protected _engine: Main;
    protected _container: Container = new Container();
    private _type: SceneType;
    private _objects: GameObject[] = [];

    constructor(engine: Main, type: SceneType) {
        this._type = type;
        this._engine = engine;
    }

    public onInit(): void {
        this._engine.addChild(this._container);
    }

    public onUpdate(): void {
        this._objects.forEach((object) => {
            object.onUpdate(this._engine);
        })
    }

    public onDestroy(): void {
        this._objects.forEach((object) => {
            object.onDestroy(this._engine);
            this.removeObject(object);
        });
        this._engine.removeChild(this._container);
    }

    public getObject(name: string) {
        let value: any = this._objects.find((value) => value.getName === name);
        return value;
    }

    public addObject(object: GameObject): void {
        this._objects.push(object);
        object.onInit(this._engine);
    }

    public removeObject(object: GameObject): void {
        if (object) {
            const index = this._objects.findIndex((value) => value === object);
            if (index >= 0) {
                this._objects.splice(index, 1);
            }
        }
    }

    public removeObjectById(object: GameObject): void {
        if (object) {
            const index = this._objects.findIndex((value) => value.getId === object.getId);
            if (index >= 0) {
                this._objects.splice(index, 1);
            }
        }
    }

    public addChild(object: DisplayObject) {
        this._container.addChild(object);
    }

    public removeChild(object: DisplayObject) {
        this._container.removeChild(object);
    }
}