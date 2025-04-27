import express from "express";
import http from "http";
import { Server } from "socket.io";

// dtos import
import {
	CreateRoomData,
	JoinRoomData,
	LeaveRoomData,
	MakeMoveData,
} from "./types/dtos";

// room event controllers import
import { createRoom, joinRoom, leaveRoom } from "./controllers/room.controller";

// game event controllers import
import { makeMove } from "./controllers/game.controller";

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
	socket.on("room:create", (data: CreateRoomData) => createRoom(socket, data));
	socket.on("room:join", (data: JoinRoomData) => joinRoom(socket, data));
	socket.on("room:leave", (data: LeaveRoomData) => leaveRoom(socket, data));

	// authenticate user by roomID and userID
	socket.use(authenticatePlayer);

	// game event controllers
	socket.on("game:move", (data: MakeMoveData) => makeMove(socket, data));
});

export default server;
