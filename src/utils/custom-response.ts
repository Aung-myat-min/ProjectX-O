import { CStatus } from "@/types/types";

class CustomResponse<T> {
	status: CStatus = CStatus.notSepcified;
	message: string = "Hey Dev! You are not specified the return method.";
	data: T | null = null;

	private constructor(status: CStatus, message: string, data?: T) {
		this.status = status;
		this.message = message;
		this.data = data ? data : null;
	}

	static success<T>(message: string, data?: T): CustomResponse<T> {
		return new CustomResponse(CStatus.success, message, data);
	}

	static invalidData<T>(message: string, data?: T): CustomResponse<T> {
		return new CustomResponse(CStatus.invalidData, message, data);
	}

	static fail<T>(message: string, data?: T): CustomResponse<T> {
		return new CustomResponse(CStatus.fail, message, data);
	}

	static notFound<T>(message: string, data?: T): CustomResponse<T> {
		return new CustomResponse(CStatus.notFound, message, data);
	}
}

export { CustomResponse };
