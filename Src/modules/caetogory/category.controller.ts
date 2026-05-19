import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";
import { redis } from "../../../shared/core/redis/redis";

export class categoryController {
  constructor(private service: categoryService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await redis.del("category:all");
      const category = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        message: "Category created Successfully",
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //getting the cache key
      const cacheKey = "category:all";
      //using the cached key to get the cached products
      const cachedCategory = await redis.get(cacheKey);

      //if there is product in the cache
      if (cachedCategory) {
        return res.status(200).json({
          success: true,
          source: "redis-cache",
          totalCount: JSON.parse(cachedCategory).length,
          category: JSON.parse(cachedCategory),
        });
      }
      // fetch all data
      const category = await this.service.find();

      /**
       * If there's no cache category
       * set the category to the redis cache
       *
       */
      await redis.set(cacheKey, JSON.stringify(category), {
        expiration: {
          type: "EX",
          value: 60 * 5,
        },
      });
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
    const cacheKey = `category:${id}`;
    const cachedCategory = await redis.get(cacheKey);
    if (cachedCategory) {
      res.status(200).json({
        success: true,
        category: JSON.parse(cachedCategory),
      });
    }
    const category = await this.service.findById(id as string);
    res.status(200).json({
      success: true,
      category,
    });
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req?.params;
    const data = req.body;
    const category = await this.service.update(id as string, data);

    await redis.del("category:all");
    await redis.del(`category:${id}`);

    res.status(200).json({
      success: true,
      message: "category Updated Successfully",
      category,
    });
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req?.params;

    await redis.del("category:all");
    await redis.del(`category:${id}`);

    await this.service.delete(id as string);
    res.status(200).json({
      succuss: true,
      message: "Category deleted Successfully",
    });
  };
}
