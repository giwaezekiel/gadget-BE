import { Product } from "./product.model";
import { IProducts } from "./product.types";

export class productServices {
  static async create(data: IProducts) {
    const {
      productName,
      productDesc,
      productBrand,
      productPrice,
      productRating,
      productReviews,
      productWarranty,
    } = data;

    const newProduct = await Product.create({
      productName,
      productDesc,
      productBrand,
      productPrice,
      productRating,
      productReviews,
      productWarranty,
    });
    return newProduct;
  }

  static async find() {
    const product = await Product.find();
    return product;
  }
}
