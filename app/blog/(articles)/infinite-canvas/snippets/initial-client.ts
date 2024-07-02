// @ts-nocheck
const [socket, setSocket] = useState<null | WebSocket>(null);

// makes the WS connection, sets the socket in state when its opened
useEffect(() => {
  const newSocket = new WebSocket("http://localhost:8080");
  const handleOpen = () => {
    setSocket(newSocket);
  };
  newSocket.addEventListener("open", handleOpen);

  return () => {
    newSocket.removeEventListener("open", handleOpen);
    newSocket.close();
  };
}, []);

// makes sure to clean up the socket state incase the server closes the connection
useEffect(() => {
  const handleClose = () => {
    setSocket(null);
  };
  socket?.addEventListener("close", handleClose);

  return () => {
    socket?.removeEventListener("close", handleClose);
  };
}, [socket]);

// handles incoming messages being sent from the server
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