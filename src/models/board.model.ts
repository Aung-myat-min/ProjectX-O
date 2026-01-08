import { IBoard } from "@/types";
import { BoardCell } from "@/models/enums/BoardCell";

class Board implements IBoard {
	board: BoardCell[][];

	private constructor(board?: BoardCell[][]) {
		this.board = board ?? [
			[BoardCell.null, BoardCell.null, BoardCell.null],
			[BoardCell.null, BoardCell.null, BoardCell.null],
			[BoardCell.null, BoardCell.null, BoardCell.null],
		];
	}

	public static init(): Board {
		return new Board();
	}
}

export { Board };
