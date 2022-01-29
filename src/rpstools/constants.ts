import * as PIXI from 'pixi.js'

export const Settings = {
    GameWidthSize: 48 * 18,
    GameHeightSize: 48 * 12,
    GameBackgroundColor: 0xAAAAAA,

    ChipSize: 48,
}

export interface TextureInfo {
    name: string;
    texture: PIXI.Texture;
}

export interface MapInfo {
    name: string;
    layer: number;
    map: Array<Array<number>>;
}