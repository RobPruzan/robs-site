"use client";
import { useEffect, useId, useState } from "react";
import { useInfiniteCanvas } from "../../infinite-canvas/canvas-lib";
import { useWebSocket } from "../../infinite-canvas/useWebSocket";

type Player = {
  x: number;
  y: number;
  id: string;
};
const iceConfig = {
  iceServers: [{ urls: ["stun:stun2.1.google.com:19302"] }],
};

type ClientServerSplit<TClient, TServer> = {
  clientInfo: TClient;
  serverInfo: TServer;
};
type ClientInfo =
  | {
      kind: "webRTC-offer";
      offer: RTCSessionDescriptionInit;
      fromUserId: string;
    }
  | {
      kind: "webRTC-answer";
      answer: RTCSessionDescriptionInit;
      fromUserId: string;
    }
  | { kind: "webRTC-candidate"; fromUserId: string }
  | { kind: "webRTC-description"; fromUserId: string };
type ServerInfo = { toUserId: string };
type Message = ClientServerSplit<ClientInfo, ServerInfo>;
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
  const [webRTCConnections, setWebRTCConnections] = useState<
    Array<{ webRTCConnection: RTCPeerConnection; withUserId: string }>
  >([]);

  const { socket, status } = useWebSocket<ClientInfo>({
    url: "http://localhost:8080?roomName=global",
    onMessage: async ({ parsedJson, socket }) => {
      switch (parsedJson.kind) {
        case "webRTC-offer": {
          const newWebRTCConnection = new RTCPeerConnection(iceConfig);
          setWebRTCConnections((prev) => [
            ...prev,
            {
              webRTCConnection: newWebRTCConnection,
              withUserId: parsedJson.fromUserId,
            },
          ]);
          const answer = await newWebRTCConnection.createAnswer();
          newWebRTCConnection.setLocalDescription(answer);
          socket.send(
            JSON.stringify({
              clientInfo: {
                kind: "webRTC-answer",
                answer,
                fromUserId: userId,
              },
              serverInfo: {
                toUserId: parsedJson.fromUserId,
              },
            } satisfies Message)
          );
          return;
        }
        case "webRTC-answer": {
          const description = parsedJson.answer;
          const connection = webRTCConnections.find(
            (connection) => connection.withUserId === parsedJson.fromUserId
          );
          if (!connection) {
            return;
          }
          connection.webRTCConnection.setRemoteDescription(description);
        }
      }
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
      console.log("keydown", e.key);

      // e.preventDefault();
      switch (e.key) {
        case "w": {
          setPlayers((prev) =>
            prev.map((player) => {
              if (player.id !== userId) {
                return player;
              }

              return {
                ...player,
                y: player.y - 25,
              };
            })
          );
          return;
        }
        case "a": {
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
    <div className="flex flex-col ">
      <div className="flex items-center gap-x-5">
        {status === "open" && (
          <span className="rounded-full bg-green-500 h-6 w-6"></span>
        )}
        <button className="">Join Call</button>
      </div>
      {/* {JSON.stringify(status)} */}

      <div className="flex">
        <canvas
          style={{
            border: "2px solid white",
          }}
          ref={canvasRef}
          width={300}
          height={300}
        />
        <div className="flex border">
          <span>User List</span>
        </div>
        <div className="flex border">
          <span>Call List</span>
        </div>
      </div>
    </div>
  );
};
