import { Event } from "socket.io";

// a middleware for handling authentication for all events prefixed with "game:"
function authenticatePlayer(arg: Event, next: (err?: Error) => void) {
	try {
		const eventName = arg[0];
		const userID: string = arg[1];
		const roomID: string = arg[2];
		if (eventName.startsWith("game:")) {
			if (!userID) throw new Error("No userID provided");
			// redis operation
			if (!roomID) throw new Error("No roomID provided");
			// redis operation
			next();
		}
		next();
	} catch (error) {
		// catched errors are automatically handled by socket.io using next()
		if (error instanceof Error) next(error);
		else next(new Error("Unexpected Error"));
	}
}

export { authenticatePlayer };
