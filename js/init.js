import config from "../config.js";
import { xrPolyfillPromise } from "./lib.js";
import { createShader } from "./shader.js";
import { createLoadingScreen } from "./loadingScreen.js";
import { keyboardControls, vrControls } from "./controls.js";
import { loadAssets } from "./assets.js";
import { initDomes } from "./initDomes.js";

let canvas = document.getElementById("tour");

createLoadingScreen();

let startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

let engine = null;
let scene = null;
let sceneToRender = null;

let createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

let createScene = async function () {
  window.engine.displayLoadingUI();
  BABYLON.Engine.audioEngine.useCustomUnlockedButton = true;

  await xrPolyfillPromise;
  // This creates a basic Babylon Scene object (non-mesh)
  let scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  let camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  let domes = initDomes(config.files, scene);

  loadAssets(scene);

  createShader(camera);

  const env = scene.createDefaultEnvironment();

  const xr = await scene.createDefaultXRExperienceAsync({
    // floorMeshes: [env.ground],
    disableTeleportation: true,
    uiOptions: {
      onError: (error) => {
        console.log(error);
      },
    },
  });

  keyboardControls(scene, domes, xr);
  vrControls(xr, scene, domes);

  return scene;
};

window.initFunction = async function () {
  let asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  engine = await asyncEngineCreation();
  window.engine = engine;
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  scene = await createScene();
  window.scene = scene;
};

initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
