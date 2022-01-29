export class Timer {
    private _deltaTime: number = 0;
    private _timeScale: number = 1;
    private _newTime: number;
    private _oldTime: number;

    constructor() {
        this._newTime = Date.now();
        this._oldTime = Date.now();
    }

    public onUpdate(): void {
        this._newTime = Date.now();
        this._deltaTime = this._newTime - this._oldTime;
        this._oldTime = this._newTime;
    }

    public get getDeltaTime() {
        return this._deltaTime;
    }

    public get getTimeScale() {
        return this._timeScale;
    }
}