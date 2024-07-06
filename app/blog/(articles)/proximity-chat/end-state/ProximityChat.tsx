"use client";
import { useEffect, useId, useState } from "react";
import { toWorld, useInfiniteCanvas } from "../../infinite-canvas/canvas-lib";
import { useWebSocket } from "../../infinite-canvas/useWebSocket";

type Player = {
  x: number;
  y: number;
  id: string;
};

type Message =
  | { kind: "webRTC-offer" }
  | { kind: "webRTC-answer" }
  | { kind: "webRTC-description" };
export const ProximityChat = () => {
  const userId = useId();

  const [players, setPlayers] = useState<Array<Player>>([
    {
      id: userId,
      x: 100,
      y: 100,
    },
  ]);

  const { camera, setCamera, canvasRef } = useInfiniteCanvas({
    draw: ({ ctx }) => {
      console.log("drawing", players[0]);
      players.forEach((player) => {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 50, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
      });
    },
  });

  const { socket } = useWebSocket<Message>({
    url: "http://localhost:8080",
    onMessage: ({ parsedJson }) => {
      switch (parsedJson.kind) {
        case "webRTC-offer": {
          return;
        }
      }
    },
  });

  const [webRTCConnection, setWebRTCConnection] =
    useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    console.log("??");
    const handleKeyDown = (e: { key: string }) => {
      console.log("keydown", e.key);
      switch (e.key) {
        case "w": {
          console.log("1");
          setPlayers((prev) =>
            prev.map((player) => {
              if (player.id !== userId) {
                return player;
              }

              const canvasBottomRight = toWorld(
                {
                  x: 300,
                  y: -300,
                },
                camera
              );

              const canvasOrigin = toWorld(
                {
                  x: 0,
                  y: 0,
                },
                camera
              );

              // bounds check to make camera follow

              // const width = canvasBottomRight.x;
              // const height = canvasBottomRight.y * -1;

              return {
                ...player,
                y: player.y - 25,
              };
            })
          );
          return;
        }
        case "a": {
          console.log("2");
          setPlayers((prev) =>
            prev.map((player) => {
              if (player.id !== userId) {
                return player;
              }
              return {
                ...player,
                x: player.x - 25,
              };
            })
          );
          return;
        }
        case "s": {
          console.log("3");
          setPlayers((prev) =>
            prev.map((player) => {
              if (player.id !== userId) {
                return player;
              }
              console.log("and");
              return {
                ...player,
                y: player.y + 25,
              };
            })
          );
          return;
        }
        case "d": {
          console.log("4");
          setPlayers((prev) =>
            prev.map((player) => {
              if (player.id !== userId) {
                return player;
              }
              return {
                ...player,
                x: player.x + 25,
              };
            })
          );
          return;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <button>Join Call</button>
      <canvas
        // onKeyDown={}
        style={{
          border: "2px solid white",
        }}
        ref={canvasRef}
        width={300}
        height={300}
      />
    </div>
  );
};
