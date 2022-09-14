import { getIndex } from "./actions.js";

export function addTextLabel(data) {
  const plane = BABYLON.Mesh.CreatePlane("plane", 15);
  plane.position.y = 2;

  const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

  const label = new BABYLON.GUI.TextBlock();
  label.text = data[getIndex()].text;
  label.color = "white";
  label.fontSize = 36;
  advancedTexture.addControl(label);

  return label;
}
