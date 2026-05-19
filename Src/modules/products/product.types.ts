import { Document, Schema, Types } from "mongoose";

export interface IProducts extends Document {
  _id: Types.ObjectId;
  productName: string;
  productDesc: string;
  productBrand: string;
  productRating?: Number;
  productReviews?: string;
  productPrice: Number;
  productImages?: [string];
  productVarience?: [string];
  productWarranty: Number;
  productCategory: Schema.Types.ObjectId;
}
