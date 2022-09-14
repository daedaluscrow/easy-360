import { changeDome } from "./actions.js";

export function endTour(domes, scene) {
  if (window.music) window.music.stop();
  document.getElementsByClassName("babylonVRicon")[0].style.display = "none";
  document.getElementById("tour").style.display = "none";
  document.getElementById("customLoadingScreenDiv").style.display = "flex";
  document.getElementById("loading-text").innerText = "Tour Completed!";
  const button = document.getElementById("babylonUnmuteIconBtn");
  button.innerText = "Restart Tour";
  button.addEventListener("click", () => {
    changeDome(0, domes, scene);
  });
}
