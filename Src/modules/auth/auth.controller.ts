import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { redis } from "../../../shared/core/redis/redis";

export class authController {
  constructor(private service: authService) {}
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    //vlear current cache
    await redis.del("auth:all");

    const user = await this.service.signUp(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  };
}
