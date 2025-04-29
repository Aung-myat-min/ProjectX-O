import { CustomResponse } from "./custom-response";
import { CStatus } from "@/types/types";
import { Response } from "express";
import { logger } from "./logger";

export function HttpResponseHandler<T>(data: CustomResponse<T>, res: Response) {
	if (data.status == CStatus.notSepcified) {
		logger.error(data.message);
	} else {
		switch (data.status) {
			case CStatus.success:
				res.status(200).json(data);
				break;
			case CStatus.invalidData:
				res.status(401).json(data);
				break;
			case CStatus.fail:
				res.status(500).json(data);
				break;
			case CStatus.notFound:
				res.status(404).json(data);
				break;
			default:
				res.status(500).json({ message: "Internal Server Error!" });
		}
	}
}
