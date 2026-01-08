import { IRoom } from "@/types";
import { Player } from "./player.model";
import { Board } from "./board.model";
import { PlayerChoice } from "@/models/enums/PlayerChoice";
import { GameStatus } from "@/models/enums/GameStatus";

class Room {
	private readonly roomCode: string;
	player1: Player;
	player2: Player;
	private winnerId: string | null;
	private board: Board;
	private currentTurn: PlayerChoice;
	private gameStatus: GameStatus;

	private constructor(roomId: string, player1: Player, player2: Player, board: Board, currentTurn: PlayerChoice, gameStatus: GameStatus) {
		this.roomCode = roomId;
		this.player1 = player1;
		this.player2 = player2;
		this.winnerId = null;
		this.board = board;
		this.currentTurn = currentTurn;
		this.gameStatus = gameStatus;
	}

	public static init(roomId: string, player1: Player, player2: Player): Room {
		return new Room(roomId, player1, player2, Board.init(), PlayerChoice.X, GameStatus.idle);
	}

	//region: getters
	get getRoomCode(): string {
		return this.roomCode;
	}

	get getWinnerId(): string | null {
		return this.winnerId;
	}

	get getBoard(): Board {
		return this.board;
	}

	get getCurrentTurn(): PlayerChoice {
		return this.currentTurn;
	}

	get getGameStatus(): GameStatus {
		return this.gameStatus;
	}
	//endregion

	//region: setters
	set setWinnerId(winnerId: string | null) {
		this.winnerId = winnerId;
	}

	set setGameStatus(gameStatus: GameStatus) {
		this.gameStatus = gameStatus;
	}

	set setCurrentTurn(currentTurn: PlayerChoice) {
		this.currentTurn = currentTurn;
	}
	//endregion

	public updateBoard(row: number, col: number, playerChoice: PlayerChoice): void {
		this.board.makeAMove(row, col, playerChoice);
	}
}

export { Room };
