export enum SocketEmitEvents {
	GameStart = "gameStart",
	RoomCreated = "room:created",
	UpdateMove = "updateMove",
	PlayerJoined = "pJoined",
	PlayerDisconnected = "pDisconnected",
	SomeoneWin = "onePWin",
}

export enum SocketListenEvents {
	Connect = "connect",
	RoomCreate = "room:create",
	Disconnect = "disconnect",
	Reconnect = "reconnect",
	MakeAMove = "makeAMove",
	JoinRoom = "joinRoom",
	EndGame = "endGame",
}
