interface IPlayer {
	playerId: string | null;
	choice: PlayerChoice;
}

// interface IBoard {
// 	private _board: BoardCell[][];
// }

// interface IRoom {
// 	roomCode: string;
// 	player1: IPlayer;
// 	player2: IPlayer;
// 	winnerId: string | null;
// 	board: IBoard;
// 	currentTurn: PlayerChoice;
// 	active: boolean;
// }

export { IPlayer, IBoard, IRoom };
