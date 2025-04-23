# Data Transfer Objects

This refers to the shapes of data being recived and transfered (between modules or back to the client) through-out the API.

## Recieving Events

### Game Events

- For event `game:move`

```typescript
type BoardPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type MakeMoveEvent = [
	playerID: string,
	roomID: string,
	playerMove: BoardPosition,
];
```

### Room Events
