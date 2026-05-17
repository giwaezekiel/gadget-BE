import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = err.message;
  let stack =
    config.NODE_ENV === "Development" ? err?.stack : "An error occured";
  let method = req.method;
  let statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message,
    method,
    stack,
  });

  next();
};
