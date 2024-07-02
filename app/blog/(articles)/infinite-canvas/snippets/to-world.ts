export const toWorld = (
  screenCoordinate: {
    x: number;
    y: number;
  },
  camera:  {
    zoom: number
    x: number;
    y: number;
  }
) => {
  return {
    x: camera.x + screenCoordinate.x / camera.zoom,
    y: camera.y + screenCoordinate.y / camera.zoom,
  };
};