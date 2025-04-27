interface IPlayer {
	playerId: string;
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

enum PlayerChoice {
	X = "X",
	O = "O",
}

export { IPlayer, IBoard, IGame, PlayerChoice };
