import { Socket, Server } from "socket.io";
import { CreateRoomData, JoinRoomData, LeaveRoomData } from "../types/dtos";
import { EventHandler } from "@/utils/event-handler";
import { SocketEmitEvents, SocketListenEvents } from "@/types/socket-events";
import { createGame } from "@/services/room.service";
import { setInitialGameData } from "@/controllers/redis.controller";
import { CustomResponse } from "@/utils/custom-response";
import { logger } from "@/utils/logger";

// was just testing few stuff, feel free to remove this code
const createRoom = new EventHandler<CreateRoomData>(
	SocketListenEvents.RoomCreate,
	async (io: Server, socket: Socket, data: CreateRoomData) => {
		try {
			const game = await createGame();
			const response = await setInitialGameData(game);
			logger.debug("game:", game);
			logger.debug("response:", response);
			// Now you can use io for room operations
			socket.join(game.roomId);
			io.to(game.roomId).emit(SocketEmitEvents.RoomCreated, game);
			logger.debug({
				roomId: game.roomId,
				player1: game.player1,
				player2: game.player2,
			});
		} catch (error) {
			const response = CustomResponse.serverErr(
				error instanceof Error ? error.message : String(error)
			);
			socket.emit("error", response);
		}
	}
);

export const roomEvents = { createRoom };
