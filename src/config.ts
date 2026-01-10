import dotenv from "dotenv";

dotenv.config();

// this logic makes sure provided log level is valid
type LOG_LEVEL = "error" | "warn" | "info" | "debug"; // increasing order of verbosity

function isValidLogLevel(level: string | undefined): level is LOG_LEVEL {
	return (
		level !== undefined &&
		["error", "warn", "info", "debug"].includes(level?.toLowerCase() || "")
	);
}

const logLevel: LOG_LEVEL = isValidLogLevel(process.env.LOG_LEVEL)
	? (process.env.LOG_LEVEL.toLowerCase() as LOG_LEVEL)
	: "info";

// main config interface
interface Config {
	port: number;
	nodeEnv: string;
	logLevel: "error" | "warn" | "info" | "debug";
	redisConnection: string;
}

const config: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	logLevel: logLevel,
	redisConnection: process.env.REDIS_CONNECTION || "ConnectionString",
};

export default config;
