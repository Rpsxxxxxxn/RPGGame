import axios from "axios";
import { Texture } from "pixi.js";

export enum MapStage {
    Town,
    Stage1,
    Stage2,
}

export interface TextureInfo {
    name: string;
    texture: Texture;
}

export interface MapData {
    map: Array<number>;
    layer: number;
}

export interface MapInfo {
    name: string;
    stage: MapStage;
    data: MapData[];
}

export class AssetsManager {
    private _textures: TextureInfo[] = [];
    private _mapinfos: MapInfo[] = [];

    constructor() {}

    /**
     * ロード処理
     */
    public async onLoad() {
        await this.addMapJson(MapStage.Town, './assets/json/town1.json');
        await this.addMapJson(MapStage.Stage1, './assets/json/world1.json');
        await this.addTexture('./assets/images/messagebox.png');
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
     * テクスチャの追加
     * @param name
     */
     public async addTexture(name: string) {
        let texture = await Texture.fromURL(name);
            
        let textureInfo: TextureInfo = {
            name: name,
            texture: texture
        }
        this._textures.push(textureInfo);
    }

    /**
     * MAPJSONの追加
     * @param name 
     */
    public async addMapJson(stage: MapStage, name: string) {
        let mapJsonInfo = await axios.get(name);
        if (mapJsonInfo) {
            let mapdatas: MapData[] = [];
            let mapinfo: MapInfo = {
                name: name,
                stage: stage,
                data: mapdatas,
            }
            for (let json of mapJsonInfo.data.mapinfo) {
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
    public getTexture(name: string): Texture | undefined {
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
     * MapJsonの取得
     * @param name 
     */
    public getMapJsonByStage(stage: MapStage): MapInfo | undefined {
        let value = this._mapinfos.find((value) => value.stage === stage);
        return value;
    }
}