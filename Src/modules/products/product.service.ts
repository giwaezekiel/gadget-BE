import { Model } from "mongoose";
import { Product } from "./product.model";
import { IProducts } from "./product.types";
import { productValidator } from "./product.validation";

export class productServices {
  constructor(private model: Model<IProducts>) {}
  create = async (data: IProducts) => {
    const {
      productName,
      productDesc,
      productBrand,
      productPrice,
      productRating,
      productReviews,
      productWarranty,
      productImages,
    } = data;

    productValidator(data);

    const newProduct = await this.model.create({
      productName,
      productDesc,
      productBrand,
      productPrice,
      productRating,
      productReviews,
      productWarranty,
      productImages,
    });
    return newProduct;
  };

  find = async () => {
    const product = await this.model.find();
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
