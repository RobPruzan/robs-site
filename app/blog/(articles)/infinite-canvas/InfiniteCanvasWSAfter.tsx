"use client";
import { useCallback, useEffect, useState } from "react";
import * as Canvas from "./canvas-lib";
export type Geometry = {
  kind: "circle";
  x: number;
  y: number;
  radius: number;
};

export const InfiniteCanvasWSAfter = () => {
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

  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://website-demo-production-8408.up.railway.app"
    );
    const handleOpen = () => {
      setSocket(newSocket);
    };
    newSocket.addEventListener("open", handleOpen);

    return () => {
      newSocket.removeEventListener("open", handleOpen);
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    const handleClose = () => {
      setSocket(null);
    };
    socket?.addEventListener("close", handleClose);

    return () => {
      socket?.removeEventListener("close", handleClose);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (e: MessageEvent<string>) => {
      const json = JSON.parse(e.data) as Geometry;
      setGeometry((prev) => [...prev, json]);
    };
    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);
  return (
    <div className="relative">
      {socket && (
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
