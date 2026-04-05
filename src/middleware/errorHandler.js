import { NODE_ENV } from "../constants/env.js";

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message:err.message,
        stack:NODE_ENV === "development" ? err.stack : null
    });
}

export default errorHandler;