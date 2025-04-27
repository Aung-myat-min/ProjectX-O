export interface CreateRoomData {}
export interface JoinRoomData {}
export interface LeaveRoomData {}

type BoardPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface MakeMoveData {
	playerID: string;
	roomID: string;
	playerMove: BoardPosition;
}

export interface StartGameData {}
export interface LeaveGameData {}
