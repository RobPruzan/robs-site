// @ts-nocheck
<canvas
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
/>;
