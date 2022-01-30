export class Connector {
    private _ws: WebSocket;

    constructor(address: string) {
        this._ws = new WebSocket(address);
        this._ws.binaryType = "arraybuffer";
        this._ws.onopen = this.onOpen.bind(this);
        this._ws.onmessage = this.onMessage.bind(this);
        this._ws.onclose = this.onClose.bind(this);
        this._ws.onerror = this.onError.bind(this);
    }
    
    /**
     * 送信処理
     * @param {*} a 
     * @returns 
     */
     wsSend(a: any) {
        if (!this._ws) return;
        if (this._ws.readyState != 1) return;
        if (a.build) this._ws.send(a.build());
        else this._ws.send(a.buffer);
    }

    /**
     * サーバに接続した時
     * @param {*} ws 
     */
    onOpen(event: Event) {
        console.log("Socket Open");
    }
    
    /**
     * サーバからのメッセージ取得
     * @param {*} message 
     */
     onMessage(message: MessageEvent) {
         const reader = new DataView(message.data);
     }

     /**
      * サーバに接続した時
      * @param {*} ws 
      */
     onClose(event: CloseEvent) {
         console.log("Socket Close");
     }

     /**
      * サーバに接続した時
      * @param {*} ws 
      */
     onError(event: Event) {
         console.log("Socket Error");
     }
}