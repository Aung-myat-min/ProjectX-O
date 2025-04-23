import server from "./app";
import config from "./config";
import { logger, colors } from "./utils/logger";

server.listen(config.port, () => {
	logger.info(
		`Server running at ${colors.cyan}http://localhost:${config.port + colors.reset}`
	);
});
