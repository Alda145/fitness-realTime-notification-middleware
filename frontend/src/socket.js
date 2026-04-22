import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    withCredentials: true,
});

socket.on("connect", () => {
    console.log(" Socket connected:", socket.id);
});
socket.on("connect_error", (err) => {
    console.log("❌ Socket connect error:", err.message);
});

socket.on("disconnect", () => {
    console.log("Socket disconnected");
});