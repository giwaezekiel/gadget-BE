import { Product } from "./product.model";
import { IProducts } from "./product.types";
import { productValidator } from "./product.validation";

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

    productValidator(data);

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

  static async findById(id: string) {
    const product = await Product.findById(id);
    if (!id) {
      throw new Error("ID is Required");
    }
    if (!product) {
      throw new Error("Product with this ID not available");
    }
    return product;
  }

  static async update(id: string, data: IProducts) {
    const product = await Product.findByIdAndUpdate(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return await Product.findByIdAndUpdate(id, data);
  }
}
