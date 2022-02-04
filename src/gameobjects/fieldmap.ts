import { ShareData } from './share-data';
import { GameField } from '../rpstools/game/game-field';
import { GameObject, ObjectType } from "../rpstools/game/base-object";
import { Main } from '../rpstools/main';
import { MapStage } from '../rpstools/assets-manager';
import { Character } from '../rpstools/constants';

export class FieldMap extends GameObject {
    private _field: GameField = new GameField();

    constructor(engine: Main) {
        super(ObjectType.Field, engine.getObjectId, 'Map');
        this._field.setMapData(engine, engine.shareData.nowStage);
    }

    public onInit(engine: Main): void {
        switch (engine.shareData.nowStage) {
            case MapStage.Town:
                engine.shareData.playerStartPosition.x = Character.PlayerTownPosX;
                engine.shareData.playerStartPosition.y = Character.PlayerTownPosY;
                this._field.setTexture(engine, './assets/images/town01.png', 32);
                break;
            case MapStage.Stage1:
                engine.shareData.playerStartPosition.x = Character.PlayerStage1PosX;
                engine.shareData.playerStartPosition.y = Character.PlayerStage1PosY;
                this._field.setTexture(engine, './assets/images/town03.png', 32);
                break;
            case MapStage.Stage2:
                engine.shareData.playerStartPosition.x = Character.PlayerStage2PosX;
                engine.shareData.playerStartPosition.y = Character.PlayerStage2PosY;
                this._field.setTexture(engine, './assets/images/town03.png', 32);
                break;
        }
    }

    public onUpdate(engine: Main): void {
    }

    public onDestroy(engine: Main): void {
    }
}