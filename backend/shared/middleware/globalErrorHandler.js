import { ZodError } from "zod";
import logger from "../config/logConfig.js";
import ApiError from "../utils/ApiError.js";


const globalErrorHandler = (err,req,res,next) => {
  logger.error(
    `Request failed, error ${err}, method ${req.method}, url ${req.url}`
  );

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: err.issues.map(issue => issue.message),
    });
  }

 
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }

   return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    details: null,
  });
};

export default globalErrorHandler;