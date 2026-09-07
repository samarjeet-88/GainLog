import express from "express"
import envConfig from "./shared/config/envConfig.js";
import dbConnection from "./shared/db/index.js";
import logger from "./shared/config/logConfig.js";
import globalErrorHandler from "./shared/middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import authRouter from "./auth/route/auth.route.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import cors from "cors"

const require = createRequire(import.meta.url);
const swaggerDocument = require("./shared/swagger/swagger.json");


const app = express();

// move all the urls into .env
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json());
app.use(cookieParser());


app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/api/auth", authRouter);

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