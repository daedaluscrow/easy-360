import { fadeOut } from "./shader.js";
import { toggleText } from "./actions.js";
let fullscreen = false;

export function keyboardControls(scene, domes, xr) {
  scene.onKeyboardObservable.add((kbInfo) => {
    if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
      switch (kbInfo.event.code) {
        case "Space":
          fadeOut(1, scene, domes);
          break;
        case "Backspace":
          fadeOut(-1, scene, domes);
          break;
        case "KeyM":
          window.music.isPlaying ? window.music.pause() : window.music.play();
          break;
        case "KeyR":
          fadeOut(0, scene, domes);
          break;
        case "KeyT":
          toggleText(domes);
          break;
        case "KeyF":
          toggleFullscreen(scene.getEngine());
          break;
        case "KeyX":
          xr.baseExperience.enterXRAsync("immersive-vr", "local-floor");
          break;
      }
    }
  });
}

export function vrControls(xr, scene, domes) {
  let trigger,
    button,
    squeeze,
    touchpad = false;
  xr.input.onControllerAddedObservable.add((controller) => {
    controller.onMotionControllerInitObservable.add((motionController) => {
      const xr_ids = motionController.getComponentIds();
      xr_ids.forEach((id) => {
        let component = motionController.getComponent(id);
        switch (component.type) {
          case "trigger":
            if (!trigger) {
              trigger = true;
              component.onButtonStateChangedObservable.add(() => {
                if (component.pressed) fadeOut(1, scene, domes);
              });
            }
            break;
          case "touchpad" || "thumbstick":
            if (!touchpad) {
              touchpad = true;
              component.onButtonStateChangedObservable.add(() => {
                if (component.pressed)
                  window.music.isPlaying
                    ? window.music.pause()
                    : window.music.play();
              });
            }
            break;
          case "button":
            if (!button) {
              button = true;
              component.onButtonStateChangedObservable.add(() => {
                if (component.pressed) fadeOut(-1, scene, domes);
              });
            }
            break;
          case "squeeze":
            if (!squeeze) {
              squeeze = true;
              component.onButtonStateChangedObservable.add(() => {
                if (component.pressed) fadeOut(0, scene, domes);
              });
            }
            break;
          default:
            break;
        }
      });
    });
  });
}

function toggleFullscreen(engine) {
  fullscreen = !fullscreen;
  fullscreen ? engine.exitFullscreen(false) : engine.enterFullscreen(false);
}
