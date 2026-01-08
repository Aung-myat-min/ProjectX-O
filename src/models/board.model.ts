import { IBoard } from "@/types";
import { PlayerChoice } from "@/models/enums/PlayerChoice";

type CellValue = PlayerChoice | null;

class Board implements IBoard {
	board: CellValue[][];

	private constructor(board?: CellValue[][]) {
		this.board = board ?? [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	}

	public static init(): Board {
		return new Board();
	}

	private checkRow(row: CellValue[]): PlayerChoice | null {
		let result = null;
		let allX = true;
		let allO = true;

		for (let i of row) {
			if (i == null) {
				allX = false;
				allO = false;
				break;
			} else if (i == PlayerChoice.O) {
				allX = false;
			} else if (i == PlayerChoice.X) {
				allO = false;
			}
		}

		if (allX) {
			result = PlayerChoice.X;
		} else if (allO) {
			result = PlayerChoice.O;
		}

		return result;
	}

	determineWinner(): PlayerChoice | null {
		let result = null;
		const height = this.board.length;
		const width = this.board[0].length;

		//Check Horizontally
		for (let i = 0; i < height; i++) {
			const checkPerRow = this.checkRow(this.board[i]);
			if (checkPerRow != null) {
				result = checkPerRow;
				break;
			}
		}

		//Check Vertically
		if (result == null) {
			for (let i = 0; i < height; i++) {
				const vertiaclRow = [];
				for (let j = 0; j < width; j++) {
					vertiaclRow.push(this.board[j][i]);
				}
				const checkVPerRow = this.checkRow(vertiaclRow);
				if (checkVPerRow != null) {
					result = checkVPerRow;
					break;
				}
			}
		}

		//Check diagonally
		if (result == null) {
			const diag1: CellValue[] = [];
			const diag2: CellValue[] = [];
			for (let i = 0; i < height; i++) {
				diag1.push(this.board[i][i]);
				diag2.push(this.board[i][width - 1 - i]);
			}
			result = this.checkRow(diag1) ?? this.checkRow(diag2);
		}

		return result;
	}
}

export { Board };
