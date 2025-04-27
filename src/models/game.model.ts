import { IGame, PlayerChoice } from "@/types/types";
import { Player } from "./player.model";
import { Board } from "./board.model";

class Game implements IGame {
	roomId: string;
	player1: Player;
	player2: Player;
	winnerId: string | null;
	board: Board;
	turn: PlayerChoice;
	active: boolean;

	constructor(
		roomId: string,
		player1: Player,
		player2: Player,
		board: Board,
		winner?: string | null,
		turn?: PlayerChoice,
		active?: boolean
	) {
		this.roomId = roomId;
		this.player1 = player1;
		this.player2 = player2;
		this.winnerId = winner ?? null;
		this.board = board;
		this.turn = turn ?? PlayerChoice.X;
		this.active = active ?? false;
	}

	toJSON(): string {
		return JSON.stringify({
			roomId: this.roomId,
			player1: this.player1,
			player2: this.player2,
			winnerId: this.winnerId,
			board: this.board.toJSON,
			turn: this.turn,
		});
	}

	static fromJSON(data: string): Game {
		const obj = JSON.parse(data);
		const board = Board.fromJSON(obj.board);
		const game = new Game(
			obj.roomId,
			obj.player1,
			obj.player2,
			board,
			obj.winner,
			obj.turn,
			obj.active
		);

		return game;
	}
}

export { Game };
