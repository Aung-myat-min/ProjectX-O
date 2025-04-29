import { CustomResponse } from "./custom-response";
import server from "../app";
import { CStatus } from "@/types/types";
import { Response } from "express";

export function HttpResponseHandler<T>(data: CustomResponse<T>, res: Response) {
	if (data.status == CStatus.notSepcified) {
		console.error(data.message);
	} else {
		switch (data.status) {
			case CStatus.success:
				res.status(200).json(data);
			case CStatus.invalidData:
				res.status(401).json(data);
			case CStatus.fail:
				res.status(500).json(data);
			case CStatus.notFound:
				res.status(404).json(data);
			default:
				res.status(500).json({ message: "Internal Server Error!" });
		}
	}
}
