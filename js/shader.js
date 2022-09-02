import { changeDome } from "./actions.js";

let fadeLevel = 1.0;

export function createShader(camera) {
  BABYLON.Effect.RegisterShader(
    "fade",
    "precision highp float;" +
      "varying vec2 vUV;" +
      "uniform sampler2D textureSampler; " +
      "uniform float fadeLevel; " +
      "void main(void){" +
      "vec4 baseColor = texture2D(textureSampler, vUV) * fadeLevel;" +
      "baseColor.a = 1.0;" +
      "gl_FragColor = baseColor;" +
      "}"
  );

  var postProcess = new BABYLON.PostProcess(
    "Fade",
    "fade",
    ["fadeLevel"],
    null,
    1.0,
    camera
  );
  postProcess.onApply = (effect) => {
    effect.setFloat("fadeLevel", fadeLevel);
  };
}

export function fadeIn(scene) {
  let alpha = 0;
  let inObserver = scene.onBeforeRenderObservable.add(function () {
    fadeLevel = alpha;
    alpha += 0.01;

    if (scene.onBeforeRenderObservable.hasObservers && alpha > 1) {
      scene.onBeforeRenderObservable.remove(inObserver);
    }
  });
}

export function fadeOut(mode, scene, domes) {
  let alpha = 1;
  let outObserver = scene.onBeforeRenderObservable.add(function () {
    fadeLevel = alpha;
    alpha -= 0.01;

    if (scene.onBeforeRenderObservable.hasObservers && alpha < 0) {
      scene.onBeforeRenderObservable.remove(outObserver);
      changeDome(mode, domes, scene);
    }
  });
}
