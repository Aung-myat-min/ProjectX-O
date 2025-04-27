import { Socket } from "socket.io";
import { CreateRoomData, JoinRoomData, LeaveRoomData } from "../types/dtos";

function createRoom(socket: Socket, data: CreateRoomData) {}
function joinRoom(socket: Socket, data: JoinRoomData) {}
function leaveRoom(socket: Socket, data: LeaveRoomData) {}

export { createRoom, joinRoom, leaveRoom };
