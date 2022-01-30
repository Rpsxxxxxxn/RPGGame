import * as PIXI from 'pixi.js'

export class DebugText {
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text('', { 
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });
    }

    public set setText(value: string) {
        this._text.text = value;
    }

    public get getText(): PIXI.Text {
        return this._text;
    }
}