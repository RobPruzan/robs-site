// @ts-nocheck
setCamera((prev) => ({
  ...prev,
  x: prev.x + e.deltaX / prev.zoom,
  y: prev.y + e.deltaY / prev.zoom,
}));