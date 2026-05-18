import { Router } from "express";
import { productController } from "./product.controller";
import { upload } from "../../../shared/core/cloudinary/upload";
import { productServices } from "./product.service";
import { Product } from "./product.model";

export const productRouter = Router();

const service = new productServices(Product);
const controller = new productController(service);

productRouter.post("/", upload.array("productImages", 4), controller.create);
productRouter.get("/", controller.find);
productRouter.get("/:id", controller.findById);
productRouter.patch("/:id", controller.update);
productRouter.delete("/:id", controller.delete);
