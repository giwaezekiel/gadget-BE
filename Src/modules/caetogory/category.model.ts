import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    desc: {
      type: String,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model<ICategory>("category", categorySchema);
