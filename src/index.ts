import { Main } from "./rpstools/main";

const main = new Main();

function start() {
    main.initialize();
    main.mainloop();
}

window.onload = start;