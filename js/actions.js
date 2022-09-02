import data from "../config.js";
import { fadeIn } from "./shader.js";
import { endTour } from "./endTour.js";
let index = 0;
let text = true;

export async function changeDome(direction, domes, scene) {
  if (domes.videoDome) domes.videoDome.videoTexture.video.pause();
  index = direction === 0 ? direction : Math.max(index + direction, 0);

  if (index > data.length - 1) {
    endTour(domes, scene);
  } else {
    if (data[index].type === "video") {
      if (!domes.videoDome) {
        domes.videoDome = new BABYLON.VideoDome(
          "videodome",
          "./videos/" + data[getIndex()].url,
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
        domes.videoDome.videoTexture.updateURL("./videos/" + data[index].url);
        domes.videoDome.texture.video.muted = false;
        domes.videoDome.texture.video.play();
      }
    } else {
      if (!domes.photoDome) {
        domes.photoDome = new BABYLON.PhotoDome(
          "photodome",
          "./images/" + data[getIndex()].url,
          {},
          scene
        );
        if (domes.videoDome) domes.videoDome.setEnabled(false);
      } else {
        if (domes.videoDome) domes.videoDome.setEnabled(false);
        domes.photoDome.setEnabled(true);
        domes.photoDome.photoTexture.updateURL(
          "./images/" + data[index].url,
          null,
          () => {
            fadeIn(scene);
          }
        );
      }
    }
    domes.label.text = data[index].title;
  }
}

export function getIndex() {
  return index;
}

export function toggleText(domes) {
  text = !text;
  domes.label.isVisible = text;
}
