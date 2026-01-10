import config from "@/config";
import { logger } from "@/utils/logger";
import { createClient } from "redis";

const redisClient = createClient({ url: config.redisConnection });

// Add error and connection event handlers
redisClient.on('error', (err) => logger.error('Redis Client Error:', err));
redisClient.on('connect', () => logger.info('Redis client is connecting...'));
redisClient.on('ready', () => logger.info('Redis client is ready'));
redisClient.on('end', () => logger.info('Redis client connection closed'));

async function connectRedis(retry = 5) {
	for (let i = 0; i < retry; i++) {
		try {
			await redisClient.connect();
			logger.info("✅ Redis Client Connected!");
			break;
		} catch (err) {
			logger.error(`❌ Redis connection failed (attempt ${i + 1}/${retry}):`, err);
			if (i < retry - 1) {
				await new Promise((r) => setTimeout(r, 1000));
			} else {
				logger.error("❌ All Redis connection attempts failed. Exiting...");
				process.exit(1);
			}
		}
	}
}

export { redisClient, connectRedis };