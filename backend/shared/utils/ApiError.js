class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
  
        this.statusCode = statusCode;
        this.details = details;
        
        // did not understood why this line? 
        Error.captureStackTrace(this, this.constructor);
    }
  
    static badRequest( details = null) {
      return new ApiError(400, "Bad Request", details);
    }
  
    static unauthorized( details = null) {
      return new ApiError(401, "Unauthorized", details);
    }
  
    static forbidden( details = null) {
      return new ApiError(403, "Forbidden", details);
    }
  
    static notFound( details = null) {
      return new ApiError(404, "Not Found", details);
    }
  
    static conflict( details = null) {
      return new ApiError(409, "Conflict", details);
    }
  
    static internal( details = null) {
      return new ApiError(500, "Internal Server Error", details);
    }
  }
  
  export default ApiError;