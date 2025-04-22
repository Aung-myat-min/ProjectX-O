import { IPlayer } from "@/types";

enum PlayerChoice {
	X = "X",
	O = "O",
}

class Player implements IPlayer {
	playerId: string;
	choice: PlayerChoice;

	constructor(playerId: string, choice: PlayerChoice) {
		this.playerId = playerId;
		this.choice = choice;
	}
}

export { Player, PlayerChoice };
