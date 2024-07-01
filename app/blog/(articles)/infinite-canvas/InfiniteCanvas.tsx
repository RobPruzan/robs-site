"use client";
import { useCallback, useState } from "react";
// import { useInfiniteCanvas } from "./canvas-lib";
import * as Canvas from "./canvas-lib";
export type Geometry = {
  kind: "circle";
  x: number;
  y: number;
  radius: number;
};

export const InfiniteCanvas = () => {
  const [geometry, setGeometry] = useState<Array<Geometry>>([
    {
      kind: "circle",
      radius: 20,
      x: 100,
      y: 100,
    },
  ]);
  const draw = useCallback<Canvas.Draw>(
    ({ ctx }) => {
      geometry.forEach((item) => {
        if (item.kind === "circle") {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = "blue";
          ctx.fill();
        }
      });
    },
    [geometry]
  );
  const { camera, canvasRef } = Canvas.useInfiniteCanvas({ draw });
  return (
    <>
      <canvas
        style={{
          borderWidth: "1px",
          borderRadius: "4px",
        }}
        onClick={(event) => {
          const worldCoordinates = Canvas.coordinatesFromMouseEvent({
            camera,
            canvasRef,
            event,
          });
          if (!worldCoordinates) {
            return;
          }
          setGeometry((prev) => [
            ...prev,
            {
              kind: "circle",
              radius: 20,
              x: worldCoordinates.x,
              y: worldCoordinates.y,
            },
          ]);
        }}
        width={200}
        height={200}
        ref={canvasRef}
      />
    </>
  );
};
