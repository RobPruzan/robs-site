"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Geometry } from "./SimpleCanvasMultiplayer";

export const SimpleCanvasPanPlayer = ({
  geometry,
  setGeometry,
}: {
  geometry: Array<Geometry>;
  setGeometry: Dispatch<SetStateAction<Array<Geometry>>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        ctx.arc(item.x, item.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }, [geometry]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setGeometry((prev) =>
        prev.map((item) => ({
          ...item,
          x: item.x - e.deltaX,
          y: item.y - e.deltaY,
        }))
      );
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
