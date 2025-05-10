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

// middlewares
import { authenticatePlayer } from "./middlewares/auth.middleware";
import { roomEvents } from "./events/room-events";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	// authenticate user by roomID and userID
	socket.use(authenticatePlayer);

	// was just testing few stuff, feel free to remove this code
	socket.on(roomEvents.createRoom.eventName, (data: CreateRoomData) =>
		roomEvents.createRoom.handle(io, socket, data)
	);
});

export default server;
