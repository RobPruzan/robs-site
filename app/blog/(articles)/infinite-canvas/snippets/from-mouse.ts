// @ts-nocheck
export const coordinatesFromMouseEvent = ({
  event,
  camera,
  canvasRef,
}: {
  event: { clientX: number; clientY: number };
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  camera: Camera;
}) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  return toWorld({ x: mouseX, y: mouseY }, camera);
};