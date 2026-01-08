interface IPlayer {
	playerId: string | null;
	choice: PlayerChoice;
}

interface IBoard {
	boardId: string;
	board: BoardCell[][];
}

interface IGame {
	roomId: string;
	player1: IPlayer;
	player2: IPlayer;
	winnerId: string | null;
	board: IBoard;
	turn: PlayerChoice;
	active: boolean;
}

export { IPlayer, IBoard, IGame };
