import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

export class categoryController {
  constructor(private service: categoryService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        message: "Category created Successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.find();
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };
  findById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req?.params;
    const category = await this.service.findById(id as string);
    res.status(200).json({
      success: true,
      ...category,
    });
  };
}
