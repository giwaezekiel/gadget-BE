import { productServices } from "./product.service";
import { NextFunction, Request, Response } from "express";

export class productController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await productServices.create(data);
      res.status(201).json({
        ...data,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await productServices.find();
        res.status(200).json({
          success: true,
            data,
          
        });
    } catch (error) {
      next(error);
    }
  }
}
