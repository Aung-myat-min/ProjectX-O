import server from "./app";
import config from "./config";
import { connectRedis } from "./config/redis";
import { logger, colors } from "./utils/logger";

connectRedis();

server.listen(config.port, () => {
	logger.info(
		`Server running at ${colors.cyan}http://localhost:${config.port + colors.reset}`
	);
});
