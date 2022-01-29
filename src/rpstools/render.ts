import { Singleton } from './singleton';
import * as PIXI from 'pixi.js'

export class Render {
    private _application: PIXI.Application;
    private _textures: PIXI.Texture[] = [];

    constructor() {
        this._application = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xCCCCCC
        });

        document.body.appendChild(this._application.view);
    }

    onLoad() {
        PIXI.Texture.fromURL('./assets/images/char01.png').then(value => {
            this._textures.push(value);
        });
    }
}