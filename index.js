import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("sendOffer", (offer) => {
    socket.broadcast.emit("getOffer", offer);
  });

  socket.on("sendAnswer", (answer) => {
    socket.broadcast.emit("getAnswer", answer);
  });

  socket.on("sendICE", (ice) => {
    socket.broadcast.emit("getICE", ice);
  });
});

server.listen(3333, () => {
  console.log("server running at http://localhost:3333");
});
