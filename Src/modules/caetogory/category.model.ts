import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    // desc: {
    //   type: String,
    //   required: [true, "Description is required"],
    // },
    // parentCategory: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "catogory",
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
categorySchema.virtual("products", {
  ref: "product",
  localField: "_id",
  foreignField: "category",
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
