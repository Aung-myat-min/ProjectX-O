import express from "express";
import config from "./config";
import { logger, colors } from "./utils/logger";

const app = express();

app.listen(config.port, () => {
	logger.info(
		`Server running at ${colors.cyan}http://localhost:${config.port + colors.reset}`
	);
});
