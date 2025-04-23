import express from "express";
import http from "http";
import { Server } from "socket.io";

// room event controllers import
import { createRoom, joinRoom, leaveRoom } from "./controllers/room.controller";

// game event controllers import
import { startGame, makeMove, leaveGame } from "./controllers/game.controller";

// middlewares
import { authenticatePlayer } from "./middlewares/auth.middleware";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	// room event controllers
	socket.on("room:create", createRoom);
	socket.on("room:join", joinRoom);
	socket.on("room:leave", leaveRoom);

	// authenticate user by roomID and userID
	socket.use(authenticatePlayer);

	// game event controllers
	socket.on("game:start", startGame);
	socket.on("game:move", makeMove);
	socket.on("game:leave", leaveGame);
});

export default server;
