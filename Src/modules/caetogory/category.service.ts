import { Model } from "mongoose";
import { Category } from "./category.model";
import { ICategory } from "./category.types";
import { schema } from "./category.validation";

export class categoryService {
  constructor(private model: Model<ICategory>) {}
  create = async (data: ICategory) => {
    const { name, desc, parentCategory } = data;

    const { error } = schema.validate(data);
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    const category = await this.model.create({ name, desc, parentCategory });
    return category;
  };
  find = async () => {
    const category = await this.model.find();
    return category;
  };
  findById = async (id: string) => {
    if (!id) {
      throw new Error("ID is required");
    }
    const category = await this.model.findById(id).populate({
      path: "products",
      select:
        "productName ProductDesc productBrand productPrice productImage productRating",
    });
    if (!category) {
      throw new Error("category not found");
    }

    return category;
  };
}
