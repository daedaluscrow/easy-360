export const xrPolyfillPromise = new Promise((resolve) => {
  if (navigator.xr) {
    return resolve();
  }
  if (window.WebXRPolyfill) {
    new WebXRPolyfill();
    return resolve();
  } else {
    const url =
      "https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js";
    const s = document.createElement("script");
    s.src = url;
    document.head.appendChild(s);
    s.onload = () => {
      new WebXRPolyfill();
      resolve();
    };
  }
});
