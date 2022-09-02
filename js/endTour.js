import { changeDome } from "./actions.js";

export function endTour(domes, scene) {
  window.music.stop();
  document.getElementsByClassName("babylonVRicon")[0].style.display = "none";
  document.getElementById("renderCanvas").style.display = "none";
  document.getElementById("customLoadingScreenDiv").style.display = "flex";
  document.getElementById("loading-text").innerText = "Tour Completed!";
  let button = document.getElementById("babylonUnmuteIconBtn");
  button.innerText = "Restart Tour";
  button.addEventListener("click", () => {
    changeDome(0, domes, scene);
  });
}
