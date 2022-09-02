import { getIndex } from "./actions.js";

export function addTextLabel(data) {
  let plane = BABYLON.Mesh.CreatePlane("plane", 15);
  plane.position.y = 2;

  let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

  let label = new BABYLON.GUI.TextBlock();
  label.text = data[getIndex()].title;
  label.color = "white";
  label.fontSize = 36;
  advancedTexture.addControl(label);

  return label;
}
