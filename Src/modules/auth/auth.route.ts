import { Router } from "express";
import { authService } from "./auth.service";
import { Auth } from "./auth.model";
import { authController } from "./auth.controller";

export const authRouter = Router();
const service = new authService(Auth);
const controller = new authController(service);

authRouter.post("/", controller.signUp);
