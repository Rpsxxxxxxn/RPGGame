import { Text } from "pixi.js";

export class DebugText {
    private _text: Text;

    constructor() {
        this._text = new Text('', { 
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });
    }

    public set setText(value: string) {
        this._text.text = value;
    }

    public get getText(): Text {
        return this._text;
    }
}