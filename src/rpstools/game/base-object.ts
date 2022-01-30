import { Selecter } from './../../gameobjects/selecter';
import { Main } from "../main";

export enum ObjectType {
    Character,
    Field,
    Overlays,
}

export class GameObject {
    private _id: number = 0;
    private _name: string = '';
    private _type: ObjectType;

    constructor(type: ObjectType, id: number, name: string) {
        this._type = type;
        this._id = id;
        this._name = name;
    }

    public onInit(engine: Main): void {

    }

    public onUpdate(engine: Main): void {

    }
    
    public onDestroy(engine: Main): void {
        
    }

    public get getId() {
        return this._id;
    }
}