"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Geometry = { kind: "circle"; x: number; y: number };

export const SimpleCanvasZoom = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [geometry, setGeometry] = useState<Array<Geometry>>([
    { kind: "circle", x: 0, y: 0 },
    { kind: "circle", x: 100, y: 100 },
  ]);
  const [translation, setTranslation] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const ctx = canvasEl?.getContext("2d");
    if (!canvasEl || !ctx) {
      return;
    }

    // don't let previous draw state bleed over to next render
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.font = "15px Arial";
    ctx.fillText("Try zooming me!", 50, 15);

    geometry.forEach((item) => {
      if (item.kind === "circle") {
        ctx.beginPath();
        ctx.arc(
          // add the translation in the render stage
          (translation.x + item.x) * zoom,
          (translation.y + item.y) * zoom,
          20 * zoom,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
    ctx.restore();
    // need to react to zoom now since we capture it
  }, [geometry, translation, zoom]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        const zoomFactor = Math.pow(0.99, e.deltaY);
        setZoom((prev) => prev * zoomFactor);
      } else {
        setTranslation((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }
      // only update the translation, not the geometry
    };
    canvasEl.addEventListener("wheel", handleWheel);

    return () => canvasEl.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <canvas
      style={{
        borderWidth: "1px",
        borderRadius: "4px",
      }}
      ref={canvasRef}
      height={200}
      width={200}
    />
  );
};
