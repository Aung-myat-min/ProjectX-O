import config from "../config";
import winston from "winston";
const { combine, printf, colorize } = winston.format;

const colors = {
	reset: "\u001b[38;5;231m",
	black: "\u001b[38;5;0m",
	red: "\u001b[38;5;196m",
	green: "\u001b[38;5;46m",
	yellow: "\u001b[38;5;226m",
	blue: "\u001b[38;5;21m",
	magenta: "\u001b[38;5;201m",
	cyan: "\u001b[38;5;195m",
};

const logger = winston.createLogger({
	level: config.logLevel,
	format: combine(
		colorize(),
		printf(
			(info) => `${info.level}: ${colors.reset + info.message + colors.reset}`
		)
	),
	transports: [new winston.transports.Console()],
});

export { logger, colors };
