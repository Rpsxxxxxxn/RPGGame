import * as PIXI from 'pixi.js'
import { BattleScene } from "../gamescenes/battle-scene";
import { WorldScene } from "../gamescenes/world-scene";
import { BaseScene, SceneType } from "./base-scene";

export interface TextureInfo {
    name: string;
    texture: PIXI.Texture;
}

export class Main {
    private _application: PIXI.Application;
    private _textures: TextureInfo[] = [];
    private _scene: BaseScene = new WorldScene(this);
    private _nowScene: SceneType = SceneType.None;
    private _nextScene: SceneType = SceneType.World;
    private _gameCounter: number = 0;

    constructor() {
        this._application = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xAAAAAA
        });
        document.body.appendChild(this._application.view);
    }

    /**
     * 初期化
     */
    public initialize() {
        this.addTexture('./assets/images/char01.png');
        this.addTexture('./assets/images/char02.png');
        this.addTexture('./assets/images/char03.png');
        this.addTexture('./assets/images/char04.png');
        this.addTexture('./assets/images/town01.png');
        this.addTexture('./assets/images/town02.png');
        this.addTexture('./assets/images/town03.png');
        this.addTexture('./assets/images/town04.png');
    }

    /**
     * 更新処理
     */
    public mainloop() {
        this.changeScene();

        if (this._scene) {
            this._scene.onUpdate();
        }
        requestAnimationFrame(this.mainloop.bind(this));
    }

    /**
     * テクスチャの追加
     * @param name
     */
    public addTexture(name: string) {
        PIXI.Texture.fromURL(name).then(value => {
            let texture: TextureInfo = {
                name: name,
                texture: value
            }
            this._textures.push(texture);
        });
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
    public changeScene() {
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
     * オブジェクトの取得ID
     */
    public get getObjectId() {
        if (++this._gameCounter > 65535) {
            this._gameCounter = 0;
        }
        return this._gameCounter;
    }

    /**
     * 追加
     */
    public addChild(object: any) {
        this._application.stage.addChild(object);
    }
}