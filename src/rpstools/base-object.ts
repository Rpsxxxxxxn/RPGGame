export enum ObjectType {
    Character,
    Layer,
}

export class BaseObject {
    private _type: ObjectType;

    constructor(type: ObjectType) {
        this._type = type;
    }

    public async onLoad() {

    }

    public onInit() {

    }

    public onUpdate() {

    }
}