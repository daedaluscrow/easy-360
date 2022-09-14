import config from "../config/config.js";
import { fadeIn } from "./shader.js";
import { endTour } from "./endTour.js";
let index = 0;
let text = true;

export function changeDome(direction, domes, scene) {
  const data = config.files;
  if (domes.videoDome) domes.videoDome.videoTexture.video.pause();
  index = direction === 0 ? direction : Math.max(index + direction, 0);

  if (index > data.length - 1) {
    endTour(domes, scene);
  } else {
    if (data[index].type === "video") {
      if (!domes.videoDome) {
        domes.videoDome = new BABYLON.VideoDome(
          "videodome",
          "../assets/" + data[getIndex()].filename,
          {},
          scene
        );
        domes.videoDome.texture.onLoadObservable.addOnce(() => {
          fadeIn(scene);
        });
        if (domes.photoDome) domes.photoDome.setEnabled(false);
        domes.videoDome.texture.video.muted = false;
        domes.videoDome.texture.video.play();
      } else {
        domes.videoDome.texture.onLoadObservable.addOnce(() => {
          fadeIn(scene);
        });
        domes.videoDome.setEnabled(true);
        if (domes.photoDome) domes.photoDome.setEnabled(false);
        domes.videoDome.videoTexture.updateURL("./assets/" + data[index].filename);
        domes.videoDome.texture.video.muted = false;
        domes.videoDome.texture.video.play();
      }
    } else {
      if (!domes.photoDome) {
        domes.photoDome = new BABYLON.PhotoDome(
          "photodome",
          "../assets/" + data[getIndex()].filename,
          {},
          scene
        );
        if (domes.videoDome) domes.videoDome.setEnabled(false);
      } else {
        if (domes.videoDome) domes.videoDome.setEnabled(false);
        domes.photoDome.setEnabled(true);
        domes.photoDome.photoTexture.updateURL(
          "../assets/" + data[index].filename,
          null,
          () => {
            fadeIn(scene);
          }
        );
      }
      if(data[index].sound) {
        const soundTask = scene.tasks.find(element => element.name === "Sound"+(index+1))
        console.log(soundTask);
        const sound = new BABYLON.Sound(
          "Sound",
          soundTask.data,
          scene,
          null,
          {loop: true,}
        )
        console.log(sound);
        sound.isPlaying = true;
      }
    }
    domes.label.text = data[index].text;
  }
}

export function getIndex() {
  return index;
}

export function toggleText(domes) {
  text = !text;
  domes.label.isVisible = text;
}
