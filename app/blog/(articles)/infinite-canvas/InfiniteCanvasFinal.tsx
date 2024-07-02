"use client";
import { useCallback, useState } from "react";
import * as Canvas from "./canvas-lib";
import { useWebSocket } from "./useWebSocket";
export type Geometry = {
  kind: "circle";
  x: number;
  y: number;
  radius: number;
};

export const InfiniteCanvasFinal = () => {
  const [geometry, setGeometry] = useState<Array<Geometry>>([]);
  const handleMessage = useCallback(
    ({ parsedJson }: { parsedJson: Geometry }) => {
      setGeometry((prev) => [...prev, parsedJson]);
    },
    []
  );
  const { socket, status } = useWebSocket<Geometry>({
    url: "http://localhost:8080",
    onMessage: handleMessage,
  });
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
    <div className="relative">
      {status === "open" && (
        <span
          style={{
            color: "rgb(34 197 94)",
            position: "absolute",
            backgroundColor: "rgb(34 197 94)",
            right: 5,
            top: 5,
            borderRadius: 9999,
            height: 15,
            width: 15,
          }}
        />
      )}

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
          const newItem = {
            kind: "circle" as const,
            radius: 20,
            x: worldCoordinates.x,
            y: worldCoordinates.y,
          };
          socket?.send(JSON.stringify(newItem));
          setGeometry((prev) => [...prev, newItem]);
        }}
        width={200}
        height={200}
        ref={canvasRef}
      />
    </div>
  );
};
