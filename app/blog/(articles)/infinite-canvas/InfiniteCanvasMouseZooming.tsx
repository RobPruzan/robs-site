"use client";
import { useEffect, useRef, useState } from "react";
type Geometry = { kind: "circle"; x: number; y: number };

type Coordinate = {
  x: number;
  y: number;
};
type Camera = {
  zoom: number;
} & Coordinate;

const toWorld = (screenCoord: Coordinate, camera: Camera): Coordinate => {
  return {
    x: camera.x + screenCoord.x / camera.zoom,
    y: camera.y + screenCoord.y / camera.zoom,
  };
};

export const InfiniteCanvasMouseZooming = () => {
  const [geometry, setGeometry] = useState<Array<Geometry>>([
    {
      kind: "circle",
      x: 100,
      y: 100,
    },
  ]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.fillStyle = "blue";
    ctx.font = "15px Arial";
    ctx.fillText("Point your mouse and zoom!", 10, 15);

    geometry.forEach((item) => {
      if (item.kind === "circle") {
        ctx.beginPath();
        ctx.arc(
          (item.x - camera.x) * camera.zoom,
          (item.y - camera.y) * camera.zoom,
          20 * camera.zoom,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "blue";
        ctx.fill();
      }
    });

    ctx.restore();
  }, [camera, geometry]);

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

  return (
    <>
      <canvas
        style={{
          borderWidth: "1px",
          borderRadius: "4px",
        }}
        width={200}
        height={200}
        ref={canvasRef}
      />
    </>
  );
};
