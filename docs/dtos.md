# Data Transfer Objects

This refers to the shapes of data being recived and transfered (between modules or back to the client) through-out the API.

## Recieving Events

### Room Events

- `room:create`

```typescript
type CreateRoomEvent = "create room";
```

- `room:join`

```typescript
interface JoinRoomEvent = {
	roomID: string;
};
```

- `room:leave`

```typescript
interface JoinRoomEvent = {
	playerID: string;
	roomID: string;
};
```

### Game Events

- `game:move`

```typescript
type BoardPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface MakeMoveEvent = {
	playerID: string;
	roomID: string;
	playerMove: BoardPosition;
};
```

## Emitting events

### Room Events

- `room:new`

```typescript
interface NewRoom = {
	roomId: string;
	playerID: Player;
	active: boolean;
}
```

- `room:leave`

```typescript
interface LeaveRoom = {
	status: "success"
}
```

- `game:start`

```typescript
// emitted when player joins a valid room and game has been started
interface GameStart = {
	playerID: Player;
	roomId: string;
	board: Board;
	turn: PlayerChoice;
	active: boolean;
}
```

### Room Events

- `game:move`
- `game:win`
