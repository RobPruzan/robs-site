"use client";
import { useEffect, useRef, useState } from "react";

type Geometry = { kind: "circle"; x: number; y: number };

export const SimpleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [geometry, setGeometry] = useState<Array<Geometry>>([
    { kind: "circle", x: 100, y: 100 },
  ]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const ctx = canvasEl?.getContext("2d");
    if (!canvasEl || !ctx) {
      return;
    }
    ctx.fillStyle = "blue";
    geometry.forEach((item) => {
      if (item.kind === "circle") {
        ctx.beginPath();
        ctx.arc(item.x, item.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    });
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
