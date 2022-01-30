import axios, { Axios } from 'axios';
import * as PIXI from 'pixi.js'
import { BattleScene } from "../gamescenes/battle-scene";
import { WorldScene } from "../gamescenes/world-scene";
import { BaseScene, SceneType } from "./base-scene";
import { MapInfo, Settings, TextureInfo, MapData } from './constants';
import { Keyboard } from './controller';
import { DebugText } from './debug-text';
import { Timer } from './timer';

export class Main {
    private _application: PIXI.Application;
    private _globalContainer: PIXI.Container;
    private _debugText: DebugText[] = [];
    private _scene: BaseScene = new WorldScene(this);
    private _nowScene: SceneType = SceneType.None;
    private _nextScene: SceneType = SceneType.World;
    private _keyboard: Keyboard = new Keyboard();
    private _gameCounter: number = 0;
    private _timer: Timer = new Timer();
    private _textures: TextureInfo[] = [];
    private _mapinfos: MapInfo[] = [];
    private _framerate: DebugText = new DebugText;

    constructor() {
        this._application = new PIXI.Application({
            width: Settings.GameWidthSize,
            height: Settings.GameHeightSize,
            backgroundColor: Settings.GameBackgroundColor
        });
        document.body.appendChild(this._application.view);

        this._globalContainer = new PIXI.Container();
    }

    /**
     * 画像等の読み込み
     */
    public async load() {
        await this.addMapJson('./assets/json/town1.json');
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
        this.addText(this._framerate);
    }

    /**
     * 更新処理
     */
    public mainloop(): void {
        this._framerate.setText = (~~this._application.ticker.FPS).toString();
        this._keyboard.onUpdate();
        this._timer.onUpdate();
        this.changeScene();

        if (this._scene) {
            this._scene.onUpdate();
        }

        for (let i = 0; i < this._debugText.length; i++) {
            let text = this._debugText[i];
            if (text.getText.style.fontSize) {
                text.getText.position.y = i * parseInt(text.getText.style.fontSize.toString());
            }
            this._globalContainer.addChild(text.getText);
        }

        this._application.renderer.render(this._globalContainer);
        requestAnimationFrame(this.mainloop.bind(this));
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
     * MAPJSONの追加
     * @param name 
     */
    public async addMapJson(name: string) {
        let info = await axios.get(name);
        if (info) {
            let mapdatas: MapData[] = [];
            let mapinfo: MapInfo = {
                name: name,
                data: mapdatas,
            }
            for (let json of info.data.mapinfo) {
                mapdatas.push({
                    layer: json.layer,
                    map: json.data
                })
            }
            this._mapinfos.push(mapinfo);
        }
    }

    /**
     * テクスチャの取得
     * @param name 
     * @returns 
     */
    public getTexture(name: string): PIXI.Texture | undefined {
        let value = this._textures.find((value) => value.name === name);
        if (value) {
            return value.texture
        }
        return value;
    }

    /**
     * MapJsonの取得
     * @param name 
     */
    public getMapJson(name: string): MapInfo | undefined {
        let value = this._mapinfos.find((value) => value.name === name);
        return value;
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

    /**
     * キー情報の取得
     * @param keyCode 
     * @returns 
     */
    public getKeyDown(keyCode: number): boolean {
        return this._keyboard.getKeyDown(keyCode);
    }
    
    /**
     * キー情報の取得（一度のみ）
     * @param keyCode 
     * @returns 
     */
    public getKeyPressed(keyCode: number): boolean {
        return this._keyboard.getKeyPressed(keyCode);
    }
    
    /**
     * キー情報の取得（上げた時のみ）
     * @param keyCode 
     * @returns 
     */
    public getKeyUp(keyCode: number): boolean {
        return this._keyboard.getKeyUp(keyCode);
    }

    /**
     * テキストの追加
     * @param object 
     */
    public addText(object: DebugText) {
        this._debugText.push(object);
    }

    /**
     * テキストの削除
     * @param object 
     */
    public removeText(object: DebugText) {
        const index = this._debugText.findIndex((value) => value === object);
        if (index >= 0) {
            this._debugText.splice(index, 1);
        }
    }
}