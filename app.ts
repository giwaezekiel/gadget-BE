import express from "express";
import { productRouter } from "./Src/modules/products/product.route";
import { Request, Response } from "express";
export const app = express();

app.use(express.json());

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is live",
  });
});

app.use("/product", productRouter);
