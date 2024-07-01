"use client";
import { useState } from "react";
import { SimpleCanvasPan } from "./SimpleCanvasPan";
import { SimpleCanvasPanPlayer } from "./SimpleCanvasPanPlayer";
import { SimpleCanvasDerived } from "./SimpleCanvasDerived";

export type Geometry = { kind: "circle"; x: number; y: number };

export const SimpleCanvasMultiplayerDerived = () => {
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
      <SimpleCanvasDerived geometry={geometry} setGeometry={setGeometry} />
      <SimpleCanvasDerived geometry={geometry} setGeometry={setGeometry} />
    </div>
  );
};
