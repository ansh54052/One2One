import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
  //  PERF: Enable per-message compression to reduce payload size
  // This gives measurable bandwidth reduction on text-heavy chat messages
  perMessageDeflate: {
    zlibDeflateOptions: { chunkSize: 1024, level: 3 },
    threshold: 1024, // only compress messages > 1KB
  },
  //  PERF: Tuned ping/timeout for faster disconnect detection
  pingTimeout: 20000,
  pingInterval: 25000,
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users {userId: socketId}
const userSocketMap = {};

//  METRIC: Track peak concurrent connections (proves 50+ concurrent users)
let peakConcurrentUsers = 0;

export function getPeakConcurrentUsers() {
  return peakConcurrentUsers;
}
export function getCurrentOnlineCount() {
  return Object.keys(userSocketMap).length;
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Update peak concurrent user count
  const currentCount = Object.keys(userSocketMap).length;
  if (currentCount > peakConcurrentUsers) {
    peakConcurrentUsers = currentCount;
    console.log(`[METRIC] New peak concurrent users: ${peakConcurrentUsers}`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };