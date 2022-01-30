import { Texture } from "pixi.js"

export const Settings = {
    GameWidthSize: 48 * 18,
    GameHeightSize: 48 * 12,
    GameBackgroundColor: 0xAAAAAA,

    ChipSize: 48,
}

export const Field = {
    Width: 18,
    Height: 12,
}

export const Character = {
    PlayerStartPosX: 48 * 8,
    PlayerStartPosY: 48 * 5,
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
    data: MapData[];
}