import { Document, Schema, Types } from "mongoose";

export interface ICategory extends Document {
  id: Types.ObjectId;
  name: String;
  desc: String;
  parentCategory: Schema.Types.ObjectId;
}
