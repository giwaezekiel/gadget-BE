import { Document, Schema, Types } from "mongoose";

export interface IProducts extends Document {
  _id: Types.ObjectId;
  productName: String;
  productDesc: String;
  productBrand: String;
  productRating?: Number;
  productReviews?: String;
  productPrice: Number;
  productImages?: [String];
  productVarience?: [String];
  productWarranty: Number;
  productCategory: Schema.Types.ObjectId;
}
