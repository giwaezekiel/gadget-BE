import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { redis } from "../../../shared/core/redis/redis";
import { generateOTP } from "../../../shared/config/mailer";
import bcrypt from "bcrypt";
import { sendOTP } from "../../../utils/sendOTP";

export class authController {
  constructor(private service: authService) {}
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      //clear current cache
      await redis.del("auth:all");

      //send OTP to email
      const OTP = generateOTP();
      await sendOTP(data?.email, OTP);

      //hash OTP
      const hashOTP = await bcrypt.hash(OTP, 10);

      //save generated OTP in Cache
      await redis.set(`OTP${data?.email}`, hashOTP, { EX: 300 });

      const user = await this.service.signUp(data);
      res.status(201).json({
        success: true,
        message: "OTP sent successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      //get hashed OTP and check expire
      const hashedOTP = await redis.get(`OTP${data?.email}`);
      console.log(hashedOTP);
      if (!hashedOTP) {
        throw new Error("OTP expired");
      }
      //compare hashed OTP and input
      const compare = await bcrypt.compare(data?.OTP, hashedOTP);
      if (compare) {
        const user = await this.service.verify(data?.email);
        res.status(200).json({
          email: user?.email,
          isVerified: true,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  signIn = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    
  };
}
