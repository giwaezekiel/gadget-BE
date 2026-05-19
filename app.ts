import express from "express";
import { productRouter } from "./Src/modules/products/product.route";
import { Request, Response } from "express";
import { errorMiddleware } from "./shared/middleware/error.middleware";
import { categoryRouter } from "./Src/modules/caetogory/category.route";
export const app = express();

app.use(express.json());

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is live",
  });
});

app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use(errorMiddleware);
