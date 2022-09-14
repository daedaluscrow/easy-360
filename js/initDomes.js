import { getIndex } from "./actions.js";
import { addTextLabel } from "./text.js";
let videoDome;
let photoDome;

export function initDomes(data, scene) {
  const label = data[getIndex()].text ? addTextLabel(data) : "";

  if (data[getIndex()].type === "photo") {
    photoDome = new BABYLON.PhotoDome(
      "photodome",
      "../assets/" + data[getIndex()].filename,
      {},
      scene
    );
  } else {
    videoDome = new BABYLON.VideoDome(
      "videodome",
      "../assets/" + data[getIndex()].filename,
      {},
      scene
    );
  }

  return { videoDome, photoDome, label };
}
