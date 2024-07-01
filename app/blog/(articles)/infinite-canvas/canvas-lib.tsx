import { MutableRefObject, useEffect, useRef, useState } from "react";

export type Coordinate = {
  x: number;
  y: number;
};
export type Camera = {
  zoom: number;
} & Coordinate;

export const toWorld = (
  screenCoord: Coordinate,
  camera: Camera
): Coordinate => {
  return {
    x: camera.x + screenCoord.x / camera.zoom,
    y: camera.y + screenCoord.y / camera.zoom,
  };
};

export const toScreen = (
  worldCoord: Coordinate,
  camera: Camera
): Coordinate => {
  return {
    x: (worldCoord.x - camera.x) * camera.zoom,
    y: (worldCoord.y - camera.y) * camera.zoom,
  };
};

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

export type Draw = ({
  canvas,
  ctx,
}: {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}) => void;
export const useInfiniteCanvas = ({ draw }: { draw: Draw }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.x, -camera.y);

    draw({
      canvas,
      ctx,
    });

    ctx.restore();
  }, [camera, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (e.ctrlKey) {
        const zoomFactor = Math.pow(0.99, e.deltaY);
        const newZoom = camera.zoom * zoomFactor;

        // force the screen to be locked to mouse by always translating diff of what mouse would of moved
        const mouseWorldBefore = toWorld({ x: mouseX, y: mouseY }, camera);
        const newCamera = { ...camera, zoom: newZoom };
        const mouseWorldAfter = toWorld({ x: mouseX, y: mouseY }, newCamera);

        setCamera({
          x: camera.x + (mouseWorldBefore.x - mouseWorldAfter.x),
          y: camera.y + (mouseWorldBefore.y - mouseWorldAfter.y),

          zoom: newZoom,
        });
      } else {
        setCamera((prev) => ({
          ...prev,

          x: prev.x + e.deltaX / prev.zoom,
          y: prev.y + e.deltaY / prev.zoom,
        }));
      }
    };

    canvas.addEventListener("wheel", handleWheel);
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [camera]);

  return { camera, canvasRef };
};
