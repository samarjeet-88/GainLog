import Redis from "ioredis";
import envConfig from "../config/envConfig.js";
import logger from "../config/logConfig.js";

class RedisClass {
    #client = null;
    static #instance = null;

    constructor() {
        const redisHost = envConfig.redis.host;
        const redisPort = envConfig.redis.port;

        this.#client = new Redis({
            host: redisHost,
            port: redisPort,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
        });

        this.#client.on("connect", () => {
            logger.info("Redis connected successfully");
        });

        this.#client.on("error", (error) => {
            logger.error(`Redis connection failed, ${error.message}`);
        });
    }

    static getInstance() {
        if (!RedisClass.#instance) {
            RedisClass.#instance = new RedisClass();
        }
        return RedisClass.#instance;
    }

    getClient() {
        return this.#client;
    }
}

export default RedisClass;
