import { io } from "socket.io-client";

const socketURL = import.meta.env.VITE_BACKEND_SOCKET_URL;
const socket = io(socketURL);

socket.on("connect", () => {
  console.log("Connected to socket server...");
});

socket.on("connect", () => {
  console.log("Disconnected from socket server...");
});

export default socket;
