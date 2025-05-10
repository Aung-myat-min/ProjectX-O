import { nanoid } from "nanoid";
import { redisClient } from "@/config/redis";

// was just testing few stuff, feel free to remove this code
export async function generateUniqueRoomId(
	prefix: string = "roomID_",
	MAX_ATTEMPTS: number = 5
): Promise<string> {
	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		const id = `${prefix}${nanoid(12)}`;

		const exists = await redisClient.exists(id);
		if (!exists) return id;
	}

	// Final fallback (almost impossible to collide)
	throw new Error(
		"Failed to generate a unique room ID after multiple attempts."
	);
}

export async function generateUniquePlayerId(
	MAX_ATTEMPTS: number = 5
): Promise<string> {
	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		const id = nanoid(12);

		// Try to add to the set
		const added = await redisClient.sAdd("players:ids", id);
		if (added === 1) {
			return id; // Successfully added = unique
		}
	}

	throw new Error(
		"Failed to generate a unique player ID after multiple attempts."
	);
}
