import mongoose from "mongoose";
import { IProducts } from "./product.types";

const productSchama = new mongoose.Schema<IProducts>(
  {
    productName: {
      type: String,
      required: [true, "product name is required"],
    },
    productDesc: {
      type: String,
      required: [true, "product Description is required"],
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    productBrand: {
      type: String,
      required: [true, "product Brand is required"],
    },
    productRating: {
      type: Number,
      default: 0.0,
    },
    productReviews: {
      type: String,
    },
    productPrice: {
      type: Number,
      required: [true, "product price is required"],
    },
    productImages: {
      type: [String],
    },
    productVarience: {
      type: [String],
    },
    productWarranty: {
      type: Number,
      required: [true, "product warranty  is required"],
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProducts>("product", productSchama);
