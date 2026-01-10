import { Room } from "@/models/room.model";
import { CustomResponse } from "@/utils/custom-response";
import { redisClient } from "@/config/redis";

const ROOM_PREFIX = "room:";
const ROOM_TTL = 86400 * 30; // 30 days

async function createRoom(newRoom: Room): Promise<CustomResponse<Room>> {
	try {
		const roomKey = `${ROOM_PREFIX}${newRoom.getRoomCode}`;

		// Check if room already exists
		const existingRoom = await redisClient.get(roomKey);
		if (existingRoom) {
			return CustomResponse.invalidData(
				"Room with this code already exists",
				Room.fromJSON(JSON.parse(existingRoom))
			);
		}

		// Save room to Redis
		await redisClient.setEx(
			roomKey,
			ROOM_TTL,
			JSON.stringify(newRoom.toJSON())
		);

		return CustomResponse.success("Room created successfully", newRoom);
	} catch (e) {
		console.error("Error creating room: ", e);
		return CustomResponse.serverErr("Failed to create room");
	}
}

async function getRoom(roomCode: string): Promise<CustomResponse<Room>> {
	try {
		const roomKey = `${ROOM_PREFIX}${roomCode}`;

		// Get room from Redis
		const roomStr = await redisClient.get(roomKey);

		if (!roomStr) {
			return CustomResponse.notFound("Room not found");
		}

		const room = Room.fromJSON(JSON.parse(roomStr));

		// Refresh TTL when room is accessed
		await redisClient.expire(roomKey, ROOM_TTL);

		return CustomResponse.success("Room retrieved successfully", room);
	} catch (e) {
		console.error("Error getting room: ", e);
		return CustomResponse.serverErr("Failed to retrieve room");
	}
}

async function getAllRooms(): Promise<CustomResponse<Room[]>> {
	try {
		// Get all room keys
		const keys = await redisClient.keys(`${ROOM_PREFIX}*`);

		if (keys.length === 0) {
			return CustomResponse.success("No rooms found", []);
		}

		// Get all profiles
		const rooms: Room[] = [];
		for (const key of keys) {
			const roomStr = await redisClient.get(key);
			if (roomStr) {
				rooms.push(Room.fromJSON(JSON.parse(roomStr)));
			}
		}

		return CustomResponse.success(`Retrieved ${rooms.length} room(s)`, rooms);
	} catch (e) {
		console.error("Error getting all rooms: ", e);
		return CustomResponse.serverErr("Failed to retrieve rooms");
	}
}

async function updateRoom(
	roomCode: string,
	modifiedRoom: Room
): Promise<CustomResponse<Room>> {
	try {
		const roomKey = `${ROOM_PREFIX}${roomCode}`;

		// Check if room exists
		const existingRoomStr = await redisClient.get(roomKey);
		if (!existingRoomStr) {
			return CustomResponse.notFound("Room not found");
		}

		// Verify the room code matches
		if (modifiedRoom.getRoomCode !== roomCode) {
			return CustomResponse.invalidData(
				"Room code mismatch - cannot update roomCode"
			);
		}

		// Update room in Redis with full TTL
		await redisClient.setEx(
			roomKey,
			ROOM_TTL,
			JSON.stringify(modifiedRoom.toJSON())
		);

		return CustomResponse.success("Room updated successfully", modifiedRoom);
	} catch (e) {
		console.error("Error updating room: ", e);
		return CustomResponse.serverErr("Failed to update room");
	}
}

async function deleteRoom(roomCode: string): Promise<CustomResponse<null>> {
	try {
		const roomKey = `${ROOM_PREFIX}${roomCode}`;

		// Check if room exists
		const existingRoom = await redisClient.get(roomKey);
		if (!existingRoom) {
			return CustomResponse.notFound("Room not found");
		}

		// Delete room from Redis
		await redisClient.del(roomKey);

		return CustomResponse.success("Room deleted successfully");
	} catch (e) {
		console.error("Error deleting room: ", e);
		return CustomResponse.serverErr("Failed to delete room");
	}
}

export { createRoom, getRoom, getAllRooms, updateRoom, deleteRoom };
