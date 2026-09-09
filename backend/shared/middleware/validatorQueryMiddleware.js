


const validateQueryMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        } catch (error) {
            next(error);
        }
    }
}


export default validateQueryMiddleware;