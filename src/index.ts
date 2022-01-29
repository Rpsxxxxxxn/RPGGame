import { Main } from "./rpstools/main";

const main = new Main();

function start() {
    /**
     * ロードが完了してからスタート
     */
    main.load().then(value => {
        main.initialize();
        main.mainloop();
    })
}

window.onload = start;