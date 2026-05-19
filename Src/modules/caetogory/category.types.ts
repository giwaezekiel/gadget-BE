import { Document, Schema, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  desc?: string;
  parentCategory?: Schema.Types.ObjectId;
}
