import { IGame } from "@/types";
import { Player, PlayerChoice } from "./player.model";
import { Board } from "./board.model";

class Game implements IGame {
	roomId: string;
	player1: Player;
	player2: Player;
	winnerId: string | null;
	board: Board;
	turn: PlayerChoice;
	active: boolean;

	constructor(roomId: string, player1: Player, player2: Player, board: Board) {
		this.roomId = roomId;
		this.player1 = player1;
		this.player2 = player2;
		this.winnerId = null;
		this.board = board;
		this.turn = PlayerChoice.X;
		this.active = false;
	}
}

export { Game };
