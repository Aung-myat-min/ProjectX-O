import { Socket } from "socket.io";
import { StartGameData, MakeMoveData, LeaveGameData } from "../dtos";

function startGame(socket: Socket, data: StartGameData) {}

function makeMove(socket: Socket, data: MakeMoveData) {}

function leaveGame(socket: Socket, data: LeaveGameData) {}

export { startGame, makeMove, leaveGame };
