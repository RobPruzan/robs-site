// @ts-nocheck
const mousePosition = coordinatesFromMouseEvent(event);
const priorMouseWorldPosition = toWorld({
  translation,
  zoom,
  screenCoordinate: mousePosition,
});
const newZoom = zoom * Math.pow(event.deltaY, 0.99);
const newMouseWorldPosition = toWorld({
  translation,
  zoom: newZoom,
  screenCoordinate: mousePosition,
});

setTranslation((prev) => ({
  x: prev.x + (newMouseWorldPosition.x - priorMouseWorldPosition.x),
  y: prev.y + (newMouseWorldPosition.y - priorMouseWorldPosition.y),
}));