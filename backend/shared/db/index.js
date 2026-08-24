import pool from "./poolConfig.js";
import logger from "../config/logConfig.js";


class DBConnection {
    async getDBConnection() {
        let client = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                client = await pool.connect();
                await client.query("SELECT 1");
                return client
            } catch (error) {
                if (client) {
                    client.release(true);
                    client = null;
                }
                logger.warn(`Database connection attempt ${attempt}/3 failed`)
                if (attempt == 3) {
                    throw error;
                }

            }
        } throw new Error(" Failed to acquire a healthy database connection");
    }

    async pingDB() {
        try {
            const client = await this.getDBConnection();
            await client.release();
            logger.info("Database ping successful");
            return true;
        } catch (error) {
            logger.error(`Database connection error, ${error}`)
            return false;
        }
    }
}

export default DBConnection;