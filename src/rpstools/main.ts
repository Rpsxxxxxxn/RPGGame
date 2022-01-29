import * as PIXI from 'pixi.js'
import { BattleScene } from "../gamescenes/battle-scene";
import { WorldScene } from "../gamescenes/world-scene";
import { BaseScene, SceneType } from "./base-scene";
import { Keyboard } from './controller';
import { Timer } from './timer';

export interface TextureInfo {
    name: string;
    texture: PIXI.Texture;
}

export class Main {
    private _application: PIXI.Application;
    private _globalContainer: PIXI.Container;
    private _textures: TextureInfo[] = [];
    private _scene: BaseScene = new WorldScene(this);
    private _nowScene: SceneType = SceneType.None;
    private _nextScene: SceneType = SceneType.World;
    private _keyboard: Keyboard = new Keyboard();
    private _gameCounter: number = 0;
    private _timer: Timer = new Timer();

    constructor() {
        this._application = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xAAAAAA
        });
        document.body.appendChild(this._application.view);

        this._globalContainer = new PIXI.Container();
    }

    /**
     * 画像等の読み込み
     */
    public async load() {
        await this.addTexture('./assets/images/char01.png');
        await this.addTexture('./assets/images/char02.png');
        await this.addTexture('./assets/images/char03.png');
        await this.addTexture('./assets/images/char04.png');
        await this.addTexture('./assets/images/town01.png');
        await this.addTexture('./assets/images/town02.png');
        await this.addTexture('./assets/images/town03.png');
        await this.addTexture('./assets/images/town04.png');
    }

    /**
     * 初期化
     */
    public initialize(): void {
    }

    /**
     * 更新処理
     */
    public mainloop(): void {
        this._keyboard.onUpdate();
        this._timer.onUpdate();
        this.changeScene();

        if (this._scene) {
            this._scene.onUpdate();
        }

        this._application.renderer.render(this._globalContainer);
        requestAnimationFrame(this.mainloop.bind(this));
    }

    /**
     * テクスチャの追加
     * @param name
     */
    public async addTexture(name: string) {
        let texture: TextureInfo = {
            name: name,
            texture: await PIXI.Texture.fromURL(name)
        }
        this._textures.push(texture);
    }

    /**
     * テクスチャの取得
     * @param name 
     * @returns 
     */
    public getTexture(name: string): PIXI.Texture | undefined {
        let value = this._textures.find((textureInfo) => textureInfo.name === name);
        if (value) {
            return value.texture
        }
        return value;
    }

    /**
     * シーンの変更
     */
    public changeScene(): void {
        if (this._nowScene !== this._nextScene) {
            switch (this._nextScene) {
                case SceneType.World:
                    this._scene = new WorldScene(this);
                    break;
                case SceneType.Battle:
                    this._scene = new BattleScene(this)
                    break;
            }
            this._nowScene = this._nextScene;

            this._scene.onInit();
        }
    }

    /**
     * 追加
     */
    public addChild(object: any): void {
        this._globalContainer.addChild(object);
    }

    /**
     * オブジェクトの取得ID
     */
    public get getObjectId(): number {
        if (++this._gameCounter > 65535) {
            this._gameCounter = 0;
        }
        return this._gameCounter;
    }
    
    /**
     * フレーム間の秒数 
     */
    public get getDeltaTime(): number {
        return this._timer.getDeltaTime;
    }

    public getKeyDown(keyCode: number): boolean {
        return this._keyboard.getKeyDown(keyCode);
    }
    
    public getKeyPressed(keyCode: number): boolean {
        return this._keyboard.getKeyPressed(keyCode);
    }
    
    public getKeyUp(keyCode: number): boolean {
        return this._keyboard.getKeyUp(keyCode);
    }
}