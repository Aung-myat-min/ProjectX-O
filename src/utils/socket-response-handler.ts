import { SocketEmitEvents } from "@/types/socket-events";
import { CustomResponse } from "./custom-response";
import { CStatus } from "@/types/types";
import { Socket } from "socket.io";

export function SocketResponseHandler<T>(
	socket: Socket,
	eventName: SocketEmitEvents,
	data: CustomResponse<T>
) {
	if (data.status === CStatus.notSepcified) {
		console.error(data.message);
	} else {
		socket.emit(eventName, data);
	}
}
