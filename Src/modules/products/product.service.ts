import { Model } from "mongoose";
import { IProducts } from "./product.types";
import { schema } from "./product.validation";

export class productServices {
  constructor(private model: Model<IProducts>) {}
  create = async (data: IProducts) => {
    // productValidator
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }

    const newProduct = await this.model.create(data);
    return newProduct;
  };

  find = async () => {
    const product = await this.model
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "productCategory",
        select: "_id name parentCategory",
        populate: {
          path: "parentCategory",
          select: "_id name parentCategory",
        },
      });
    return product;
  };

  findById = async (id: string) => {
    const product = await this.model.findById(id);
    if (!id) {
      throw new Error("ID is Required");
    }
    if (!product) {
      throw new Error("Product with this ID not available");
    }
    return product;
  };

  update = async (id: string, data: IProducts) => {
    if (!id) {
      throw new Error("ID is required ");
    }
    const product = await this.model.findByIdAndUpdate(id, data);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  };
  delete = async (id: string) => {
    if (!id) {
      throw new Error("ID is required ");
    }
    const product = await this.model.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  };
}
