import { SocketListenEvents } from "@/types/socket-events";
import { Socket, Server } from "socket.io";

export class EventHandler<T> {
	eventName: SocketListenEvents;
	handle: (io: Server, socket: Socket, data: T) => void | Promise<void>;
	constructor(
		eventName: SocketListenEvents,
		handle: (io: Server, socket: Socket, data: T) => void | Promise<void>
	) {
		this.eventName = eventName;
		this.handle = handle;
	}
}
