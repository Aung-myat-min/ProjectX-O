import { redisClient } from "@/config/redis";
import { Board } from "@/models/board.model";
import { Game } from "@/models/game.model";
import { PlayerChoice } from "@/types/types";
import { CustomResponse } from "@/utils/custom-response";

export async function getGame(roomId: string): Promise<CustomResponse<Game>> {
	try {
		const game = await redisClient.json.get(roomId);
		if (game) {
			return CustomResponse.success(
				"Here is the Game!",
				Game.fromJSON(game as string)
			);
		}
		return CustomResponse.notFound(
			"Sorry, look like there is no Game with that Id"
		);
	} catch (error) {
		return CustomResponse.serverErr(
			error instanceof Error ? error.message : String(error)
		);
	}
}

export async function setInitialGameData(
	game: Game
): Promise<CustomResponse<Game>> {
	try {
		const status = await redisClient.json.set(game.roomId, "$", game.toJSON());
		if (status == "OK") {
			return CustomResponse.success("Created a new Game!");
		}
		return CustomResponse.fail("An error occured when adding a new game!");
	} catch (error) {
		return CustomResponse.serverErr(
			error instanceof Error ? error.message : String(error)
		);
	}
}

export async function updateGameByMove(
	roomId: string,
	turn: PlayerChoice,
	board: Board
): Promise<CustomResponse<Game>> {
	try {
		const s1 = await redisClient.json.set(roomId, "$.turn", turn);
		const s2 = await redisClient.json.set(roomId, "$.board", board.toJSON());
		if (s1 == "OK" && s2 == "OK") {
			return CustomResponse.success("Game Data Updated!");
		}
		return CustomResponse.fail(
			"An error occured when updating the game: " + roomId
		);
	} catch (error) {
		return CustomResponse.serverErr(
			error instanceof Error ? error.message : String(error)
		);
	}
}

export async function delGame(roomId: string): Promise<CustomResponse<Game>> {
	try {
		const status = await redisClient.json.del(roomId);
		if (status == 1) {
			return CustomResponse.success("Deleted the Game!");
		}
		return CustomResponse.fail("An error occured when deleting the game!");
	} catch (error) {
		return CustomResponse.serverErr(
			error instanceof Error ? error.message : String(error)
		);
	}
}
