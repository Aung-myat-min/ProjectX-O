import { IBoard } from "@/types";

enum BoardCell {
	null = "",
	X = "X",
	O = "O",
}

class Board implements IBoard {
	boardId: string;
	board: BoardCell[][];

	constructor(boardId: string) {
		this.boardId = boardId;
		this.board = [
			[BoardCell.null, BoardCell.null, BoardCell.null],
			[BoardCell.null, BoardCell.null, BoardCell.null],
			[BoardCell.null, BoardCell.null, BoardCell.null],
		];
	}
}

export { IBoard, BoardCell, Board };
