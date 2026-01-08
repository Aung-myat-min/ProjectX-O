import { IPlayer } from "@/types";
import { PlayerChoice } from "@/models/enums/PlayerChoice";

class Player implements IPlayer {
	playerId: string | null;
	choice: PlayerChoice;

	constructor(playerId: string | null, choice: PlayerChoice) {
		this.playerId = playerId;
		this.choice = choice;
	}
}

export { Player };
