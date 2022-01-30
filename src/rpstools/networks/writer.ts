export class Writer {
    private _buffer: DataView;
    private _endian: boolean;
    private _view: number[];

    constructor(littleEndian: boolean) {
        this._buffer = new DataView(new ArrayBuffer(8));
        this._endian = littleEndian;
        this._view = [];
        this.reset();
    }

    reset() {
        this._view = [];
    }

    setUint8(value: number): void {
        if (value >= 0 && value < 256) {
            this._view.push(value);
        }
    }

    setInt8(value: number): void {
        if (value >= -128 && value < 128) {
            this._view.push(value);
        }
    }

    setUint16(value: number): void {
        this._buffer.setUint16(0, value, this._endian);
        this.skipBytes(2);
    }

    setInt16(value: number): void {
        this._buffer.setInt16(0, value, this._endian);
        this.skipBytes(2);
    }

    setUint32(value: number): void {
        this._buffer.setUint32(0, value, this._endian);
        this.skipBytes(4);
    }

    setInt32(value: number): void {
        this._buffer.setInt32(0, value, this._endian);
        this.skipBytes(4);
    }

    setFloat32(value: number): void {
        this._buffer.setFloat32(0, value, this._endian);
        this.skipBytes(4);
    }

    setFloat64(value: number): void {
        this._buffer.setFloat64(0, value, this._endian);
        this.skipBytes(8);
    }

    skipBytes(value: number): void {
        for (let i = 0; i < value; i++) {
            this._view.push(this._buffer.getUint8(i));
        }
    }

    setString(value: string) {
        this.setUint16(value.length);
        for (let i = 0; i < value.length; i++) {
            this.setUint16(value.charCodeAt(i));
        }
    }

    build() {
        return new Uint8Array(this._view);
    }
}
