import { Settings, Field } from './../constants';
import { Main } from './../main';
import { Container, Sprite, Graphics, Text, Rectangle } from 'pixi.js';
import { KeyCode } from '../controller';

export enum BoxBoarder {
    leftTop,
    top,
    rightTop,
    left,
    right,
    leftBottom,
    bottom,
    rightBottom,
}

export class MessageBox {
    public width: number = 0;
    public height: number = 0;
}

export class SelectBox {
    public width: number = 0;
    public height: number = 0;
    public select: number = 0;
}

export class SelectOverlay {
    private _select: number = 0;
    private _container: Container = new Container;
    private _graphics: Graphics = new Graphics;
    private _selectGraphics: Graphics = new Graphics;
    private _sprite: Sprite[] = [];
    private _text: string[] = [];
    private _sourSize: number = 0;
    private _sourBoxSize: number = 4;
    private _messagebox: MessageBox = new MessageBox;
    private _selectbox: SelectBox = new SelectBox;
    private _maxSelect: number = 3;
    private _visible: boolean = false;

    constructor() {
    }
    
    public onInit(engine: Main): void {
        
    }

    public onUpdate(engine: Main): void {
    }

    public selectIndex(engine: Main): number {
        if (engine.getKeyPressed(KeyCode.up)) {
            if (this._select > 0) {
                this._select--;
            }
        } else if (engine.getKeyPressed(KeyCode.down)) {
            if (this._select < this._maxSelect - 1) {
                this._select++;
            }
        }

        this._selectGraphics.position.x = (Settings.ChipSize * 0.25) + (Settings.ChipSize * 16);
        this._selectGraphics.position.y = (Settings.ChipSize * 9) + (Settings.ChipSize * 0.4) + (this._select * Settings.ChipSize);

        if (engine.getKeyPressed(KeyCode.enter)) {
            return this._select;
        }
        return -1;
    }
    
    public setTexture(engine: Main, name: string, sourSize: number) {
        this._sourSize = sourSize;

        const texture = engine.getTexture(name);
        if (!texture) {
            return;
        }

        for (let y = 0; y < this._sourBoxSize; y++) {
            for (let x = 0; x < this._sourBoxSize; x++) {
                if (x === 0 || y === 0 || x === this._sourBoxSize - 1 || y == this._sourBoxSize - 1) {
                    const cloneTexture = texture.clone();
                    cloneTexture.frame = new Rectangle(sourSize * (this._sourBoxSize + x), sourSize * y, sourSize, sourSize);
                    let sprite = new Sprite(cloneTexture);
                    this._sprite.push(sprite);
                }
            }
        }

        for (let y = 0; y < this._messagebox.height; y++) {
            for (let x = 0; x < this._messagebox.width; x++) {
                if (x === 0 && y === 0) {
                    this._sprite[BoxBoarder.leftTop];
                } else if (y === 0) {
                    this._sprite[BoxBoarder.top];
                } else if (x === 0 && y === 0) {
                    this._sprite[BoxBoarder.rightTop];
                } else if (x === 0) {
                    this._sprite[BoxBoarder.left];
                } else if (x === this._messagebox.height - 1) {
                    this._sprite[BoxBoarder.right];
                } else if (x === 0 && y === this._messagebox.width - 1) {
                    this._sprite[BoxBoarder.leftBottom];
                } else if (y === this._messagebox.width - 1) {
                    this._sprite[BoxBoarder.bottom];
                } else if (x === this._messagebox.height - 1 && y === this._messagebox.width - 1) {
                    this._sprite[BoxBoarder.rightBottom];
                }
            }
        }
    }

    public createGraphics(engine: Main): void {
        this._graphics.beginFill(0x000000);
        this._graphics.alpha = 0.5;
        this._graphics.drawRect(0, Settings.ChipSize * 9, Settings.ChipSize * Field.Height, Settings.ChipSize * 3);
        this._graphics.drawRect(Settings.ChipSize * 13, Settings.ChipSize * 9, Settings.ChipSize * Field.Width, Settings.ChipSize * 3);
        this._container.addChild(this._graphics);

        this._selectGraphics.beginFill(0xFFFFFF);
        this._selectGraphics.drawRect(0, 0, Settings.ChipSize * .25, Settings.ChipSize * .25);
        this._container.addChild(this._selectGraphics);

        for (let i = 0; i < this._maxSelect; i++) {
            let text = new Text(this._text[i], { 
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xFFFFFF,
                align: 'center'
            });
            text.position.x = (Settings.ChipSize * 0.25) + (Settings.ChipSize * 13);
            text.position.y = ((Settings.ChipSize * 9) + (Settings.ChipSize * 0.25) + (i * Settings.ChipSize));
            this._container.addChild(text);
        }

        engine.addChild(this._container);
    }

    public set maxSelect(value: number) {
        this._maxSelect = value;
    }
    
    public addText(value: string) {
        this._text.push(value);
    }

    public changeVisible() {
        this._visible = !this._visible;
        this._container.visible = this._visible;
    }
}