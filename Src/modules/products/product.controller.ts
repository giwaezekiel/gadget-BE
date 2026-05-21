import { uploadToCloudinary } from "../../../shared/core/cloudinary/uploadToCloudinary";
import { redis } from "../../../shared/core/redis/redis";
import { productServices } from "./product.service";
import { NextFunction, Request, Response } from "express";
import { Multer } from "multer";

export class productController {
  constructor(private service: productServices) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await redis.del("products:all");

      const files = req.files as Express.Multer.File[];
      let imageUrl: string[] = [];
      if (!files) {
        res.status(400).json({
          success: false,
          message: "No file is uploaded",
        });
        return;
      }

      if (files && files.length > 0) {
        const uploadProm = files.map((file) => uploadToCloudinary(file));
        imageUrl = await Promise.all(uploadProm);
      }

      const data = {
        ...req.body,
        productImages: imageUrl,
      };
      const product = await this.service.create(data);

      res.status(201).json({
        success: true,
        message: "product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  };
  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // getting the cache key
      const cacheKey = "products:all";
      //   using the cache key to get the cached products
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
      const product = await this.service.find();

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
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
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
      const product = await this.service.findById(id as string);

      // return output
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req?.params;

      const files = req.files as Express.Multer.File[];
      let imageUrl: string[] = [];
      if (!files) {
        res.status(400).json({
          success: false,
          message: "No file is uploaded",
        });
        return;
      }

      if (files && files.length > 0) {
        const uploadProm = files.map((file) => uploadToCloudinary(file));
        imageUrl = await Promise.all(uploadProm);
      }

      const data = {
        ...req?.body,
        productImages: imageUrl,
      };
      const product = await this.service.update(id as string, data);

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
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req?.params;

      await redis.del("products:all");
      await redis.del(`products:${id}`);

      await this.service.delete(id as string);

      res.status(200).json({
        success: true,
        message: "product Deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
