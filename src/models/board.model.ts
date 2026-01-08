import { PlayerChoice } from "@/models/enums/PlayerChoice";

type CellValue = PlayerChoice | null;

class Board {
	private _board: CellValue[][];

	private constructor(board?: CellValue[][]) {
		this._board = board ?? [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	}

	get getBoard(): CellValue[][] {
		return this._board;
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

	public determineWinner(): PlayerChoice | null {
		let result = null;
		const height = this._board.length;
		const width = this._board[0].length;

		//Check Horizontally
		for (let i = 0; i < height; i++) {
			const checkPerRow = this.checkRow(this._board[i]);
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
					vertiaclRow.push(this._board[j][i]);
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
				diag1.push(this._board[i][i]);
				diag2.push(this._board[i][width - 1 - i]);
			}
			result = this.checkRow(diag1) ?? this.checkRow(diag2);
		}

		return result;
	}

	public makeAMove(row: number, col: number, playerChoice: PlayerChoice): void {
		this._board[row][col] = playerChoice;
	}
}

export { Board };
