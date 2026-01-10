import { Room } from "@/models/room.model";

async function createdRoom(newRoom: Room) {}
async function getRoom(roomCode: string) {}
async function getAllRooms() {}
async function updateRoom(roomCode: string, modifiedRoom: Room) {}
async function deleteRoom(roomCode: string) {}

export {
	createdRoom,
	getRoom,
	getAllRooms,
	updateRoom,
	deleteRoom,
};
