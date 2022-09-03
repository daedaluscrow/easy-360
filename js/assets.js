import config from "../config.js";

export function loadAssets(scene) {
  let assetsManager = new BABYLON.AssetsManager(scene);
  assetsManager.useDefaultLoadingScreen = false;
  assetsManager.autoHideLoadingUI = false;

  // let binaryTask = assetsManager.addBinaryFileTask(
  //   "Music",
  //   "./assets/Calm.mp3"
  // );

  // binaryTask.onSuccess = function (task) {
    // window.music = new BABYLON.Sound(
    //   "Music",
    //   task.data,
    //   scene,
    //   function () {
      //   document.getElementById("loader").style.display = "none";
      //   document.getElementById("loading-text").innerText = "Ready!";
      //   let startButton = document.getElementsByName("start");
      //   startButton[0].style.display = "flex";
      //   startButton[0].addEventListener("click", () => {
      //     BABYLON.Engine.audioEngine.unlock();
      //     window.engine.hideLoadingUI();
      //     window.music.play();
      //   });
      // },
      // {
      //   loop: true,
      // }
    // );
  // };

  if(config.music) assetsManager.addBinaryTask(config.music, './assets/' + config.music);
  config.files.forEach((item, index) => {
    assetsManager.addTextureTask(item.filename, "./assets/" + item.filename);
    if (item.sound) assestsManager.addBinaryTask(item.sound, "./assets/" + item.sound);
  })

  assetsManager.load();
  assetsManager.onFinish = tasks => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loading-text").innerText = "Ready!";
    let startButton = document.getElementsByName("start");
    startButton[0].style.display = "flex";
    startButton[0].addEventListener("click", () => {
      window.engine.hideLoadingUI();
      if (window.music) {BABYLON.Engine.audioEngine.unlock(); window.music.play();}
    });
  };
}
