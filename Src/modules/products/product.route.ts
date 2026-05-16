import { Router } from "express";
import { productController } from "./product.controller";

export const productRouter = Router();

productRouter.post("/", productController.create);
productRouter.get("/", productController.find);
productRouter.get("/:id", productController.findById);
productRouter.patch("/:id", productController.update);
