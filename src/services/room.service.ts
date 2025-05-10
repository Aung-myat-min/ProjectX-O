import { Game } from "@/models/game.model";
import {
	generateUniquePlayerId,
	generateUniqueRoomId,
} from "@/services/generate-id.service";
import { Player } from "@/models/player.model";
import { PlayerChoice } from "@/types/types";
import { Board } from "@/models/board.model";
import { logger } from "@/utils/logger";

// was just testing few stuff, feel free to remove this code
export async function createGame() {
	logger.debug("createGame called");
	const roomID = await generateUniqueRoomId();

	const playerChoice = [PlayerChoice.X, PlayerChoice.O];
	const playerChoice1 =
		playerChoice[Math.floor(Math.random() * playerChoice.length)];
	const playerChoice2 =
		playerChoice1 === PlayerChoice.X ? PlayerChoice.O : PlayerChoice.X;

	const player1 = new Player(await generateUniquePlayerId(), playerChoice1);
	const player2 = new Player(await generateUniquePlayerId(), playerChoice2);

	const game = new Game(roomID, player1, player2, new Board(""));
	logger.debug(game.active);
	return game;
}
