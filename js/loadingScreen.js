export function createLoadingScreen() {
  BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
  };

  BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
    document.getElementById("customLoadingScreenDiv").style.display = "none";
    document.getElementById("tour").style.display = "block";
    document.getElementsByClassName("babylonVRicon")[0].style.display =
      "inline-block";
    window.engine.resize();
  };
}
