function startGame() {}

// following the dtos
type BoardPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
function makeMove(
	playerID: string,
	roomID: string,
	playerMove: BoardPosition
) {}

function leaveGame() {}

export { startGame, makeMove, leaveGame };
