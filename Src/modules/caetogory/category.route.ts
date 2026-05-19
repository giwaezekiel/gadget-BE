import { Router } from "express";
import { categoryService } from "./category.service";
import { categoryController } from "./category.controller";
import { Category } from "./category.model";

export const categoryRouter = Router();
const service = new categoryService(Category);
const controller = new categoryController(service);

categoryRouter.post("/", controller.create);
categoryRouter.get("/", controller.find);
categoryRouter.get("/:id", controller.findById);
