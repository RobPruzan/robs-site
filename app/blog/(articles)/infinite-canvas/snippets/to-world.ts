const toWorld = ({
  translation,
  zoom,
  screenCoordinate,
}: {
  translation: { x: number; y: number };
  zoom: number;
  screenCoordinate: { x: number; y: number };
}) => {
  return {
    // shift the coordinate by the translation amount, then scale the coordinate by the zoom factor
    x: (screenCoordinate.x - translation.x) * zoom,
    y: (screenCoordinate.y - translation.y) * zoom,
  };
};