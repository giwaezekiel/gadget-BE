import { Model } from "mongoose";
import { Category } from "./category.model";
import { ICategory } from "./category.types";
import { schema } from "./category.validation";

export class categoryService {
  constructor(private model: Model<ICategory>) {}
  create = async (data: ICategory) => {
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }

    const category = await this.model.create(data);
    console.log(data);
    console.log(category);

    return category;
  };
  find = async () => {
    const category = await this.model.find().populate("parentCategory");
    return category;
  };
  findById = async (id: string) => {
    if (!id) {
      throw new Error("ID is required");
    }
    const category = await this.model.findById(id);
    if (!category) {
      throw new Error("category not found");
    }

    return category;
  };
  update = async (id: string, data: ICategory) => {
    const category = await this.model.findByIdAndUpdate(id, data);
    if (!category) {
      throw new Error("category not found");
    }

    return;
  };
  delete = async (id: string) => {
    const category = await this.model.findByIdAndDelete(id);
    if (!category) throw new Error("Category not found");

    return category;
  };
}
