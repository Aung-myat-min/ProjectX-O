import { IPlayer } from "@/types";
import { PlayerChoice } from "@/models/enums/PlayerChoice";

class Player implements IPlayer {
	playerId: string | null;
	choice: PlayerChoice;

	constructor(playerId: string | null, choice: PlayerChoice) {
		this.playerId = playerId;
		this.choice = choice;
	}

	//region: JSON conversion methods
	public toJSON(): object {
		return {
			playerId: this.playerId,
			choice: this.choice,
		};
	}

	public static fromJSON(json: any): Player {
		return new Player(json.playerId ?? null, json.choice);
	}
	//endregion
}

export { Player };
