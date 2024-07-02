import { useState, useEffect } from "react";

export const useWebSocket = <T>({
  onClose,
  onError,
  onMessage,
  onOpen,
  url,
}: {
  onOpen?: (event: Event) => void;
  onMessage?: (message: MessageEvent<unknown> & { parsedJson: T }) => void;
  onError?: (error: Event) => void;
  onClose?: (e: Event) => void;
  url: string;
}) => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [status, setStatus] = useState<
    "connecting" | "open" | "error" | "closed"
  >("closed");

  // makes the WS connection, sets the socket in state when its opened
  useEffect(() => {
    const newSocket = new WebSocket(url);
    const handleOpen = (e: Event) => {
      setStatus("open");
      setSocket(newSocket);
      onOpen?.(e);
    };
    newSocket.addEventListener("open", handleOpen);

    return () => {
      newSocket.removeEventListener("open", handleOpen);
      newSocket.close();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleError = (e: Event) => {
      setStatus("error");
      onError?.(e);
    };

    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("error", handleError);
      setSocket(null);
    };
  }, [socket, onError]);

  // makes sure to clean up the socket state incase the server closes the connection
  useEffect(() => {
    const handleClose = (e: Event) => {
      setStatus("closed");
      onClose?.(e);
    };
    socket?.addEventListener("close", handleClose);

    return () => {
      socket?.removeEventListener("close", handleClose);
      setSocket(null);
    };
  }, [socket, onClose]);

  // handles incoming messages being sent from the server
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (e: MessageEvent<string>) => {
      if (!onMessage) {
        return;
      }
      const json = JSON.parse(e.data) as T;
      onMessage({ ...e, parsedJson: json });
    };
    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, onMessage]);

  return {
    socket,
    status,
  };
};