// @ts-nocheck
const zoomFactor = Math.pow(0.99, e.deltaY);
const newZoom = camera.zoom * zoomFactor;
const mouseWorldBefore = toWorld({ x: mouseX, y: mouseY }, camera);
const newCamera = { ...camera, zoom: newZoom };
const mouseWorldAfter = toWorld({ x: mouseX, y: mouseY }, newCamera);

setCamera({
  x: camera.x + (mouseWorldBefore.x - mouseWorldAfter.x),
  y: camera.y + (mouseWorldBefore.y - mouseWorldAfter.y),
  zoom: newZoom,
});