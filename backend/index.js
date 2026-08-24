import express from "express"
import envConfig from "./shared/config/envConfig.js";
import dbConnection from "./shared/db/index.js";
import logger from "./shared/config/logConfig.js";
import globalErrorHandler from "./shared/middleware/globalErrorHandler.js";


const app = express();


app.use(express.json());





app.use(globalErrorHandler)


app.listen(envConfig.app.port, () => {
    dbConnection.pingDB().then((isConnected) => {
        if (!isConnected) {
            logger.error("Database connected failed. Exiting Application")
            process.exit(1);
        }
        logger.info("Database connected successfully")
    })
})