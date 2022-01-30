export class Reader {
    private _view: DataView;
    private _endian: boolean;
    private _offset: number;

    constructor(view: DataView, offset: number, littleEndian: boolean) {
        this._view = view;
        this._offset = offset || 0;
        this._endian = littleEndian;
    }

    getInt8(): number {
        return this._view.getInt8(this._offset++);
    }

    getInt16(): number {
        let result = this._view.getInt16(this._offset, this._endian);
        this.skipBytes(2);
        return result;
    }

    getInt24(): number {
        let result = this._view.getInt16(this._offset, this._endian);
        this.skipBytes(3);
        return result;
    }

    getInt32(): number {
        let result = this._view.getInt32(this._offset, this._endian);
        this.skipBytes(4);
        return result;
    }

    getUint8(): number {
        return this._view.getUint8(this._offset++);
    }

    getUint16(): number {
        let result = this._view.getUint16(this._offset, this._endian);
        this.skipBytes(2);
        return result;
    }

    getUint24(): number {
        let result = this._view.getUint16(this._offset, this._endian);
        this.skipBytes(3);
        return result;
    }

    getUint32(): number {
        let result = this._view.getUint32(this._offset, this._endian);
        this.skipBytes(4);
        return result;
    }

    getFloat32(): number {
        let result = this._view.getFloat32(this._offset, this._endian);
        this.skipBytes(4);
        return result;
    }

    getFloat64(): number {
        let result = this._view.getFloat64(this._offset, this._endian);
        this.skipBytes(8);
        return result;
    }

    getString(): string {
        let string: string = "";
        let count: number = 0;
        const length: number = this.getUint16();
        while (count < length) {
            string += String.fromCharCode(this.getUint16());
            count += 1;
        }
        return string;
    }

    skipBytes(skipByte: number): void {
        this._offset += skipByte;
    }
}