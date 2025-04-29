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

enum CStatus {
	notSepcified = 0,
	success = 1,
	invalidData = 2,
	fail = 3,
	notFound = 4,
}

export { IPlayer, IBoard, IGame, PlayerChoice, CStatus };
