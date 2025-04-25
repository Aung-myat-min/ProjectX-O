import { IBoard } from "@/types";

enum BoardCell {
	X = "X",
	O = "O",
}

type CellValue = BoardCell | null;

class Board implements IBoard {
	boardId: string;
	board: CellValue[][];

	constructor(boardId: string, board?: CellValue[][]) {
		this.boardId = boardId;
		this.board = board ?? [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	}

	toJSON(): string {
		return JSON.stringify({
			boardId: this.boardId,
			board: this.board,
		});
	}

	static fromJSON(data: string): Board {
		const obj = JSON.parse(data);
		return new Board(obj.boardId, obj.board);
	}
}

export { IBoard, BoardCell, Board };
