import { Main } from './../main';
import { Container, Graphics } from 'pixi.js';
import { Settings } from '../constants';

export class Status {
    public attack: number = 0;
    public defence: number = 0;
    public hitpoint: number = 0;
}

export class GameStatus {
    private _container: Container = new Container();
    private _graphics: Graphics = new Graphics();

    constructor() {

    }

    createGraphics(engine: Main) {
        this._graphics.beginFill(0x000000);
        this._graphics.alpha = 0.5;
        this._graphics.drawRect(0, 0, Settings.ChipSize * 5, Settings.ChipSize);

        this._container.addChild(this._graphics);
        engine.addChild(this._container);
    }
}