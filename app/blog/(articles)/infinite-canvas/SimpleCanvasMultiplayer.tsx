"use client";
import { useState } from "react";
import { SimpleCanvasPan } from "./SimpleCanvasPan";
import { SimpleCanvasPanPlayer } from "./SimpleCanvasPanPlayer";

export type Geometry = { kind: "circle"; x: number; y: number };

export const SimpleCanvasMultiplayer = () => {
  const [geometry, setGeometry] = useState<Array<Geometry>>([
    { kind: "circle", x: 100, y: 100 },
  ]);
  return (
    <div
      style={{
        display: "flex",
        columnGap: "10px",
      }}
    >
      <SimpleCanvasPanPlayer geometry={geometry} setGeometry={setGeometry} />
      <SimpleCanvasPanPlayer geometry={geometry} setGeometry={setGeometry} />
    </div>
  );
};
