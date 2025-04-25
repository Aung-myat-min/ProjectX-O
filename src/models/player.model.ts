import { IPlayer, PlayerChoice } from "@/types";

class Player implements IPlayer {
	playerId: string;
	choice: PlayerChoice;

	constructor(playerId: string, choice: PlayerChoice) {
		this.playerId = playerId;
		this.choice = choice;
	}

	toJSON(): string {
		return JSON.stringify({ playerId: this.playerId, choice: this.choice });
	}

	static fromJSON(data: string): Player {
		const obj = JSON.parse(data);
		return new Player(obj.playerId, obj.choice);
	}
}

export { Player };
