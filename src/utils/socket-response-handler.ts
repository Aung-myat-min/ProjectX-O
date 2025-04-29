import { SocketEmitEvents } from "@/types/socket-events";
import { CustomResponse } from "./custom-response";
import { CStatus } from "@/types/types";
import { Socket } from "socket.io";
import { logger } from "./logger";

export function SocketResponseHandler<T>(
	socket: Socket,
	eventName: SocketEmitEvents,
	data: CustomResponse<T>
) {
	if (data.status === CStatus.notSepcified) {
		logger.error(data.message);
	} else {
		socket.emit(eventName, data);
	}
}
