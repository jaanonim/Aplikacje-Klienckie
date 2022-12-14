import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
chrome.runtime.onInstalled.addListener(async () => {
    const socket = io.connect("http://192.168.119.109:3000");
    socket.on("connect", () => {
        console.log("Client connected");
    });
    socket.io.on("pos", (data) => {
        console.log(data);
    });
    console.log(socket);
});
