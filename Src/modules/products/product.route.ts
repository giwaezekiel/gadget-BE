import { Router } from "express";
import { productController } from "./product.controller";
import { upload } from "../../../shared/middleware/upload.middleware";

export const productRouter = Router();

productRouter.post(
  "/",
  upload.single("productImages"),
  productController.create,
);
productRouter.get("/", productController.find);
productRouter.get("/:id", productController.findById);
productRouter.patch("/:id", productController.update);
productRouter.delete("/:id", productController.delete);
