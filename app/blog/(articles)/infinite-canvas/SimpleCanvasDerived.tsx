"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Geometry = { kind: "circle"; x: number; y: number };

export const SimpleCanvasDerived = ({
  geometry,
  setGeometry,
}: {
  geometry: Array<Geometry>;
  setGeometry: Dispatch<SetStateAction<Array<Geometry>>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [translation, setTranslation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

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
    ctx.fillText("Try panning me!", 50, 15);

    geometry.forEach((item) => {
      if (item.kind === "circle") {
        ctx.beginPath();
        ctx.arc(
          // add the translation in the render stage
          translation.x + item.x,
          translation.y + item.y,
          20,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
    ctx.restore();
    // need to react to translation changing since we capture it
  }, [geometry, translation]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // only update the translation, not the geometry
      setTranslation((prev) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
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
