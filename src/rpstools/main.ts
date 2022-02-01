import { QuestScene } from './../gamescenes/quest-scene';
import { Container, Application, Texture } from 'pixi.js';
import axios, { Axios } from 'axios';
import { BattleScene } from "../gamescenes/battle-scene";
import { WorldScene } from "../gamescenes/world-scene";
import { BaseScene, SceneType } from "./game/base-scene";
import { Settings } from './constants';
import { Keyboard } from './controller';
import { DebugText } from './debug-text';
import { Timer } from './timer';
import { AssetsManager, MapInfo, MapStage } from './assets-manager';
import { SelectOverlay, TalkPlayerInfo } from './game/select-overlay';
import { CharacterType } from './game/game-character';
import { ShareData } from '../gameobjects/share-data';

export class Main {
    private _application: Application;
    private _globalContainer: Container;
    private _debugText: DebugText[] = [];
    private _keyboard: Keyboard;
    private _timer: Timer;
    private _framerate: DebugText;
    private _assetsManager: AssetsManager;
    private _scene: BaseScene;
    private _selectOverlay: SelectOverlay;
    private _gameCounter: number = 0;
    private _nowScene: SceneType = SceneType.None;
    private _nextScene: SceneType = SceneType.World;
    private _shareData: ShareData = new ShareData();

    constructor() {
        this._application = new Application({
            width: Settings.GameWidthSize,
            height: Settings.GameHeightSize,
            backgroundColor: Settings.GameBackgroundColor
        });
        document.body.appendChild(this._application.view);

        this._scene = new BattleScene(this);
        this._assetsManager = new AssetsManager();
        this._globalContainer = new Container();
        this._keyboard = new Keyboard();
        this._timer = new Timer();
        this._framerate = new DebugText();
        this._selectOverlay = new SelectOverlay();
    }

    /**
     * 画像等の読み込み
     */
    public async load() {
        await this._assetsManager.onLoad();
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
        this._framerate.setText = `FPS: ${(~~this._application.ticker.FPS)}`;
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

        this._keyboard.onUpdate();
        requestAnimationFrame(this.mainloop.bind(this));
    }

    /**
     * シーンの変更
     */
    public changeScene(): void {
        if (this._nowScene !== this._nextScene) {
            this._scene.onDestroy();

            switch (this._nextScene) {
                case SceneType.World:
                    this._scene = new WorldScene(this);
                    break;
                case SceneType.Quest:
                    this._scene = new QuestScene(this)
                    break;
                case SceneType.Battle:
                    this._scene = new BattleScene(this)
                    break;
            }
            this._nowScene = this._nextScene;

            this._scene.onInit();
        }
    }

    public setScene(type: number) {
        this._nextScene = type;
    }

    /**
     * テクスチャの追加
     * @param name
     */
    public async addTexture(name: string) {
        this._assetsManager.addTexture(name);
    }

    /**
     * MAPJSONの追加
     * @param name 
     */
    public async addMapJson(stage: MapStage, name: string) {
        this._assetsManager.addMapJson(stage, name);
    }

    /**
     * テクスチャの取得
     * @param name 
     * @returns 
     */
    public getTexture(name: string): Texture | undefined {
        return this._assetsManager.getTexture(name);
    }

    /**
     * MapJsonの取得
     * @param name 
     */
    public getMapJson(name: string): MapInfo | undefined {
        return this._assetsManager.getMapJson(name);
    }
    /**
     * MapJsonの取得
     * @param name 
     */
    public getMapJsonByStage(stage: MapStage): MapInfo | undefined {
        return this._assetsManager.getMapJsonByStage(stage);
    }

    /**
     * 追加
     */
    public addChild(object: any): void {
        this._globalContainer.addChild(object);
    }
    
    /**
     * 削除
     */
     public removeChild(object: any): void {
        this._globalContainer.removeChild(object);
    }

    /**
     * シーン内追加
     */
    public addSceneChild(object: any): void {
        this._scene.addChild(object);
    }
    /**
     * シーン内削除
     */
    public removeSceneChild(object: any): void {
        this._scene.removeChild(object);
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
     * シーンの取得
     */
    public get getScene(): BaseScene {
        return this._scene;
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

    /**
     * オブジェクトの取得
     * @param name 
     * @returns 
     */
    public getObject(name: string) {
        return this._scene.getObject(name);
    }

    /**
     * 選択した番号の取得
     * @param engine 
     * @returns 
     */
    public selectIndex(): number {
        return this._selectOverlay.selectIndex(this);
    }
    
    public setTexture(name: string, sourSize: number) {
        this._selectOverlay.setTexture(this, name, sourSize);
    }

    public createGraphics(): void {
        this._selectOverlay.createGraphics(this);
    }

    public setTalkPlayerInfo(value: TalkPlayerInfo) {
        this._selectOverlay.setTalkPlayerInfo(value);
    }

    public setSelectText(index: number, value: string) {
        this._selectOverlay.setSelectText(index, value);
    }
    
    public addSelectText(value: string) {
        this._selectOverlay.addSelectText(value);
    }

    public addMessageText(value: string) {
        this._selectOverlay.addMessageText(value);
    }

    public changeVisible() {
        this._selectOverlay.changeVisible();
    }

    public clearSelectAll() {
        this._selectOverlay.clearAll();
    }

    public clearMessage() {
        this._selectOverlay.clearMessage();
    }

    public clearSelect() {
        this._selectOverlay.clearSelect();
    }

    public maxSelect(value: number) {
        this._selectOverlay.maxSelect = value;
    }

    public getTalkPlayerType(mx: number, my: number): CharacterType {
        return this._selectOverlay.getTalkPlayerType(mx, my);
    }

    public isSelectVisible() {
        return this._selectOverlay.isVisible();
    }
}