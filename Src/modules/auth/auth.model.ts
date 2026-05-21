import mongoose from "mongoose";
import { IAuth } from "./auth.types";

const authSchema = new mongoose.Schema<IAuth>(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    image: {
      type: [String],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  },
  { timestamps: true },
);

export const Auth = mongoose.model<IAuth>("auth", authSchema);
