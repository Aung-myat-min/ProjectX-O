import config from "@/config";
import { logger } from "@/utils/logger";
import { createClient } from "redis";

const redisClient = createClient({ url: config.redisConnection });

async function connectRedis(retry = 5) {
	for (let i = 0; i < retry; i++) {
		try {
			await redisClient.connect();
			logger.info("✅ Redis Client Connected!");
			break;
		} catch (err) {
			logger.error(`❌ Redis connection failed (try ${i + 1})`);
			if (i < retry - 1) await new Promise((r) => setTimeout(r, 1000));
			else process.exit(1);
		}
	}
}

export { redisClient, connectRedis };
