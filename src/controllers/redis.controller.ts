import { redisClient } from "@/config/redis";
import { Board } from "@/models/board.model";
import { Game } from "@/models/game.model";
import { PlayerChoice } from "@/types/types";

export async function getGame(roomId: string) {
	const game = await redisClient.json.get(roomId);
}

export async function setInitialGameData(game: Game) {
	const status = await redisClient.json.set(game.roomId, "$", game.toJSON());
}

export async function updateGameByMove(
	roomId: string,
	turn: PlayerChoice,
	board: Board
) {
	const s1 = await redisClient.json.set(roomId, "$.turn", turn);
	const s2 = await redisClient.json.set(roomId, "$.board", board.toJSON());
	if (s1 == "OK" && s2 == "OK") {
	} else {
	}
}

export async function delGame(roomId: string) {
	const status = await redisClient.json.del(roomId);
}
