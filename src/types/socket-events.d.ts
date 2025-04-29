export enum SocketEmitEvents {
	GameStart = "gameStart",
	UpdateMove = "updateMove",
	PlayerJoined = "pJoined",
	PlayerDisconnected = "pDisconnected",
	SomeoneWin = "onePWin",
}

export enum SocketListenEvents {
	Connect = "connect",
	Disconnect = "disconnect",
	Reconnect = "reconnect",
	MakeAMove = "makeAMove",
	JoinRoom = "joinRoom",
	EndGame = "endGame",
}
