import { getIndex } from "./actions.js";
import { addTextLabel } from "./text.js";
let videoDome;
let photoDome;

export function initDomes(data, scene) {
  let label = addTextLabel(data);

  if (data[getIndex()].type === "photo") {
    photoDome = new BABYLON.PhotoDome(
      "photodome",
      "./images/" + data[getIndex()].url,
      {},
      scene
    );
  } else {
    videoDome = new BABYLON.VideoDome(
      "videodome",
      "./videos/" + data[getIndex()].url,
      {},
      scene
    );
  }

  return { videoDome, photoDome, label };
}
