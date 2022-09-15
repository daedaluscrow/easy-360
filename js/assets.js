import config from "../config/config.js";

export function loadAssets(scene) {
  const assetsManager = new BABYLON.AssetsManager(scene);
  assetsManager.useDefaultLoadingScreen = false;
  assetsManager.autoHideLoadingUI = false;

  if(config.music) assetsManager.addBinaryFileTask("Music", './assets/' + config.music);
  config.files.forEach((item, index) => {
    assetsManager.addTextureTask("Media" + (index + 1), "./assets/" + item.filename);
    if (item.sound) assetsManager.addBinaryFileTask("Sound" + (index + 1), "./assets/" + item.sound);
  })

  assetsManager.load();
  assetsManager.onFinish = tasks => {
    if(config.music) {
      const musicTask = tasks.find(element => element.name === "Music");
      window.music = new BABYLON.Sound(
        "Music",
        musicTask.data,
        scene,
        null,
        {
          loop: true,
        }
      );
    }
    scene.tasks = tasks;
    document.getElementById("loader").style.display = "none";
    document.getElementById("loading-text").innerText = "Ready!";
    const startButton = document.getElementsByName("start");
    startButton[0].style.display = "flex";
    startButton[0].addEventListener("click", () => {
      window.engine.hideLoadingUI();
      if (window.music) {BABYLON.Engine.audioEngine.unlock(); window.music.play();}
    });
  };
}
