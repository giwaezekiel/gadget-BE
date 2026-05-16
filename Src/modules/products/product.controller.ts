import { redis } from "../../../shared/core/redis/redis";
import { productServices } from "./product.service";
import { NextFunction, Request, Response } from "express";

export class productController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await productServices.create(data);
      await redis.del("products:all");
      res.status(201).json({
        ...data,
        success: true,
        message: "product created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      // getting the cache key
      const cacheKey = "products:all";
      //   using the cache key to get the cacehd products
      const cachedProducts = await redis.get(cacheKey);

      // if there's products in the cache
      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          source: "redis-cache",
          totalCount: JSON.parse(cachedProducts).length,
          products: JSON.parse(cachedProducts),
        });
      }
      //fetch all data
      const product = await productServices.find();

      /**
       * If there's no cache product
       * set the product to the redis cache
       *
       */
      await redis.set(cacheKey, JSON.stringify(product), {
        expiration: {
          type: "EX",
          value: 60 * 5,
        },
      });
      res.status(200).json({
        success: true,
        product,
        length: product.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req?.params;
      const cacheKey = `products:${id}`;
      const cacheProduct = await redis.get(cacheKey);
      if (cacheProduct) {
        res.status(200).json({
          success: true,
          product: JSON.parse(cacheProduct),
        });
      }
      // fetch data by id
      const data = await productServices.findById(id as string);

      // return output
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req?.params;
      const data = req.body;
      const product = await productServices.update(id as string, data);

      await redis.del("products:all");
      await redis.del(`products:${id}`);

      res.status(200).json({
        success: true,
        product,
        message: "product Updated Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req?.params;

      await redis.del("products:all");
      await redis.del(`products:${id}`);

      await productServices.delete(id as string);
      res.status(200).json({
        success: true,
        message: "product Deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
