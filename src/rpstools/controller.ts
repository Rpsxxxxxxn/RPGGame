export enum KeyCode {
    left = 37,
    up,
    right,
    down,
    enter = 13,
    w = 87,
    a = 65,
    s = 83,
    d = 68,
}

export class Keyboard {
    private _oldKey: Array<boolean>;
    private _newKey: Array<boolean>;

    constructor() {
        this._oldKey = new Array<boolean>(256);
        this._newKey = new Array<boolean>(256);

        for (let i = 0; i < 256; i++) {
            this._newKey[i] = false;
            this._oldKey[i] = false;
        }

        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    public onUpdate() {
        for (let i = 0; i < 256; i++) {
            this._oldKey[i] = this._newKey[i];
        }
    }

    public getKeyDown(keyCode: number): boolean {
        return this._oldKey[keyCode];
    }

    public getKeyPressed(keyCode: number): boolean {
        return !this._oldKey[keyCode] && this._newKey[keyCode];
    }

    public getKeyUp(keyCode: number): boolean {
        return this._oldKey[keyCode] && !this._newKey[keyCode];
    }

    private onKeyDown(e: KeyboardEvent) {
        this._newKey[e.keyCode] = true;
    }

    private onKeyUp(e: KeyboardEvent) {
        this._newKey[e.keyCode] = false;
    }
}