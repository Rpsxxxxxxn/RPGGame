import { BaseScene, SceneType } from "./rpstools/base-scene";
import { Render } from "./rpstools/render";

(function() {
    let render: Render = new Render();
    let scene: BaseScene;
    let nowScene: SceneType = SceneType.World;

    function initialize() {
        render.onLoad();
        
        
    }

    function mainLoop() {

        requestAnimationFrame(mainLoop);
    }

    function changeScene() {
        if (nowScene) {

        }

        if (!scene) {

        }
    }

    function main() {
        initialize();
        mainLoop();
    }
    
    window.onload = main;
})();